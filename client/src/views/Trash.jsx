import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import TrashBin from "../component/trash/TrashBin";
import { useParams } from "react-router-dom";

const  Trash=() => {
    const { workspacedId } = useParams();
    const [trashTask, setTrashTask] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
      const fetchTrashtask = async ( workspacedId) => {

        try {
              setIsLoading(true);     
              const response = await fetch("http://localhost:5000/getTrashTask", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  workspace: workspacedId,
                }),
              });
              
              
              const data = await response.json();   
              if (data.success) {
                const trashTask = data.trashTask.map((row) => ({
                    id: row.TaskId,
                    taskname: row.taskname,
                    priority: row.priority,
                    StateCompletion: row.StateCompletion,
                }));
                setTrashTask ([...trashTask]);
                
              } else {
                toast.error(data.message || "Get into workspace fail", {
                  position: "top-right",
                });
              }
            } catch (error) {
              toast.error("Error: " + (error.message || "Unknown error"), {
                      position: "top-right",
                });
            } finally {
              setIsLoading(false);
            }
      };
      useEffect(() => {  
    
        fetchTrashtask( workspacedId);

      }, [workspacedId]);
    return (
        <div className="w-full min-h-screen flex flex-col">
            <div className="fixed top-0 right-0 left-0 z-20">
                <Navbar />
            </div>

            <div className="fixed left-0 top-16 h-screen z-10">
            <Sidebar workspaceId={workspacedId}/>
            </div>

            <div className="flex-1 flex flex-col !mt-16 bg-gray-50">
                <div className="flex-1 !p-8 md:p-6 overflow-auto !ml-50">
                    {/* TRASH BIN */}
                    <TrashBin trashTask= {trashTask}/>
                </div>
            </div>
        </div>
    );
}

export default Trash;