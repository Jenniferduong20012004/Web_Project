

const pool = require("../db/connect");
class User {
  constructor(id, email, password, name) {
    this.id = id;
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
        const user = new User(userData.id, userData.email, userData.password, userData.name);
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
  static getUserData (id, callback){
    return {}
  }
}

module.exports = User;
