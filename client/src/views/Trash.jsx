import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import TrashBin from "../component/trash/TrashBin";

const Trash = () => {
  const { workspacedId } = useParams();
  const [trashTask, setTrashTask] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [workspaceRole, setWorkspaceRole] = useState(null);
  const [isManager, setIsManager] = useState(false);

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
        const isUserManager = data.isManager;
        setIsManager(isUserManager);
        setWorkspaceRole(isUserManager ? "myWorkspace" : "assignedWorkspace");
      }
    } catch (error) {
      console.error("Error checking workspace role:", error);
    }
  };

  const fetchTrashtask = async (workspacedId) => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/getTrashTask", {
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
        // console.log("Raw trash task data:", data.trashTask);

        const trashTask = data.trashTask.map((row) => {
          const taskId = row.TaskId;

          //   console.log(`Task ID for ${row.taskname}: ${taskId}`);

          return {
            id: taskId,
            taskname: row.taskname,
            priority: row.priority,
            StateCompletion: row.StateCompletion,
          };
        });

        // console.log("Transformed trash tasks:", trashTask);

        setTrashTask([...trashTask]);
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
    fetchTrashtask(workspacedId);
    checkWorkspaceRole(workspacedId);
  }, [workspacedId]);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="fixed top-0 right-0 left-0 z-20">
        <Navbar activeTab={workspaceRole} />
      </div>

      <div className="fixed left-0 top-16 h-screen z-10">
        <Sidebar workspaceId={workspacedId} />
      </div>

      <div className="flex-1 flex flex-col !mt-16 bg-gray-50">
        <div className="flex-1 !p-8 md:p-6 overflow-auto !ml-50">
          {/* TRASH BIN */}
          <TrashBin 
            trashTask={trashTask} 
            workspaceId={workspacedId} 
            isManager={isManager} 
          />
        </div>
      </div>
    </div>
  );
};

export default Trash;