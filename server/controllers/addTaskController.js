const Workspace = require("../model/WorkSpace");

exports.addTask = (req, res) => {
  console.log("=== DEBUG BACKEND RECEIVED ===");
  console.log("Full req.body:", JSON.stringify(req.body, null, 2));
  console.log("assignedTo:", req.body.assignedTo);

  const {
    taskname,
    description,
    workspaceId,
    StateCompletion,
    priority,
    dateBegin,
    dateEnd,
    assignedTo,
  } = req.body;

  if (assignedTo && assignedTo.length > 0) {
    assignedTo.forEach((member, index) => {
      console.log(`Member ${index}:`, member);
      console.log(`joinWorkSpace value:`, member.joinWorkSpace);
      console.log(`typeof joinWorkSpace:`, typeof member.joinWorkSpace);
    });
  }

  const TaskData = {
    taskname,
    description,
    workspaceId,
    StateCompletion,
    priority,
    dateBegin,
    dateEnd,
    assignedTo,
  };

  console.log("Calling Workspace.createTask with:", TaskData);

  Workspace.createTask(TaskData, (err, result) => {
    if (err) {
      console.error("Error creating task", err);
      return res
        .status(500)
        .json({ error: true, message: "Error creating task" });
    }

    console.log("Task created successfully with result:", result);
    res.status(201).json({ success: true, taskId: result.id });
  });
};

exports.addFile = (req, res) => {
  try {
    const id = req.body.taskId;
    const file = req.file;
    Workspace.addFileToSupa(id, file, (err, result) => {
      if (err) {
        console.error("Error add file", err);
        return res.status(500).json({ error: true, message: "Error add file" });
      }
      res.status(201).json({ success: true });
    });
  } catch (e) {
    console.log(e);
  }
};
