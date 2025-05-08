const Workspace = require("../model/WorkSpace");

exports.updateWorkSpace = (req, res) => {
  const { id, workspacename, description } = req.body;

  if (!id || !workspacename || !description) {
    return res.status(400).json({ error: true, message: "Please provide workspace ID, name, and description" });
  }

  // Log the request data for debugging
  console.log("Update workspace request data:", { id, workspacename, description });

  const workspaceData = { id, workspacename, description };

  Workspace.update(workspaceData, (err, result) => {
    if (err) {
      console.error("Error updating workspace:", err);
      return res.status(500).json({ error: true, message: "Error when updating workspace: " + err.message });
    }

    console.log("Update workspace successful!");
    res.status(200).json({ success: true, workspace: result });
  });
};