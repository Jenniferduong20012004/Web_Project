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
  static getMemberFromWorkspace (workspaceId, callback){
    const query = "SELECT userId FROM joinWorkSpace WHERE WorkSpace = ?";
    pool.query (query, [workspaceId], (err, result) =>{
      if (err) {
        console.error("Error finding user by workSpaceId:", err);
        return callback(err, null);
      }
      return callback(null, results);
    });
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
        [false, true, 'Manager',dateCreate, userId, result.id],
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
}

module.exports = WorkSpace;
