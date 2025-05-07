const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const homePageRoute = require("./homePageRoute");
const dashBoardRoute = require("./dashBoardRoute");
const addWorkSpaceRoute = require("./addWorkspaceRoute");
const updateWorkSpaceRoute = require("./updateWorkSpaceRoute");
const deleteWorkSpaceRoute = require("./deleteWorkSpaceRoute");

router.use("/", authRoutes);
router.use("/", homePageRoute);
router.use("/getDashBoard", dashBoardRoute);
router.use("/addWorkSpace", addWorkSpaceRoute);
router.use("/updateWorkSpace", updateWorkSpaceRoute);
router.use("/deleteWorkSpace", deleteWorkSpaceRoute);
module.exports = router;
