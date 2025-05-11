import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const WorkspaceCard = ({ workspace, onClick, onUpdate }) => {
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
  const [loading, setLoading] = useState(false);
  const menuRef = useRef(null);

  // Update state when workspace prop changes
  useEffect(() => {
    setEditedWorkspaceName(workspace.workspaceName || workspace.title);
    setEditedDescription(workspace.description || "");
    console.log("Workspace updated:", workspace);
    console.log("Description value:", workspace.description);
  }, [workspace]);

  // Close the dropdown menu when clicking outside
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
    // Format the workspace data for localStorage
    const workspaceData = {
      WorkSpace: workspace.WorkSpace || workspace.id,
      workspacename: workspace.workspaceName || workspace.title,
      description: workspace.description || "",
    };

    // Save to localStorage
    localStorage.setItem("workspace", JSON.stringify(workspaceData));

    console.log("Workspace selected and saved to localStorage:", workspaceData);

    // If there's an onClick handler provided, call it
    if (onClick) {
      onClick(workspace);
    } else {
      // Default action - navigate to members page with workspace ID
      navigate(`/members/${workspaceId}`);
    }
  };

  const handleUpdateWorkspace = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Get the correct ID field
    const workspaceId = workspace.WorkSpace || workspace.id;

    const response = await axios.post("http://localhost:5000/updateWorkSpace", {
      id: workspaceId,
      workspacename: editedWorkspaceName,
      description: editedDescription || "",
    });

    const result = response.data;

    if (result.success) {
      // Close the form
      setIsEditFormOpen(false);

      // Update localStorage if this is the current selected workspace
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

      // If there's an onUpdate callback, call it with the updated workspace
      if (onUpdate) {
        const updatedWorkspace = {
          ...workspace,
          workspaceName: editedWorkspaceName,
          description: editedDescription || "",
          title: editedWorkspaceName,
        };
        // console.log("Updated workspace object:", updatedWorkspace);
        onUpdate(updatedWorkspace);
      }

      toast.success("Workspace updated successfully!", {
        position: "top-right",
      });
    }
  };

  const handleDeleteWorkspace = async () => {
    // Close the menu
    setIsMenuOpen(false);

    // Set the workspace to delete and show confirmation modal
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
        // Check if the deleted workspace is the current one in localStorage
        const currentWorkspace = JSON.parse(localStorage.getItem("workspace"));
        if (
          currentWorkspace &&
          (currentWorkspace.WorkSpace === workspaceId ||
            currentWorkspace.WorkSpace === workspaceToDelete.id)
        ) {
          // Remove from localStorage if it's the current workspace
          localStorage.removeItem("workspace");
        }

        toast.success("Workspace deleted successfully!", {
          position: "top-right",
        });

        // Close the confirmation modal
        setShowConfirm(false);
        setWorkspaceToDelete(null);
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
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
              TT
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
                {member.initials}
              </div>
            ))}
        </div>
      </div>

      {/* Edit Form Modal */}
      {isEditFormOpen && (
        <div className="fixed inset-0 !z-50 flex items-center justify-center">
          {/* Darker backdrop */}
          <div
            className="absolute inset-0 bg-black/70"
            onClick={handleCancelEdit}
          ></div>

          {/* Form content */}
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md !p-6 z-10">
            <h2 className="text-2xl font-bold !mb-4">Edit Workspace</h2>

            <form onSubmit={handleUpdateWorkspace}>
              <div className="!mb-4">
                <label htmlFor="name" className="block font-medium !mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Workspace name"
                  className="w-full !p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#6299ec] focus:border-1"
                  value={editedWorkspaceName}
                  onChange={(e) => setEditedWorkspaceName(e.target.value)}
                  required
                />
              </div>
              <div className="!mb-6">
                <label
                  htmlFor="description"
                  className="block font-medium !mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  placeholder="Workspace description"
                  className="w-full !p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#6299ec] focus:border-1"
                  rows="4"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-5">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="!px-7 !py-2 text-[#6299ec] font-medium rounded-md hover:bg-gray-100 cursor-pointer"
                  disabled={loading}
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="!px-7 !py-2 bg-[#6299ec] text-white font-medium rounded-md hover:bg-blue-900 cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "UPDATING..." : "UPDATE"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation m*/}
      {showConfirm && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-50">
          <div className="bg-white rounded-xl shadow-xl !p-8 max-w-md w-full animate-fade-in-scale">
            <div className="flex flex-col items-center">
              <div className="text-red-500 !mb-4">
                <svg
                  className="w-16 h-16 animate-bounce"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path fill="#FACC15" d="M12 2L1 21h22L12 2z" />
                  <path
                    d="M12 8v4"
                    stroke="#000"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="16" r="1.25" fill="#000" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-red-500 !mb-2">DELETE</h3>
              <p className="text-center text-sm text-gray-700 !mb-2">
                Are you sure to delete workspace <br />
                <span className="text-[#f44336] font-semibold">
                  {workspaceToDelete?.title || workspaceToDelete?.workspaceName}
                </span>{" "}
                ?
              </p>
              <p className="text-sm text-gray-400 !mb-6">
                This action cannot be undone.
              </p>
              <div className="flex gap-4 w-full">
                <button
                  className="w-1/2 !py-2 border text-gray-700 font-medium rounded-md hover:bg-gray-100"
                  onClick={handleCancelDelete}
                >
                  Cancel
                </button>
                <button
                  className="w-1/2 !py-2 bg-[#6e6cf4] text-white font-medium rounded-md hover:bg-[#4b3bbd]"
                  onClick={handleDeleteConfirmed}
                >
                  Yes, delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WorkspaceCard;
