const Workspace = require("../model/WorkSpace");
exports.addTask = (req, res) => {
    const {taskname,description, workspaceId,StateCompletion,priority,dateBegin,dateEnd,assignedTo } = req.body;

    const TaskData = { taskname,description, workspaceId,StateCompletion,priority,dateBegin,dateEnd,assignedTo};
    Workspace.createTask (TaskData, (err, result)=>{
        if (err) {
            console.error("Error creating task", err);
            return res.status(500).json({ error: true, message: "Error creating task" });
        }
        res.status(201).json({ success: true, taskId: result.id});

    });

};
exports.addFile = (req, res) =>{
    try{
        const id = req.body.taskId;
        const file = req.file;
        Workspace.addFileToSupa(id, file, (err, result)=>{
            if (err) {
            console.error("Error add file", err);
            return res.status(500).json({ error: true, message: "Error add file" });
        }
        res.status(201).json({ success: true});

        })

    }
    catch (e){
        console.log(e);
    }
}
