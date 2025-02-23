import React from "react";
import { useForm } from "react-hook-form";

const InputField = ({
  label,
  type = "text",
  placeholder,
  register,
  error,
  className,
  rightIcon,
  onRightIconClick,
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          className={`w-full border rounded-lg border-gray-300 focus:outline-none focus:ring-1 
            ${
              error
                ? "border-red-500 text-red-900 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            } text-sm ${className}`}
          style={{
            backgroundColor: "#f7fbff",
            padding: "5px 9px",
          }}
          placeholder={placeholder}
          {...(register ? register : {})}
        />
        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
          >
            {rightIcon}
          </button>
        )}
      </div>
    </div>
  );
};
export default InputField;
