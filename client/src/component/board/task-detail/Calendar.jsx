import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Calendar({ selectedDate, onDateChange, disabled = false, isManager = true }) {
  // Initialize with selected date or current date
  const initialDate = selectedDate ? new Date(selectedDate) : new Date();
  const [date, setDate] = useState(initialDate);
  
  // Set today's date at the beginning of the day (midnight) for accurate comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleChange = (date) => {
    if (disabled || !isManager) return; // Prevent changes if disabled or not manager
    
    setDate(date);

    // Format date as "MMM DD, YYYY" (e.g., "Apr 28, 2025")
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    onDateChange(formattedDate);
  };

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <div
      className={`flex items-center text-sm text-gray-500 py-1 px-2 rounded-md inline-flex gap-1 ${
        disabled || !isManager
          ? "cursor-not-allowed" 
          : "cursor-pointer hover:bg-gray-50"
      }`}
      onClick={disabled || !isManager ? undefined : onClick}
      ref={ref}
      title={
        disabled || !isManager 
          ? "Only managers can change the due date" 
          : "Click to change due date"
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-gray-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
          clipRule="evenodd"
        />
      </svg>
      Due to: {value}
    </div>
  ));

  // If disabled or not manager, return static display only
  if (disabled || !isManager) {
    return (
      <div
        className="flex items-center text-sm text-gray-500 py-1 px-2 rounded-md inline-flex gap-1 cursor-not-allowed"
        title="Only managers can change the due date"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clipRule="evenodd"
          />
        </svg>
        Due to: {date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric", 
          year: "numeric",
        })}
      </div>
    );
  }

  return (
    <DatePicker
      selected={date}
      onChange={handleChange}
      dateFormat="MMM dd, yyyy"
      customInput={<CustomInput />}
      popperClassName="z-50"
      popperPlacement="bottom-start"
      minDate={today} // This prevents selecting dates before today
      disabled={disabled || !isManager}
      // Optional: highlight today as the minimum selectable date
      dayClassName={date => 
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
          ? "bg-blue-50 text-blue-600 font-medium" 
          : undefined
      }
    />
  );
}

export default Calendar;