import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Navbar from "../component/Navbar";
import AddWorkspaceForm from "../component/homepage/AddWorkspaceForm";
import WorkspaceCard from "../component/homepage/WorkspaceCard";
import api from "../services/api";

const Homepage = () => {
  const [isAddWorkspaceFormOpen, setAddWorkspaceOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("myWorkspace");
  const [userId, setUserId] = useState(null);
  const [adminWorkspaces, setAdminWorkspaces] = useState([]);
  const [assignedWorkspaces, setAssignedWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        setLoading(true);

        let userData = JSON.parse(localStorage.getItem("user"));
        if (!userData || !userData.userId) {
          toast.error("User not found in localStorage");
          setLoading(false);
          return;
        }
        setUserId(userData.userId);

        // get all ws that the current user is admin
        const adminResponse =
          await api.workspaces.getCurrentUserAdminWorkspaces();

        if (adminResponse.success) {
          // Thêm kiểm tra quyền admin
          const validAdminWorkspaces = adminResponse.workspace.filter((ws) =>
            ws.members.some(
              (member) => member.userID === userData.userId && member.isAdmin
            )
          );
          setAdminWorkspaces(validAdminWorkspaces);
        } else {
          toast.error(adminResponse.message || "Admin workspace fetch failed", {
            position: "top-right",
          });
        }

        // Lấy các workspace mà user được assign (không phải admin)
        const assignedResponse =
          await api.workspaces.getCurrentUserAssignedWorkspaces();

        if (assignedResponse.success) {
          setAssignedWorkspaces(assignedResponse.workspace);
        } else {
          toast.error(
            assignedResponse.message || "Assigned workspace fetch failed",
            {
              position: "top-right",
            }
          );
        }
      } catch (error) {
        console.error("Error fetching workspaces:", error);
        toast.error("Error loading workspaces: " + error.message);
      } finally {
        // Thêm timeout để tránh loading vô hạn
        setTimeout(() => {
          setLoading(false);
        }, 5000);
      }
    };

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
      const response = await api.workspaces.createWorkspace({
        name: newWorkspace.name,
        description: newWorkspace.description,
        userId: userId,
      });

      if (response.success) {
        // Thêm workspace mới vào danh sách admin workspaces
        setAdminWorkspaces([...adminWorkspaces, response.workspace]);
        toast.success("Workspace created successfully!", {
          position: "top-right",
        });
        setAddWorkspaceOpen(false);
      } else {
        toast.error(response.message || "Failed to create workspace", {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("Error creating workspace: " + error.message, {
        position: "top-right",
      });
    }
  };

  // Chọn danh sách workspace hiển thị dựa vào tab đang active
  const displayedWorkspaces =
    activeTab === "myWorkspace" ? adminWorkspaces : assignedWorkspaces;

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#f4f7fa]">
      <div className="fixed top-0 right-0 left-0 z-20">
        <Navbar
          workspaces={[...adminWorkspaces, ...assignedWorkspaces]} // Truyền tất cả workspace cho Navbar
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
