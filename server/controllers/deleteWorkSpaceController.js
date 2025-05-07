const Workspace = require("../model/WorkSpace");

exports.deleteWorkSpace = (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: true, message: "Please provide workspace ID" });
  }

  // Log the request data for debugging
  console.log("Delete workspace request data:", { id });

  Workspace.delete(id, (err, result) => {
    if (err) {
      console.error("Error deleting workspace:", err);
      return res.status(500).json({ error: true, message: "Error when deleting workspace: " + err.message });
    }

    console.log("Delete workspace successful!");
    res.status(200).json({ success: true, message: "Workspace deleted successfully" });
  });
};