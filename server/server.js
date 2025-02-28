const express = require ('express')
const mysql = require ('mysql')
const cors = require ('cors')
const app = express()
app.use (cors())
const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'crud'
})
// create account
app.post ("/signup", async (req, res)=>{
    const {userName, email, passWord, confirmPassword}= req.body;
    if (!fullName){
        return res.statur (400).json ({error: true, message:"User Name is required"});
        
    }

})
app.get ("/login", (req, res) =>{
})
app.listen (5000, () => {console.log ("5000")})