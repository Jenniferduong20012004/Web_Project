const Workspace = require("../model/WorkSpace");

// GET /workspaces/:userId - Get all workspaces for a user
exports.getWorkspaces = (req, res) => {
  const { userId } = req.params;
  
  if (!userId) {
    return res.status(400).json({ 
      success: false, 
      message: "User ID is required" 
    });
  }
  
  // Get workspaces where user is a manager (owner)
  Workspace.findMyWorkSpaceByUserId(userId, (err, managedWorkspaces) => {
    if (err) {
      console.error("Error fetching managed workspaces:", err);
      return res.status(500).json({
        success: false,
        message: "Error when finding managed workspaces!",
      });
    }
    
    // Get workspaces where user is assigned but not a manager
    Workspace.findMyAssignedWorkSpaceByUserId(userId, (errA, assignedWorkspaces) => {
      if (errA) {
        console.error("Error fetching assigned workspaces:", errA);
        return res.status(500).json({
          success: false,
          message: "Error when finding assigned workspaces!",
        });
      }
            
      // Return both managed and assigned workspaces
      return res.status(200).json({
        success: true,
        message: "Workspaces retrieved successfully",
        data: {
          managedWorkspaces: managedWorkspaces,
          assignedWorkspaces: assignedWorkspaces,
        }
      });
    });
  });
};

// Create a new workspace
exports.addWorkSpace = (req, res) => {
  const { workspacename, description, dateCreate, userId } = req.body;

  if (!workspacename || !description || !dateCreate) {
    return res
      .status(400)
      .json({ error: true, message: "Please fill in all fields!" });
  }

  const WorkSpaceData = { workspacename, description, dateCreate };

  Workspace.createForManager(userId, WorkSpaceData, (err, result) => {
    if (err) {
      console.error("Error inserting workspace:", err);
      return res
        .status(500)
        .json({ error: true, message: "Error when creating workspace" });
    }

    console.log("Create workspace successful!");
    res.status(201).json({ success: true, ws: result });
  });
};

// Update an existing workspace
exports.updateWorkSpace = (req, res) => {
  const { id, workspacename, description } = req.body;

  if (!id || !workspacename || !description) {
    return res.status(400).json({
      error: true,
      message: "Please provide workspace ID, name, and description",
    });
  }

  const workspaceData = { id, workspacename, description };

  Workspace.update(workspaceData, (err, result) => {
    if (err) {
      console.error("Error updating workspace:", err);
      return res.status(500).json({
        error: true,
        message: "Error when updating workspace: " + err.message,
      });
    }

    console.log("Update workspace successful!");
    res.status(200).json({ success: true, workspace: result });
  });
};

// Delete a workspace
exports.deleteWorkSpace = (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ error: true, message: "Please provide workspace ID" });
  }

  // Log the request data for debugging
  console.log("Delete workspace request data:", { id });

  Workspace.delete(id, (err, result) => {
    if (err) {
      console.error("Error deleting workspace:", err);
      return res.status(500).json({
        error: true,
        message: "Error when deleting workspace: " + err.message,
      });
    }

    console.log("Delete workspace successful!");
    res
      .status(200)
      .json({ success: true, message: "Workspace deleted successfully" });
  });
};

// check isManager role of a user in a workspace
exports.checkWorkspaceRole = (req, res) => {
  const { userId, workspaceId } = req.body;

  if (!userId || !workspaceId) {
    return res.status(400).json({
      error: true,
      message: "Please provide both userId and workspaceId",
    });
  }

  Workspace.checkUserRole(userId, workspaceId, (err, result) => {
    if (err) {
      console.error("Error checking workspace role:", err);
      return res.status(500).json({
        success: false,
        message: "Error checking workspace role: " + err.message,
      });
    }

    if (!result.found) {
      return res.status(404).json({
        success: false,
        message: result.message,
      });
    }

    res.status(200).json({
      success: true,
      isManager: result.isManager,
    });
  });
};

// leave ws function, for member role
exports.leaveWorkspace = (req, res) => {
  const { userId, workspaceId } = req.body;

  if (!userId || !workspaceId) {
    return res.status(400).json({
      success: false,
      message: "Both userId and workspaceId are required",
    });
  }

  Workspace.leaveWorkspace(userId, workspaceId, (err, result) => {
    if (err) {
      console.error("Error leaving workspace:", err);
      return res.status(400).json({
        success: false,
        message: err.message || "Error leaving workspace",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully left the workspace",
    });
  });
};