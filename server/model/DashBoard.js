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
      let todo = 0, inProgress = 0, completed = 0;
      for (let task of tasks) {
          if (task.StateCompletion === 0) todo++;
          else if (task.StateCompletion === 1) inProgress++;
          else if (task.StateCompletion === 2) completed++;
      }
      console.log (tasks);
      const summary = {
        totalTasks: tasks.length,
        todo,
        inProgress,
        completed,
        tasks,
      };
      console.log(todo);
      return callback(null, summary);
    });
  }
}
  
  module.exports = DashBoard;
  