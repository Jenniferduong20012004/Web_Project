import React from "react";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";

const Dashboard = () => {
  return (
    <div className="w-full min-h-screen flex overflow-hidden font-sans">
      {/* SIDEBAR */}
      <Sidebar />

      {/* NỘI DUNG CHÍNH */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* NAVBAR */}
        <Navbar />

        {/* MAIN CONTENT */}
        <div className="flex-1 p-4 md:p-6 overflow-auto">
          {/* OVERVIEW */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Total Tasks */}
              <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col items-center">
                <p className="text-sm text-gray-500">Total Tasks</p>
                <p className="text-2xl font-bold text-gray-800">5</p>
              </div>
              {/* To Do */}
              <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col items-center">
                <p className="text-sm text-gray-500">To Do</p>
                <p className="text-2xl font-bold text-gray-800">2</p>
              </div>
              {/* In Progress */}
              <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col items-center">
                <p className="text-sm text-gray-500">In Progress</p>
                <p className="text-2xl font-bold text-gray-800">2</p>
              </div>
              {/* Completed */}
              <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col items-center">
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-gray-800">1</p>
              </div>
            </div>
          </div>

          {/* UPCOMING TASKS */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Upcoming Tasks
            </h2>
            <div className="flex flex-col gap-3">
              {/* Task 1 */}
              <div className="flex items-center justify-between bg-gray-50 rounded-md px-3 py-2">
                <span className="text-sm text-gray-700">
                  Creating Website Landing Page | TaskClick - Task Management
                  Project
                </span>
                <span className="text-xs text-red-500">7 Days Left</span>
              </div>
              {/* Task 2 */}
              <div className="flex items-center justify-between bg-gray-50 rounded-md px-3 py-2">
                <span className="text-sm text-gray-700">
                  Creating Website Design | TaskUP - Task Management Project
                </span>
                <span className="text-xs text-red-500">7 Days Left</span>
              </div>
              {/* Task 3 */}
              <div className="flex items-center justify-between bg-gray-50 rounded-md px-3 py-2">
                <span className="text-sm text-gray-700">
                  Creating Website Design | TaskUP - Task Management Project
                </span>
                <span className="text-xs text-red-500">7 Days Left</span>
              </div>
              {/* Task 4 */}
              <div className="flex items-center justify-between bg-gray-50 rounded-md px-3 py-2">
                <span className="text-sm text-gray-700">
                  Creating Website Design | TaskUP - Task Management Project
                </span>
                <span className="text-xs text-red-500">7 Days Left</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
