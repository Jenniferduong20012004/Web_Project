import { useState } from "react";
import { FaUndoAlt, FaTrashAlt } from "react-icons/fa";

const TrashPage = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Review database schema", stage: "TODOS", priority: "High" },
    { id: 2, title: "Alex Pfeiffer", stage: "IN-PROGRESS", priority: "Low" },
    { id: 3, title: "Mike Dean", stage: "COMPLETED", priority: "Medium" },
    { id: 4, title: "Mateus Cunha", stage: "IN-PROGRESS", priority: "Medium" },
    { id: 5, title: "Nzola Uemo", stage: "TODOS", priority: "Low" },
    { id: 6, title: "Antony Mack", stage: "TODOS", priority: "Medium" },
    { id: 7, title: "André da Silva", stage: "IN-PROGRESS", priority: "High" },
  ]);

  const [showConfirm, setShowConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [deleteAllConfirm, setDeleteAllConfirm] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [restoredTask, setRestoredTask] = useState(null);
  const [restoreAllConfirm, setRestoreAllConfirm] = useState(false);

  const confirmRestoreTask = (id) => {
    const task = tasks.find(t => t.id === id);
    setRestoredTask(task);
    setShowRestoreModal(true);
  };

  const handleRestoreConfirmed = () => {
    setTasks(tasks.filter(task => task.id !== restoredTask.id));
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
    setTasks([]);
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
    setTasks(tasks.filter(task => task.id !== taskToDelete));
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
    setTasks([]);
    setDeleteAllConfirm(false);
  };

  const handleCancelDeleteAll = () => {
    setDeleteAllConfirm(false);
  };

  const stageColors = {
    "TODOS": "text-blue-500",
    "IN-PROGRESS": "text-yellow-500",
    "COMPLETED": "text-green-500",
  };

  const ConfirmationModal = ({ onConfirm, onCancel, message }) => (
    <div className="absolute top-0 left-0 w-full h-full backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg !p-8 w-[400px] text-center scale-95 animate-scale-in">
        <div className="flex justify-center items-center !mb-4">
          <svg className="!w-16 !h-16 text-yellow-400 animate-bounce" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
            <path fill="#FACC15" d="M12 2L1 21h22L12 2z" />
            <path d="M12 8v4" stroke="#000" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="16" r="1.25" fill="#000" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-red-600 !mb-2">DELETE</h2>
        <p className="text-gray-700 !mb-1">{message}</p>
        <p className="text-gray-400 text-sm !mb-6">This action cannot be undone.</p>
        <div className="flex justify-center gap-4">
          <button onClick={onCancel} className="!px-4 !py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Cancel</button>
          <button onClick={onConfirm} className="!px-4 !py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Yes, delete</button>
        </div>
      </div>
    </div>
  );

  const RestoreModal = ({ onConfirm, onCancel, task }) => (
    <div className="absolute top-0 left-0 w-full h-full backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg !p-8 w-[400px] text-center scale-95 animate-scale-in">
        <div className="flex justify-center items-center !mb-4">
          <svg className="!w-16 !h-16 text-green-400 animate-bounce" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
            <path fill="#86efac" d="M12 2L1 21h22L12 2z" />
            <path d="M12 8v4" stroke="#000" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="16" r="1.25" fill="#000" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-green-600 !mb-2">RESTORE</h2>
        <p className="text-gray-700 !mb-1">Do you want to restore {task?.title || 'all tasks'}?</p>
        <p className="text-gray-400 text-sm !mb-6">This action will move the task(s) back.</p>
        <div className="flex justify-center gap-4">
          <button onClick={onCancel} className="!px-4 !py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Cancel</button>
          <button onClick={onConfirm} className="!px-4 !py-2 bg-green-600 text-white rounded hover:bg-green-700">Yes, restore</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="!p-8 bg-gray-50 min-h-screen relative">
      <div className="flex justify-between items-center !mb-8">
        <h1 className="text-2xl font-bold text-gray-700">Trash bin</h1>
        <div className="flex gap-8">
          <button onClick={confirmRestoreAll} className={`hover:underline ${tasks.length === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-green-600'}`}>Restore all</button>
          <button onClick={confirmDeleteAll} className={`hover:underline ${tasks.length === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-red-600'}`}>Delete all</button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm">
              <th className="!py-4 !px-8 text-left font-semibold">Task title</th>
              <th className="!py-4 !px-8 text-left font-semibold">Stage</th>
              <th className="!py-4 !px-8 text-left font-semibold">Priority</th>
              <th className="!py-4 !px-8 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="!py-4 !px-8 text-gray-800">{task.title}</td>
                <td className={`!py-4 !px-8 ${stageColors[task.stage]} font-medium`}>{task.stage}</td>
                <td className="!py-4 !px-8 text-gray-700">{task.priority}</td>
                <td className="!py-4 !px-8 flex justify-center gap-8">
                  <button onClick={() => confirmRestoreTask(task.id)} className="text-green-600 hover:scale-110 transition">
                    <FaUndoAlt />
                  </button>
                  <button onClick={() => confirmDeleteTask(task.id)} className="text-red-600 hover:scale-110 transition">
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

export default TrashPage;