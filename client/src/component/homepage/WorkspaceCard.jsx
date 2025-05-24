import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  DeleteWorkspaceModal,
  EditWorkspaceModal,
  LeaveWorkspaceModal,
} from "./WorkspaceModals";

const WorkspaceCard = ({ workspace, onClick, onUpdate, onFetchWorkspaces }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const [workspaceToDelete, setWorkspaceToDelete] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [editedWorkspaceName, setEditedWorkspaceName] = useState(
    workspace.workspaceName || workspace.title
  );
  const [editedDescription, setEditedDescription] = useState(
    workspace.description || ""
  );
  const [isManager, setIsManager] = useState(false);
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [activeMembers, setActiveMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const menuRef = useRef(null);

  useEffect(() => {
    setEditedWorkspaceName(workspace.workspaceName || workspace.title);
    setEditedDescription(workspace.description || "");
    checkWorkspaceRole();

    // Fetch active members when component mounts
    fetchActiveMembers();
  }, [workspace]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch active members for this workspace
  const fetchActiveMembers = async () => {
    try {
      setIsLoading(true);
      const workspaceId = workspace.WorkSpace || workspace.id;

      const response = await axios.post(
        "http://localhost:5000/getActiveMembers",
        {
          workspaceId: workspaceId,
        }
      );

      if (response.data.success) {
        // Filter out managers to show only regular members
        const filteredMembers = response.data.members.filter(
          (member) => !member.isManager
        );
        setActiveMembers(filteredMembers);
      }
    } catch (error) {
      console.error("Error fetching active members:", error);
      toast.error("Failed to load workspace members", {
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Check if the current user is a manager of this workspace
  const checkWorkspaceRole = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (!userData) return;

      const workspaceId = workspace.WorkSpace || workspace.id;

      const response = await axios.post(
        "http://localhost:5000/checkWorkspaceRole",
        {
          userId: userData.userId,
          workspaceId: workspaceId,
        }
      );

      if (response.data.success) {
        setIsManager(response.data.isManager);
      }
    } catch (error) {
      console.error("Error checking workspace role:", error);
    }
  };

  const handleWorkspaceClick = () => {
    const workspaceData = {
      WorkSpace: workspace.WorkSpace || workspace.id,
      workspacename: workspace.workspaceName || workspace.title,
      description: workspace.description || "",
    };

    localStorage.setItem("workspace", JSON.stringify(workspaceData));

    if (onClick) {
      onClick(workspace);
    } else {
      // Default action - navigate to members page with workspace ID
      const workspaceId = workspace.WorkSpace || workspace.id;
      navigate(`/members/${workspaceId}`);
    }
  };

  const handleUpdateWorkspace = async (e) => {
    e.preventDefault();

    // Get the correct ID field
    const workspaceId = workspace.WorkSpace || workspace.id;

    const response = await axios.post("http://localhost:5000/updateWorkSpace", {
      id: workspaceId,
      workspacename: editedWorkspaceName,
      description: editedDescription || "",
    });

    const result = response.data;

    if (result.success) {
      setIsEditFormOpen(false);

      const currentWorkspace = JSON.parse(localStorage.getItem("workspace"));
      if (
        currentWorkspace &&
        (currentWorkspace.WorkSpace === workspaceId ||
          currentWorkspace.WorkSpace === workspace.id)
      ) {
        const updatedWorkspaceData = {
          WorkSpace: workspaceId,
          workspacename: editedWorkspaceName,
          description: editedDescription || "",
        };
        localStorage.setItem("workspace", JSON.stringify(updatedWorkspaceData));
      }

      if (onUpdate) {
        const updatedWorkspace = {
          ...workspace,
          workspaceName: editedWorkspaceName,
          description: editedDescription || "",
          title: editedWorkspaceName,
        };
        onUpdate(updatedWorkspace);
      }

      toast.success("Workspace updated successfully!", {
        position: "top-right",
      });
    }
  };

  const handleDeleteWorkspace = async () => {
    setIsMenuOpen(false);
    setWorkspaceToDelete(workspace);
    setShowConfirm(true);
  };

  const handleLeaveWorkspace = async () => {
    setIsMenuOpen(false);
    setShowLeaveConfirm(true);
  };

  const handleLeaveConfirmed = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (!userData) {
        toast.error("User not logged in", { position: "top-right" });
        return;
      }

      const workspaceId = workspace.WorkSpace || workspace.id;

      const response = await axios.post(
        "http://localhost:5000/leaveWorkspace",
        {
          userId: userData.userId,
          workspaceId: workspaceId,
        }
      );

      const result = response.data;

      if (result.success) {
        // Remove workspace from localStorage if it's the current one
        const currentWorkspace = JSON.parse(localStorage.getItem("workspace"));
        if (
          currentWorkspace &&
          (currentWorkspace.WorkSpace === workspaceId ||
            currentWorkspace.WorkSpace === workspace.id)
        ) {
          localStorage.removeItem("workspace");
        }

        toast.success("You have left the workspace successfully!", {
          position: "top-right",
        });

        setShowLeaveConfirm(false);

        // Refresh workspaces list
        if (onFetchWorkspaces) {
          onFetchWorkspaces();
        }
      } else {
        toast.error(result.message || "Failed to leave workspace", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Leave workspace error:", error);
      toast.error(
        "Error leaving workspace: " +
          (error.response
            ? error.response.data.message
            : error.message || "Unknown error"),
        {
          position: "top-right",
        }
      );
    }
  };

  const handleDeleteConfirmed = async () => {
    try {
      const workspaceId = workspaceToDelete.WorkSpace || workspaceToDelete.id;

      const response = await axios.post(
        "http://localhost:5000/deleteWorkSpace",
        {
          id: workspaceId,
        }
      );

      const result = response.data;

      if (result.success) {
        const currentWorkspace = JSON.parse(localStorage.getItem("workspace"));
        if (
          currentWorkspace &&
          (currentWorkspace.WorkSpace === workspaceId ||
            currentWorkspace.WorkSpace === workspaceToDelete.id)
        ) {
          localStorage.removeItem("workspace");
        }

        toast.success("Workspace deleted successfully!", {
          position: "top-right",
        });

        setShowConfirm(false);
        setWorkspaceToDelete(null);

        if (onFetchWorkspaces) {
          onFetchWorkspaces();
        }
      } else {
        toast.error(result.message || "Failed to delete workspace", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(
        "Error deleting workspace: " +
          (error.response
            ? error.response.data.message
            : error.message || "Unknown error"),
        {
          position: "top-right",
        }
      );
    }
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setWorkspaceToDelete(null);
  };

  const handleCancelLeave = () => {
    setShowLeaveConfirm(false);
  };

  const handleCancelEdit = () => {
    // Reset form values and close
    setEditedWorkspaceName(workspace.workspaceName || workspace.title);
    setEditedDescription(workspace.description || "");
    setIsEditFormOpen(false);
  };

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleEditOption = (e) => {
    e.stopPropagation();
    setIsMenuOpen(false);
    setIsEditFormOpen(true);
  };

  // Render member avatar
  const renderMemberAvatar = (member, idx) => {
    return (
      <div
        key={member.joinWorkSpace}
        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white font-medium ${member.bgColor}`}
        style={{
          marginRight: idx < activeMembers.length - 1 ? "-3px" : "0",
          zIndex: activeMembers.length - idx,
        }}
        title={member.userName}
      >
        {member.photoPath ? (
          <img
            src={member.photoPath}
            alt={member.userName}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          member.initials
        )}
      </div>
    );
  };

  return (
    <>
      <div
        className="flex flex-col gap-3 border border-[#e9e7f2] rounded-lg bg-white cursor-pointer hover:shadow-md transition-all"
        style={{ width: "270px", padding: "10px" }}
        onClick={handleWorkspaceClick}
      >
        <div
          className={`h-28 rounded-lg ${workspace.backgroundGradient}`}
        ></div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white font-medium ${workspace.bgColor}`}
            >
              {workspace.photoPath ? (
                <img
                  src={workspace.photoPath}
                  alt={workspace.name}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                workspace.initials
              )}
            </div>
            <div>
              <div className="text-sm font-medium">
                {workspace.title || workspace.workspaceName}
              </div>
              <div className="text-xs text-gray-500">
                {workspace.description !== undefined &&
                workspace.description !== ""
                  ? workspace.description
                  : "No description"}
              </div>
            </div>
          </div>

          <div className="relative" ref={menuRef}>
            <button
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={handleMenuToggle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 !mt-1 w-36 bg-white rounded-md shadow-lg z-10 !py-1">
                {isManager ? (
                  <>
                    {/* Options for manager: Edit and Delete */}
                    <button
                      className="w-full text-left !px-4 !py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={handleEditOption}
                    >
                      <span className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 !mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        Edit
                      </span>
                    </button>
                    <button
                      className="w-full text-left !px-4 !py-2 text-sm text-red-600 hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteWorkspace();
                      }}
                    >
                      <span className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 !mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Delete
                      </span>
                    </button>
                  </>
                ) : (
                  // Option for non-manager: Only Leave Workspace
                  <button
                    className="w-full text-left !px-4 !py-2 text-sm text-red-600 hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLeaveWorkspace();
                    }}
                  >
                    <span className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 !mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Leave
                    </span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Member avatars container - now using server-provided data */}
        <div
          className="flex justify-end !pr-2"
          style={{ marginBottom: "10px" }}
        >
          {isLoading ? (
            <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse"></div>
          ) : activeMembers.length > 0 ? (
            activeMembers.map((member, idx) => renderMemberAvatar(member, idx))
          ) : (
            <div className="text-xs text-gray-400">No active members</div>
          )}
        </div>
      </div>

      {/* Edit Form Modal */}
      {isEditFormOpen && (
        <EditWorkspaceModal
          workspace={workspace}
          onUpdate={handleUpdateWorkspace}
          onCancel={handleCancelEdit}
          editedWorkspaceName={editedWorkspaceName}
          setEditedWorkspaceName={setEditedWorkspaceName}
          editedDescription={editedDescription}
          setEditedDescription={setEditedDescription}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showConfirm && (
        <DeleteWorkspaceModal
          workspace={workspaceToDelete}
          onConfirm={handleDeleteConfirmed}
          onCancel={handleCancelDelete}
        />
      )}

      {/* Leave Workspace Confirmation Modal */}
      {showLeaveConfirm && (
        <LeaveWorkspaceModal
          onConfirm={handleLeaveConfirmed}
          onCancel={handleCancelLeave}
        />
      )}
    </>
  );
};

export default WorkspaceCard;
