const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const mainPageRoute = require ("./mainPageRoute")

router.use("/", authRoutes);
router.use ("/mainpage", mainPageRoute);
module.exports = router;