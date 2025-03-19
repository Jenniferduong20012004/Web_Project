import React from "react";

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
    <div className="bg-white rounded-lg !p-4 shadow-lg hover:shadow-xl transition-all duration-200">
      <div className="flex justify-between items-center !mb-2">
        <p className="text-lg text-gray-700 tracking-wide truncate">{title}</p>  
        <span
          className={`text-xs !py-1 !px-3 rounded-full ${
            priority === "High"
              ? "bg-purple-100 text-purple-700"
              : priority === "Mid"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {priority}
        </span>
      </div>
      <p className="text-sm text-gray-500 !mb-2 truncate">{project}</p>  
      <div className="flex justify-between items-center !mt-2">
        <p className="text-sm text-pink-300 tracking-wide truncate">Due in {daysLeft} days</p>  
        <div className="flex gap-2">
          {assignedUsers.map((user, index) => (
            <div
              key={index}
              className="!w-8 !h-8 bg-gray-200 rounded-full flex items-center justify-center text-white text-sm"
            >
              {user[0]} {/* thay user avatars */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const UpcomingTaskBoard = () => {
  return (
    <div className="!p-6">
      <h2 className="text-xl font-bold text-gray-800 !mb-4">Upcoming Tasks</h2> <br/>
      <div className="flex flex-col gap-3">
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
