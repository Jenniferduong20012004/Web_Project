const HomePage = require("../model/HomePage");
exports.signInHomePage = (req, res) => {
  const {userId} = req.body;
  if (!userId){
    return res.status(400).json({ success: false, message: "Cannot get UserId" });
  }
  
  HomePage.findMyWorkSpaceByUserId(userId.id, (err, result) =>{
    if (err) {
      return res.status(500).json({
        error: true,
        message: "Error when find workspace!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Get workspace successful",
      workspace: workspaces, 
  });
  });

};
