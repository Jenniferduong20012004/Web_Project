// const express = require("express");
// const cors = require("cors");
// const routes = require("./routes");

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use("/", routes);

// <<<<<<< HEAD
//   if (!userName || !email || !passWord || !confirmPassword) {
//       return res.status(400).json({ error: true, message: "Please fill in all fields!" });
//   }

//   if (passWord !== confirmPassword) {
//       return res.status(400).json({ error: true, message: "Passwords do not match!" });
//   }

//   pool.query("SELECT * FROM User WHERE email = ?", [email], (err, results) => {
//       if (err) {
//           return res.status(500).json({ error: true, message: "System error!" });
//       }

//       if (results.length > 0) {
//           return res.status(400).json({ error: true, message: "Email already exists!" });
//       }

//       createUser(userName, email, passWord, (err, data) => {
//           if (err) {
//               return res.status(500).json({ error: true, message: "Error creating account!" });
//           }
//           console.log("Signup successful!");
//           res.status(201).json({ success: true, message: "Signup successful!" });
//       });
//   });
// });

// app.post("/login", (req, res) => { 
//     const { email, passWord} = req.body;

//     if (!email || !passWord) {
//         return res.status(400).json({ error: true, message: "Please fill in all fields!" });
//     }
  
//     pool.query("SELECT * FROM User WHERE email = ?", [email], (err, results) => {
//         if (err) {
//             return res.status(500).json({ error: true, message: "System error!" });
//         }
  
//         createUser(userName, email, passWord, (err, data) => {
//             if (err) {
//                 return res.status(500).json({ error: true, message: "Error creating account!" });
//             }
//             console.log("Signup successful!");
//             res.status(201).json({ success: true, message: "SignIn successful!" });
//         });
//     });
// });

// app.listen(5000, () => {
//   console.log("Server is running on port 5000");
// =======
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// >>>>>>> d8bd114111257644d9445b00d4606654c45471d6
// });