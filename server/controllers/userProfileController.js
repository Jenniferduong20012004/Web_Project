const User = require("../model/User");

exports.userProfileControl = (req, res) => {
  const {userId} = req.body;
  if (!userId){
    return res.status(400).json({ success: false, message: "Cannot get UserId" });
  }
  
  User.findById(userId, (err, result) =>{
    if (err) {
      return res.status(500).json({
        error: true,
        message: "Error when find workspace!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Get user data successful",
      userInformation: result, 
  });
  });

};