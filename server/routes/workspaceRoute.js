const express = require("express");
const router = express.Router();
const workspaceController = require("../controllers/workspaceController");

router.post("/addWorkSpace", workspaceController.addWorkSpace);
router.post("/updateWorkSpace", workspaceController.updateWorkSpace);
router.post("/deleteWorkSpace", workspaceController.deleteWorkSpace);
router.post("/checkWorkspaceRole", workspaceController.checkWorkspaceRole);

module.exports = router;