const express = require("express");
const router = express.Router();
const homePageController = require ("../controllers/homePageController");
router.post("/homepage", homePageController.signInHomePage);
module.exports = router;