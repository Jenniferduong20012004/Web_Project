import React from "react";

const WorkspaceTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex !gap-6">
      <button
        className={`!pb-1 !px-1 ${
          activeTab === "myWorkspace"
            ? "text-blue-800 border-b-2 border-blue-800 font-medium"
            : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => onTabChange("myWorkspace")}
      >
        My Workspace
      </button>

      <button
        className={`!pb-1 !px-1 ${
          activeTab === "assignedWorkspace"
            ? "text-blue-800 border-b-2 border-blue-800 font-medium"
            : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => onTabChange("assignedWorkspace")}
      >
        My Assigned Workspace
      </button>
    </div>
  );
};

export default WorkspaceTabs;
