const Task = require("../model/Task");
const WorkSpace = require("../model/WorkSpace");

// Trash task
exports.trashTask = (req, res) => {
    const { taskId, workspaceId, userId } = req.body;

    if (!taskId || !workspaceId || !userId) {
        return res.status(400).json({ 
            success: false, 
            message: "Missing required parameters: taskId, workspaceId, or userId" 
        });
    }

    // check if user is manager of that workspace => have permission to modify tasks in this workspace
    WorkSpace.checkUserRole(userId, workspaceId, (roleErr, roleResult) => {
        if (roleErr) {
            console.error("Error checking workspace role:", roleErr);
            return res.status(500).json({
                success: false,
                message: "Error checking workspace role: " + roleErr.message,
            });
        }

        if (!roleResult.found) {
            return res.status(404).json({
                success: false,
                message: "User not part of this workspace",
            });
        }

        // only managers can trash tasks
        if (!roleResult.isManager) {
            return res.status(403).json({
                success: false,
                message: "Only workspace managers can move tasks to trash",
            });
        }
        
        Task.moveToTrash(taskId, (err, result) => {
            if (err) {
                console.error("Error trashing task:", err);
                return res.status(500).json({ 
                    success: false, 
                    message: "Error moving task to trash" 
                });
            }

            res.status(200).json({ 
                success: true, 
                message: "Task moved to trash successfully" 
            });
        });
    });
};

exports.getTrashTasks = (req, res) => {
    const { workspace } = req.body;
    if (!workspace) {
        return res.status(400).json({ success: false, message: "Cannot get workspace ID" });
    }  

    Task.getTrashTasks(workspace, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error when retrieving trash tasks!",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Get trash task successful",
            trashTask: result, 
        });
    });
};

exports.restoreTrashTask = (req, res) => {
    const { taskId, workspaceId, userId } = req.body;
    
    if (!taskId) {
        return res.status(400).json({ success: false, message: "Cannot get taskId" });
    }
    
    // Check if the user has permission to modify tasks in this workspace
    if (workspaceId && userId) {
        WorkSpace.checkUserRole(userId, workspaceId, (roleErr, roleResult) => {
            if (roleErr) {
                console.error("Error checking workspace role:", roleErr);
                return res.status(500).json({
                    success: false,
                    message: "Error checking workspace role: " + roleErr.message,
                });
            }

            if (!roleResult.found) {
                return res.status(404).json({
                    success: false,
                    message: "User not part of this workspace",
                });
            }

            // Only managers can restore tasks
            if (!roleResult.isManager) {
                return res.status(403).json({
                    success: false,
                    message: "Only workspace managers can restore tasks from trash",
                });
            }
            
            Task.restoreFromTrash(taskId, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Error when restoring task!",
                    });
                }
                res.status(200).json({ success: true });
            });
        });
    } else {
        Task.restoreFromTrash(taskId, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Error when restoring task!",
                });
            }
            res.status(200).json({ success: true });
        });
    }
};

exports.permanentlyDeleteTask = (req, res) => {
    const { taskId, workspaceId, userId } = req.body;
    
    if (!taskId) {
        return res.status(400).json({ success: false, message: "Cannot get taskId" });
    }
    
    // Check if the user has permission to modify tasks in this workspace
    if (workspaceId && userId) {
        WorkSpace.checkUserRole(userId, workspaceId, (roleErr, roleResult) => {
            if (roleErr) {
                console.error("Error checking workspace role:", roleErr);
                return res.status(500).json({
                    success: false,
                    message: "Error checking workspace role: " + roleErr.message,
                });
            }

            if (!roleResult.found) {
                return res.status(404).json({
                    success: false,
                    message: "User not part of this workspace",
                });
            }

            // Only managers can permanently delete tasks
            if (!roleResult.isManager) {
                return res.status(403).json({
                    success: false,
                    message: "Only workspace managers can permanently delete tasks",
                });
            }
            
            Task.permanentlyDelete(taskId, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Error when permanently deleting task!",
                    });
                }
                res.status(200).json({ success: true });
            });
        });
    } else {
        Task.permanentlyDelete(taskId, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Error when permanently deleting task!",
                });
            }
            res.status(200).json({ success: true });
        });
    }
};