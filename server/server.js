const express = require("express");
const pool = require("./db/connect");
const cors = require("cors");
const { createUser } = require("./model/User");

const app = express();
app.use(cors());
app.use(express.json());

// API Signup
app.post("/signup", (req, res) => {
  const { userName, email, passWord, confirmPassword } = req.body;

  if (!userName || !email || !passWord || !confirmPassword) {
      return res.status(400).json({ error: true, message: "Please fill in all fields!" });
  }

  if (passWord !== confirmPassword) {
      return res.status(400).json({ error: true, message: "Passwords do not match!" });
  }

  pool.query("SELECT * FROM User WHERE email = ?", [email], (err, results) => {
      if (err) {
          return res.status(500).json({ error: true, message: "System error!" });
      }

      if (results.length > 0) {
          return res.status(400).json({ error: true, message: "Email already exists!" });
      }

      createUser(userName, email, passWord, (err, data) => {
          if (err) {
              return res.status(500).json({ error: true, message: "Error creating account!" });
          }
          console.log("Signup successful!");
          res.status(201).json({ success: true, message: "Signup successful!" });
      });
  });
});

app.post("/login", (req, res) => {
  res.status(501).json({ message: "Not implemented yet." });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});