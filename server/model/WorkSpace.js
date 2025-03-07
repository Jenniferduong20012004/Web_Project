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
}

module.exports = WorkSpace;
