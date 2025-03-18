// import React from "react";
// import Navbar from "../component/Navbar";
// import WorkspaceCard from "../component/WorkspaceCard";
// import workspaceData from "../mock-data/mockWorkspaceData";

// const Homepage = () => {
//   const handleAddWorkspace = () => {
//     // console.log("Add new workspace clicked");
//   };

//   return (
//     <div className="w-[1280px] mx-auto min-h-screen flex flex-col bg-[#f4f7fa]">
//       <Navbar />

//       <div className="w-full !px-4 sm:px-6 lg:px-8 !mt-8">
//         <div className="max-w-6xl !mx-auto">
//           <div className="flex justify-between items-center">
//             <h1 className="text-3xl font-bold text-indigo-900">My Workspace</h1>
//             <button
//               onClick={handleAddWorkspace}
//               className="bg-blue-400 hover:bg-blue-600 text-white rounded-md text-sm font-medium !px-4 !py-2 text-base"
//             >
//               Add Workspace
//             </button>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 !mt-4 !mb-20">
//             {workspaceData.map((workspace) => (
//               <WorkspaceCard key={workspace.id} workspace={workspace} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Homepage;

// import React from "react";
// import Navbar from "../component/Navbar";
// import WorkspaceCard from "../component/WorkspaceCard";
// import workspaceData from "../mock-data/mockWorkspaceData";

// const Homepage = () => {
//   const handleAddWorkspace = () => {
//     // console.log("Add new workspace clicked");
//   };

//   return (
//     <div className="w-full min-h-screen flex flex-col bg-[#f4f7fa]">
//       <Navbar />

//       <div className="w-full px-8 mt-8">
//         <div className="max-w-6xl mx-auto">
//           <div className="flex justify-between items-center">
//             <h1 className="text-3xl font-bold text-indigo-900">My Workspace</h1>
//             <button
//               onClick={handleAddWorkspace}
//               className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 text-base"
//             >
//               Add Workspace
//             </button>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 mb-20">
//             {workspaceData.map((workspace) => (
//               <WorkspaceCard key={workspace.id} workspace={workspace} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Homepage;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../component/Navbar";
import WorkspaceCard from "../component/WorkspaceCard";

const Homepage = () => {
  const [workspaces, setWorkspaces] = useState([]); // State to store workspaces

  useEffect(() => {
    const getData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
          toast.error("User not found in localStorage", { position: "top-right" });
          return;
        }

        const response = await axios.post("http://localhost:5000/getWorkSpace", { userId: user.id });

        if (response.data.success) {
          setWorkspaces(response.data.workspace); // Store workspaces in state
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
              onClick={() => console.log("Add new workspace clicked")}
              className="bg-blue-400 hover:bg-blue-600 text-white rounded-md text-sm font-medium !px-4 !py-2 text-base"
            >
              Add Workspace
            </button>
          </div>

          <div className="flex flex-wrap gap-6 !mt-4 !mb-20">
            {workspaces.length > 0 ? (
              workspaces.map((workspace) => (
                <WorkspaceCard key={workspace.id} workspace={workspace} />
              ))
            ) : (
              <p>No workspaces found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
