import React from "react";
import logo from "../assets/logo.png";
import userAvatar from "../assets/user-avatar.svg";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
      {/* Bên trái: Logo + Tên trang web */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
        <h2 className="text-xl font-bold text-gray-800">TaskUP</h2>
      </div>

      {/* Bên phải: Tabs + Avatar (nếu cần) */}
      <div className="flex items-center gap-6">
        <nav className="flex items-center gap-4">
          <button className="text-sm font-medium text-blue-600 border-b-2 border-blue-600 pb-1">
            My Workspace
          </button>
          <button className="text-sm font-medium text-gray-500 hover:text-blue-600 hover:border-blue-600 pb-1 border-b-2 border-transparent">
            My Assigned Workspace
          </button>
        </nav>

        {/* Hiển thị avatar user */}

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
  );
};

export default Navbar;
