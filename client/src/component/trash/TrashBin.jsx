import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUndoAlt, FaTrashAlt } from "react-icons/fa";

const TrashBin = ({ trashTask }) => {
  const { workspacedId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTasks(trashTask);
  }, [trashTask]);

  const mapStage = (state) => {
    switch (state) {
      case 0:
        return "TODOS";
      case 1:
        return "IN-PROGRESS";
      case 2:
        return "COMPLETED";
      default:
        return "TODOS";
    }
  };

  const mapPriority = (priority) => {
    switch (priority) {
      case 3:
        return "Low";
      case 2:
        return "Medium";
      case 1:
        return "High";
      default:
        return "Medium";
    }
  };

  const fetchTasks = async (trashTask) => {
    const transformedTasks = trashTask.map((row) => ({
      id: row.id,
      title: row.taskname,
      stage: mapStage(row.StateCompletion),
      priority: mapPriority(row.priority),
    }));
    setTasks(transformedTasks);
  };

  const [showConfirm, setShowConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [deleteAllConfirm, setDeleteAllConfirm] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [restoredTask, setRestoredTask] = useState(null);
  const [restoreAllConfirm, setRestoreAllConfirm] = useState(false);

  // API IMPLEMENTATION
  // Function to restore a task from trash
  const restoreTask = async (taskId) => {
    try {
      setIsLoading(true);
      
      const userData = JSON.parse(localStorage.getItem("user"));
      if (!userData) {
        toast.error("User not logged in", { position: "top-right" });
        return;
      }

      const response = await fetch("http://localhost:5000/restoreTrashTask", {
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
        // Update the UI
        setTasks(tasks.filter((task) => task.id !== taskId));
        toast.success("Task restored successfully", { position: "top-right" });
      } else {
        toast.error(data.message || "Failed to restore task", {
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

  // permanently delete a task
  const permanentlyDeleteTask = async (taskId) => {
    try {
      setIsLoading(true);
      
      const userData = JSON.parse(localStorage.getItem("user"));
      if (!userData) {
        toast.error("User not logged in", { position: "top-right" });
        return;
      }

      const response = await fetch(
        "http://localhost:5000/permanentlyDeleteTask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            taskId: taskId,
            workspaceId: workspacedId,
            userId: userData.userId,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        // update UI
        setTasks(tasks.filter((task) => task.id !== taskId));
        toast.success("Task permanently deleted", { position: "top-right" });
      } else {
        toast.error(data.message || "Failed to delete task", {
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

  // restore all tasks
  const restoreAllTasks = async () => {
    try {
      setIsLoading(true);
      const userData = JSON.parse(localStorage.getItem("user"));
      if (!userData) {
        toast.error("User not logged in", { position: "top-right" });
        return;
      }

      // create an array of promises to restore each task
      const restorePromises = tasks.map((task) =>
        fetch("http://localhost:5000/restoreTrashTask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            taskId: task.id,
            workspaceId: workspacedId,
            userId: userData.userId,
          }),
        }).then((res) => res.json())
      );

      // execute all promises
      const results = await Promise.all(restorePromises);

      // Check if all operations were successful
      const allSuccessful = results.every((data) => data.success);

      if (allSuccessful) {
        setTasks([]);
        toast.success("All tasks restored successfully", {
          position: "top-right",
        });
      } else {
        toast.warning("Some tasks could not be restored", {
          position: "top-right",
        });
        window.location.reload();
      }
    } catch (error) {
      toast.error("Error: " + (error.message || "Unknown error"), {
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // permanently delete all tasks
  const deleteAllTasks = async () => {
    try {
      setIsLoading(true);
      const userData = JSON.parse(localStorage.getItem("user"));
      if (!userData) {
        toast.error("User not logged in", { position: "top-right" });
        return;
      }

      // Create an array of promises to delete each task
      const deletePromises = tasks.map((task) =>
        fetch("http://localhost:5000/permanentlyDeleteTask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            taskId: task.id,
            workspaceId: workspacedId,
            userId: userData.userId,
          }),
        }).then((res) => res.json())
      );

      // Execute all promises
      const results = await Promise.all(deletePromises);

      const allSuccessful = results.every((data) => data.success);

      if (allSuccessful) {
        setTasks([]);
        toast.success("All tasks permanently deleted", {
          position: "top-right",
        });
      } else {
        toast.warning("Some tasks could not be deleted", {
          position: "top-right",
        });
        window.location.reload();
      }
    } catch (error) {
      toast.error("Error: " + (error.message || "Unknown error"), {
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const confirmRestoreTask = (id) => {
    const task = tasks.find((t) => t.id === id);
    setRestoredTask(task);
    setShowRestoreModal(true);
  };

  const handleRestoreConfirmed = () => {
    // Call the API to restore the task
    restoreTask(restoredTask.id);
    setShowRestoreModal(false);
    setRestoredTask(null);
  };

  const handleCancelRestore = () => {
    setShowRestoreModal(false);
    setRestoredTask(null);
  };

  const confirmRestoreAll = () => {
    if (tasks.length === 0) return;
    setRestoreAllConfirm(true);
  };

  const handleRestoreAllConfirmed = () => {
    // Call the API to restore all tasks
    restoreAllTasks();
    setRestoreAllConfirm(false);
  };

  const handleCancelRestoreAll = () => {
    setRestoreAllConfirm(false);
  };

  const confirmDeleteTask = (id) => {
    setTaskToDelete(id);
    setShowConfirm(true);
  };

  const handleDeleteConfirmed = () => {
    permanentlyDeleteTask(taskToDelete);
    setShowConfirm(false);
    setTaskToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setTaskToDelete(null);
  };

  const confirmDeleteAll = () => {
    if (tasks.length === 0) return;
    setDeleteAllConfirm(true);
  };

  const handleDeleteAllConfirmed = () => {
    // Call the API to permanently delete all tasks - FIX HERE
    deleteAllTasks();
    setDeleteAllConfirm(false);
  };

  const handleCancelDeleteAll = () => {
    setDeleteAllConfirm(false);
  };

  const stageColors = {
    TODOS: "text-blue-500",
    "IN-PROGRESS": "text-yellow-500",
    COMPLETED: "text-green-500",
  };

  const ConfirmationModal = ({ onConfirm, onCancel, message }) => (
    <div className="absolute top-0 left-0 w-full h-full backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg !p-8 w-[400px] text-center scale-95 animate-scale-in">
        <div className="flex justify-center items-center !mb-4">
          <svg
            className="!w-16 !h-16 text-yellow-400 animate-bounce"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path fill="#FACC15" d="M12 2L1 21h22L12 2z" />
            <path
              d="M12 8v4"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="12" cy="16" r="1.25" fill="#000" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-red-600 !mb-2">DELETE</h2>
        <p className="text-gray-700 !mb-1">{message}</p>
        <p className="text-gray-400 text-sm !mb-6">
          This action cannot be undone.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="!px-4 !py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="!px-4 !py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Yes, delete"}
          </button>
        </div>
      </div>
    </div>
  );

  const RestoreModal = ({ onConfirm, onCancel, task }) => (
    <div className="absolute top-0 left-0 w-full h-full backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg !p-8 w-[400px] text-center scale-95 animate-scale-in">
        <div className="flex justify-center items-center !mb-4">
          <svg
            className="!w-16 !h-16 text-green-400 animate-bounce"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path fill="#86efac" d="M12 2L1 21h22L12 2z" />
            <path
              d="M12 8v4"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="12" cy="16" r="1.25" fill="#000" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-green-600 !mb-2">RESTORE</h2>
        <p className="text-gray-700 !mb-1">
          Do you want to restore {task?.title || "all tasks"}?
        </p>
        <p className="text-gray-400 text-sm !mb-6">
          This action will move the task(s) back.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="!px-4 !py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="!px-4 !py-2 bg-green-600 text-white rounded hover:bg-green-700"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Yes, restore"}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen relative">
      <div className="flex justify-between items-center !mb-6">
        <h1 className="text-xl font-bold text-[#455294]">Trash Bin</h1>
        <div className="flex gap-8">
          <button
            onClick={confirmRestoreAll}
            className={`hover:underline ${
              tasks.length === 0 || isLoading
                ? "text-gray-300 cursor-not-allowed"
                : "text-green-600"
            }`}
            disabled={tasks.length === 0 || isLoading}
          >
            Restore all
          </button>
          <button
            onClick={confirmDeleteAll}
            className={`hover:underline ${
              tasks.length === 0 || isLoading
                ? "text-gray-300 cursor-not-allowed"
                : "text-red-600"
            }`}
            disabled={tasks.length === 0 || isLoading}
          >
            Delete all
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm">
              <th className="!py-4 !px-8 text-left font-semibold">
                Task title
              </th>
              <th className="!py-4 !px-8 text-left font-semibold">Stage</th>
              <th className="!py-4 !px-8 text-left font-semibold">Priority</th>
              <th className="!py-4 !px-8 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="!py-4 !px-8 text-gray-800">{task.title}</td>
                <td
                  className={`!py-4 !px-8 ${
                    stageColors[task.stage]
                  } font-small`}
                >
                  {task.stage}
                </td>
                <td className="!py-4 !px-8 text-gray-700">{task.priority}</td>
                <td className="!py-4 !px-8 flex justify-center gap-8">
                  <button
                    onClick={() => confirmRestoreTask(task.id)}
                    className="text-green-600 hover:scale-110 transition"
                    disabled={isLoading}
                  >
                    <FaUndoAlt />
                  </button>
                  <button
                    onClick={() => confirmDeleteTask(task.id)}
                    className="text-red-600 hover:scale-110 transition"
                    disabled={isLoading}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
            {tasks.length === 0 && (
              <tr>
                <td colSpan="4" className="!py-16 text-center text-gray-400">
                  Trash is empty.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showConfirm && (
        <ConfirmationModal
          onConfirm={handleDeleteConfirmed}
          onCancel={handleCancelDelete}
          message="Are you sure you want to permanently delete this task?"
        />
      )}

      {deleteAllConfirm && (
        <ConfirmationModal
          onConfirm={handleDeleteAllConfirmed}
          onCancel={handleCancelDeleteAll}
          message="Are you sure you want to permanently delete all tasks?"
        />
      )}

      {showRestoreModal && (
        <RestoreModal
          onConfirm={handleRestoreConfirmed}
          onCancel={handleCancelRestore}
          task={restoredTask}
        />
      )}

      {restoreAllConfirm && (
        <RestoreModal
          onConfirm={handleRestoreAllConfirmed}
          onCancel={handleCancelRestoreAll}
          task={null}
        />
      )}
    </div>
  );
};

export default TrashBin;