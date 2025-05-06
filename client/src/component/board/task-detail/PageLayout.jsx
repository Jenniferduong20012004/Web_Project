import React from "react";
import Sidebar from "../../Sidebar"
import Navbar from "../../Navbar";

const PageLayout = ({ children, isLoading }) => (
  <div className="w-full min-h-screen flex flex-col">
    <div className="fixed top-0 right-0 left-0 z-20">
      <Navbar />
    </div>
    <div className="fixed left-0 top-16 h-screen z-10">
      <Sidebar />
    </div>
    <div className="flex-1 flex flex-col !mt-16 bg-gray-50">
      <div className="flex-1 !p-8 md:p-6 overflow-auto !ml-50">
        {isLoading ? <div>Loading task details...</div> : children}
      </div>
    </div>
  </div>
);

export default PageLayout;
