const pool = require("../db/connect");
function mapState(state) {
  switch (state) {
    case 1:
      return "TODO";
    case 2:
      return "IN-PROGRESS";
    case 3:
      return "COMPLETED";
    default:
      return "UNKNOWN";
  }
}
const mapPriority = {
  "High":1,
  "Medium":2,
  "Low":3,
};
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toISOString().split('T')[0]; // returns 'YYYY-MM-DD'
};

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
        jw.joinWorkSpace AS joinId,
        jw.isManager,
        jw.role,
        jw.dateJoin
      FROM Task t
      JOIN AssignTask at ON t.TaskId = at.TaskId
      JOIN joinWorkSpace jw ON at.joinWorkSpace = jw.joinWorkSpace
      JOIN User u ON jw.userId = u.userId
      WHERE t.WorkSpace = ?  AND t.trash = FALSE;
    `;
  
    const memberQuery = `
      SELECT u.userId, u.name, u.email, j.role, j.isManager, j.isPending, j.dateJoin, j.joinWorkSpace
      FROM joinWorkSpace j
      JOIN User u ON j.userId = u.userId
      WHERE j.WorkSpace = ?;
    `;
  
    pool.query(taskQuery, [workspaceId], (err, taskResult) => {
      if (err) {
        console.error("Error fetching tasks for workspace:", err);
        return callback(err, null);
      }
      pool.query(memberQuery, [workspaceId], (memberErr, memberResult) => {
        if (memberErr) {
          console.error("Error fetching members for workspace:", memberErr);
          return callback(memberErr, null);
        }
        const tasksMap = new Map();
        taskResult.forEach((row) => {
          console.log (row.StateCompletion)
          console.log (mapState(row.StateCompletion));
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
              priority: mapPriority[row.priority],
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
            id: row.joinWorkSpace,
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
    const query ='select * from Task where WorkSpace = ? AND trash = FALSE';
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
        if (task.StateCompletion === 1) todo++;
        else if (task.StateCompletion === 2) inProgress++;
        else if (task.StateCompletion === 3) completed++;
      }
    
      
      const summary = {
        totalTasks: tasksRaw.length,
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
  