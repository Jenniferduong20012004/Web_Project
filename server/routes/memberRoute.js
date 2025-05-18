const express = require("express");
const router = express.Router();
const memberController = require("../controllers/memberController");

router.post("/addMember", memberController.addMember);
router.post("/getMember", memberController.getMembers);
router.post("/getActiveMembers", memberController.getActiveMembers);
router.post("/deleteMember", memberController.deleteMember);
router.post("/updateMemberRole", memberController.updateMemberRole);
router.post("/respondToInvitation", memberController.respondToInvitation);
router.post("/getUserInvitations", memberController.getUserInvitations);
router.post("/getCurrentUserRole", memberController.getCurrentUserRole);

module.exports = router;