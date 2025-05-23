import React, { useState } from "react";
import { MdClose } from "react-icons/md";

const WorkspaceInvitationModal = ({ 
  notification, 
  isOpen, 
  onClose, 
  onAccept, 
  onDecline 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  
  if (!isOpen || !notification) return null;

  const handleAccept = async () => {
    setIsLoading(true);
    await onAccept();
    setIsLoading(false);
  };

  const handleDecline = async () => {
    setIsLoading(true);
    await onDecline();
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 !z-50 flex items-center justify-center">
      {/* Darker backdrop */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={isLoading ? null : onClose}
      ></div>

      {/* Modal content */}
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg !p-8 !z-10">
        <div className="flex justify-between items-start !mb-4">
          <h3 className="text-2xl font-bold text-gray-900">
            Workspace Invitation
          </h3>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 focus:outline-none cursor-pointer"
            disabled={isLoading}
          >
            <MdClose className="w-5 h-5" />
          </button>
        </div>

        <div className="!mb-5">
          <div className="flex items-center !mb-4">
            <img
              src={notification.workspace.admin.avatar}
              alt={notification.workspace.admin.name}
              className="w-12 h-12 rounded-full !mr-4 object-cover"
            />
            <div>
              <h2 className="font-semibold text-gray-600">
                {notification.workspace.admin.name}
              </h2>
              <p className="text-sm text-gray-600">Workspace Admin</p>
            </div>
          </div>

          <h5 className="text-xl font-semibold text-[#455294] !mb-2">
            {notification.workspace.workspacename}
          </h5>

          <p className="text-gray-600 !mb-4">
            {notification.workspace.description}
          </p>

          <div className="text-xs text-[#3A4975]">
            <span className="font-medium">Created:</span>{" "}
            {new Date(
              notification.workspace.dateCreate
            ).toLocaleDateString()}
          </div>
        </div>

        <div className="flex justify-end gap-5">
          <button
            onClick={handleDecline}
            className="!px-6 !py-2 text-[#6299ec] font-medium rounded-md hover:bg-gray-100 cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "PROCESSING..." : "DECLINE"}
          </button>
          <button
            onClick={handleAccept}
            className="!px-6 !py-2 bg-[#6299ec] text-white font-medium rounded-md hover:bg-blue-900 cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin h-4 w-4 !mr-2 border-t-2 border-white rounded-full"></span>
                PROCESSING...
              </span>
            ) : "JOIN"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceInvitationModal;