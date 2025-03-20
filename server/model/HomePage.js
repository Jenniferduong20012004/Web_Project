const pool = require("../db/connect");
class HomePage {
  
  static findMyAssignedWorkSpaceByUserId(userId, callback) {
    const query = "SELECT * FROM JoinWorkSpace WHERE userId = ? AND isManager = FALSE";
    
    pool.query(query, [userId], (err, results) => {
      if (err) {
        console.error("Error finding workspace of user by ID:", err);
        return callback(err, null);
      }
      const workspaces = results.map(row => new WorkSpace(row.id, row.workspaceName, row.dateCreate));
      
      return callback(null, workspaces);
    });
  }
  static findMyAssignedWorkSpaceByUserId(userId, callback) {
    const query = "SELECT * FROM JoinWorkSpace WHERE userId = ? AND isManager = TRUE";
    
    pool.query(query, [userId], (err, results) => {
      if (err) {
        console.error("Error finding workspace of user by ID:", err);
        return callback(err, null);
      }
      const workspaces = results.map(row => new WorkSpace(row.id, row.workspaceName, row.dateCreate));
      
      return callback(null, workspaces);
    });
  }
  }
  
  module.exports = HomePage;
  