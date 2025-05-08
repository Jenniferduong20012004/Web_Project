const express = require("express");
const router = express.Router();
const membersController = require ("../controllers/membersController");
router.post("/getMember", membersController.member);
router.post ("/addMember", membersController.addMember);
module.exports = router;