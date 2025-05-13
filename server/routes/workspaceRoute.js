const express = require("express");
const router = express.Router();
const workspaceController = require("../controllers/workspaceController");

// Workspace CRUD operations
router.post("/addWorkSpace", workspaceController.addWorkSpace);
router.post("/updateWorkSpace", workspaceController.updateWorkSpace);
router.post("/deleteWorkSpace", workspaceController.deleteWorkSpace);

module.exports = router;