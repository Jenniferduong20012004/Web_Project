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

exports.updateUsername = (req, res) => {
  const { id, username } = req.body;

  if (!username) {
    return res
      .status(400)
      .json({ error: true, message: "Please fill in username field!" });
  }

  User.updateUserNameById(id,username, (err, user) => {
    if (err) {
      return res.status(500).json({
        error: true,
        message: "Database error",
      });
    }
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User not found",
      });
    }

    res.status(201).json({
      success: true,
      message: "Update successful!",
    });

    // });
  });
};
