const express = require("express");
const router = express.Router();
const trashTaskController = require("../controllers/trashTaskController");

router.post("/getTrashTask", trashTaskController.getTrashTask);

module.exports = router;