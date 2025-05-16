const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

//////////////

// Task trash operations
router.post("/trashTask", taskController.trashTask);
router.post("/getTrashTask", taskController.getTrashTasks);
router.post("/restoreTrashTask", taskController.restoreTrashTask);
router.post("/permanentlyDeleteTask", taskController.permanentlyDeleteTask);

module.exports = router;