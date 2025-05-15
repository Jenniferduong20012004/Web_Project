import React, { useState } from "react";

// Delete Confirmation Modal
export const DeleteConfirmModal = ({ member, onConfirm, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    await onConfirm();
    setIsLoading(false);
  };

  return (
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
            Are you sure to delete member <br />
            <span className="text-[#f44336] font-semibold">
              {member?.name} ({member?.email})
            </span>{" "}
            ?
          </p>
          <p className="text-sm text-gray-400 !mb-6">
            This action cannot be undone.
          </p>
          <div className="flex gap-4 w-full">
            <button
              className="w-1/2 py-2 border text-gray-700 font-medium rounded-md hover:bg-gray-100"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              className="w-1/2 !py-2 bg-[#6e6cf4] text-white font-medium rounded-md hover:bg-[#4b3bbd]"
              onClick={handleConfirm}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin h-4 w-4 !mr-2 border-t-2 border-white rounded-full"></span>
                  Deleting...
                </span>
              ) : (
                "Yes, delete"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add Member Modal
export const AddMemberModal = ({ onAdd, onCancel }) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = async () => {
    if (!email.trim()) return;

    setIsLoading(true);
    const success = await onAdd(email, role);
    if (!success) {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onCancel}></div>

      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md !p-8 z-10">
        <h3 className="text-2xl font-bold text-gray-800 !mb-6">
          Add new member
        </h3>
        <div className="!mb-4">
          <label className="block text-sm text-gray-600 !mb-1">
            Email address
          </label>
          <input
            type="email"
            className="w-full border rounded-md !px-3 !py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="!mb-6">
          <label className="block text-sm text-gray-600 !mb-1">Role</label>
          <input
            type="text"
            className="w-full border rounded-md !px-3 !py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="Member role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            className="text-[#6b7280] hover:underline text-sm font-semibold uppercase"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="bg-[#6e6cf4] hover:bg-[#4b3bbd] text-white text-sm font-medium !px-6 !py-2 rounded-md"
            onClick={handleAdd}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin h-4 w-4 !mr-2 border-t-2 border-white rounded-full"></span>
                Adding...
              </span>
            ) : (
              "Add"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Update Role Modal
export const UpdateRoleModal = ({ member, role, onRoleChange, onUpdate, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async () => {
    setIsLoading(true);
    await onUpdate();
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onCancel}></div>

      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md !p-8 z-10">
        <h3 className="text-2xl font-bold text-gray-800 !mb-6">
          Update Member Role
        </h3>
        <div className="!mb-2">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Member:</span> {member?.name}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Email:</span> {member?.email}
          </p>
        </div>
        <div className="!mb-6">
          <label className="block text-sm text-gray-600 !mb-1">Role</label>
          <input
            type="text"
            className="w-full border rounded-md !px-3 !py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="Member role"
            value={role}
            onChange={(e) => onRoleChange(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            className="text-[#6b7280] hover:underline text-sm font-semibold uppercase"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="bg-[#6e6cf4] hover:bg-[#4b3bbd] text-white text-sm font-medium !px-6 !py-2 rounded-md"
            onClick={handleUpdate}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin h-4 w-4 !mr-2 border-t-2 border-white rounded-full"></span>
                Updating...
              </span>
            ) : (
              "Update Role"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// User Not Found Modal
export const UserNotFoundModal = ({ email, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose}></div>

      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md !p-8 z-10">
        <div className="flex flex-col items-center">
          <div className="text-blue-500 !mb-4">
            <svg
              className="w-16 h-16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle cx="12" cy="12" r="10" fill="#EBF5FF" />
              <path
                d="M12 7v6"
                stroke="#3B82F6"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="12" cy="18" r="1.5" fill="#3B82F6" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 !mb-2">
            User Not Found
          </h3>
          <p className="text-center text-sm text-gray-600 !mb-6">
            The user with email{" "}
            <span className="text-blue-600 font-semibold">{email}</span>{" "}
            does not exist in the system.
          </p>
          <div className="w-full space-y-3">
            <button
              className="w-full !py-2 border text-gray-700 font-medium rounded-md hover:bg-gray-100"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
