const Workspace = require("../model/WorkSpace");
exports.addWorkSpace = (req, res) => {
  const { workspacename, description, dateCreate, userId } = req.body;

  if (!workspacename || !description || !dateCreate) {
      return res.status(400).json({ error: true, message: "Please fill in all fields!" });
  }

  const WorkSpaceData = { workspacename, description, dateCreate};

  Workspace.createForManager(userId,WorkSpaceData, (err, result) => {
      if (err) {
          console.error("Error inserting workspace:", err);
          return res.status(500).json({ error: true, message: "Error when creating workspace" });
      }

      console.log("Create workspace successful!");
      res.status(201).json({ success: true, ws: result});
  });
};
