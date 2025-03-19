import React from "react";
import Navbar from "../component/Navbar";
import WorkspaceCard from "../component/WorkspaceCard";
import workspaceData from "../mock-data/mockWorkspaceData";

const Homepage = () => {
  const handleAddWorkspace = () => {
    // console.log("Add new workspace clicked");
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#f4f7fa]">
      <div className="fixed top-0 right-0 left-0 z-20">
        <Navbar />
      </div>

      <div className="flex justify-center w-full !mt-24">
        <div className="w-full max-w-6xl">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-indigo-900">My Workspace</h1>
            <button
              onClick={handleAddWorkspace}
              className="bg-blue-400 hover:bg-blue-600 text-white rounded-md text-sm font-medium !px-4 !py-2 text-base"
            >
              Add Workspace
            </button>
          </div>

          <div className="flex flex-wrap gap-6 !mt-4 !mb-20">
            {workspaceData.map((workspace) => (
              <WorkspaceCard key={workspace.id} workspace={workspace} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;