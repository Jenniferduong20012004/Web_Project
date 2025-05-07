const pool = require("../db/connect");
class DashBoard {
  static getMemberFromWorkspace (workspaceId, callback){
    const query = "SELECT u.userId, u.name, u.email, j.role, j.isManager, j.isPending, j.dateJoin FROM joinWorkSpace j JOIN User u ON j.userId = u.userId WHERE j.WorkSpace = ?;";
    pool.query (query, [workspaceId], (err, result) =>{
      if (err) {
        console.error("Error finding user by workSpaceId:", err);
        return callback(err, null);
      }
      const members = result.map(row => ({
        userId: row.userId,
        userName: row.name,
        email: row.email,
        role: row.role,
        isManager: row.isManager,
        isPending:row.isPending,
        dateJoin: row.dateJoin,
      }));
      return callback(null, members);
      
    });
  }
  static getAllTask (workspaceId, callback){
    const query ='select * from Task where WorkSpace = ?';
    pool.query(query, [workspaceId], (err, results) => {
      if (err) {
        console.error("Error finding task of workspace:", err);
        return callback(err, null);
      }
      console.log("Assigned workspace query results:", results);
      const tasksRaw = results.map(row => ({
        id: row.TaskId,
        taskname: row.taskname,
        priority: row.priority,
        dateBegin: row.dateBegin,
        dateEnd: row.dateEnd,
        StateCompletion: row.StateCompletion,
        description: row.description,
      }));
      
      let todo = 0, inProgress = 0, completed = 0;
      for (let task of tasksRaw) {
        if (task.StateCompletion === 0) todo++;
        else if (task.StateCompletion === 1) inProgress++;
        else if (task.StateCompletion === 2) completed++;
      }
      const tasks = tasksRaw.filter(task => task.StateCompletion !== 2);
    
      
      const summary = {
        totalTasks: tasks.length,
        todo,
        inProgress,
        completed,
        tasks,
      };
      return callback(null, summary);
    });
  }
}
  
  module.exports = DashBoard;
  