import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Task = ({ task, workspaceId, onTrashTask }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        return "bg-yellow-100 text-orange-700";
      case "Low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleTaskClick = () => {
    navigate(`/board/${workspaceId}/task/${task.id}`);
  };

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMoveToTrash = (e) => {
    e.stopPropagation();
    setIsMenuOpen(false);

    if (onTrashTask) {
      onTrashTask(task.id);
    }
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

        {/* MENU BUTTON with Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
            onClick={handleMenuToggle}
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

          {/* Dropdown Menu -Move to Trash option */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg z-10">
              <button
                className="w-full text-left !px-2 !py-3 text-sm text-red-500 hover:bg-gray-100"
                onClick={handleMoveToTrash}
              >
                <span className="flex items-center cursor-pointer">
                  {/* svg for Trash icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 !mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Move to Trash
                </span>
              </button>
            </div>
          )}
        </div>
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
          {task.assignedTo &&
            task.assignedTo.map((member, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full border border-white flex items-center justify-center text-xs text-white font-medium ${member.bgColor}`}
                title={member.name}
              >
                {member.photoPath ? (
                  <img
                    src={member.photoPath}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  member.initials
                )}
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
