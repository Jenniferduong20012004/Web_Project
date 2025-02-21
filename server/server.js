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
app.get ("/login", (req, res) =>{
    // res.json ({"users": ["userOne", "userTwo", "userThree"]})
})
app.listen (5000, () => {console.log ("5000")})