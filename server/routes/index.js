const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const homePageRoute = require ("./homePageRoute")
const dashBoardRoute = require ("./dashBoardRoute")


router.use("/", authRoutes);
router.use ("/getWorkSpace", homePageRoute);
router.use ("/getDashBoard", dashBoardRoute)
module.exports = router;