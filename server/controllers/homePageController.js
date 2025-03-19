const authMiddleware = require("../middlewares/auth");

exports.signInHomePage = [authMiddleware, (req, res) => {
  const userId = req.user.id; 

}];
