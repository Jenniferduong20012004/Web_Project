const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const homePageRoute = require ("./homePageRoute")
const dashBoardRoute = require ("./dashBoardRoute")
const addWorkSpaceRoute = require ("./addWorkspaceRoute")


router.use("/", authRoutes);
router.use ("/getWorkSpace", homePageRoute);
router.use ("/getDashBoard", dashBoardRoute);
router.use ("/addWorkSpace", addWorkSpaceRoute);
module.exports = router;