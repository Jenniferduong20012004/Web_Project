import React, { useState } from "react";

// Delete Confirmation Modal
export const DeleteWorkspaceModal = ({ workspace, onConfirm, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    await onConfirm();
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 !z-50 flex items-center justify-center">
      {/* Darker backdrop */}
      <div className="absolute inset-0 bg-black/70" onClick={onCancel}></div>

      {/* Modal content */}
      <div className="relative bg-white rounded-lg shadow-md !p-6 w-[450px] text-center max-w-[95%] mx-auto !z-10">
        {/* Warning icon - red triangle with exclamation */}
        <div className="flex justify-center items-center !mb-4">
          <svg
            className="!w-12 !h-12 text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2L1 21h22L12 2z" />
            <path
              d="M12 16v.01M12 8v5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h2 className="text-xl font-bold text-red-500 !mb-4">DELETE</h2>

        <p className="text-gray-700 !mb-2">
          Are you sure to delete workspace <br />
          <span className="text-red-500 font-semibold">
            {workspace?.title || workspace?.workspaceName}
          </span>
          ?
        </p>

        <p className="text-gray-500 text-sm !mb-6">
          This action cannot be undone.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="!px-5 !py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors font-medium cursor-pointer"
            disabled={isLoading}
          >
            CANCEL
          </button>
          <button
            onClick={handleConfirm}
            className="!px-6 !py-2 bg-blue-400 text-white rounded hover:bg-blue-800 transition-colors font-medium cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin h-4 w-4 !mr-2 border-t-2 border-white rounded-full"></span>
                Deleting...
              </span>
            ) : (
              "DELETE"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Edit Workspace Modal
export const EditWorkspaceModal = ({
  workspace,
  onUpdate,
  onCancel,
  editedWorkspaceName,
  setEditedWorkspaceName,
  editedDescription,
  setEditedDescription,
}) => {
  const [loading, setLoading] = useState(false);

  const handleUpdateWorkspace = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onUpdate(e);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 !z-50 flex items-center justify-center">
      {/* Darker backdrop */}
      <div className="absolute inset-0 bg-black/70" onClick={onCancel}></div>

      {/* Form content */}
      <div className="relative bg-white rounded-lg shadow-md w-full max-w-md !p-6 !z-10">
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
              className="w-full !p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={editedWorkspaceName}
              onChange={(e) => setEditedWorkspaceName(e.target.value)}
              required
            />
          </div>
          <div className="!mb-6">
            <label htmlFor="description" className="block font-medium !mb-1">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Workspace description"
              className="w-full !p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              rows="4"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="!px-5 !py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors font-medium cursor-pointer"
              disabled={loading}
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="!px-6 !py-2 bg-blue-400 text-white rounded hover:bg-blue-800 transition-colors font-medium cursor-pointer"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin h-4 w-4 !mr-2 border-t-2 border-white rounded-full"></span>
                  UPDATING...
                </span>
              ) : (
                "UPDATE"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Leave Workspace Modal
export const LeaveWorkspaceModal = ({ onConfirm, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    await onConfirm();
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 !z-50 flex items-center justify-center">
      {/* Darker backdrop */}
      <div className="absolute inset-0 bg-black/70" onClick={onCancel}></div>

      {/* Modal content */}
      <div className="relative bg-white rounded-lg shadow-md !p-6 w-[450px] text-center max-w-[95%] mx-auto !z-10">
        <h2 className="text-xl font-bold text-red-500 !mb-4 !mt-6">
          LEAVE WORKSPACE
        </h2>

        <p className="text-gray-700 !mb-6">
          Are you sure you want to leave this workspace?
        </p>

        <div className="flex justify-center gap-4 !mb-4">
          <button
            onClick={onCancel}
            className="!px-5 !py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors font-medium cursor-pointer"
            disabled={isLoading}
          >
            CANCEL
          </button>
          <button
            onClick={handleConfirm}
            className="!px-6 !py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors font-medium cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin h-4 w-4 !mr-2 border-t-2 border-white rounded-full"></span>
                LEAVING...
              </span>
            ) : (
              "LEAVE"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};