import { useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import userAvatar from "../assets/user-avatar.svg";
import WorkspaceTabs from "./homepage/WorkspaceTabs";

const Navbar = ({ workspaces, activeTab, onTabChange }) => {
  const location = useLocation();
  const isHomePage =
    location.pathname === "/" || location.pathname === "/homepage";
  return (
    <div className="flex items-center justify-between !px-4 !py-4 bg-white border-b border-gray-300 shadow-md">
      {/* Logo + Web name */}
      <div className="flex items-center gap-3 !mr-8">
        <img src={logo} alt="Logo" className="w-7 h-7 object-contain" />
        <h2 className="text-xl bg-gradient-to-r from-[#435090] to-[#3885c4] text-transparent bg-clip-text inline-block font-bold">
          TaskUP
        </h2>
      </div>

      {/* Workspace Tabs: My Workspace and My Assigned Workspace*/}
      {isHomePage && (
        <nav className="!ml-5 flex items-center gap-10 flex-grow">
          <WorkspaceTabs activeTab={activeTab} onTabChange={onTabChange} />
        </nav>
      )}



      {/* Avatar */}
      <div className="!ml-auto flex items-center">
        <img
          src={userAvatar}
          alt="User Avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default Navbar;
