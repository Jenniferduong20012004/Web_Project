const pool = require("../db/connect");
const supabase = require("../db/superbaseClient");
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
  1: "High",
  2: "Medium",
  3: "Low",
};
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + 1);
  return date.toISOString().split("T")[0]; // returns 'YYYY-MM-DD'
};

class DashBoard {
  static getMemberFromWorkspace(workspaceId, callback) {
    const query =
      "SELECT u.userId, u.name, u.email, j.role, j.isManager, j.isPending, j.dateJoin FROM joinWorkSpace j JOIN User u ON j.userId = u.userId WHERE j.WorkSpace = ?;";
    pool.query(query, [workspaceId], (err, result) => {
      if (err) {
        console.error("Error finding user by workSpaceId:", err);
        return callback(err, null);
      }
      const members = result.map((row) => ({
        userId: row.userId,
        userName: row.name,
        email: row.email,
        role: row.role,
        isManager: row.isManager,
        isPending: row.isPending,
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
        u.photoPath AS photo,
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
      SELECT u.userId, u.name, u.email, j.role, j.isManager, j.isPending, j.dateJoin, j.joinWorkSpace, u.photoPath
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
          const bgColor =
            bgColorOptions[row.assignedUserId % bgColorOptions.length];
          let photoLink = null;
          if (row.photo) {
            photoLink = `https://kdjkcdkapjgimrnugono.supabase.co/storage/v1/object/public/images/${row.photo}`;
          }
          const user = {
            id: row.assignedUserId,
            name: row.assignedUserName,
            email: row.assignedUserEmail,
            photoPath: photoLink,
            initials,
            bgColor,
          };
          // console.log (mapPriority[row.priority]);
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
            photoPath: `https://kdjkcdkapjgimrnugono.supabase.co/storage/v1/object/public/images/${row.photo}`,
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
  static getTaskDetail = async (taskId, workspaceId) => {
    const query = `
    SELECT 
      t.TaskId,
      t.taskname,
      t.description,
      t.StateCompletion,
      t.priority,
      t.filePath,
      t.dateEnd,
      t.WorkSpace,
      u.userId AS assignedUserId,
      u.name AS assignedUserName,
      u.email AS assignedUserEmail,
      u.photoPath as photo
    FROM Task t
    LEFT JOIN AssignTask at ON t.TaskId = at.TaskId
    LEFT JOIN joinWorkSpace jw ON at.joinWorkSpace = jw.joinWorkSpace
    LEFT JOIN User u ON jw.userId = u.userId
    WHERE t.TaskId = ?;
  `;
    const queryGetSubtask = `Select * from SubTask where SubTakId = ?`;

    const queryAvaMem = `
    SELECT * FROM joinWorkSpace 
    LEFT JOIN User ON joinWorkSpace.userId = User.userId 
    WHERE joinWorkSpace.WorkSpace = ?;
  `;

    const bgColorOptions = [
      "bg-blue-700",
      "bg-orange-500",
      "bg-purple-600",
      "bg-green-600",
      "bg-red-600",
    ];

    return new Promise(async (resolve, reject) => {
      try {
        // Get available members
        const members = await new Promise((resolve, reject) => {
          pool.query(queryAvaMem, [workspaceId], (err, results) => {
            if (err) return reject(err);
            // console.log (link);
            const mappedMembers = results.map((row) => {
              let link = null;
              if (row.photoPath != null) {
                link = `https://kdjkcdkapjgimrnugono.supabase.co/storage/v1/object/public/images/${row.photoPath}`;
              }

              return {
                id: row.userId,
                name: row.name,
                email: row.email,
                photoPath: link,
                initials: row.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase(),
                bgColor: bgColorOptions[row.userId % bgColorOptions.length],
              };
            });

            resolve(mappedMembers);
          });
        });
        const subtasks = await new Promise((resolve, reject) => {
          pool.query(queryGetSubtask, [taskId], (err, results) => {
            if (err) return reject(err);

            const mappedSubtask = results.map((row) => ({
              id: row.SubTakId,
              title: row.subtaskName,
              completed: row.status,
            }));

            resolve(mappedSubtask);
          });
        });

        // Get task details
        pool.query(query, [taskId], async (err, rows) => {
          if (err) return reject(err);

          if (rows.length === 0) return resolve(null);

          const row0 = rows[0];
          const task = {
            id: row0.TaskId,
            title: row0.taskname,
            description: row0.description,
            status: mapState(row0.StateCompletion),
            priority: mapPriority[row0.priority],
            dueDate: formatDate(row0.dateEnd),
            assignedTo: [],
            assets: [],
            subtasks: subtasks,
            availableMembers: members,
          };

          // Handle file if present
          if (row0.filePath) {
            const fileName = row0.filePath;

            const fileExt = fileName.split(".").pop().toLowerCase();
            task.assets.push({
              id: 1,
              name: fileName,
              type: fileExt,
              filePath: `https://kdjkcdkapjgimrnugono.supabase.co/storage/v1/object/public/taskfile/${fileName}`,
            });
          }

          // Populate assigned users
          const seenUsers = new Set();
          rows.forEach((row) => {
            if (!row.assignedUserId || seenUsers.has(row.assignedUserId))
              return;

            const initials = row.assignedUserName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase();

            let link = null;
            if (row.photo != null) {
              link = `https://kdjkcdkapjgimrnugono.supabase.co/storage/v1/object/public/images/${row.photo}`;
            }
            task.assignedTo.push({
              id: row.assignedUserId,
              name: row.assignedUserName,
              email: row.assignedUserEmail,
              photoPath: link,
              initials,
              bgColor:
                bgColorOptions[row.assignedUserId % bgColorOptions.length],
            });

            seenUsers.add(row.assignedUserId);
          });

          resolve(task);
        });
      } catch (err) {
        reject(err);
      }
    });
  };

  static getAllTask(workspaceId, callback) {
    const query = `
    SELECT t.*, w.workspacename 
    FROM Task t 
    JOIN WorkSpace w ON t.WorkSpace = w.WorkSpace 
    WHERE t.WorkSpace = ? AND t.trash = FALSE;
  `;

    const query2 = `
    SELECT u.name, u.photoPath
    FROM AssignTask a
    JOIN joinWorkSpace j ON a.joinWorkSpace = j.joinWorkSpace
    JOIN User u ON j.userId = u.userId
    WHERE a.TaskId = ?
  `;

    pool.query(query, [workspaceId], (err, results) => {
      if (err) {
        console.error("Error finding task of workspace:", err);
        return callback(err, null);
      }

      const currentDate = new Date();

      const taskPromises = results.map((row) => {
        return new Promise((resolve, reject) => {
          pool.query(query2, [row.TaskId], (err2, assignedUsersResult) => {
            if (err2) {
              return reject(err2);
            }
            const assignedUsers = assignedUsersResult.map((u) => {
              let photoLink = null;
              if (u.photoPath) {
                photoLink = `https://kdjkcdkapjgimrnugono.supabase.co/storage/v1/object/public/images/${u.photoPath}`;
              }
              return {
                name: u.name,
                photoPath: photoLink,
              };
            });

            const endDate = new Date(row.dateEnd);
            const daysLeft = Math.ceil(
              (endDate - currentDate) / (1000 * 60 * 60 * 24)
            );

            // Count status
            const status = row.StateCompletion;
            // console.log (status);

            resolve({
              task: {
                id: row.TaskId,
                title: row.taskname,
                description: row.description,
                daysLeft,
                priority:
                  row.priority === 1
                    ? "High"
                    : row.priority === 2
                    ? "Medium"
                    : "Low",
                assignedUsers,
                status,
              },
            });
          });
        });
      });

      Promise.all(taskPromises)
        .then((taskDataArray) => {
          let todo = 0,
            inProgress = 0,
            completed = 0;
          const tasks = [];
          taskDataArray.forEach(({ task }) => {
            if (task.daysLeft >= 0 && task.daysLeft < 7) {
              tasks.push(task);
            }
            // console.log(task.daysLeft);
            // Status counters
            if (task.status === 1) todo++;
            else if (task.status === 2) inProgress++;
            else if (task.status === 3) completed++;
          });
          // console.log(todo);

          const summary = {
            totalTasks: results.length,
            todo,
            inProgress,
            completed,
            tasks,
          };

          return callback(null, summary);
        })
        .catch((err) => {
          console.error("Error retrieving assigned users for tasks:", err);
          return callback(err, null);
        });
    });
  }
}

module.exports = DashBoard;
