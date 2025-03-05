import express from 'express'
const pool = require("../db/connect");
import jwt from 'jsonwebtoken'
const router = express.Router()
router.post ("login", (req, res) =>{
    const sql = "SELECT * from USER where email = ? and password = ?";
    if (err) return res.json ({loginStatus: false, Error: "Query error"});
    if (result.length >0){
        const email = result [0].email;
        const tolen = jwt.sign ({
            role : "user", email : email},
        "jwt_secret_key",
    {expiresIn: "1d"})
    }
})
export {router as loginRoute}
