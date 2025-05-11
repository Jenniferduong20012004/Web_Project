import React, { useState, useRef, useEffect } from "react";
import { MdNotifications } from "react-icons/md";
import WorkspaceInvitationModal from "./WorkspaceInvitationModal";
import {
  fetchUserInvitations,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "./notificationService";
import { toast } from "react-toastify";

const NotificationDropdown = ({ refreshWorkspaces }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);

  // Get the current user ID
  const currentUser = JSON.parse(localStorage.getItem("user"));

  // Fetch notifications when component mounts
  useEffect(() => {
    fetchNotifications();

    // Set up polling to check for new notifications (every 30 seconds)
    const intervalId = setInterval(fetchNotifications, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const result = await fetchUserInvitations(currentUser.userId);
      if (result.success) {
        const storedReadStatus =
          JSON.parse(localStorage.getItem("readNotifications")) || {};

        const processedNotifications = result.notifications.map(
          (notification) => ({
            ...notification,
            read: storedReadStatus[notification.joinWorkSpaceId] || false,
          })
        );

        setNotifications(processedNotifications);
      } else {
        console.error("Failed to fetch notifications:", result.message);
      }
    } catch (error) {
      console.error("Error in fetchNotifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleNotificationClick = (notification) => {
    // Mark as read
    markAsRead(notification.joinWorkSpaceId);

    setSelectedNotification(notification);
    setShowModal(true);
    setIsOpen(false);
  };

  const markAsRead = (notificationId) => {
    // Update local state
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) =>
        notif.joinWorkSpaceId === notificationId
          ? { ...notif, read: true }
          : notif
      )
    );

    // Store read status in localStorage
    const storedReadStatus =
      JSON.parse(localStorage.getItem("readNotifications")) || {};
    localStorage.setItem(
      "readNotifications",
      JSON.stringify({ ...storedReadStatus, [notificationId]: true })
    );

    // Call API (if implementing server-side read tracking)
    markNotificationAsRead(notificationId);
  };

  const markAllAsRead = () => {
    // Update local state
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) => ({ ...notif, read: true }))
    );

    // Store read status in localStorage
    const storedReadStatus =
      JSON.parse(localStorage.getItem("readNotifications")) || {};
    const updatedReadStatus = { ...storedReadStatus };

    notifications.forEach((notif) => {
      updatedReadStatus[notif.joinWorkSpaceId] = true;
    });

    localStorage.setItem(
      "readNotifications",
      JSON.stringify(updatedReadStatus)
    );

    // Call API (if implementing server-side)
    markAllNotificationsAsRead(currentUser.userId);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedNotification(null);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Button with Badge */}
      <button
        className="!p-2 hover:bg-gray-100 rounded-full relative cursor-pointer"
        onClick={toggleDropdown}
      >
        <MdNotifications className="w-6 h-6 text-gray-600" />
        {notifications.some((n) => !n.read) && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 !mt-1 w-90 bg-white rounded-md shadow-lg border border-gray-200 z-50">
          <div className="!p-3 border-b border-gray-200">
            <h3 className="text-base font-medium text-gray-800">
              Notifications
            </h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="flex justify-center items-center p-4">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
              </div>
            ) : notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.joinWorkSpaceId}
                  className={`!p-2 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors duration-150 ${
                    notification.read ? "bg-white" : "bg-blue-50"
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start">
                    <img
                      src={notification.workspace.admin.avatar}
                      alt={notification.workspace.admin.name}
                      className="w-10 h-10 rounded-full !mr-2 object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <p className="font-medium text-gray-800">
                          Workspace Invitation
                        </p>
                        <span className="!mt-1 text-xs text-gray-500">
                          {formatTimestamp(notification.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 !mt-1">
                        <span className="font-medium">
                          {notification.workspace.admin.name}
                        </span>{" "}
                        invited you to join "
                        <span className="text-blue-900 font-medium">
                          {notification.workspace.workspacename}
                        </span>
                        "
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="!p-4 text-center text-gray-500">
                No notifications
              </div>
            )}
          </div>
          {notifications.length > 0 && notifications.some((n) => !n.read) && (
            <div className="!p-2 text-center border-t border-gray-200">
              <button
                className="text-sm text-blue-900 hover:text-blue-700 cursor-pointer"
                onClick={markAllAsRead}
              >
                Mark all as read
              </button>
            </div>
          )}
        </div>
      )}

      {/* Invitation Modal Component */}
      <WorkspaceInvitationModal
        notification={selectedNotification}
        isOpen={showModal}
        onClose={closeModal}
        onAccept={() => {
          if (selectedNotification) {
            acceptInvitation(selectedNotification.joinWorkSpaceId);
          }
        }}
        onDecline={() => {
          if (selectedNotification) {
            declineInvitation(selectedNotification.joinWorkSpaceId);
          }
        }}
      />
    </div>
  );

  // Function to accept invitation
  async function acceptInvitation(joinWorkSpaceId) {
    const { respondToInvitation } = await import("./notificationService");

    try {
      const result = await respondToInvitation(joinWorkSpaceId, true);

      if (result.success) {
        toast.success("You've joined the workspace successfully!");

        // Remove the notification from the list
        setNotifications((prev) =>
          prev.filter((n) => n.joinWorkSpaceId !== joinWorkSpaceId)
        );

        closeModal();

        // Call the refreshWorkspaces function passed from props
        if (refreshWorkspaces) {
          await refreshWorkspaces();
        }
      } else {
        toast.error(`Failed to accept invitation: ${result.message}`);
      }
    } catch (error) {
      console.error("Error accepting invitation:", error);
      toast.error("An error occurred while accepting the invitation");
    }
  }

  // Function to decline invitation
  async function declineInvitation(joinWorkSpaceId) {
    const { respondToInvitation } = await import("./notificationService");

    try {
      const result = await respondToInvitation(joinWorkSpaceId, false);

      if (result.success) {
        toast.info("Invitation declined");

        // Remove the notification from the list
        setNotifications((prev) =>
          prev.filter((n) => n.joinWorkSpaceId !== joinWorkSpaceId)
        );

        closeModal();
      } else {
        toast.error(`Failed to decline invitation: ${result.message}`);
      }
    } catch (error) {
      console.error("Error declining invitation:", error);
      toast.error("An error occurred while declining the invitation");
    }
  }
};

export default NotificationDropdown;
