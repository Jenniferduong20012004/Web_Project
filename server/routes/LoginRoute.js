const express = require("express");
const pool = require("../db/connect");
const router = express.Router()
const loginController = require("../controllers/singIn.js");

router.post("/login", loginController.login);

module.exports = router;