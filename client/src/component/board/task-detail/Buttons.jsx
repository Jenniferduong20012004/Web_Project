import React from "react";

export const BackButton = () => (
  <button
    className="flex items-center text-blue-900 hover:text-gray-500 font-medium cursor-pointer"
    onClick={() => (window.location.href = "/board")}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 !mr-1"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
        clipRule="evenodd"
      />
    </svg>
    Back
  </button>
);

export const UpdateButton = ({ hasChanges, onClick }) => (
  <button
    className={`!px-6 !py-2 rounded-md text-white font-medium 
      ${
        hasChanges
          ? "bg-blue-400 hover:bg-blue-900 cursor-pointer"
          : "bg-gray-300 cursor-not-allowed"
      }`}
    disabled={!hasChanges}
    onClick={onClick}
  >
    Update
  </button>
);