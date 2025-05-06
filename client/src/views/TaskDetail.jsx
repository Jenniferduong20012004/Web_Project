import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import SubtaskList from "../component/board/task-detail/SubtaskList";
import AssetsList from "../component/board/task-detail/AssetsList";
import AssigneesDropdown from "../component/board/task-detail/AssigneesDropdown";
import Calendar from "../component/board/task-detail/Calendar";
import mockTaskDetailData from "../mock-data/mockTaskDetailData";

function TaskDetail() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [editMode, setEditMode] = useState({
    title: false,
    description: false,
    status: false,
    priority: false,
  });

  // Refs for handling click outside of dropdown menus
  const statusDropdownRef = useRef(null);
  const priorityDropdownRef = useRef(null);
  const titleInputRef = useRef(null);
  const descriptionInputRef = useRef(null);

  useEffect(() => {
    // In a real app, you would fetch the task details from an API
    // using the task ID from the URL params
    const taskData = mockTaskDetailData.getTaskDetail(parseInt(taskId)); // Convert taskId to number
    setTask(taskData);
  }, [taskId]);

  useEffect(() => {
    // Add click event listener to handle clicking outside dropdowns
    function handleClickOutside(event) {
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target)
      ) {
        setEditMode((prev) => ({ ...prev, status: false }));
      }
      if (
        priorityDropdownRef.current &&
        !priorityDropdownRef.current.contains(event.target)
      ) {
        setEditMode((prev) => ({ ...prev, priority: false }));
      }
    }

    // Add event listener when dropdown is open
    if (editMode.status || editMode.priority) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Focus input when editing title or description
    if (editMode.title && titleInputRef.current) {
      titleInputRef.current.focus();
    }
    if (editMode.description && descriptionInputRef.current) {
      descriptionInputRef.current.focus();
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editMode]);

  const handleSaveField = (field, value) => {
    setTask((prev) => ({
      ...prev,
      [field]: value,
    }));
    setEditMode((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const handleKeyDown = (e, field, value) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSaveField(field, value);
    }
    if (e.key === "Escape") {
      setEditMode((prev) => ({
        ...prev,
        [field]: false,
      }));
    }
  };

  // Status options
  const statusOptions = [
    { id: "TODO", label: "TODO", color: "bg-blue-500" },
    { id: "IN-PROGRESS", label: "IN-PROGRESS", color: "bg-yellow-500" },
    { id: "COMPLETED", label: "COMPLETED", color: "bg-green-500" },
  ];

  // Priority options
  const priorityOptions = [
    { id: "High", label: "High", class: "bg-red-100 text-red-700" },
    { id: "Medium", label: "Medium", class: "bg-orange-100 text-orange-700" },
    { id: "Low", label: "Low", class: "bg-blue-100 text-blue-700" },
  ];

  const getStatusColor = (status) => {
    const option = statusOptions.find((opt) => opt.id === status);
    return option ? option.color : "bg-gray-500";
  };

  const getPriorityBg = (priority) => {
    const option = priorityOptions.find((opt) => opt.id === priority);
    return option ? option.class : "bg-gray-100 text-gray-700";
  };

  const handleSubtasksChange = (updatedSubtasks) => {
    setTask((prev) => ({
      ...prev,
      subtasks: updatedSubtasks,
    }));
  };

  const handleAssigneesChange = (newAssignees) => {
    setTask((prev) => ({
      ...prev,
      assignedTo: newAssignees,
    }));
  };

  // Handle date change from Calendar component
  const handleDateChange = (dateString) => {
    handleSaveField("dueDate", dateString);
  };

  if (!task) {
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
            <div>Loading task details...</div>
          </div>
        </div>
      </div>
    );
  }

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
          {/* Back button */}
          <div className="!mb-6">
            <button
              className="flex items-center text-blue-900 hover:text-gray-500 font-medium cursor-pointer"
              onClick={() => (window.location.href = "/board")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 !mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back
            </button>
          </div>

          <div className="bg-white rounded-lg shadow !p-8 !mb-6">
            {/* Task Header */}
            <div className="!mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column - Title and due date */}
              <div className="col-span-2">
                {/* Title - Editable on click */}
                {editMode.title ? (
                  <div className="flex items-center gap-2">
                    <input
                      ref={titleInputRef}
                      type="text"
                      value={task.title}
                      onChange={(e) =>
                        setTask({ ...task, title: e.target.value })
                      }
                      onBlur={() => handleSaveField("title", task.title)}
                      onKeyDown={(e) => handleKeyDown(e, "title", task.title)}
                      className="text-2xl font-bold text-gray-900 border-b border-blue-500 focus:border-b-2 focus:outline-none w-full !pb-1"
                      autoFocus
                    />
                    <button
                      onClick={() => handleSaveField("title", task.title)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <h1
                    className="text-2xl font-bold text-gray-900 cursor-pointer hover:bg-gray-50 !py-1 !px-2 rounded-md transition-colors"
                    onClick={() => setEditMode({ ...editMode, title: true })}
                  >
                    {task.title}
                  </h1>
                )}

                {/* Calendar Component */}
                <div className="!mt-2">
                  <Calendar
                    selectedDate={task.dueDate}
                    onDateChange={handleDateChange}
                  />
                </div>
              </div>

              {/* Right Column - Status and Priority */}
              <div className="max-w-[260px]">
                <div className="flex items-center justify-between !mt-2 !mb-2">
                  {/* Status - With dropdown */}
                  <div className="relative" ref={statusDropdownRef}>
                    <div
                      className="flex items-center cursor-pointer hover:bg-gray-50 !p-1 rounded-md"
                      onClick={() =>
                        setEditMode({ ...editMode, status: !editMode.status })
                      }
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${getStatusColor(
                          task.status
                        )} !mr-2`}
                      ></span>
                      <span className="text-sm text-gray-500 uppercase">
                        {task.status.replace("-", " ")}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400 !ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>

                    {editMode.status && (
                      <div className="absolute top-full left-0 !mt-1 bg-white shadow-lg rounded-md border border-gray-200 z-10 w-40">
                        {statusOptions.map((option) => (
                          <div
                            key={option.id}
                            className="flex items-center !px-3 !py-2 hover:bg-gray-50 cursor-pointer"
                            onClick={() => handleSaveField("status", option.id)}
                          >
                            <span
                              className={`h-2 w-2 rounded-full ${option.color} !mr-2`}
                            ></span>
                            <span className="text-sm">{option.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Priority - With dropdown */}
                  <div className="relative" ref={priorityDropdownRef}>
                    <div
                      className={`text-xs !px-2 !py-1 rounded-full cursor-pointer flex items-center ${getPriorityBg(
                        task.priority
                      )}`}
                      onClick={() =>
                        setEditMode({
                          ...editMode,
                          priority: !editMode.priority,
                        })
                      }
                    >
                      {task.priority}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>

                    {editMode.priority && (
                      <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md border border-gray-200 z-10 w-32">
                        {priorityOptions.map((option) => (
                          <div
                            key={option.id}
                            className={`!px-3 !py-2 text-sm hover:bg-gray-50 cursor-pointer ${
                              option.class.includes("text-")
                                ? option.class
                                    .split(" ")
                                    .find((c) => c.startsWith("text-"))
                                : ""
                            }`}
                            onClick={() =>
                              handleSaveField("priority", option.id)
                            }
                          >
                            {option.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Task Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 !mt-10">
              {/* Left Column - Task Description */}
              <div className="col-span-2">
                <h3 className="font-medium text-gray-900 !mb-2">
                  Task description:
                </h3>

                {/* Description - Editable on click */}
                {editMode.description ? (
                  <div className="flex flex-col gap-2">
                    <textarea
                      ref={descriptionInputRef}
                      value={task.description}
                      onChange={(e) =>
                        setTask({ ...task, description: e.target.value })
                      }
                      onBlur={() =>
                        handleSaveField("description", task.description)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.ctrlKey) {
                          handleSaveField("description", task.description);
                        }
                        if (e.key === "Escape") {
                          setEditMode({ ...editMode, description: false });
                        }
                      }}
                      className="w-full border border-gray-300 rounded-md !p-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-24"
                      autoFocus
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={() =>
                          handleSaveField("description", task.description)
                        }
                        className="bg-blue-500 hover:bg-blue-600 text-white !py-1 !px-3 rounded-md text-sm"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <p
                    className="text-gray-600 cursor-pointer hover:bg-gray-50 !p-2 rounded-md"
                    onClick={() =>
                      setEditMode({ ...editMode, description: true })
                    }
                  >
                    {task.description}
                  </p>
                )}

                {/* Subtasks Section */}
                <div className="!mt-8">
                  <h3 className="font-medium text-gray-900 !mb-3">Subtasks:</h3>
                  <SubtaskList
                    subtasks={task.subtasks}
                    onSubtasksChange={handleSubtasksChange}
                  />
                </div>
              </div>

              {/* Right Column - Assigned Members & Assets */}
              <div className="max-w-[260px]">
                {/* Assigned Members */}
                <div className="!mb-6">
                  <h3 className="font-medium text-gray-900 !mb-3">
                    Assigned members:
                  </h3>
                  <AssigneesDropdown
                    assignees={task.assignedTo}
                    availableMembers={task.availableMembers}
                    onAssigneesChange={handleAssigneesChange}
                  />
                </div>

                {/* Assets */}
                <div>
                  <h3 className="font-medium text-gray-900 !mb-3">Assets</h3>
                  <AssetsList assets={task.assets} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetail;
