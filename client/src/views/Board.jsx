import { useState, useEffect } from "react";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import Task from "../component/board/Task";
import TaskForm from "../component/board/TaskForm";
import mockWorkspaceData from "../mock-data/mockTaskData";

function Board() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [tasks, setTasks] = useState([]);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "Victor Hall",
      email: "victor@example.com",
      bgColor: "bg-blue-700",
    },
    {
      id: 2,
      name: "Alex Gold",
      email: "alex@example.com",
      bgColor: "bg-orange-500",
    },
    {
      id: 3,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      bgColor: "bg-green-600",
    },
    {
      id: 4,
      name: "Mike Thompson",
      email: "mike@example.com",
      bgColor: "bg-purple-600",
    },
  ]);

  useEffect(() => {
    setTasks(mockWorkspaceData);

    // In a real app, you would fetch members and tasks from an API
    // fetchMembers();
    // fetchTasks();
  }, []);

  const filters = [
    { id: "ALL", label: "ALL" },
    { id: "TODO", label: "TODO" },
    { id: "IN-PROGRESS", label: "IN-PROGRESS" },
    { id: "COMPLETED", label: "COMPLETED" },
  ];

  const getFilteredTasks = () => {
    if (activeFilter === "ALL") {
      return tasks;
    }
    return tasks.filter((task) => task.status === activeFilter);
  };

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const openTaskForm = () => {
    setIsTaskFormOpen(true);
  };

  const closeTaskForm = () => {
    setIsTaskFormOpen(false);
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="fixed top-0 right-0 left-0 z-20">
        <Navbar />
      </div>

      <div className="fixed left-0 top-16 h-screen z-10">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col !mt-16 bg-gray-50">
        <div className="flex-1 !p-8 md:p-6 overflow-auto !ml-50">
          {/* BOARD CONTENT */}

          <div className="!mb-6">
            {/* FILTER BAR */}
            <div className="flex items-center justify-between border-b border-gray-300 !pb-1">
              <div className="flex !space-x-6">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    className={`!py-2 !px-1 font-medium text-sm relative flex items-center ${
                      activeFilter === filter.id
                        ? "text-blue-800"
                        : "text-gray-500 hover:text-gray-900 cursor-pointer"
                    }`}
                    onClick={() => setActiveFilter(filter.id)}
                  >
                    <div className="w-5 flex items-center justify-center">
                      {filter.id === "TODO" && (
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      )}
                      {filter.id === "IN-PROGRESS" && (
                        <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                      )}
                      {filter.id === "COMPLETED" && (
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      )}
                    </div>

                    {/* Label text */}
                    <span>{filter.label}</span>
                  </button>
                ))}
              </div>
              <button
                className="bg-blue-400 hover:bg-blue-900 text-white !py-2 !px-4 rounded-md text-sm font-medium cursor-pointer"
                onClick={openTaskForm}
              >
                + Add task
              </button>
            </div>
          </div>

          {/* TASK CONTAINER */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 !mt-10">
            {getFilteredTasks().map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </div>
        </div>
      </div>

      {/* TASK FORM */}
      <TaskForm
        isOpen={isTaskFormOpen}
        onClose={closeTaskForm}
        onSave={handleAddTask}
        members={members}
      />
    </div>
  );
}

export default Board;
