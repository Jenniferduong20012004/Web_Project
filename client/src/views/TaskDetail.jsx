import { useState, useEffect, useCallback } from "react";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import PageLayout from "../component/board/task-detail/PageLayout";
import TaskHeader from "../component/board/task-detail/TaskHeader";
import TaskDescription from "../component/board/task-detail/TaskDescription";
import SubtaskList from "../component/board/task-detail/SubtaskList";
import AssigneesDropdown from "../component/board/task-detail/AssigneesDropdown";
import AssetsList from "../component/board/task-detail/AssetsList";
import { BackButton } from "../component/board/task-detail/Buttons";

import { fetchManagerAndCheckRole } from "../utils/workspaceUtils";

function TaskDetail() {
  const { workspaceId, taskId } = useParams();
  console.log("🔍 URL Params:", { workspaceId, taskId });
  
  const [task, setTask] = useState(null);
  const [originalTask, setOriginalTask] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState({
    title: false,
    description: false,
    status: false,
    priority: false,
  });

  // Workspace role tracking
  const [workspaceRole, setWorkspaceRole] = useState(null);
  const [isManager, setIsManager] = useState(false);

  // Function to check workspace role using the new utility
  const checkWorkspaceRole = async (workspaceId) => {
    console.log("🔑 Checking workspace role for:", workspaceId);
    try {
      const result = await fetchManagerAndCheckRole(workspaceId);
      console.log("🔑 Workspace role result:", result);

      if (result.success) {
        setIsManager(result.isManager);
        setWorkspaceRole(
          result.isManager ? "myWorkspace" : "assignedWorkspace"
        );
        console.log("✅ Workspace role set:", {
          isManager: result.isManager,
          workspaceRole: result.isManager ? "myWorkspace" : "assignedWorkspace"
        });
      } else {
        console.log("❌ Failed to fetch workspace manager:", result.error);
        // Set default values on error
        setIsManager(false);
        setWorkspaceRole("assignedWorkspace");
      }
    } catch (error) {
      console.error("💥 Error checking workspace role:", error);
      // Set default values on error
      setIsManager(false);
      setWorkspaceRole("assignedWorkspace");
    }
  };

  const fetchTaskDetail = async () => {
    console.log("📋 Fetching task detail for:", { taskId, workspaceId });
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/getTaskDetail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskId: taskId,
          workspaceId: workspaceId,
        }),
      });
      
      console.log("📋 API Response status:", response.status);
      const data = await response.json();
      console.log("📋 API Response data:", data);
      
      if (data.success) {
        const task = {
          id: data.task.id,
          title: data.task.title,
          description: data.task.description,
          status: data.task.status,
          priority: data.task.priority,
          dueDate: data.task.dueDate,
          assignedTo: data.task.assignedTo,
          assets: data.task.assets,
          availableMembers: data.task.availableMembers,
          subtasks: data.task.subtasks,
        };
        console.log("✅ Task data processed:", task);
        setTask(task);
        setOriginalTask(JSON.parse(JSON.stringify(task)));
      } else {
        console.error("❌ API returned error:", data.message);
        toast.error(data.message || "Failed to fetch user", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("💥 Fetch task detail error:", error);
      toast.error("Error: " + (error.message || "Unknown error"), {
        position: "top-right",
      });
    } finally {
      setLoading(false);
      console.log("📋 Loading set to false");
    }
  };

  // Fetch task data
  useEffect(() => {
    console.log("🚀 useEffect: Fetching task detail");
    fetchTaskDetail();
  }, [taskId, workspaceId]);

  // Check workspace role - chỉ chạy 1 lần khi workspaceId thay đổi
  useEffect(() => {
    console.log("🚀 useEffect: Checking workspace role");
    if (workspaceId) {
      checkWorkspaceRole(workspaceId);
    }
  }, [workspaceId]);

  // Detect changes
  useEffect(() => {
    if (task && originalTask) {
      const hasChangesValue = JSON.stringify(task) !== JSON.stringify(originalTask);
      console.log("🔄 Changes detected:", hasChangesValue);
      setHasChanges(hasChangesValue);
    }
  }, [task, originalTask]);

  // Log current state
  useEffect(() => {
    console.log("📊 Current state:", {
      task: task ? "loaded" : "null",
      loading,
      workspaceRole,
      isManager,
      hasChanges
    });
  }, [task, loading, workspaceRole, isManager, hasChanges]);

  // Toggle edit mode for a field
  const toggleEditMode = useCallback((field) => {
    console.log("✏️ Toggling edit mode for:", field);
    setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
  }, []);

  // Save field value
  const handleSaveField = useCallback((field, value) => {
    console.log("💾 Saving field:", { field, value });
    setTask((prev) => ({ ...prev, [field]: value }));
    setEditMode((prev) => ({ ...prev, [field]: false }));
  }, []);

  // Update handlers
  const handleSubtasksChange = useCallback((updatedSubtasks) => {
    console.log("📝 Subtasks changed:", updatedSubtasks);
    setTask((prev) => ({ ...prev, subtasks: updatedSubtasks }));
  }, []);

  const handleAssigneesChange = useCallback((newAssignees) => {
    console.log("👥 Assignees changed:", newAssignees);
    setTask((prev) => ({ ...prev, assignedTo: newAssignees }));
  }, []);

  const handleUpdateTask = useCallback(async () => {
    console.log("🔄 Updating task...");
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (!userData) {
        console.error("❌ No user data found");
        return;
      }

      const response = await fetch("http://localhost:5000/updateTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newTask: task,
          originalTask: originalTask,
        }),
      });

      const data = await response.json();
      console.log("🔄 Update response:", data);

      if (data.success) {
        setOriginalTask(JSON.parse(JSON.stringify(task)));
        setHasChanges(false);
        alert("Task updated successfully!");
        console.log("✅ Task updated successfully");
      }
    } catch (error) {
      console.error("💥 Error update task:", error);
    }
  }, [task, originalTask]);

  console.log("🎨 About to render. Task:", task ? "exists" : "null", "Loading:", loading);

  if (!task) {
    console.log("⏳ Rendering loading state");
    return <PageLayout isLoading={true} />;
  }

  console.log("🎨 Rendering main UI");
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Fixed Navbar with workspace role */}
      <div className="fixed top-0 right-0 left-0 z-20">
        <Navbar activeTab={workspaceRole} />
      </div>

      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-16 h-screen z-10">
        <Sidebar workspaceId={workspaceId} />
      </div>

      {/* PageLayout to account for fixed navbar and sidebar */}
      <div className="flex-1 flex flex-col !mt-16 bg-gray-50">
        <div className="flex-1 !p-8 md:p-6 overflow-auto !ml-50">
          <div className="!mb-6">
            <BackButton workspaceId={workspaceId} />
          </div>

          <div className="bg-white rounded-lg shadow !p-8 !mb-6">
            {/* Task Header - FIXED: Added isManager prop */}
            <TaskHeader
              task={task}
              editMode={editMode}
              toggleEditMode={toggleEditMode}
              handleSaveField={handleSaveField}
              isManager={isManager}
            />

            {/* Task Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 !mt-8">
              {/* Left column - Task Description and Subtasks */}
              <div className="col-span-2">
                <TaskDescription
                  description={task.description}
                  editMode={editMode.description}
                  toggleEditMode={() => toggleEditMode("description")}
                  handleSaveField={(value) =>
                    handleSaveField("description", value)
                  }
                />

                {/* Subtasks */}
                <div className="!mt-8">
                  <h3 className="font-medium text-gray-900 !mb-3">Subtasks:</h3>
                  <SubtaskList
                    subtasks={task.subtasks}
                    onSubtasksChange={handleSubtasksChange}
                  />
                </div>
              </div>

              {/* Right column - Assignees and Assets */}
              <div className="col-span-1 max-w-[260px]">
                {/* Assignees section */}
                <div className="!mb-8">
                  <h3 className="font-medium text-gray-900 !mb-3">
                    Assigned members:
                  </h3>
                  <AssigneesDropdown
                    assignees={task.assignedTo}
                    availableMembers={task.availableMembers}
                    onAssigneesChange={handleAssigneesChange}
                  />
                </div>

                {/* Assets section */}
                <div className="!mb-6">
                  <h3 className="font-medium text-gray-900 !mb-3">Assets</h3>
                  <AssetsList assets={task.assets} />
                </div>
              </div>
            </div>

            {/* Update button */}
            <div className="!mt-10 flex justify-end">
              <button
                className={`!px-6 !py-2 !mr-8 rounded-md text-white font-medium 
                  ${
                    hasChanges
                      ? "bg-blue-400 hover:bg-blue-900 cursor-pointer"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                disabled={!hasChanges}
                onClick={handleUpdateTask}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetail;