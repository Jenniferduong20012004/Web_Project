import React, { useRef, useEffect } from "react";

// Constant options
const STATUS_OPTIONS = [
  { id: "TODO", label: "TODO", color: "bg-blue-500" },
  { id: "IN-PROGRESS", label: "IN-PROGRESS", color: "bg-yellow-500" },
  { id: "COMPLETED", label: "COMPLETED", color: "bg-green-500" },
];

const PRIORITY_OPTIONS = [
  { id: "High", label: "High", class: "bg-red-100 text-red-700" },
  { id: "Medium", label: "Medium", class: "bg-orange-100 text-orange-700" },
  { id: "Low", label: "Low", class: "bg-green-100 text-green-700" },
];

// Base dropdown component
const Dropdown = ({ trigger, menu, isOpen, reference }) => (
  <div className="relative" ref={reference}>
    {trigger}
    {isOpen && (
      <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md border border-gray-200 z-10">
        {menu}
      </div>
    )}
  </div>
);

// Helper functions
const getStatusColor = (status) => {
  const option = STATUS_OPTIONS.find((opt) => opt.id === status);
  return option ? option.color : "bg-gray-500";
};

const getPriorityBg = (priority) => {
  const option = PRIORITY_OPTIONS.find((opt) => opt.id === priority);
  return option ? option.class : "bg-gray-100 text-gray-700";
};

// Status dropdown component
export const StatusDropdown = ({ status, isOpen, onToggle, onSelect }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (isOpen) onToggle();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle]);

  const statusTrigger = (
    <div
      className="flex items-center cursor-pointer hover:bg-gray-50 !p-1 rounded-md"
      onClick={onToggle}
    >
      <span
        className={`h-2 w-2 rounded-full ${getStatusColor(status)} !mr-2`}
      ></span>
      <span className="text-sm text-gray-500 uppercase">
        {status.replace("-", " ")}
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-gray-400 !ml-1"
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
  );

  const statusMenu = (
    <div className="w-40">
      {STATUS_OPTIONS.map((option) => (
        <div
          key={option.id}
          className="flex items-center !px-3 !py-2 hover:bg-gray-50 cursor-pointer"
          onClick={() => onSelect(option.id)}
        >
          <span
            className={`h-2 w-2 rounded-full ${option.color} !mr-2`}
          ></span>
          <span className="text-sm">{option.label}</span>
        </div>
      ))}
    </div>
  );

  return (
    <Dropdown
      isOpen={isOpen}
      reference={dropdownRef}
      trigger={statusTrigger}
      menu={statusMenu}
    />
  );
};

// Priority dropdown component
export const PriorityDropdown = ({ priority, isOpen, onToggle, onSelect }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (isOpen) onToggle();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle]);

  const priorityTrigger = (
    <div
      className={`text-xs !px-2 !py-1 rounded-full cursor-pointer flex items-center ${getPriorityBg(
        priority
      )}`}
      onClick={onToggle}
    >
      {priority}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3 w-3 ml-1"
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
  );

  const priorityMenu = (
    <div className="w-32">
      {PRIORITY_OPTIONS.map((option) => (
        <div
          key={option.id}
          className={`!px-3 !py-2 text-sm hover:bg-gray-50 cursor-pointer ${
            option.class.includes("text-")
              ? option.class.split(" ").find((c) => c.startsWith("text-"))
              : ""
          }`}
          onClick={() => onSelect(option.id)}
        >
          {option.label}
        </div>
      ))}
    </div>
  );

  return (
    <Dropdown
      isOpen={isOpen}
      reference={dropdownRef}
      trigger={priorityTrigger}
      menu={priorityMenu}
    />
  );
};

export { STATUS_OPTIONS, PRIORITY_OPTIONS };