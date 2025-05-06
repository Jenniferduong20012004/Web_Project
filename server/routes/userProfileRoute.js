const express = require("express");
const router = express.Router();
const userProfileController = require("../controllers/userProfileController");
router.post("/getProfile", userProfileController.userProfileControl);
module.exports = router;