import { useState } from "react";
import { FaUndoAlt, FaTrashAlt } from "react-icons/fa";

const TrashPage = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Review database schema",
      stage: "TODOS",
      priority: "High",
    },
    { id: 2, title: "Alex Pfeiffer", stage: "IN-PROGRESS", priority: "Low" },
    { id: 3, title: "Mike Dean", stage: "COMPLETED", priority: "Medium" },
    { id: 4, title: "Mateus Cunha", stage: "IN-PROGRESS", priority: "Medium" },
    { id: 5, title: "Nzola Uemo", stage: "TODOS", priority: "Low" },
    { id: 6, title: "Antony Mack", stage: "TODOS", priority: "Medium" },
    { id: 7, title: "André da Silva", stage: "IN-PROGRESS", priority: "High" },
  ]);

  const restoreTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const restoreAll = () => {
    setTasks([]);
  };

  const deleteAll = () => {
    setTasks([]);
  };

  const stageColors = {
    TODOS: "text-blue-500",
    "IN-PROGRESS": "text-yellow-500",
    COMPLETED: "text-green-500",
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center !mb-6">
        <h1 className="text-xl font-bold text-gray-700">Trash bin</h1>
        <div className="flex gap-8">
          <button
            onClick={restoreAll}
            className="text-green-600 hover:underline"
          >
            Restore all
          </button>
          <button onClick={deleteAll} className="text-red-600 hover:underline">
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
                    onClick={() => restoreTask(task.id)}
                    className="text-green-600 hover:scale-110 transition"
                  >
                    <FaUndoAlt />
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-600 hover:scale-110 transition"
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
    </div>
  );
};

export default TrashPage;
