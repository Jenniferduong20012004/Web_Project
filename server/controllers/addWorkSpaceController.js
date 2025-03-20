const Workspace = require("../model/WorkSpace");
exports.addWorkSpace = (req, res) => {
  console.log("Received request body:", req.body); 

  const { workspacename, description, dateCreate } = req.body;

  if (!workspacename || !description || !dateCreate) {
      return res.status(400).json({ error: true, message: "Please fill in all fields!" });
  }

  const WorkSpaceData = { workspacename, description, dateCreate };

  Workspace.create(WorkSpaceData, (err, result) => {
      if (err) {
          console.error("Error inserting workspace:", err);
          return res.status(500).json({ error: true, message: "Error when creating workspace" });
      }

      console.log("Create workspace successful!");
      res.status(201).json({ success: true, message: "Create workspace successful!" });
  });
};
