const pool = require("../db/connect");
function mapState(state) {
  switch (state) {
    case 0:
      return "TODO";
    case 1:
      return "IN-PROGRESS";
    case 2:
      return "COMPLETED";
    default:
      return "UNKNOWN";
  }
}
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
  static getForBoard(workspaceId, callback) {
    const taskQuery = `
      SELECT
        t.TaskId,
        t.taskname,
        t.priority,
        t.dateBegin,
        t.dateEnd,
        t.StateCompletion,
        t.description AS taskDescription,
  
        u.userId AS assignedUserId,
        u.name AS assignedUserName,
        u.email AS assignedUserEmail,
  
        jw.isManager,
        jw.role,
        jw.dateJoin
      FROM Task t
      JOIN AssignTask at ON t.TaskId = at.TaskId
      JOIN joinWorkSpace jw ON at.joinWorkSpace = jw.joinWorkSpace
      JOIN User u ON jw.userId = u.userId
      WHERE t.WorkSpace = ?;
    `;
  
    const memberQuery = `
      SELECT u.userId, u.name, u.email, j.role, j.isManager, j.isPending, j.dateJoin
      FROM joinWorkSpace j
      JOIN User u ON j.userId = u.userId
      WHERE j.WorkSpace = ?;
    `;
  
    // First: run task query
    pool.query(taskQuery, [workspaceId], (err, taskResult) => {
      if (err) {
        console.error("Error fetching tasks for workspace:", err);
        return callback(err, null);
      }
  
      // Then: run member query
      pool.query(memberQuery, [workspaceId], (memberErr, memberResult) => {
        if (memberErr) {
          console.error("Error fetching members for workspace:", memberErr);
          return callback(memberErr, null);
        }
  
        // Parse tasks
        const tasksMap = new Map();
        taskResult.forEach((row) => {
          const taskId = row.TaskId;
          const initials = row.assignedUserName
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
  
          const bgColorOptions = [
            "bg-blue-700",
            "bg-orange-500",
            "bg-purple-600",
            "bg-green-600",
            "bg-red-600",
          ];
          const bgColor = bgColorOptions[row.assignedUserId % bgColorOptions.length];
  
          const user = {
            id: row.assignedUserId,
            name: row.assignedUserName,
            email: row.assignedUserEmail,
            initials,
            bgColor,
          };
  
          if (!tasksMap.has(taskId)) {
            tasksMap.set(taskId, {
              id: taskId,
              status: mapState(row.StateCompletion),
              title: row.taskname,
              description: row.taskDescription,
              priority: mapPriority(row.priority),
              assignedTo: [user],
              dueDate: formatDate(row.dateEnd),
            });
          } else {
            tasksMap.get(taskId).assignedTo.push(user);
          }
        });
  
        const members = memberResult.map((row) => {
          const initials = row.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
  
          const bgColorOptions = [
            "bg-blue-700",
            "bg-orange-500",
            "bg-purple-600",
            "bg-green-600",
            "bg-red-600",
          ];
          const bgColor = bgColorOptions[row.userId % bgColorOptions.length];
  
          return {
            id: row.userId,
            name: row.name,
            email: row.email,
            initials,
            bgColor,
          };
        });
  
        const summary = {
          tasks: Array.from(tasksMap.values()),
          user: members,
        };
  
        return callback(null, summary);
      });
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
  