import React from "react";
import Navbar from "../component/Navbar";
import WorkspaceCard from "../component/WorkspaceCard";

// MOCK DATA
const workspaceData = [
  {
    id: 1,
    title: "TaskClick",
    subtitle: "Task Management Project",
    backgroundGradient:
      "bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400",
    members: [
      { id: 1, initials: "VN", bgColor: "bg-blue-500" },
      { id: 2, initials: "TH", bgColor: "bg-gray-500" },
      { id: 3, initials: "KT", bgColor: "bg-orange-400" },
    ],
  },
  {
    id: 2,
    title: "Flower Shop",
    subtitle: "Small and Concise headlin",
    backgroundGradient:
      "bg-gradient-to-br from-red-300 via-purple-300 to-indigo-400",
    members: [
      { id: 1, initials: "VN", bgColor: "bg-blue-500" },
      { id: 2, initials: "KT", bgColor: "bg-orange-400" },
    ],
  },
  {
    id: 3,
    title: "Gamer Boy",
    subtitle: "Small and Concise headlin",
    backgroundGradient:
      "bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300",
    members: [
      { id: 1, initials: "VN", bgColor: "bg-blue-500" },
      { id: 2, initials: "KT", bgColor: "bg-orange-400" },
    ],
  },
  {
    id: 4,
    title: "Gamer Boy",
    subtitle: "Small and Concise headlin",
    backgroundGradient:
      "bg-gradient-to-br from-indigo-300 via-purple-400 to-pink-400",
    members: [
      { id: 1, initials: "VN", bgColor: "bg-blue-500" },
      { id: 2, initials: "KT", bgColor: "bg-orange-400" },
    ],
  },
  {
    id: 5,
    title: "Gamer Boy",
    subtitle: "Small and Concise headlin",
    backgroundGradient:
      "bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300",
    members: [
      { id: 1, initials: "VN", bgColor: "bg-blue-500" },
      { id: 2, initials: "KT", bgColor: "bg-orange-400" },
    ],
  },
  {
    id: 6,
    title: "TaskClick",
    subtitle: "Task Management Project",
    backgroundGradient:
      "bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400",
    members: [
      { id: 1, initials: "VN", bgColor: "bg-blue-500" },
      { id: 2, initials: "TH", bgColor: "bg-gray-500" },
      { id: 3, initials: "KT", bgColor: "bg-orange-400" },
    ],
  },
  {
    id: 7,
    title: "Flower Shop",
    subtitle: "Small and Concise headlin",
    backgroundGradient:
      "bg-gradient-to-br from-red-300 via-purple-300 to-indigo-400",
    members: [
      { id: 1, initials: "VN", bgColor: "bg-blue-500" },
      { id: 2, initials: "KT", bgColor: "bg-orange-400" },
    ],
  },
];

const Homepage = () => {
  const handleAddWorkspace = () => {
    // console.log("Add new workspace clicked");
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />

      <div className="flex justify-center w-full !mt-8">
        <div className="max-w-6xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-indigo-900">My Workspace</h1>
            <button
              onClick={handleAddWorkspace}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium"
            >
              Add Workspace
            </button>
          </div>
          <div className="flex flex-wrap gap-8 !mt-4">
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
