const pool = require("../db/connect");
const supabase = require("../db/superbaseClient");
const priorityMap = {
  High: 1,
  Medium: 2,
  Low: 3,
};
const statusMap = {
  TODO: 1,
  "IN-PROGRESS": 2,
  COMPLETED: 3,
};
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + 1);
  return date.toISOString().split("T")[0]; // returns 'YYYY-MM-DD'
};
const generateRandomString = (length = 7) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

class WorkSpace {
  static create(workSpaceData, callback) {
    const { workspacename, description, dateCreate } = workSpaceData;
    const query =
      "INSERT INTO WorkSpace (workspacename, dateCreate, description) VALUES (?, ?, ?)";

    pool.query(
      query,
      [workspacename, dateCreate, description],
      (err, results) => {
        if (err) {
          console.error("Error creating workspace:", err);
          return callback(err, null);
        }
        return callback(null, { id: results.insertId, ...workSpaceData });
      }
    );
  }
  static checkUserRole(userId, workspaceId, callback) {
    const query =
      "SELECT isManager FROM joinWorkSpace WHERE userId = ? AND WorkSpace = ?";

    pool.query(query, [userId, workspaceId], (err, results) => {
      if (err) {
        console.error("Error checking user role:", err);
        return callback(err, null);
      }

      if (results.length === 0) {
        return callback(null, {
          found: false,
          message: "User not part of this workspace",
        });
      }

      return callback(null, {
        found: true,
        isManager: Boolean(results[0].isManager),
      });
    });
  }

  static getTrashTask(workSpaceId, callback) {
    const query = "SELECT * FROM Task WHERE trash = TRUE AND WorkSpace = ?;";
    pool.query(query, [workSpaceId], (err, result) => {
      if (err) {
        console.error("Error creating workspace:", err);
        return callback(err, null);
      }
      const deleteTask = result.map((row) => {
        return {
          id: row.TaskId,
          taskname: row.taskname,
          priority: row.priority,
          StateCompletionn: row.StateCompletion,
        };
      });

      return callback(null, deleteTask);
    });
  }
  static restoreTrashTask(taskId, callback) {
    const query = "UPDATE Task SET trash = false WHERE TaskId = ?;";
    pool.query(query, [taskId], (err, result) => {
      if (err) {
        console.error("Error creating workspace:", err);
        return callback(err, null);
      }
      return callback(null, { success: true });
    });
  }
  static addFileToSupa = async (id, file, callback) => {
      let str =
        id + "/" + generateRandomString() + "/" + file.originalname;
      const { data, error } = await supabase.storage
        .from("taskfile")
        .upload(str, file.buffer, {
      contentType: file.mimetype, // e.g., text/plain, image/jpeg
    });
    
      const query = "UPDATE Task SET filePath = ? WHERE TaskId = ?;";
      pool.query(query, [str, id], (err, result) => {
      if (err) {
        console.error("Error add file:", err);
        return callback(err, null);
      }
      return callback(null, { success: true });
    });
  };
  static createTask(TaskData, callback) {
    const query =
      "INSERT INTO Task (taskname, WorkSpace, priority, dateBegin, dateEnd, trash, StateCompletion, description) values (?, ?,?, ?,?, ?, ?, ?)";
    const query2 =
      "INSERT INTO AssignTask  (joinWorkSpace, TaskId) values (?, ?)";
    const priority = priorityMap[TaskData.priority];
    const dateEnd = formatDate(TaskData.dateEnd);
    console.log (dateEnd);
    const status = statusMap[TaskData.StateCompletion];
    pool.query(
      query,
      [
        TaskData.taskname,
        TaskData.workspaceId,
        priority,
        TaskData.dateBegin,
        dateEnd,
        false,
        status,
        TaskData.description,
      ],
      (err, result) => {
        if (err) {
          console.error("Error creating Task:", err);
          return callback(err, null);
        }
        const taskId = result.insertId;
        for (const member of TaskData.assignedTo) {
          pool.query(query2, [member.id, taskId], (er, res) => {
            if (er) {
              console.error("Error add member to task:", er);
              return callback(er, null);
            }
          });
        }
        return callback(null, { id: taskId });
      }
    );
  }

  static createForManager(userId, workSpaceData, callback) {
    const { workspacename, description, dateCreate } = workSpaceData;
    WorkSpace.create(workSpaceData, (err, result) => {
      if (err) {
        console.error("Error inserting workspace:", err);
        return callback(err, null);
      }

      const query =
        "INSERT INTO joinWorkSpace (isPending, isManager, role, dateJoin, userId, WorkSpace) VALUES (?, ?, ?,?, ?, ?)";
      pool.query(
        query,
        [false, true, "Leader", dateCreate, userId, result.id],
        (e, r) => {
          if (e) {
            console.error("Error linking workspace to manager:", e);
            return callback(e, null);
          }
          console.log("Workspace created and linked to manager successfully!");
          return callback(null, {
            joinId: r.insertId,
            userId,
            workspaceId: result.id,
          });
        }
      );
    });
  }

  static update(workspaceData, callback) {
    const { id, workspacename, description } = workspaceData;
    const query =
      "UPDATE WorkSpace SET workspacename = ?, description = ? WHERE WorkSpace = ?";

    pool.query(query, [workspacename, description, id], (err, results) => {
      if (err) {
        console.error("Error updating workspace:", err);
        return callback(err, null);
      }

      if (results.affectedRows === 0) {
        return callback({ message: "Workspace not found" }, null);
      }

      return callback(null, { WorkSpace: id, workspacename, description });
    });
  }

  // DELETE API
  static delete(workspaceId, callback) {
    // Start a transaction to ensure data integrity
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting database connection:", err);
        return callback(err, null);
      }

      connection.beginTransaction((err) => {
        if (err) {
          connection.release();
          console.error("Error beginning transaction:", err);
          return callback(err, null);
        }

        // Step 1: Delete related records in joinWorkSpace table
        const deleteJoinQuery = "DELETE FROM joinWorkSpace WHERE WorkSpace = ?";
        connection.query(deleteJoinQuery, [workspaceId], (err, results) => {
          if (err) {
            return connection.rollback(() => {
              connection.release();
              console.error("Error deleting from joinWorkSpace:", err);
              callback(err, null);
            });
          }

          // Step 2: Delete the workspace itself
          const deleteWorkspaceQuery =
            "DELETE FROM WorkSpace WHERE WorkSpace = ?";
          connection.query(
            deleteWorkspaceQuery,
            [workspaceId],
            (err, results) => {
              if (err) {
                return connection.rollback(() => {
                  connection.release();
                  console.error("Error deleting workspace:", err);
                  callback(err, null);
                });
              }

              if (results.affectedRows === 0) {
                return connection.rollback(() => {
                  connection.release();
                  const notFoundError = new Error("Workspace not found");
                  console.error(notFoundError);
                  callback(notFoundError, null);
                });
              }

              // Commit the transaction
              connection.commit((err) => {
                if (err) {
                  return connection.rollback(() => {
                    connection.release();
                    console.error("Error committing transaction:", err);
                    callback(err, null);
                  });
                }

                connection.release();
                console.log(`Workspace ${workspaceId} deleted successfully`);
                callback(null, { id: workspaceId });
              });
            }
          );
        });
      });
    });
  }
}

module.exports = WorkSpace;
