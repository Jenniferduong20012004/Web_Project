const express = require("express");
const multer  = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage })
const router = express.Router();
const addTaskController = require("../controllers/addTaskController");
router.post("/addTask", addTaskController.addTask);
router.post("/addFile", upload.single("uploaded_file"),addTaskController.addFile);
module.exports = router;