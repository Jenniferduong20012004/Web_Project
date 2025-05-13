// ProfileUpdateSuccessModal.jsx
import React, { useEffect } from "react";

const ProfileUpdateSuccessModal = ({ onClose, onRefresh }) => {
  // This function will handle both refresh and scroll reset
  const handleClose = () => {
    // Call onRefresh first to reload the profile data
    if (onRefresh) {
      onRefresh();
    }

    // Reset scroll position to top
    window.scrollTo(0, 0);

    // Then close the modal
    onClose();
  };

  return (
    <div className="fixed inset-0 !z-50 flex items-center justify-center">
      {/* Darker backdrop */}
      <div className="absolute inset-0 bg-black/70" onClick={handleClose}></div>

      {/* Modal content */}
      <div className="relative bg-white rounded-lg shadow-lg !p-6 max-w-md w-full !z-10">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center !mb-4">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>

          <h3 className="text-xl font-bold text-gray-900 !mb-2">Success!</h3>
          <p className="text-gray-600 text-center !mb-6">
            Profile has been updated successfully.
          </p>

          <button
            onClick={handleClose}
            className="w-full bg-[#6299ec] hover:bg-blue-900 text-white !py-2 !px-4 rounded-md text-sm font-medium transition duration-200"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdateSuccessModal;
