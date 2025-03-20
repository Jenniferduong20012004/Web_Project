import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { MdNotifications } from "react-icons/md";
import WorkspaceTabs from "./homepage/WorkspaceTabs";

const Navbar = ({ workspaces, activeTab, onTabChange }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleTabChange = (tabId) => {
    navigate("/homepage");

    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <div className="flex items-center justify-between !px-4 !py-4 bg-white border-b border-gray-200 w-full">
      {/* Logo and Tabs */}
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="Logo"
          className="w-8 h-8 object-contain cursor-pointer"
          onClick={() => navigate("/homepage")}
        />
        <h2
          className="text-xl bg-gradient-to-r from-[#435090] to-[#3885c4] text-transparent bg-clip-text inline-block font-bold cursor-pointer"
          onClick={() => navigate("/homepage")}
        >
          TaskUP
        </h2>
      </div>

      {/* Workspace Tabs: Using your existing component but with enhanced onTabChange */}
      <nav className="!ml-5 flex items-center gap-10 flex-grow">
        <WorkspaceTabs activeTab={activeTab} onTabChange={handleTabChange} />
      </nav>

      {/* Search bar */}
      <div className="flex items-center gap-5">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="!pl-3 !pr-20 !py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* Notification icon */}
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <MdNotifications className="w-6 h-6 text-gray-600" />
          </button>
          {/* Avatar */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-sm font-medium">
              TT
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;