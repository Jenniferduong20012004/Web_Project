const express = require("express");
const router = express.Router();
const addWorkSpaceController = require("../controllers/addWorkSpaceController");
router.post("/", addWorkSpaceController.addWorkSpace);
module.exports = router;