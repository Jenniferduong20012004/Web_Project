const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const homePageRoute = require ("./homePageRoute")
const dashBoardRoute = require ("./dashBoardRoute")
const addWorkSpaceRoute = require ("./addWorkspaceRoute")


router.use("/", authRoutes);
router.use ("/", homePageRoute);
router.use ("/getDashBoard", dashBoardRoute);
router.use ("/addWorkSpace", addWorkSpaceRoute);
router.use ("/getHomePageMyWorkSpace", homePageRoute);
module.exports = router;