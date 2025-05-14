const express = require("express");
const router = express.Router();
const multer  = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage })
const userProfileController = require("../controllers/userProfileController");
router.post("/getProfile", userProfileController.userProfileControl);
router.post ("/updateProfile", userProfileController.updateUsername)
router.post ("/addProfilePicture", upload.single("uploaded_file") ,userProfileController.updatePicture);
module.exports = router;