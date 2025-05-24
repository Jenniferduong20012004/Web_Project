const express = require("express");
const router = express.Router();
const workspaceController = require("../controllers/workspaceController");

router.post("/getWorkspaces", workspaceController.getWorkspaces);
router.post("/addWorkSpace", workspaceController.addWorkSpace);
router.post("/updateWorkSpace", workspaceController.updateWorkSpace);
router.post("/deleteWorkSpace", workspaceController.deleteWorkSpace);
router.post("/checkWorkspaceRole", workspaceController.checkWorkspaceRole);
router.post("/leaveWorkspace", workspaceController.leaveWorkspace);

module.exports = router;