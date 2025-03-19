import React from "react";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import OverviewSection from "../component/dashboard/OverviewSection";
import UpcomingTaskBoard from "../component/dashboard/UpcomingTasksBoard";

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
          <UpcomingTaskBoard/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;