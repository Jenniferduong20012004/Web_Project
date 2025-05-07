const DashBoard = require("../model/DashBoard");
exports.getWorkSpaceDashboard = (req, res) => {
    const {workspace} = req.body;
    if (!workspace){
        return res.status(400).json({ success: false, message: "Cannot get workspaceId" });
    }
    DashBoard.getAllTask (workspace, (err, result) =>{
        if (err) {
          return res.status(500).json({
            error: true,
            message: "Error when find task for workspace!",
          });
        }
        return res.status(200).json({
          success: true,
          message: "Get workspace successful",
          workspace: result, 
      });
      });
}
