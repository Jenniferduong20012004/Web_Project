import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Navbar from "../component/Navbar";
import workspaceData from "../mock-data/mockWorkspaceData";
import AddWorkspaceForm from "../component/homepage/AddWorkspaceForm";
import WorkspaceCard from "../component/homepage/WorkspaceCard";

const Homepage = () => {
  const [isAddWorkspaceFormOpen, setAddWorkspaceOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("myWorkspace");
  const [userId, setUserId] = useState(null);
  const [adminWorkspaces, setAdminWorkspaces] = useState([]);
  const [assignedWorkspaces, setAssignedWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [workspaces, setWorkspaces] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        let data = JSON.parse(localStorage.getItem("user"));
        if (!data) {
          toast.error("User not found in localStorage", {
            position: "top-right",
          });
          return;
        }

        setUserId(data.id);

        // Using mock data instead of API call
        const mockResponse = {
          success: true,
          workspace: workspaceData.map((workspace) => ({
            ...workspace,
            isOwner: true,
          })),
        };

        if (mockResponse.success) {
          setWorkspaces(mockResponse.workspace);
        } else {
          toast.error("Workspace fetch failed", {
            position: "top-right",
          });
        }

        // Set loading to false after getting data
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Error: " + (error.message || "Unknown error"), {
          position: "top-right",
        });
      }
    };

    getData();
  }, []);

  const handleAddWorkspace = () => {
    setAddWorkspaceOpen(true);
  };

  const handleCloseAddWorkspace = () => {
    setAddWorkspaceOpen(false);
  };

  const handleAddNewWorkspace = (newWorkspace) => {
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
    setAddWorkspaceOpen(false);
  };

  const filteredWorkspaces = workspaces.filter((workspace) => {
    if (activeTab === "myWorkspace") {
      return workspace.isOwner;
    } else {
      return !workspace.isOwner;
    }
  });

  // This variable was missing in the second file but used in the UI
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
