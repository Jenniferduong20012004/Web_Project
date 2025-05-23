import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdPerson, MdHelpCenter, MdLogout } from "react-icons/md";
import { toast } from "sonner";

const UserMenu = (user) => {
  const avatarColors = [
            "bg-blue-700",
            "bg-orange-500",
            "bg-purple-600",
            "bg-green-600",
            "bg-red-600",
];

const getAvatarColor = (index) => {
  return avatarColors[index %
    avatarColors.length];
};
  let userData = JSON.parse(localStorage.getItem("user"));
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

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
    // Clear user data and token from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    toast.success("Logged out successfully");

    navigate("/login");
  };

  const menuItems = [
    {
      icon: (
        <MdPerson className="w-5 h-5 text-gray-400 group-hover:text-blue-900" />
      ),
      label: "My Profile",
      onClick: () => navigate("/profile"),
    },
    {
      icon: (
        <MdLogout className="w-5 h-5 text-gray-400 group-hover:text-blue-900" />
      ),
      label: "Log Out",
      onClick: handleLogout,
    },
  ];

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar button */}
      <div className={`w-8 h-8 rounded-full text-white flex items-center justify-center text-sm font-medium cursor-pointer ${getAvatarColor(userData.userId)}`}
  onClick={toggleMenu}
       
      >
        {userData.photoPath ? (
                      <img
                        src={userData.photoPath}
                        alt={userData.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      userData.initials
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
                  item.onClick && item.onClick();
                  setIsOpen(false);
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
