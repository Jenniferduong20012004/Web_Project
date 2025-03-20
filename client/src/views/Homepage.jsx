import React, { useState } from "react";
import Navbar from "../component/Navbar";
import workspaceData from "../mock-data/mockWorkspaceData";
import AddWorkspaceForm from "../component/homepage/AddWorkspaceForm";
import WorkspaceCard from "../component/WorkspaceCard";
import { useEffect } from "react";
const Homepage = () => {
  const [isAddWorkspaceFormOpen, setAddWorkspaceOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("myWorkspace");
  const [userId, setUserId] = useState(null);
  // const [workspaces, setWorkspaces] = useState(
  //   workspaceData.map((workspace) => ({
  //     ...workspace,
  //     isOwner: true,
  //   }))
  // );
  useEffect(() => {
    const getData = async () => {
      try {
        let data = JSON.parse(localStorage.getItem("user"));
        setUserId(data.id);
        // alert(data.id, data.email);
        if (!data) {
          toast.error("User not found in localStorage", { position: "top-right" });
          return;
        }
        // localStorage.setItem("user", data.id);

        if (response.data.success) {
          setWorkspaces(response.data.workspace);
        } else {
          toast.error(response.data.message || "Workspace fetch failed", { position: "top-right" });
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message || "Server error", { position: "top-right" });
        } else if (error.request) {
          toast.error("Unable to connect to server. Please try again later.", { position: "top-right" });
        } else {
          toast.error("Error: " + error.message, { position: "top-right" });
        }
      }
    };

    getData();
  }, []);
  const [workspaces, setWorkspaces] = useState([]);
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
                className="bg-blue-400 hover:bg-blue-900 text-white rounded-md text-sm font-medium !px-4 !py-2 text-base"
              >
                Add Workspace
              </button>
            )}
          </div>

          {/* Workspace cards grid */}
          <div className="flex flex-wrap gap-6">
            {filteredWorkspaces.map((workspace) => (
              <WorkspaceCard key={workspace.id} workspace={workspace} />
            ))}
          </div>
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