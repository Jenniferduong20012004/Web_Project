import React from "react";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import OverviewSection from "../component/dashboard/OverviewSection";

const Dashboard = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="fixed top-0 right-0 left-0 z-20">
        <Navbar />
      </div>

      <div className="fixed left-0 top-16 h-screen z-10">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col !mt-16 bg-gray-50">
        <div className="flex-1 !p-8 md:p-6 overflow-auto !ml-50">
          {/* OVERVIEW */}
          <OverviewSection />

          {/* UPCOMING TASKS */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Upcoming Tasks
            </h2>
            <div className="flex flex-col gap-2">
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
