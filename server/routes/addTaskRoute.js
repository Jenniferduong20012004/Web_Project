const express = require("express");
const router = express.Router();
const addTaskController = require("../controllers/addTaskController");
router.post("/addTask", addTaskController.addTask);
module.exports = router;