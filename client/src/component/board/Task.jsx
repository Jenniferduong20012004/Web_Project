import React from "react";
import { useNavigate } from "react-router-dom";

const Task = ({ task, workspaceId }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case "TODO":
        return "bg-blue-500";
      case "IN-PROGRESS":
        return "bg-yellow-500";
      case "COMPLETED":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getPriorityBg = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700";
      case "Medium":
        return "bg-orange-100 text-orange-700";
      case "Low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleTaskClick = () => {
    navigate(`/board/${workspaceId}/task/${task.id}`);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow !p-5 !mb-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleTaskClick}
    >
      {/* Task Status & Menu */}
      <div className="flex justify-between items-center !mb-2">
        <div className="flex items-center">
          <span
            className={`h-2 w-2 rounded-full ${getStatusColor(
              task.status
            )} !mr-2`}
          ></span>
          <span className="text-xs text-gray-500 uppercase">
            {task.status.replace("-", " ")}
          </span>
        </div>
        {/* MENU BUTTON */}
        <button 
          className="text-gray-400 hover:text-gray-600"
          onClick={(e) => {
            e.stopPropagation(); 
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      {/* Task Title */}
      <h3 className="font-medium text-gray-900 !mb-1">{task.title}</h3>

      {/* Task Description */}
      <p className="text-sm text-gray-600 !mb-3">{task.description}</p>

      {/* Task Priority and Assignees */}
      <div className="flex justify-between items-center !mb-3">
        {/* Task Priority */}
        <span
          className={`text-xs !px-2 !py-1 rounded-full ${getPriorityBg(
            task.priority
          )}`}
        >
          {task.priority}
        </span>

        {/* Assigned Members */}
        <div className="flex !-space-x-1">
          {task.assignedTo.map((member, index) => (
            <div
              key={index}
              className={`w-8 h-8 rounded-full border border-white flex items-center justify-center text-xs text-white font-medium ${member.bgColor}`}
              title={member.name}
            >
              {member.initials}
            </div>
          ))}
        </div>
      </div>

      {/* Deadline */}
      <div className="!mt-4">
        <div className="text-xs text-gray-500">Due to: {task.dueDate}</div>
      </div>
    </div>
  );
};

export default Task;