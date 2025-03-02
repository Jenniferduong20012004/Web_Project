const User = require("../model/User");
const bcrypt = require("bcrypt");

exports.login = (req, res) => {
  const {  email, passWord} = req.body;

  if (!email || !passWord ) {
    return res
      .status(400)
      .json({ error: true, message: "Please fill in all fields!" });
  }

  User.findByEmail(email, (err, user) => {
    if (err) {
      return res.status(500).json({
        error: true,
        message: "Database error",
      });
    }

    if (user) {
      return res.status(400).json({
        error: true,
        message: "Email already exists!",
      });
    }

    // Hash password
    const saltRounds = 10;
    bcrypt.hash(passWord, saltRounds, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({
          error: true,
          message: "Password encryption failed",
        });
      }

      // Create new user
      const userData = {
        name: userName,
        email: email,
        password: hashedPassword,
      };

      User.create(userData, (err, result) => {
        if (err) {
          return res.status(500).json({
            error: true,
            message: "Error when creating account!",
          });
        }

        console.log("Signup successful!");
        res.status(201).json({
          success: true,
          message: "Signup successful!",
        });
      });
    });
  });
};
