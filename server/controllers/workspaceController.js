const Workspace = require("../model/WorkSpace");

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
    return res
      .status(400)
      .json({
        error: true,
        message: "Please provide workspace ID, name, and description",
      });
  }

  // Log the request data for debugging
  console.log("Update workspace request data:", {
    id,
    workspacename,
    description,
  });

  const workspaceData = { id, workspacename, description };

  Workspace.update(workspaceData, (err, result) => {
    if (err) {
      console.error("Error updating workspace:", err);
      return res
        .status(500)
        .json({
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
      return res
        .status(500)
        .json({
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

// Get tasks in trash for a workspace
exports.getTrashTasks = (req, res) => {
  const { workspaceId } = req.params;

  if (!workspaceId) {
    return res
      .status(400)
      .json({ error: true, message: "Please provide workspace ID" });
  }

  Workspace.getTrashTask(workspaceId, (err, tasks) => {
    if (err) {
      console.error("Error retrieving trash tasks:", err);
      return res
        .status(500)
        .json({ error: true, message: "Error retrieving trash tasks" });
    }

    res.status(200).json({ success: true, tasks });
  });
};

// Restore a task from trash
exports.restoreTrashTask = (req, res) => {
  const { taskId } = req.body;

  if (!taskId) {
    return res
      .status(400)
      .json({ error: true, message: "Please provide task ID" });
  }

  Workspace.restoreTrashTask(taskId, (err, result) => {
    if (err) {
      console.error("Error restoring task:", err);
      return res
        .status(500)
        .json({ error: true, message: "Error restoring task from trash" });
    }

    res
      .status(200)
      .json({ success: true, message: "Task restored successfully" });
  });
};

// Create a new task in a workspace
exports.createTask = (req, res) => {
  const taskData = req.body;

  if (
    !taskData.taskname ||
    !taskData.workspaceId ||
    !taskData.priority ||
    !taskData.dateBegin ||
    !taskData.dateEnd ||
    !taskData.StateCompletion
  ) {
    return res
      .status(400)
      .json({ error: true, message: "Missing required task fields" });
  }

  Workspace.createTask(taskData, (err, result) => {
    if (err) {
      console.error("Error creating task:", err);
      return res
        .status(500)
        .json({ error: true, message: "Error creating task" });
    }

    // Handle file upload if present
    if (taskData.fileName && taskData.fileName.name) {
      Workspace.addFileToSupa(taskData, result.id, (fileErr, fileResult) => {
        if (fileErr) {
          console.error("Error uploading file:", fileErr);
          // Still return task creation success, but with file upload error
          return res.status(201).json({
            success: true,
            task: result,
            fileUpload: { success: false, message: "File upload failed" },
          });
        }

        return res.status(201).json({
          success: true,
          task: result,
          fileUpload: { success: true, path: fileResult },
        });
      });
    } else {
      return res.status(201).json({ success: true, task: result });
    }
  });
};
