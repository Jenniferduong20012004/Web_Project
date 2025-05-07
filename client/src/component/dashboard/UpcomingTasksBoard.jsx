import React from "react";

// User data with colors
const usersData = {
  User1: { initials: "U1", bgColor: "bg-blue-500" },
  User2: { initials: "U2", bgColor: "bg-green-500" },
  User3: { initials: "U3", bgColor: "bg-purple-500" },
  User4: { initials: "U4", bgColor: "bg-pink-500" },
};

// Mock data for tasks
const tasks = [
  {
    title: "Creating Website Landing Page",
    project: "TaskClick - Task Management Project",
    daysLeft: 7,
    priority: "High",
    assignedUsers: ["User1", "User2"],
  },
  {
    title: "Creating Website Design",
    project: "TaskUP - Task Management Project",
    daysLeft: 7,
    priority: "Mid",
    assignedUsers: ["User1", "User3", "User4"],
  },
  {
    title: "Creating Website Design",
    project: "TaskUP - Task Management Project",
    daysLeft: 7,
    priority: "High",
    assignedUsers: ["User2", "User4"],
  },
  {
    title: "Creating Website Design",
    project: "TaskUP - Task Management Project",
    daysLeft: 7,
    priority: "Low",
    assignedUsers: ["User3", "User4"],
  },
];

const TaskItem = ({ title, project, daysLeft, priority, assignedUsers }) => {
  return (
    <div className="bg-white rounded-lg !p-5 shadow-lg hover:shadow-xl transition-all duration-200">
      <div className="flex justify-between items-center !mb-2">
        <p className="text-3sm font-semibold text-blue-900 tracking-wide truncate">
          {title}
        </p>
        <span
          className={`!px-3 !py-1 text-xs rounded-full font-semibold ${
            priority === "High"
              ? "bg-[#FFDBD8] text-[#D04226]"
              : priority === "Mid"
              ? "bg-[#FEF9C3] text-[#E37F0A]"
              : "bg-green-100 text-green-700"
          }`}
        >
          {priority}
        </span>
      </div>
      <p className="text-sm text-gray-400 !mb-2 truncate">{project}</p>

      <div className="flex justify-between items-center !mt-2">
        <div className="flex items-center">
          <svg
            className="w-5 h-4 text-[#E5252A] !mr-1"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M12 7V12L15 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <p className="text-xs text-[#E5252A] tracking-wide truncate">
            Due in {daysLeft} days
          </p>
        </div>
        <div className="flex">
          {assignedUsers.map((user, index) => (
            <div
              key={index}
              className={`!w-8 !h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${usersData[user].bgColor}`}
              style={{
                marginLeft: index > 0 ? "-5px" : "0",
              }}
            >
              {usersData[user].initials}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const UpcomingTaskBoard = () => {
  return (
    <div className="!pt-3">
      <h2 className="text-xl font-bold text-[#455294] ">Upcoming Tasks</h2> <br />
      <div className="flex flex-col gap-2">
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            title={task.title}
            project={task.project}
            daysLeft={task.daysLeft}
            priority={task.priority}
            assignedUsers={task.assignedUsers}
          />
        ))}
      </div>
    </div>
  );
};

export default UpcomingTaskBoard;
