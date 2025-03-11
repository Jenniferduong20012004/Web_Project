import React from "react";
import Navbar from "../component/Navbar";
import WorkspaceCard from "../component/WorkspaceCard";
import workspaceData from "../mock-data/mockWorkspaceData";

const Homepage = () => {
  const handleAddWorkspace = () => {
    // console.log("Add new workspace clicked");
  };

  return (
    <div className="w-[1280px] mx-auto min-h-screen flex flex-col bg-[#f4f7fa]">
      <Navbar />

      <div className="w-full !px-4 sm:px-6 lg:px-8 !mt-8">
        <div className="max-w-6xl !mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-indigo-900">My Workspace</h1>
            <button
              onClick={handleAddWorkspace}
              className="bg-blue-400 hover:bg-blue-600 text-white rounded-md text-sm font-medium !px-4 !py-2 text-base"
            >
              Add Workspace
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 !mt-4 !mb-20">
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
