const express = require("express");
const router = express.Router();
const deleteWorkSpaceController = require("../controllers/deleteWorkSpaceController");

router.post("/deleteWorkSpace", deleteWorkSpaceController.deleteWorkSpace);

module.exports = router;