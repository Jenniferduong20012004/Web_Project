const express = require("express");
const router = express.Router();
const userProfileController = require("../controllers/userProfileController");
router.post("/getProfile", userProfileController.userProfileControl);
router.post ("/updateProfile", userProfileController.updateUsername)
module.exports = router;