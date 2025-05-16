const Dashboard = require("../model/DashBoard");

exports.getTask = (req, res) => {
  const { taskId, workspaceId } = req.body;

  if (!taskId) {
    return res
      .status(400)
      .json({ success: false, message: "taskId is required!" });
  }

  Dashboard.getTaskDetail(taskId, workspaceId)
    .then(task => {
      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }

      return res.status(200).json({
        success: true,
        task: task,
      });
    })
    .catch(err => {
      console.error("Error fetching task:", err);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    });
    
};
exports.updateTask = (req, res) => {
  const {newTask, originalTask} = req.body;
  Dashboard.updateTask(newTask, originalTask, (err, result) => {
    if (result.success){
    return res.status (200).json({
      success: true
    })
    }
    return res.status(500).json({
        success: false,
        message: "Internal server error",
      });

    // console.log("Create workspace successful!");
    // res.status(201).json({ success: true, ws: result });
  })

}