const express = require("express");
const router = express.Router();
const dashboardController = require ("../controllers/dashBoardController");
router.post("/getDashBoard", dashboardController.getUserDashboard);
module.exports = router;