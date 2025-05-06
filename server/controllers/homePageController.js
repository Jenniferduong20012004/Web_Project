const HomePage = require("../model/HomePage");
exports.signInHomePage = (req, res) => {
  const {userId} = req.body;
  if (!userId){
    return res.status(400).json({ success: false, message: "Cannot get UserId" });
  }
  
  HomePage.findMyAssignedWorkSpaceByUserId(userId, (err, result) =>{
    if (err) {
      return res.status(500).json({
        error: true,
        message: "Error when find workspace!",
      });
    }
    const joinWorkSpaces = result.map(row => ({
      joinWorkSpace: row.joinWorkSpace,
      isPending: row.isPending,
      isManager: row.isManager,
      dateJoin: row.dateJoin,
      userId: row.userId,
      WorkSpace: row.WorkSpace
    }));

    return res.json({ success: true, workspace: joinWorkSpaces });
  });

};
