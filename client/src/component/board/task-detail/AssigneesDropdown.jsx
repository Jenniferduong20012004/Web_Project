import React, { useState, useEffect, useRef } from "react";

const AssigneesDropdown = ({
  assignees,
  availableMembers,
  onAssigneesChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Add click event listener to handle clicking outside dropdown
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    // Add event listener when dropdown is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      <div className="relative" ref={dropdownRef}>
        <div
          className="w-full border border-gray-300 rounded-md !px-3 !py-2 text-sm flex items-center justify-between cursor-pointer !mb-3"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={assignees.length > 0 ? "" : "text-gray-500"}>
            {assignees.length > 0
              ? `${assignees.length} member${
                  assignees.length !== 1 ? "s" : ""
                } assigned`
              : "Select members"}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
            {availableMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center !px-3 !py-2 hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  // Toggle member selection
                  const isSelected = assignees.some((m) => m.id === member.id);
                  let newAssignees;

                  if (isSelected) {
                    // Remove member if already selected
                    newAssignees = assignees.filter((m) => m.id !== member.id);
                  } else {
                    // Add member if not selected
                    newAssignees = [...assignees, member];
                  }

                  onAssigneesChange(newAssignees);
                }}
              >
                <div className="flex items-center flex-1">
                  <div
                    className={`!w-8 !h-8 rounded-full flex items-center justify-center text-white font-medium !mr-2 ${member.bgColor}`}
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
                  <span className="text-sm">{member.name}</span>
                </div>

                {/* Checkbox indicator for selected members */}
                <div className="flex items-center justify-center !w-5">
                  {assignees.some((m) => m.id === member.id) && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Display currently assigned */}
      {assignees.length > 0 && (
        <div className="space-y-3">
          {assignees.map((member) => (
            <div key={member.id} className="flex items-center group">
              <div
                className={`!w-8 !h-8 rounded-full flex items-center justify-center text-white font-medium !mr-2 !mb-2 ${member.bgColor}`}
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
              <div className="font-medium text-gray-900 flex-1">
                {member.name}
              </div>
              <button
                onClick={() => {
                  const newAssignees = assignees.filter(
                    (m) => m.id !== member.id
                  );
                  onAssigneesChange(newAssignees);
                }}
                className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssigneesDropdown;
