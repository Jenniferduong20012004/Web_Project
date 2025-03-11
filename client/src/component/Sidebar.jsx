import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
} from "react-icons/md";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";

const linkData = [
  {
    label: "Dashboard",
    link: "dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "Tasks",
    link: "tasks",
    icon: <FaTasks />,
  },
  {
    label: "Completed",
    link: "completed/completed",
    icon: <MdTaskAlt />,
  },
  {
    label: "In Progress",
    link: "in-progress/in progress",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "To Do",
    link: "todo/todo",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "Team",
    link: "team",
    icon: <FaUsers />,
  },
  {
    label: "Trash",
    link: "trashed",
    icon: <FaTrashAlt />,
  },
];
const Sidebar = () => {
  return (
    <div className="hidden lg:flex lg:flex-col w-64 border-r border-gray-200 bg-white">
      {/* Menu */}
      <nav className="flex-1 flex flex-col mt-2">
        <ul className="flex flex-col text-sm">
          <li>
            <button className="w-full text-left py-3 px-4 hover:bg-gray-100 font-medium text-gray-700">
              Dashboard
            </button>
          </li>
          <li>
            <button className="w-full text-left py-3 px-4 hover:bg-gray-100 font-medium text-gray-700">
              Board
            </button>
          </li>
          <li>
            <button className="w-full text-left py-3 px-4 hover:bg-gray-100 font-medium text-gray-700">
              Trash
            </button>
          </li>
          <li>
            <button className="w-full text-left py-3 px-4 hover:bg-gray-100 font-medium text-gray-700">
              Members
            </button>
          </li>
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-6 border-t border-gray-200 flex justify-center">
        <button className="w-3/4 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition text-center font-medium">
          Log out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
