import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { DeleteWorkspaceModal, EditWorkspaceModal } from "./WorkspaceModals";

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
  const menuRef = useRef(null);

  useEffect(() => {
    setEditedWorkspaceName(workspace.workspaceName || workspace.title);
    setEditedDescription(workspace.description || "");
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

  const handleWorkspaceClick = () => {
    const workspaceData = {
      WorkSpace: workspace.WorkSpace || workspace.id,
      workspacename: workspace.workspaceName || workspace.title,
      description: workspace.description || "",
    };

    localStorage.setItem("workspace", JSON.stringify(workspaceData));

    console.log("Workspace selected and saved to localStorage:", workspaceData);

    if (onClick) {
      onClick(workspace);
    } else {
      // Default action - navigate to members page with workspace ID
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
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white font-medium ${workspace.bgColor}`}>
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
              </div>
            )}
          </div>
        </div>

        <div className="flex" style={{ marginBottom: "10px" }}>
          {workspace.members &&
            workspace.members.map((member, idx) => (
              <div
                key={member.id}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white font-medium ${member.bgColor}`}
                style={{
                  marginLeft: idx > 0 ? "-3px" : "0",
                }}
              >
                {member.photoPath ? (
                  <img
                    src={member.photoPath}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  member.initials
                )}
              </div>
            ))}
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
    </>
  );
};

export default WorkspaceCard;
