
const pool = require("../db/connect");
const supabase = require("../db/superbaseClient");
class User {
  constructor(userId, email, password, name) {
    this.userId= userId;
    this.email = email;
    this.password = password;
    this.name = name;
  }
  static createByGoogle (){
    
  }
  static addPicToSupa  = async (id, file, callback) => {
    let filePath=
        id  + "/" + file.name;
        console.log(filePath)
    const { data, error } = await supabase.storage
    .from("images")
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: true, 
    });


    if (error) {
      console.error("Upload error:", error);
      return callback({ success: false, error });
    }
    else{
      const query = "UPDATE User SET photoPath = ? WHERE userId = ?;";
      pool.query(query, [filePath, id], (err, result) => {
      if (err) {
        console.error("Error add file:", err);
        return callback(err, null);
      }
      return callback(null, { success: true });
    });
    }

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
  static updateUserNameById (userId, userName, callback){
    const query = "UPDATE user SET name = ? WHERE userId = ?";
    pool.query (query, [userName, userId ], (err, results) => {
      if (err) {
        console.error("Error finding user by ID:", err);
        return callback(err, null);
      }
      return callback(null, results); 
    });
  }
}

module.exports = User;