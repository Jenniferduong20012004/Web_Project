const express = require("express");
const router = express.Router();
const updateWorkSpaceController = require("../controllers/updateWorkSpaceController");

router.post("/", updateWorkSpaceController.updateWorkSpace);

module.exports = router;