const jwt = require("jsonwebtoken");
const SECRET_KEY = "QunuChinNgoc";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: true, message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: true, message: "Invalid token" });
    }

    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
