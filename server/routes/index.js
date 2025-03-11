const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const homePageRoute = require ("./homePageRoute")

router.use("/", authRoutes);
router.use ("/", homePageRoute);
module.exports = router;