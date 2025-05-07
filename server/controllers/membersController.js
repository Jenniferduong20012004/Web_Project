const workSpace = require("../model/WorkSpace");

exports.member = (req, res) => {
    const {workSpaceId} = req.body;
    if (!workSpaceId){
        return res.status(400).json({ success: false, message: "Cannot get UserId" });
    }  
    workSpace.getMemberFromWorkspace(workSpaceId,(err,result)=>{
        if (err) {
            return res.status(500).json({
              error: true,
              message: "Error when find members!",
            });
          }
          return res.status(200).json({
            success: true,
            message: "Get member successful",
            workspace: result, 
        });
    });
};


