import React from "react";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import { FaClipboardList, FaClipboardCheck } from "react-icons/fa";
import { MdOutlinePendingActions, MdCheckCircle } from "react-icons/md";

const Dashboard = () => {
  return (
    <div className="w-full min-h-screen font-sans flex flex-col">
      {/* Navbar*/}
      <div className="bg-white border-b border-gray-200 pb-6">
        <Navbar />
      </div>
      <div className="flex flex-1">
        {/* Sidebar  */}
        <Sidebar />

        {/* MAIN CONTENT */}
        <div className="flex-1 bg-gray-100 p-4 md:p-5 overflow-auto">
          {/* OVERVIEW */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {/* Total Tasks */}
              <div className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-4"> 
                <div className="w-10 h-10 bg-purple-100 flex items-center justify-center rounded-full">
                  <FaClipboardList className="text-purple-600" />
                </div> 
                <div>
                  <p className="text-xs font-semibold text-purple-600 uppercase">Total Tasks</p>
                  <p className="text-xl font-bold text-gray-800">5</p>
                </div>
              </div>
                      {/* To Do */}
              <div className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-100 flex items-center justify-center rounded-full">
                  <FaClipboardCheck className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-indigo-600 uppercase">Todos</p>
                  <p className="text-xl font-bold text-gray-800">2</p>
                </div>
              </div>
              
                      {/* In Progress */}
              <div className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 bg-yellow-100 flex items-center justify-center rounded-full">
                  <MdOutlinePendingActions className="text-yellow-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-yellow-600 uppercase">In-Progress</p>
                  <p className="text-xl font-bold text-gray-800">2</p>
                </div>
              </div>
              
                      {/* Completed */}
              <div className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 bg-green-100 flex items-center justify-center rounded-full">
                  <MdCheckCircle className="text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-green-600 uppercase">Completed</p>
                  <p className="text-xl font-bold text-gray-800">1</p>
                </div>
              </div>
            </div>
          </div>

          {/* UPCOMING TASKS */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4 space-x-3">
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
