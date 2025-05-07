import React from "react";
import StatusCard from "./StatusCard";

import totalTaskIcon from "../../assets/total-task-icon.svg";
import todoIcon from "../../assets/todo-icon.svg";
import inProgressIcon from "../../assets/in-progress-icon.svg";
import completedIcon from "../../assets/completed-icon.svg";

const OverviewSection = ({ data }) => {
  const cardTypes = [
    {
      title: "Total Tasks",
      count: data.totalTasks,
      icon: totalTaskIcon,
      bgColor: "bg-indigo-100",
    },
    {
      title: "Todos",
      count: data.todo,
      icon: todoIcon,
      bgColor: "bg-blue-100",
    },
    {
      title: "In-Progress",
      count: data.inProgress,
      icon: inProgressIcon,
      bgColor: "bg-yellow-100",
    },
    {
      title: "Completed",
      count: data.completed,
      icon: completedIcon,
      bgColor: "bg-green-100",
    },
  ];

  return (
    <div className="!mb-6">
      <h2 className="text-xl font-bold text-[#455294] !mb-3">Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
        {cardTypes.map((card, index) => (
          <StatusCard
            key={index}
            title={card.title}
            count={card.count}
            icon={card.icon}
            bgColor={card.bgColor}
          />
        ))}
      </div>
    </div>
  );
};

export default OverviewSection;
