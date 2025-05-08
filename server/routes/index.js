const express = require("express");
const router = express.Router();
    
const authRoutes = require("./authRoutes");
const homePageRoute = require ("./homePageRoute")
const memberRoute = require ("./memberRoute")
const addWorkSpaceRoute = require ("./addWorkspaceRoute")
const profileRoute = require ("./userProfileRoute")
const dashBoardRoute = require ("./dashboardRoute")
const updateWorkSpaceRoute = require("./updateWorkSpaceRoute");
const deleteWorkSpaceRoute = require("./deleteWorkSpaceRoute");
const addTaskRoute = require ("./addTaskRoute");
const boardRoute = require ("./boardRoute");
router.use("/", authRoutes);
router.use ("/", homePageRoute);
router.use ("/", memberRoute);
router.use ("/addWorkSpace", addWorkSpaceRoute);
router.use ("/getHomePageMyWorkSpace", homePageRoute);
router.use ("/", profileRoute);
router.use ("/", dashBoardRoute);
router.use("/updateWorkSpace", updateWorkSpaceRoute);
router.use("/deleteWorkSpace", deleteWorkSpaceRoute);
router.use ("/", addTaskRoute);
router.use ("/", boardRoute);
module.exports = router;
