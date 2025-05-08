import { toast } from "react-toastify";

// Fetch members from API
export const fetchMembers = async (workspace) => {
  try {
    if (!workspace || !workspace.WorkSpace) {
      console.error("Invalid workspace data:", workspace);
      toast.error("Workspace data is missing or invalid", {
        position: "top-right",
      });
      return { success: false };
    }

    const response = await fetch("http://localhost:5000/getMember", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        workspace: workspace.WorkSpace,
      }),
    });

    const data = await response.json();

    if (data.success) {
      // Format member data
      const members = data.members.map((row) => ({
        ...row,
        name: row.userName,
        email: row.email,
        role: row.role,
        joinWorkSpace: row.joinWorkSpace,
      }));
      
      return { success: true, members };
    } else {
      console.error("Failed to get members:", data.message);
      toast.error(data.message || "Failed to load team members", {
        position: "top-right",
      });
      return { success: false };
    }
  } catch (error) {
    console.error("Error fetching members:", error);
    toast.error("Error: " + (error.message || "Unknown error"), {
      position: "top-right",
    });
    return { success: false };
  }
};

// Add a new member
export const addMember = async (email, role, workspace, members, setMembers) => {
  if (!email.trim()) {
    toast.error("Email is required", { position: "top-right" });
    return false;
  }

  if (!workspace || !workspace.WorkSpace) {
    toast.error("Please create a workspace first", { position: "top-right" });
    return false;
  }

  try {
    const response = await fetch("http://localhost:5000/addMember", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        role: role || "Member",
        WorkSpace: workspace.WorkSpace,
      }),
    });

    const responseText = await response.text();

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error("Failed to parse response as JSON:", e);
      toast.error("Invalid response from server", { position: "top-right" });
      return false;
    }

    if (data.success) {
      const newMember = {
        joinWorkSpace: data.member.joinWorkSpace,
        name: data.member.userName,
        email: data.member.email,
        role: data.member.role,
        isPending: data.member.isPending,
        isManager: data.member.isManager,
      };

      setMembers([...members, newMember]);
      toast.success("Member added successfully!", { position: "top-right" });
      return true;
    } else {
      console.error("Failed to add member:", data.message || "Unknown error");

      // Check if the error is due to user not found
      if (
        data.code === "USER_NOT_FOUND" ||
        data.message.includes("not found") ||
        data.message.includes("does not exist")
      ) {
        return { userNotFound: true, email };
      } else {
        toast.error(data.message || "Failed to add member", { position: "top-right" });
        return false;
      }
    }
  } catch (error) {
    console.error("Error in addMember:", error);
    toast.error("Error: " + (error.message || "Unknown error"), { position: "top-right" });
    return false;
  }
};

// Delete a member
export const deleteMember = async (memberToDelete, members, setMembers) => {
  try {
    const response = await fetch("http://localhost:5000/deleteMember", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        joinWorkSpace: memberToDelete.joinWorkSpace,
      }),
    });

    const data = await response.json();

    if (data.success) {
      setMembers(
        members.filter(
          (m) => m.joinWorkSpace !== memberToDelete.joinWorkSpace
        )
      );
      toast.success("Member removed successfully!", { position: "top-right" });
      return true;
    } else {
      console.error("Failed to delete member:", data.message);
      toast.error(data.message || "Failed to remove member", { position: "top-right" });
      return false;
    }
  } catch (error) {
    console.error("Error in deleteMember:", error);
    toast.error("Error: " + (error.message || "Unknown error"), { position: "top-right" });
    return false;
  }
};

// Update member role
export const updateMemberRole = async (memberToUpdate, updatedRole, members, setMembers) => {
  if (!updatedRole.trim()) {
    toast.error("Role cannot be empty", { position: "top-right" });
    return false;
  }

  try {
    const response = await fetch("http://localhost:5000/updateMemberRole", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        joinWorkSpace: memberToUpdate.joinWorkSpace,
        role: updatedRole,
      }),
    });

    const data = await response.json();

    if (data.success) {
      // Update the member in the local state
      setMembers(
        members.map((m) =>
          m.joinWorkSpace === memberToUpdate.joinWorkSpace
            ? { ...m, role: updatedRole }
            : m
        )
      );
      toast.success("Member role updated successfully!", { position: "top-right" });
      return true;
    } else {
      console.error("Failed to update member role:", data.message);
      toast.error(data.message || "Failed to update member role", { position: "top-right" });
      return false;
    }
  } catch (error) {
    console.error("Error in updateMemberRole:", error);
    toast.error("Error: " + (error.message || "Unknown error"), { position: "top-right" });
    return false;
  }
};

// Create a new workspace
export const createWorkspace = async (name, description) => {
  if (!name.trim()) {
    toast.error("Workspace name is required", { position: "top-right" });
    return null;
  }

  try {
    const response = await fetch("http://localhost:5000/addWorkSpace", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        workspacename: name,
        description: description || "No description provided",
      }),
    });

    const data = await response.json();

    if (data.success) {
      // Create workspace object
      const newWorkspace = {
        WorkSpace: data.workspaceId,
        workspacename: name,
        description: description,
      };

      // Save to localStorage
      localStorage.setItem("workspace", JSON.stringify(newWorkspace));
      
      toast.success("Workspace created successfully!", { position: "top-right" });
      return newWorkspace;
    } else {
      console.error("Failed to create workspace:", data.message);
      toast.error(data.message || "Failed to create workspace", { position: "top-right" });
      return null;
    }
  } catch (error) {
    console.error("Error in createWorkspace:", error);
    toast.error("Error: " + (error.message || "Unknown error"), { position: "top-right" });
    return null;
  }
};