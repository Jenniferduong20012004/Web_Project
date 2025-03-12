import React from "react";

const WorkspaceCard = ({ workspace }) => {
  return (
    <div
      className="flex flex-col gap-3 border border-[#e9e7f2] rounded-lg bg-white"
      style={{ width: "270px", padding: "10px" }}
    >
      <div className={`h-28 rounded-lg ${workspace.backgroundGradient}`}></div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
            TT
          </div>
          <div className="ml-6">
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

      <div className="flex" style={{ marginBottom: "10px" }}>
        {workspace.members.map((member, idx) => (
          <div
            key={member.id}
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white font-medium ${member.bgColor}`}
            style={{
              marginLeft: idx > 0 ? "-3px" : "0",
            }}
          >
            {member.initials}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkspaceCard;
