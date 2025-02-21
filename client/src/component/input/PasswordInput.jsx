import React from "react";
const PasswordInput = ({value, onChange, placeholder}) => {
    return (
      <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="w-full border rounded-lg border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                style={{
                  backgroundColor: "#f7fbff",
                  padding: "5px 9px",
                }}
                placeholder="••••••••••"
              />
      </div>     
    )
}
export default PasswordInput;