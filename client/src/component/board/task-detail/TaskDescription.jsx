import React, { useRef } from "react";

const TaskDescription = ({ description, editMode, toggleEditMode, handleSaveField }) => {
  const descriptionInputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSaveField(description);
    }
    if (e.key === "Escape") {
      toggleEditMode();
    }
  };

  return (
    <div>
      <h3 className="font-medium text-gray-900 !mb-2">
        Task description:
      </h3>

      {editMode ? (
        <div className="flex flex-col gap-2">
          <textarea
            ref={descriptionInputRef}
            value={description}
            onChange={(e) => handleSaveField(e.target.value)}
            onBlur={() => handleSaveField(description)}
            onKeyDown={handleKeyDown}
            className="w-full border border-gray-300 rounded-md !p-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-24"
            autoFocus
          />
          <div className="flex justify-end">
            <button
              onClick={() => handleSaveField(description)}
              className="bg-blue-500 hover:bg-blue-600 text-white !py-1 !px-3 rounded-md text-sm"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <p
          className="text-gray-600 cursor-pointer hover:bg-gray-50 !p-2 rounded-md"
          onClick={toggleEditMode}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default TaskDescription;