const pool = require("../db/connect");
class DashBoard {
  static getAllTask (workspaceId, callback){
    const query ='select * from Task where WorkSpace = ?';
    pool.query(query, [workspaceId], (err, results) => {
      if (err) {
        console.error("Error finding task of workspace:", err);
        return callback(err, null);
      }
      console.log("Assigned workspace query results:", results);
      const tasks = results.map(row => {
        return {
          id: row.TaskId,
          taskname: row.taskname,
          priority: row.priority,
          dateBegin: row.dateBegin,
          dateEnd : row.dateEnd,
          StateCompletion: row.StateCompletion,
          description: row.description,
        };
      });
      console.log (tasks);
      return callback(null, tasks);
    });
  }
}
  
  module.exports = DashBoard;
  