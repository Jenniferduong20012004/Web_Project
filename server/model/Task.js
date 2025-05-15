const pool = require("../db/connect");

class Task {
  // Move a task to trash
  static moveToTrash(taskId, callback) {
    const query = "UPDATE Task SET trash = TRUE WHERE TaskId = ?";
    
    pool.query(query, [taskId], (err, result) => {
      if (err) {
        console.error("Error moving task to trash:", err);
        return callback(err, null);
      }
      
      if (result.affectedRows === 0) {
        return callback(new Error("Task not found"), null);
      }
      
      return callback(null, { success: true });
    });
  }
  
  // Get all trashed tasks for a workspace
  static getTrashTasks(workspaceId, callback) {
    const query = "SELECT * FROM Task WHERE trash = TRUE AND WorkSpace = ?";
    
    pool.query(query, [workspaceId], (err, results) => {
      if (err) {
        console.error("Error retrieving trash tasks:", err);
        return callback(err, null);
      }
      
      const trashTasks = results.map(row => ({
        id: row.TaskId,
        taskname: row.taskname,
        priority: row.priority,
        StateCompletion: row.StateCompletion
      }));
      
      return callback(null, trashTasks);
    });
  }
  
  // Restore task from trash
  static restoreFromTrash(taskId, callback) {
    const query = "UPDATE Task SET trash = FALSE WHERE TaskId = ?";
    
    pool.query(query, [taskId], (err, result) => {
      if (err) {
        console.error("Error restoring task from trash:", err);
        return callback(err, null);
      }
      
      if (result.affectedRows === 0) {
        return callback(new Error("Task not found"), null);
      }
      
      return callback(null, { success: true });
    });
  }
  
  // Permanently delete a task
  static permanentlyDelete(taskId, callback) {
    // First, delete any subtasks associated with this task
    const deleteSubtasksQuery = "DELETE FROM SubTask WHERE TaskId = ?";
    
    pool.query(deleteSubtasksQuery, [taskId], (subtaskErr) => {
      if (subtaskErr) {
        console.error("Error deleting subtasks:", subtaskErr);
        return callback(subtaskErr, null);
      }
      
      // Next, delete task assignments
      const deleteAssignmentsQuery = "DELETE FROM AssignTask WHERE TaskId = ?";
      
      pool.query(deleteAssignmentsQuery, [taskId], (assignErr) => {
        if (assignErr) {
          console.error("Error deleting task assignments:", assignErr);
          return callback(assignErr, null);
        }
        
        // Finally, delete the task itself
        const deleteTaskQuery = "DELETE FROM Task WHERE TaskId = ?";
        
        pool.query(deleteTaskQuery, [taskId], (taskErr, result) => {
          if (taskErr) {
            console.error("Error permanently deleting task:", taskErr);
            return callback(taskErr, null);
          }
          
          if (result.affectedRows === 0) {
            return callback(new Error("Task not found"), null);
          }
          
          return callback(null, { success: true });
        });
      });
    });
  }
}

module.exports = Task;