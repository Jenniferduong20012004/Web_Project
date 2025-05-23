import { useState, useEffect, useCallback } from "react";
import Sidebar from "../component/Sidebar";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import PageLayout from "../component/board/task-detail/PageLayout";
import TaskHeader from "../component/board/task-detail/TaskHeader";
import TaskDescription from "../component/board/task-detail/TaskDescription";
import SubtaskList from "../component/board/task-detail/SubtaskList";
import AssigneesDropdown from "../component/board/task-detail/AssigneesDropdown";
import AssetsList from "../component/board/task-detail/AssetsList";
import mockTaskDetailData from "../mock-data/mockTaskDetailData";
import { BackButton } from "../component/board/task-detail/Buttons";

function TaskDetail() {
  const {workspaceId, taskId } = useParams();
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
  
  const fetchTaskDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/getTaskDetail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskId: taskId ,
          workspaceId: workspaceId,
        }),
      });
      const data = await response.json();
      if (data.success) {
        const task = {
          id: data.task.id,
          title: data.task.title,
          description: data.task.description,
          status: data.task.status,
          priority: data.task.priority,
          dueDate : data.task.dueDate,
          assignedTo: data.task.assignedTo,
          assets: data.task.assets,
          availableMembers: data.task.availableMembers,
          subtasks: data.task.subtasks,
        };
        setTask(task);
        setOriginalTask(JSON.parse(JSON.stringify(task)));
        // alert (task.id);
      } else {
        toast.error(data.message || "Failed to fetch user", {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("Error: " + (error.message || "Unknown error"), {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };
  // Fetch task data
  useEffect(() => {
    fetchTaskDetail();
    // const taskData = mockTaskDetailData.getTaskDetail(parseInt(taskId));
    // setTask(taskData);
    // setOriginalTask(JSON.parse(JSON.stringify(taskData)));
  }, [taskId]);

  // Detect changes
  useEffect(() => {
    if (task && originalTask) {
      setHasChanges(JSON.stringify(task) !== JSON.stringify(originalTask));
    }
  }, [task, originalTask]);

  // Toggle edit mode for a field
  const toggleEditMode = useCallback((field) => {
    setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
  }, []);

  // Save field value
  const handleSaveField = useCallback((field, value) => {
    setTask((prev) => ({ ...prev, [field]: value }));
    setEditMode((prev) => ({ ...prev, [field]: false }));
  }, []);

  // Update handlers
  const handleSubtasksChange = useCallback((updatedSubtasks) => {
    setTask((prev) => ({ ...prev, subtasks: updatedSubtasks }));
  }, []);

  const handleAssigneesChange = useCallback((newAssignees) => {
    setTask((prev) => ({ ...prev, assignedTo: newAssignees }));
  }, []);

  const handleUpdateTask = useCallback(async () => {
            try {
            const userData = JSON.parse(localStorage.getItem("user"));
            if (!userData) {
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
            
            if (data.success) {
                console.log("Updating task with new data:", task);
    setOriginalTask(JSON.parse(JSON.stringify(task)));
    setHasChanges(false);
    alert("Task updated successfully!");
            }
        } catch (error) {
            console.error("Error update task:", error);
        }
  }, [task, originalTask]);

  if (!task) {
    return <PageLayout isLoading={true} />;
  }

  return (
    <PageLayout>
      <div className="!mb-6">
        <BackButton workspaceId={workspaceId} />
      </div>

      <div className="bg-white rounded-lg shadow !p-8 !mb-6">
        {/* Task Header */}
        <TaskHeader
          task={task}
          editMode={editMode}
          toggleEditMode={toggleEditMode}
          handleSaveField={handleSaveField}
        />
            <div className="fixed left-0 top-16 h-screen z-10">
                <Sidebar workspaceId={workspaceId} />
            </div>

        {/* Task Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 !mt-8">
          {/* Left column - Task Description and Subtasks */}
          <div className="col-span-2">
            <TaskDescription
              description={task.description}
              editMode={editMode.description}
              toggleEditMode={() => toggleEditMode("description")}
              handleSaveField={(value) => handleSaveField("description", value)}
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
    </PageLayout>
  );
}

export default TaskDetail;
