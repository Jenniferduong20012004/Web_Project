const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const loginRoute = require ("./LoginRoute.js")
router.use("/", authRoutes);
router.use ("/login", loginRoute)
module.exports = router;