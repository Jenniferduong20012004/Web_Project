import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Navbar from "../component/Navbar";
import AddWorkspaceForm from "../component/homepage/AddWorkspaceForm";
import WorkspaceCard from "../component/homepage/WorkspaceCard";

const Homepage = () => {
  const [isAddWorkspaceFormOpen, setAddWorkspaceOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("myWorkspace");
  const [userId, setUserId] = useState(null);
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);

  // Create a function to fetch workspaces that we can reuse
  const fetchWorkspaces = async () => {
    try {
      setLoading(true);
      let userData = JSON.parse(localStorage.getItem("user"));
      if (!userData) {
        toast.error("User not found in localStorage", {
          position: "top-right",
        });
        setLoading(false);
        return;
      }

      setUserId(userData.userId);

      // Fetch workspaces from API
      const response = await fetch("http://localhost:5000/getWorkSpace", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userData.userId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Check if we have the updated API structure with separate workspace types
        if (data.managedWorkspaces && data.assignedWorkspaces) {
          // Handle updated API structure with separated workspace types
          const managedWorkspaces = data.managedWorkspaces.map((workspace) => ({
            ...workspace,
            id: workspace.id,
            title: workspace.workspaceName,
            subtitle: `Created on ${new Date(
              workspace.dateCreate
            ).toLocaleDateString()}`,
            backgroundGradient: "bg-gradient-to-br from-pink-300 to-blue-400",
            members: [],
            isOwner: true,
          }));

          const assignedWorkspaces = data.assignedWorkspaces.map(
            (workspace) => ({
              ...workspace,
              id: workspace.id,
              title: workspace.workspaceName,
              subtitle: `Created on ${new Date(
                workspace.dateCreate
              ).toLocaleDateString()}`,
              backgroundGradient:
                "bg-gradient-to-br from-blue-300 to-purple-400",
              members: [],
              isOwner: false,
            })
          );

          setWorkspaces([...managedWorkspaces, ...assignedWorkspaces]);
        } else {
          // Handle original API structure with workspace array
          const transformedWorkspaces = data.workspace.map((workspace) => ({
            ...workspace,
            id: workspace.id,
            title: workspace.workspaceName,
            subtitle: `Created on ${new Date(
              workspace.dateCreate
            ).toLocaleDateString()}`,
            backgroundGradient: "bg-gradient-to-br from-pink-300 to-blue-400",
            members: [],
            // For original API structure, we don't know which are owned
            // Assuming all are owned for backward compatibility
            isOwner: true,
          }));

          setWorkspaces(transformedWorkspaces);
        }
      } else {
        toast.error(data.message || "Failed to fetch workspaces", {
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

  // Call fetchWorkspaces when component mounts
  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const handleAddWorkspace = () => {
    setAddWorkspaceOpen(true);
  };

  const handleCloseAddWorkspace = () => {
    setAddWorkspaceOpen(false);
  };

  const handleAddNewWorkspace = async (newWorkspace) => {
    try {
      // Here you would normally make an API call to add the workspace to the database
      // For example:
      // const response = await fetch("http://localhost:5000/addWorkSpace", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     userId: userId,
      //     workspaceName: newWorkspace.name,
      //     description: newWorkspace.description
      //   }),
      // });
      // const data = await response.json();
      // if (data.success) {
      //   toast.success("Workspace added successfully!", {
      //     position: "top-right",
      //   });
      // } else {
      //   toast.error(data.message || "Failed to add workspace", {
      //     position: "top-right",
      //   });
      // }

      // For now, we'll just add it locally as before
      const workspaceWithId = {
        ...newWorkspace,
        id: `workspace-${Date.now()}`,
        backgroundGradient: "bg-gradient-to-br from-pink-300 to-blue-400",
        title: newWorkspace.name,
        subtitle: newWorkspace.description,
        members: [],
        isOwner: true,
      };

      setWorkspaces([...workspaces, workspaceWithId]);

      // Close the form
      setAddWorkspaceOpen(false);

      // Refetch workspaces from the database to get the updated list
      // Slight delay to ensure the backend has processed the new workspace
      setTimeout(() => {
        fetchWorkspaces();
      }, 500);

      toast.success("Workspace added successfully!", {
        position: "top-right",
      });
    } catch (error) {
      toast.error(
        "Error adding workspace: " + (error.message || "Unknown error"),
        {
          position: "top-right",
        }
      );
    }
  };

  const filteredWorkspaces = workspaces.filter((workspace) => {
    if (activeTab === "myWorkspace") {
      return workspace.isOwner;
    } else {
      return !workspace.isOwner;
    }
  });

  const displayedWorkspaces = filteredWorkspaces;

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#f4f7fa]">
      <div className="fixed top-0 right-0 left-0 z-20">
        <Navbar
          workspaces={workspaces}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      <div className="flex justify-center w-full !my-24">
        {/* Homepage content */}
        <div className="w-full max-w-6xl">
          <div className="flex justify-between items-center !mb-6">
            <h1 className="text-3xl font-bold text-indigo-900">
              {activeTab === "myWorkspace"
                ? "My Workspaces"
                : "My Assigned Workspaces"}
            </h1>
            {activeTab === "myWorkspace" && (
              <button
                onClick={handleAddWorkspace}
                className="bg-blue-400 hover:bg-blue-900 text-white rounded-md font-medium !px-4 !py-2"
              >
                Add Workspace
              </button>
            )}
          </div>

          {/* Loading state */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-xl text-gray-500">Loading workspaces...</div>
            </div>
          ) : (
            /* Workspace cards grid */
            <div className="flex flex-wrap gap-6">
              {displayedWorkspaces.length > 0 ? (
                displayedWorkspaces.map((workspace) => (
                  <WorkspaceCard key={workspace.id} workspace={workspace} />
                ))
              ) : (
                <div className="w-full text-center py-8 text-gray-500">
                  {activeTab === "myWorkspace"
                    ? "You don't have any workspaces yet. Create one to get started!"
                    : "You're not assigned to any workspaces."}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <AddWorkspaceForm
        isOpen={isAddWorkspaceFormOpen}
        onClose={handleCloseAddWorkspace}
        onAdd={handleAddNewWorkspace}
      />
    </div>
  );
};

export default Homepage;