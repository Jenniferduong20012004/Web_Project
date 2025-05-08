const express = require("express");
const router = express.Router();
const trashTaskController = require("../controllers/trashTaskController");

router.post("/getTrashTask", trashTaskController.getTrashTask);
router.post("/restoreTask", trashTaskController.restoreTask);

module.exports = router;