const express = require("express");
const router = express.Router();
const boardController = require("../controllers/boardController");
router.post("/getBoard", boardController.getWorkSpaceBoard);
module.exports = router;