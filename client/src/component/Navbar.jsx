import React from "react";
import logo from "C:/Users/LBN/Downloads/Web_Project-Qunu/Web_Project-Qunu/client/src/assets/logo.png"; 
import userAvatar from "C:/Users/LBN/Downloads/Web_Project-Qunu/Web_Project-Qunu/client/src/assets/user-avatar.svg";
import { MdNotifications } from "react-icons/md";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-4 py-30 bg-white border-b border-gray-200 w-full">
      {/* Bên trái: Logo và Tabs */}
      <div className="flex items-center gap-6">
        <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
        <nav className="flex items-center gap-4">
          <button className="text-sm font-medium text-blue-600 border-b-2 border-blue-600 pb-1">
            My Workspace
          </button>
          <button className="text-sm font-medium text-gray-500 hover:text-blue-600 hover:border-blue-600 pb-1 border-b-2 border-transparent">
            My Assigned Workspace
          </button>
        </nav>
      </div>

      {/* Bên phải: Thanh search và Avatar + Chuông thông báo */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search..."
            className="pl-3 pr-10 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <MdNotifications className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <img
              src={userAvatar}
              alt="User Avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-gray-700">Hello</span>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Navbar;
