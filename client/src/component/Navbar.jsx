import { useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import userAvatar from "../assets/user-avatar.svg";

const Navbar = () => {
  const location = useLocation();
  const isHomePage =
    location.pathname === "/" || location.pathname === "/homepage";
  return (
    <div className="flex items-center justify-between !px-4 !py-4 bg-white border-b border-gray-300">
      {/* Logo + Web name */}
      <div className="flex items-center gap-3 mr-8">
        <img src={logo} alt="Logo" className="w-7 h-7 object-contain" />
        <h2 className="text-xl bg-gradient-to-r from-[#435090] to-[#3885c4] text-transparent bg-clip-text inline-block font-bold">
          TaskUP
        </h2>
      </div>

      {/* Tabs - shown in homepage */}
      {isHomePage && (
        <nav className="flex items-center gap-10 flex-grow !ml-25">
          <button className="text-sm font-medium text-blue-600 border-b-2 border-blue-600 pb-1">
            My Workspace
          </button>
          <button className="text-sm font-medium text-gray-500 hover:text-blue-600 hover:border-blue-600 pb-1 border-b-2 border-transparent">
            My Assigned Workspace
          </button>
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
