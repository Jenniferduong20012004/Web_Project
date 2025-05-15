import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ workspaceId }) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [workspaceName, setWorkspaceName] = useState("");

  useEffect(() => {
    // Get workspace info from localStorage
    const workspaceData = JSON.parse(localStorage.getItem("workspace"));
    if (workspaceData && workspaceData.workspacename) {
      setWorkspaceName(workspaceData.workspacename);
    }
  }, []);

  useEffect(() => {
    const path = location.pathname;
    if (path.includes(`/dashboard/${workspaceId}`)) {
      setActiveTab("Dashboard");
    } else if (path.includes(`/board/${workspaceId}`)) {
      setActiveTab("Board");
    } else if (path.includes(`/trash/${workspaceId}`)) {
      setActiveTab("Trash");
    } else if (path.includes(`/members/${workspaceId}`)) {
      setActiveTab("Members");
    }
  }, [location]);

  // Navigation items with their icons
  const navItems = [
    {
      name: "Dashboard",
      path: `/dashboard/${workspaceId}`,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
    },
    {
      name: "Board",
      path: `/board/${workspaceId}`,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z" />
          <path d="M8 7h6" />
          <path d="M8 11h8" />
          <path d="M8 15h6" />
        </svg>
      ),
    },
    {
      name: "Trash",
      path: `/trash/${workspaceId}`,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
      ),
    },
    {
      name: "Members",
      path: `/members/${workspaceId}`,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
          <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-48 min-h-screen bg-white flex flex-col border-r border-gray-200">
      <div className="flex flex-col gap-4 !px-4 !py-6 items-center">
        {/* Header with back button and workspace name */}
        <div className="w-full">
          <Link
            to="/homepage"
            className="flex items-center text-[#455294] !ml-3 !mt-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            <span className="!ml-3 text-xl font-bold">{workspaceName}</span>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 !mt-2">
          <ul>
            {navItems.map((item) => (
              <li key={item.name} className="!mb-3">
                <Link
                  to={item.path}
                  onClick={() => setActiveTab(item.name)}
                  className={`flex items-center w-full !px-5 !py-3 text-sm rounded-2xl ${
                    activeTab === item.name || location.pathname === item.path
                      ? "bg-blue-50 text-[#4A92DD]"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <span
                    className={`${
                      activeTab === item.name
                        ? "text-[#4A92DD]"
                        : "text-gray-400"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span
                    className={`!ml-3 ${
                      activeTab === item.name || location.pathname === item.path
                        ? "font-medium"
                        : "font-normal"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout button at bottom */}
        <div className="!mt-33">
          <Link
            to="/login"
            className="flex gap-3 items-center text-gray-500 !py-3 text-sm hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>

            <span>Log out</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;