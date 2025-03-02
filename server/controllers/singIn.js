const User = require("../model/User");
const bcrypt = require("bcrypt");

exports.login = (req, res) => {
  const {email, passWord} = req.body;

  if (!email || !passWord ) {
    return res
      .status(400)
      .json({ error: true, message: "Please fill in all fields!" });
  }
  User.findByEmail(email, (err, user) =>{
    if (err) {
      return res.status(500).json({
        error: true,
        message: "Database error",
      });
    }

  })

  User.findByEmail(email, (err, user) => {
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
    bcrypt.compare(passWord, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({
          error: true,
          message: "Error comparing passwords",
        });
      }
  
      if (!isMatch) {
        return res.status(401).json({
          error: true,
          message: "Incorrect password",
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      });
    });
    
    
  });
};
