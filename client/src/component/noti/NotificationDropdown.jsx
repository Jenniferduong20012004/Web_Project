import React, { useState, useRef, useEffect } from "react";
import { MdNotifications } from "react-icons/md";
import WorkspaceInvitationModal from "./WorkspaceInvitationModal";

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef(null);

  // Sample notification data (this would come from your API)
  // Using your database schema: joinWorkSpace, WorkSpace, User tables
  const notifications = [
    {
      joinWorkSpaceId: 1,
      type: "workspace_invitation",
      read: false,
      timestamp: "2025-05-10T14:30:00Z",
      isPending: true,
      workspace: {
        WorkSpace: 101, // Matches your primary key naming
        workspacename: "Product Development",
        description:
          "A workspace for all product development tasks and discussions",
        dateCreate: "2025-04-15",
        admin: {
          userId: 201,
          name: "Jane Cooper",
          email: "jane@taskup.com",
          avatar: "https://i.pravatar.cc/150?img=5",
        },
      },
    },
    {
      joinWorkSpaceId: 2,
      type: "workspace_invitation",
      read: true,
      timestamp: "2025-05-09T10:15:00Z",
      isPending: true,
      workspace: {
        WorkSpace: 102,
        workspacename: "Marketing Campaign",
        description: "Planning and execution of our Q2 marketing initiatives",
        dateCreate: "2025-05-01",
        admin: {
          userId: 202,
          name: "Robert Fox",
          email: "robert@taskup.com",
          avatar: "https://i.pravatar.cc/150?img=8",
        },
      },
    },
  ];

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
    setSelectedNotification(notification);
    setShowModal(true);
    setIsOpen(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedNotification(null);
  };

  const acceptInvitation = () => {
    // Logic to accept invitation - update joinWorkSpace.isPending to false
    console.log(
      "Accepted invitation to:",
      selectedNotification.workspace.workspacename
    );
    closeModal();
    // API call would update the joinWorkSpace table in your DB
    // Update isPending to false, set dateJoin to current date
  };

  const declineInvitation = () => {
    // Logic to decline invitation - delete the joinWorkSpace record
    console.log(
      "Declined invitation to:",
      selectedNotification.workspace.workspacename
    );
    closeModal();
    // API call would delete the record from the joinWorkSpace table
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
          <div className="!p-2 border-b border-gray-200">
            <h3 className="text-base font-medium text-gray-800">
              Notifications
            </h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
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
          {notifications.length > 0 && (
            <div className="!p-2 text-center border-t border-gray-200">
              <button className="text-sm text-blue-900 hover:text-blue-700 cursor-pointer">
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
        onAccept={acceptInvitation}
        onDecline={declineInvitation}
      />
    </div>
  );
};

export default NotificationDropdown;
