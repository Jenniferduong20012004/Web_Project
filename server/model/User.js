// const pool = require("../db/connect");

// const createUser = (userName, email, passWord, callback) => {
//   const query = "INSERT INTO User (name, email, password) VALUES (?, ?, ?)";

//   pool.query(query, [userName, email, passWord], (err, results) => {
//     if (err) {
//       console.error("Error when register/sign-up:", err);
//       return callback(err, null);
//     }
//     return callback(null, results);
//   });
// };

// module.exports = { createUser };

const pool = require("../db/connect");

class User {

  static create(userData, callback) {
    const { name, email, password } = userData;
    const query = "INSERT INTO User (name, email, password) VALUES (?, ?, ?)";

    pool.query(query, [name, email, password], (err, results) => {
      if (err) {
        console.error("Error creating user:", err);
        return callback(err, null);
      }
      return callback(null, results);
    });
  }

  static findByEmail(email, callback) {
    const query = "SELECT * FROM User WHERE email = ?";
    
    pool.query(query, [email], (err, results) => {
      if (err) {
        console.error("Error finding user by email:", err);
        return callback(err, null);
      }
      return callback(null, results.length > 0 ? results[0] : null);
    });
  }

  static findById(userId, callback) {
    const query = "SELECT * FROM User WHERE userId = ?";
    
    pool.query(query, [userId], (err, results) => {
      if (err) {
        console.error("Error finding user by ID:", err);
        return callback(err, null);
      }
      return callback(null, results.length > 0 ? results[0] : null);
    });
  }
}

module.exports = User;