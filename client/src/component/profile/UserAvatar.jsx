import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdPerson, MdLogout } from "react-icons/md";
import { toast } from "sonner";
import { getInitials, getAvatarColor } from "../../utils/avatarUtils";

const UserMenu = ({ user }) => {
  const [userData, setUserData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Get user data on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserData(parsedUser);
        console.log('User data:', parsedUser);
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      toast.error("Error loading user data");
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    try {
      // Clear user data and token from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error('Logout error:', error);
      toast.error("Error during logout");
    }
  };

  const menuItems = [
    {
      icon: (
        <MdPerson className="w-5 h-5 text-gray-400 group-hover:text-blue-900" />
      ),
      label: "My Profile",
      onClick: () => {
        try {
          navigate("/profile");
        } catch (error) {
          console.error('Navigation error:', error);
        }
      },
    },
    {
      icon: (
        <MdLogout className="w-5 h-5 text-gray-400 group-hover:text-blue-900" />
      ),
      label: "Log Out",
      onClick: handleLogout,
    },
  ];

  // Return loading state if userData is not ready
  if (!userData) {
    return (
      <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse"></div>
    );
  }

  // Use the user prop if available, otherwise fall back to localStorage data
  const currentUser = user || userData;

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar button */}
      <div
        className={`w-8 h-8 rounded-full text-white flex items-center justify-center text-sm font-medium cursor-pointer ${getAvatarColor(
          currentUser.userId || currentUser.id
        )}`}
        onClick={toggleMenu}
      >
        {currentUser.photoPath ? (
          <img
            src={currentUser.photoPath}
            alt={currentUser.name || currentUser.username || 'User'}
            className="w-full h-full object-cover rounded-full"
            onError={(e) => {
              // If image fails to load, hide it and show initials
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <span className="text-white font-medium text-sm">
            {getInitials(currentUser.name || currentUser.username || currentUser.email || 'User')}
          </span>
        )}
      </div>

      {/* Popup Menu */}
      {isOpen && (
        <div className="absolute right-0 !mt-2 w-64 bg-white rounded-lg shadow-lg !py-2 z-50 border border-gray-200">
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              <div
                className="!px-4 !py-3 flex items-center gap-3 hover:bg-gray-50 cursor-pointer group"
                onClick={() => {
                  try {
                    item.onClick && item.onClick();
                    setIsOpen(false);
                  } catch (error) {
                    console.error('Menu item click error:', error);
                  }
                }}
              >
                {item.icon}
                <span className="text-base text-gray-500 group-hover:text-blue-900 font-medium">
                  {item.label}
                </span>
              </div>
              {index < menuItems.length - 1 && (
                <div className="!mx-4 border-b border-gray-200"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserMenu;