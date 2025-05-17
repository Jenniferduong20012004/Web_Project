import React from "react";

const ConfirmationModal = ({ onConfirm, onCancel, message, isLoading }) => (
  <div className="fixed inset-0 !z-50 flex items-center justify-center">
    {/* Darker backdrop */}
    <div className="absolute inset-0 bg-black/70" onClick={onCancel}></div>

    {/* Modal content */}
    <div className="relative bg-white rounded-lg shadow-xl !p-8 w-[400px] text-center max-w-[90%] mx-auto !z-10">
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
      <h2 className="text-xl font-bold text-red-500 !mb-2">DELETE</h2>
      <p className="text-gray-700 !mb-1">{message}</p>
      <p className="text-gray-500 text-sm !mb-6">
        This action cannot be undone.
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onCancel}
          className="!px-4 !py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors cursor-pointer"
          disabled={isLoading}
        >
          CANCEL
        </button>
        <button
          onClick={onConfirm}
          className="!px-6 !py-2 bg-blue-400 text-white rounded hover:bg-blue-800 transition-colors cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "DELETE"}
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmationModal;