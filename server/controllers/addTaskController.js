const Workspace = require("../model/WorkSpace");
exports.addTask = (req, res) => {
    const {taskname,description, workspaceId,StateCompletion,priority,dateBegin,dateEnd,fileName,assignedTo } = req.body;

    const TaskData = { taskname,description, workspaceId,StateCompletion,priority,dateBegin,dateEnd,fileName,assignedTo};
    Workspace.createTask (TaskData, (err, result)=>{
        if (err) {
            console.error("Error creating task", err);
            return res.status(500).json({ error: true, message: "Error creating task" });
        }
        console.log("Create task successful!");
        Workspace.addFileToSupa (TaskData, result.id,(e, res)=>{
            if (e){
                console.error(err);
            }
        });
        res.status(201).json({ success: true, ws: result});

    });

};
