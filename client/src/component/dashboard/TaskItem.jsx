import React from "react";

const TaskItem = ({ title, daysLeft }) => {
  return (
    <div className="flex items-center justify-between bg-gray-50 rounded-md !px-3 !py-2">
      <span className="text-sm text-gray-700">{title}</span>
      <span className="text-xs text-red-500">{daysLeft} Days Left</span>
    </div>
  );
};

export default TaskItem;
