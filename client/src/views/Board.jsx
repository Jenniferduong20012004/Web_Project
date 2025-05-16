import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import Task from "../component/board/Task";
import TaskForm from "../component/board/TaskForm";

const Board = () => {
  // const { workspaceId } = useParams();
  // const [workspaceName, setWorkspaceName] = useState("");
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [tasks, setTasks] = useState([]);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [workspaceRole, setWorkspaceRole] = useState(null);

  const { workspacedId } = useParams();

  // Function to check workspace role
  const checkWorkspaceRole = async (workspaceId) => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (!userData) {
        return;
      }

      const response = await fetch("http://localhost:5000/checkWorkspaceRole", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userData.userId,
          workspaceId: workspaceId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setWorkspaceRole(data.isManager ? "myWorkspace" : "assignedWorkspace");
      }
    } catch (error) {
      console.error("Error checking workspace role:", error);
    }
  };

  // handle moving a task to trash
  const handleTrashTask = async (taskId) => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (!userData) {
        toast.error("User not logged in", { position: "top-right" });
        return;
      }

      const response = await fetch("http://localhost:5000/trashTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskId: taskId,
          workspaceId: workspacedId,
          userId: userData.userId,
        }),
      });

      const data = await response.json();
      if (data.success) {
        // Remove task from the current view
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        toast.success("Task moved to trash", { position: "top-right" });
      } else {
        toast.error(data.message || "Failed to move task to trash", {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("Error: " + (error.message || "Unknown error"), {
        position: "top-right",
      });
    }
  };

  const fetchBoard = async (workspaceId) => {
    localStorage.setItem("lastMainTab", "Board");
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/getBoard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workspace: workspacedId,
        }),
      });

      const data = await response.json();
      if (data.success) {
        const tasks = data.task.tasks.map((taski) => ({
          ...taski,
          id: taski.id,
          status: taski.status,
          title: taski.title,
          description: taski.description,
          priority: taski.priority,
          backgroundGradient: "bg-gradient-to-br from-pink-300 to-blue-400",
          assignedTo: taski.assignedTo,
          dueDate: taski.dueDate,
        }));

        const members = data.task.user.map((useri) => ({
          ...useri,
          id: useri.id,
          name: useri.name,
          email: useri.email,
          photoPath: useri.photoPath || null,
          bgColor: useri.bgColor,
        }));

        setMembers([...members]);
        setTasks([...tasks]);
      } else {
        toast.error(data.message || "Get into workspace fail", {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("Error: " + (error.message || "Unknown error"), {
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBoard(workspacedId);
    checkWorkspaceRole(workspacedId);
  }, [workspacedId]);

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
      <ToastContainer
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        draggable={false}
      />
      <div className="fixed top-0 right-0 left-0 z-20">
        {/* Pass the active tab to Navbar based on workspace role */}
        <Navbar activeTab={workspaceRole} />
      </div>

      <div className="fixed left-0 top-16 h-screen z-10">
        <Sidebar workspaceId={workspacedId} />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 !mt-8">
            {getFilteredTasks().map((task) => (
              <Task
                key={task.id}
                task={task}
                workspaceId={workspacedId}
                onTrashTask={handleTrashTask} // Pass the trash function to Task component
              />
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
        workspaceId={workspacedId}
      />
    </div>
  );
};

export default Board;
