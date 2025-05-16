const express = require("express");
const multer  = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage })
const router = express.Router();
const taskDetailController = require("../controllers/taskDetailController");
router.post("/getTaskDetail", taskDetailController.getTask);
router.post ("/updateTask", taskDetailController.updateTask)
module.exports = router;