
const pool = require("../db/connect");
class User {
  constructor(userId, email, password, name) {
    this.userId= userId;
    this.email = email;
    this.password = password;
    this.name = name;
  }
  static createByGoogle (){
    
  }
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
      if (results.length > 0) {
        const userData = results[0];
        const user = new User(userData.userId, userData.email, userData.password, userData.name); // Fix: use userData.userId
        return callback(null, user);
      }     
      return callback(null, null);
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