const pool = require("../db/connect");
class WorkSpace {
  static create(workSpaceData, callback) {
    const { workspacename, description, dateCreate } = workSpaceData;
    const query = "INSERT INTO WorkSpace (workspacename, dateCreate, description) VALUES (?, ?, ?)";
    pool.query(query, [workspacename, dateCreate, description], (err, results) => {

      if (err) {
        console.error("Error creating workspace:", err);
        return callback(err, null);
      }
      return callback(null, results);
    });
  }

}

module.exports = WorkSpace;
