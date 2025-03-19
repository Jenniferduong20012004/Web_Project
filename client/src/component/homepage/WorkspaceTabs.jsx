import React from "react";

const WorkspaceTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex gap-6 !ml-10">
      <button
        className={`!px-1 cursor-pointer ${
          activeTab === "myWorkspace"
            ? "text-[#4A92DD] font-semibold"
            : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => onTabChange("myWorkspace")}
      >
        My Workspaces
      </button>

      <button
        className={`!px-1 cursor-pointer ${
          activeTab === "assignedWorkspace"
            ? "text-[#4A92DD] font-semibold"
            : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => onTabChange("assignedWorkspace")}
      >
        My Assigned Workspaces
      </button>
    </div>
  );
};

export default WorkspaceTabs;
