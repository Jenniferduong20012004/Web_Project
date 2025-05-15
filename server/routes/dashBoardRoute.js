const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashBoardController");

router.get("/getDashBoard/:workspaceId", dashboardController.getWorkSpaceDashboard);

module.exports = router;