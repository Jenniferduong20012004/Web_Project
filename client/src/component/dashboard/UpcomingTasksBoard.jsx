import React from "react";
import TaskItem from "./TaskItem";

const UpcomingTasks = ({ tasks }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Tasks</h2>
      <div className="flex flex-col gap-3">
        {tasks.map((task, index) => (
          <TaskItem key={index} title={task.title} daysLeft={task.daysLeft} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingTasks;
