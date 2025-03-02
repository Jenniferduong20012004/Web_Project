const pool = require("../db/connect");

const createUser = (userName, email, passWord, callback) => {
  const saltRounds = 10; 
  bcrypt.hash(passWord, saltRounds, (err, hash) => {
    if (err) {
      console.error("Error hashing password:", err);
      return callback(err, null);
    }

    const query = "INSERT INTO User (name, email, password) VALUES (?, ?, ?)";
    pool.query(query, [userName, email, hash], (err, results) => {
      if (err) {
        console.error("Error when registering/signing up:", err);
        return callback(err, null);
      }
      return callback(null, results);
    });
  });
};

const getUserByEmail = (email, callback) => {
  const query = "SELECT * FROM User WHERE email = ?";
  pool.query(query, [email], (err, results) => {
    if (err) {
      console.error("Error fetching user:", err);
      return callback(err, null);
    }
    return callback(null, results[0] || null);
  });
};

const checkPassword = (email, plainPassword, callback) => {
  getUserByEmail(email, (err, user) => {
    if (err) return callback(err, null);
    if (!user) return callback(null, false); 
    bcrypt.compare(plainPassword, user.password, (err, match) => {
      if (err) return callback(err, null);
      return callback(null, match);
    });
  });
};


module.exports = { createUser, getUserByEmail };
