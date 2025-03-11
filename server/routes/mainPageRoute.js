const express = require("express");
const router = express.Router();
const workSpaceController = require ("../controllers/workSpaceController")
router.post ("/mainpage", (req, res) =>{
    const user= req.query.id;
    if (!user.id){
        return res.status(401).json({ success: false, message: "User ID is required" });
    }
    res.json({ success: true, user }); 
})
module.exports = router;