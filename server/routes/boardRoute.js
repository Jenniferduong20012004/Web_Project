const express = require("express");
const router = express.Router();
const boardController = require("../controllers/boardController");

// router.post("/getBoard", boardController.getWorkSpaceBoard);
router.get("/getBoard/:workspaceId", boardController.getWorkSpaceBoard);

module.exports = router;