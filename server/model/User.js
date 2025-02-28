const pool = require("../db/connect");

const createUser = (userName, email, passWord, callback) => {
  const query = "INSERT INTO User (name, email, password) VALUES (?, ?, ?)";

  pool.query(query, [userName, email, passWord], (err, results) => {
    if (err) {
      console.error("Error when register/sign-up:", err);
      return callback(err, null);
    }
    return callback(null, results);
  });
};

module.exports = { createUser };
