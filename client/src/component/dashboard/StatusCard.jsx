import React from "react";

const StatusCard = ({ title, count, icon, bgColor = "bg-indigo-50" }) => {
  return (
    <div className="bg-white rounded-lg !px-4 !py-3 shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center">
      <div
        className={`${bgColor} w-9 h-9 rounded-full flex items-center justify-center !mr-4`}
      >
        <img src={icon} alt={`${title} icon`} className="w-9 h-9" />
      </div>
      <div>
        <p className="text-xs text-blue-300 uppercase font-medium">{title}</p>
        <p className="text-lg font-medium text-gray-800">{count}</p>
      </div>
    </div>
  );
};

export default StatusCard;
