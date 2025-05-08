const pool = require("../db/connect");

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
        [false, true, 'Leader',dateCreate, userId, result.id],
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
