import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const bgColorPool = [
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-yellow-500",
  "bg-red-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-orange-500",
];
const userColors = new Map();

const getUserColor = (user) => {
  if (!userColors.has(user)) {
    const randomColor =
      bgColorPool[Math.floor(Math.random() * bgColorPool.length)];
    userColors.set(user, randomColor);
  }
  return userColors.get(user);
};

const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const TaskItem = ({ task, workspaceId }) => {
  const navigate = useNavigate();

  const handleTaskClick = () => {
    navigate(`/board/${workspaceId}/task/${task.id}`);
  };

  return (
    <div
      className="bg-white rounded-lg !p-5 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
      onClick={handleTaskClick}
    >
      <div className="flex justify-between items-center !mb-2">
        <p className="text-3sm font-semibold text-blue-900 tracking-wide truncate">
          {task.title}
        </p>
        <span
          className={`!px-3 !py-1 text-xs rounded-full font-medium ${
            task.priority === "High"
              ? "bg-[#FFDBD8] text-[#D04226]"
              : task.priority === "Medium"
              ? "bg-[#FEF9C3] text-[#E37F0A]"
              : "bg-green-100 text-green-700"
          }`}
        >
          {task.priority}
        </span>
      </div>
      <p className="text-sm text-gray-600 !mb-2 truncate">{task.description}</p>

      <div className="flex justify-between items-center !mt-4">
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
            {task.daysLeft > 0
              ? `Due in ${task.daysLeft} days`
              : task.daysLeft === 0
              ? "Due Today"
              : "Expired"}
          </p>
        </div>
        <div className="flex">
          {task.assignedUsers.map((user, index) => (
            <div
              key={index}
              className={`!w-8 !h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${getUserColor(
                user
              )}`}
              style={{
                marginLeft: index > 0 ? "-5px" : "0",
              }}
            >
                {user.photoPath ? (
    <img
      src={user.photoPath}
      alt={user.name}
      className="w-full h-full object-cover rounded-full"
    />
  ) : (
     getInitials(user)
  )}
             
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const UpcomingTaskBoard = ({ tasks }) => {
  const { workspacedId } = useParams();

  return (
    <div className="!pt-3">
      <h2 className="text-xl font-bold text-[#455294] ">Upcoming Tasks</h2>{" "}
      <br />
      <div className="flex flex-col gap-2">
        {tasks.map((task, index) => (
          <TaskItem key={index} task={task} workspaceId={workspacedId} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingTaskBoard;
