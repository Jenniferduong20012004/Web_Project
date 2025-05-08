const express = require("express");
const router = express.Router();
const deleteWorkSpaceController = require("../controllers/deleteWorkSpaceController");

router.post("/", deleteWorkSpaceController.deleteWorkSpace);

module.exports = router;