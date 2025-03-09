import React from "react";

const WorkspaceCard = ({ workspace }) => {
  return (
    <div className="mb-8 mr-4" style={{ width: "240px" }}>
      <div
        className={`h-20 rounded-lg ${workspace.backgroundGradient} mb-2`}
      ></div>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
            TT
          </div>
          <div className="ml-2">
            <div className="text-sm font-medium">{workspace.title}</div>
            <div className="text-xs text-gray-500">{workspace.subtitle}</div>
          </div>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
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
      <div className="flex mt-2">
        {workspace.members.map((member, idx) => (
          <div
            key={member.id}
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${
              member.bgColor
            } ${idx > 0 ? "-ml-1" : ""}`}
          >
            {member.initials}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkspaceCard;
