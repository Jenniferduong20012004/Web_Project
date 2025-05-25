import React, { useRef, useState } from "react";
import Calendar from "./Calendar";
import { StatusDropdown, PriorityDropdown } from "./Dropdowns";

const TaskHeader = ({ task, editMode, toggleEditMode, handleSaveField, isManager }) => {
  console.log('isManager:', isManager);
  
  const titleInputRef = useRef(null);
  const [titleValue, setTitleValue] = useState(task.title);

  const handleKeyDown = (e, field) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSaveField(field, titleValue);
    }
    if (e.key === "Escape") {
      toggleEditMode(field);
    }
  };

  // Reset the local title state when edit mode changes
  React.useEffect(() => {
    if (editMode.title) {
      setTitleValue(task.title);
    }
  }, [editMode.title, task.title]);

  return (
    <div className="!mb-2 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left Column - Title and due date */}
      <div className="col-span-2">
        {/* Title - Only managers can edit */}
        {editMode.title && isManager ? (
          <div className="flex items-center gap-2">
            <div className="relative flex-grow">
              <input
                ref={titleInputRef}
                type="text"
                value={titleValue}
                onChange={(e) => setTitleValue(e.target.value)}
                onBlur={() => handleSaveField("title", titleValue)}
                onKeyDown={(e) => handleKeyDown(e, "title")}
                className="text-2xl font-bold text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 focus:outline-none w-full !px-2 !py-1"
                autoFocus
              />
            </div>
          </div>
        ) : (
          <h1
            className={`text-2xl font-bold text-gray-900 ${
              isManager 
                ? "cursor-pointer hover:bg-gray-50 py-1 !px-2 rounded-md transition-colors" 
                : "!py-1 !px-2"
            }`}
            onClick={isManager ? () => toggleEditMode("title") : undefined}
          >
            {task.title}
          </h1>
        )}

        {/* Calendar - Only managers can edit */}
        <div className="!mt-2">
          {isManager ? (
            <Calendar
              selectedDate={task.dueDate}
              onDateChange={(date) => handleSaveField("dueDate", date)}
            />
          ) : (
            <div className="flex items-center text-sm text-gray-500 !py-1 !px-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-500 !mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              Due to: {task.dueDate || "No due date"}
            </div>
          )}
        </div>
      </div>

      {/* Right Column - Status and Priority */}
      <div className="max-w-[260px]">
        <div className="flex items-center justify-between !mt-2 !mb-2">
          {/* Status - Everyone can edit (as per requirement) */}
          <StatusDropdown
            status={task.status}
            isOpen={editMode.status}
            onToggle={() => toggleEditMode("status")}
            onSelect={(status) => handleSaveField("status", status)}
          />

          {/* Priority - Only managers can edit */}
          {isManager ? (
            <PriorityDropdown
              priority={task.priority}
              isOpen={editMode.priority}
              onToggle={() => toggleEditMode("priority")}
              onSelect={(priority) => handleSaveField("priority", priority)}
            />
          ) : (
            <div className={`text-xs !px-2 !py-1 rounded-full ${
              task.priority === "High" ? "bg-red-100 text-red-700" :
              task.priority === "Medium" ? "bg-orange-100 text-orange-700" :
              "bg-green-100 text-green-700"
            }`}>
              {task.priority}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskHeader;