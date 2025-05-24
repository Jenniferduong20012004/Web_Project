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

const bgColorOptions = [
  "bg-blue-700",
  "bg-orange-500",
  "bg-purple-600",
  "bg-green-600",
  "bg-red-600",
];

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
  // find assigned workspace - only accepted members (isPending = 0)
  static findMyAssignedWorkSpaceByUserId(userId, callback) {
    const query = `
    SELECT 
      w.WorkSpace AS id, 
      w.workspacename AS workspaceName, 
      w.dateCreate,
      w.description,
      j.isPending,
      j.joinWorkSpace,
      j.role,
      mng.userId AS managerId,
      mng.name AS managerName,
      mng.photoPath AS photo
    FROM 
      joinWorkSpace j
    JOIN 
      WorkSpace w ON j.WorkSpace = w.WorkSpace
    -- Join to get manager info for the same workspace
    LEFT JOIN joinWorkSpace jm ON jm.WorkSpace = w.WorkSpace AND jm.isManager = TRUE
    LEFT JOIN User mng ON mng.userId = jm.userId
    WHERE 
      j.userId = ? AND j.isManager = FALSE AND j.isPending = 0;
  `;

    const getMemQuery = `
    SELECT 
      j.joinWorkSpace,
      u.userId,
      u.name,
      u.email,
      u.photoPath
    FROM joinWorkSpace j 
    JOIN User u ON j.userId = u.userId
    WHERE j.WorkSpace = ? AND j.isPending = 0
  `;

    pool.query(query, [userId], async (err, results) => {
      if (err) {
        console.error("Error finding assigned workspaces of user by ID:", err);
        return callback(err, null);
      }

      try {
        // Map each workspace to a Promise that fetches its members
        const workspacePromises = results.map((row) => {
          return new Promise((resolve, reject) => {
            pool.query(getMemQuery, [row.id], (memberErr, memberResults) => {
              if (memberErr) return reject(memberErr);
              const members = memberResults.map((r) => ({
                id: r.userId,
                name: r.name,
                email: r.email,
                bgColor: bgColorOptions[r.userId % bgColorOptions.length],
                photoPath: r.photoPath
                  ? `https://kdjkcdkapjgimrnugono.supabase.co/storage/v1/object/public/images/${r.photoPath}`
                  : null,
                initials: r.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase(),
              }));

              resolve({
                photoPath: row.photo
                  ? `https://kdjkcdkapjgimrnugono.supabase.co/storage/v1/object/public/images/${row.photo}`
                  : null,
                initials: row.managerName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase(),
                id: row.id,
                workspaceName: row.workspaceName,
                dateCreate: row.dateCreate,
                description: row.description || "",
                isPending: row.isPending, // Will always be 0 (false) now
                joinWorkSpace: row.joinWorkSpace,
                members: members, // Only accepted members
                role: row.role,
              });
            });
          });
        });

        // Wait for all workspace member queries to complete
        const workspaces = await Promise.all(workspacePromises);
        return callback(null, workspaces);
      } catch (err) {
        console.error("Error fetching members:", err);
        return callback(err, null);
      }
    });
  }

  static findMyWorkSpaceByUserId(userId, callback) {
    const query = `
    SELECT 
      w.WorkSpace as id, 
      w.workspacename as workspaceName, 
      w.dateCreate,
      w.description,
      j.joinWorkSpace,
      j.role,
      u.photoPath,
      u.name,
      u.userId
    FROM 
      joinWorkSpace j 
    JOIN 
      WorkSpace w ON j.WorkSpace = w.WorkSpace 
    JOIN
      User u on j.userId = u.userId
    WHERE 
      j.userId = ? AND j.isManager = TRUE AND j.isPending = 0
  `;

    const getMemQuery = `
    SELECT 
      j.joinWorkSpace,
      u.userId,
      u.name,
      u.email,
      u.photoPath
    FROM joinWorkSpace j 
    JOIN User u ON j.userId = u.userId
    WHERE j.WorkSpace = ? AND j.isPending = 0
  `;

    pool.query(query, [userId], async (err, results) => {
      if (err) {
        console.error("Error finding managed workspaces of user by ID:", err);
        return callback(err, null);
      }

      try {
        // Map each workspace to a Promise that fetches its members
        const workspacePromises = results.map((row) => {
          return new Promise((resolve, reject) => {
            pool.query(getMemQuery, [row.id], (memberErr, memberResults) => {
              if (memberErr) return reject(memberErr);
              const members = memberResults.map((r) => ({
                id: r.userId,
                name: r.name,
                email: r.email,
                bgColor: bgColorOptions[r.userId % bgColorOptions.length],
                photoPath: r.photoPath
                  ? `https://kdjkcdkapjgimrnugono.supabase.co/storage/v1/object/public/images/${r.photoPath}`
                  : null,
                initials: r.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase(),
              }));

              resolve({
                id: row.id,
                workspaceName: row.workspaceName,
                dateCreate: row.dateCreate,
                description: row.description || "",
                isPending: false, // Always false for accepted memberships
                joinWorkSpace: row.joinWorkSpace,
                bgColor: bgColorOptions[row.userId % bgColorOptions.length],
                photoPath: row.photoPath
                  ? `https://kdjkcdkapjgimrnugono.supabase.co/storage/v1/object/public/images/${row.photoPath}`
                  : null,
                initials: row.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase(),
                members: members, // Only accepted members
                role: row.role || "Admin",
              });
            });
          });
        });

        // Wait for all workspace member queries to complete
        const workspaces = await Promise.all(workspacePromises);
        return callback(null, workspaces);
      } catch (err) {
        console.error("Error fetching members:", err);
        return callback(err, null);
      }
    });
  }

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

  static createTask(TaskData, callback) {
    const query =
      "INSERT INTO Task (taskname, WorkSpace, priority, dateBegin, dateEnd, trash, StateCompletion, description) values (?, ?,?, ?,?, ?, ?, ?)";
    const query2 =
      "INSERT INTO AssignTask  (joinWorkSpace, TaskId) values (?, ?)";
    const priority = priorityMap[TaskData.priority];
    const dateEnd = formatDate(TaskData.dateEnd);
    console.log(dateEnd);
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

  static leaveWorkspace(userId, workspaceId, callback) {
    // First, check if the user is part of this workspace
    const checkQuery =
      "SELECT joinWorkSpace, isManager FROM joinWorkSpace WHERE userId = ? AND WorkSpace = ?";

    pool.query(checkQuery, [userId, workspaceId], (err, results) => {
      if (err) {
        console.error("Error checking workspace membership:", err);
        return callback(err, null);
      }

      if (results.length === 0) {
        return callback(
          { message: "User is not a member of this workspace" },
          null
        );
      }

      const isManager = results[0].isManager;

      // If the user is a manager, check if they are the ONLY manager before allowing them to leave
      if (isManager) {
        const checkManagersQuery =
          "SELECT COUNT(*) as managerCount FROM joinWorkSpace WHERE WorkSpace = ? AND isManager = true";

        pool.query(checkManagersQuery, [workspaceId], (err, managerResults) => {
          if (err) {
            console.error("Error checking managers count:", err);
            return callback(err, null);
          }

          const totalManagers = managerResults[0]?.managerCount || 0;

          // If they're the only manager, don't allow them to leave
          if (totalManagers === 1) {
            return callback(
              {
                message:
                  "You are the only manager of this workspace. Please assign another manager or delete the workspace instead.",
              },
              null
            );
          } else {
            // If there are other managers, proceed with removing their association
            const deleteJoinQuery =
              "DELETE FROM joinWorkSpace WHERE userId = ? AND WorkSpace = ?";

            pool.query(
              deleteJoinQuery,
              [userId, workspaceId],
              (err, deleteResult) => {
                if (err) {
                  console.error("Error removing user from workspace:", err);
                  return callback(err, null);
                }

                return callback(null, {
                  success: true,
                  message: "Successfully left the workspace",
                });
              }
            );
          }
        });
      } else {
        // If they're not a manager, they can leave freely
        const deleteJoinQuery =
          "DELETE FROM joinWorkSpace WHERE userId = ? AND WorkSpace = ?";

        pool.query(
          deleteJoinQuery,
          [userId, workspaceId],
          (err, deleteResult) => {
            if (err) {
              console.error("Error removing user from workspace:", err);
              return callback(err, null);
            }

            return callback(null, {
              success: true,
              message: "Successfully left the workspace",
            });
          }
        );
      }
    });
  }
}

module.exports = WorkSpace;
