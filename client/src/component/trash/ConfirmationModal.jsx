import React from "react";

const ConfirmationModal = ({ onConfirm, onCancel, message, isLoading }) => (
  <div className="absolute top-0 left-0 w-full h-full backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
    <div className="bg-white rounded-lg shadow-lg !p-8 w-[400px] text-center scale-95 animate-scale-in">
      <div className="flex justify-center items-center !mb-4">
        <svg
          className="!w-16 !h-16 text-yellow-400 animate-bounce"
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
      <h2 className="text-xl font-bold text-red-600 !mb-2">DELETE</h2>
      <p className="text-gray-700 !mb-1">{message}</p>
      <p className="text-gray-400 text-sm !mb-6">
        This action cannot be undone.
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onCancel}
          className="!px-4 !py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="!px-4 !py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Yes, delete"}
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmationModal;