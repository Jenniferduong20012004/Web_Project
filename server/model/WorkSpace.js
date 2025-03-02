

const pool = require("../db/connect");
class WorkSpace {
  constructor(id, workspaceName,dateCreate) {
    this.id = id;
    this.workspaceName = workspaceName;
    this.dateCreate = dateCreate;
  }
  static createWorkSpace(workSpaceData, callback) {
    const { workspaceName, dateCreate } = workSpaceData;
    const query = "INSERT INTO WorkSpace (name, email, password) VALUES (?, ?, ?)";

    pool.query(query, [workspaceName, dateCretae], (err, results) => {
      if (err) {
        console.error("Error creating workspace:", err);
        return callback(err, null);
      }
      return callback(null, results);
    });
  }

  // static findById(userId, callback) {
  //   const query = "SELECT * FROM User WHERE userId = ?";
    
  //   pool.query(query, [userId], (err, results) => {
  //     if (err) {
  //       console.error("Error finding user by ID:", err);
  //       return callback(err, null);
  //     }
  //     return callback(null, results.length > 0 ? results[0] : null);
  //   });
  // }
}

module.exports = WorkSpace;
