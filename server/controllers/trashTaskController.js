const WorkSpace= require("../model/WorkSpace");

exports.getTrashTask = (req, res) => {
    const {workspace} = req.body;
    if (!workspace){
        return res.status(400).json({ success: false, message: "Cannot get UserId" });
    }  

    WorkSpace.getTrashTask(workspace,(err,result)=>{
        if (err) {
            return res.status(500).json({
              error: true,
              message: "Error when find members!",
            });
          }
          return res.status(200).json({
            success: true,
            message: "Get trash task successful",
            trashTask: result, 
        });
    });
};
exports.restoreTask= (req, res) => {
  const {taskId} = req.body;
  console.log (taskId);
  if (!taskId){
      return res.status(400).json({ success: false, message: "Cannot get taskId" });
  }  

  WorkSpace.restoreTrashTask(taskId,(err,result)=>{
      if (err) {
          return res.status(500).json({
            error: true,
            message: "Error when find members!",
          });
        }
        res.status(200).json({ success: true });
  });
};
