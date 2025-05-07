import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react"; 
import axios from "axios";

const WorkspaceCard = ({ workspace }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleMoveToWorkSpace = async () => {
    setIsLoading(true);
    const loadingToast = toast.loading("Getting in workspace...", {
      position: "top-right",
      pauseOnHover: false,
      closeOnClick: false,
      autoClose: false,
    });
    try {
      const data = await fetch("http://localhost:5000/getDashBoard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: workspace.id }),
      });
      
      const response = await response.json();


      if (response.data.success) {

        setTimeout(() => {
          setIsLoading(false);
          navigate("/dashboard");
        }, 2000);
      } else {
        toast.error(response.data.message || "Get into workspace fail", {
          position: "top-right",
        });
      }
    } catch (error) {
      if (error.response) {
        toast.error(
          error.response.data.message || "Invalid workspace credentials",
          {
            position: "top-right",
          }
        );
      } else if (error.request) {
        toast.error("Unable to connect to server. Please try again later.", {
          position: "top-right",
        });
      } else {
        toast.error("Error during get into workspace: " + error.message, {
          position: "top-right",
        });
      }
    } finally {
      toast.dismiss(loadingToast);
    }
  };
  return (
    <div
    onClick={handleMoveToWorkSpace}
      className="flex flex-col gap-3 border border-[#e9e7f2] rounded-lg bg-white"
      style={{ width: "270px", padding: "10px" }}
    >
      <div className={`h-28 rounded-lg ${workspace.backgroundGradient}`}></div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
            TT
          </div>
          <div className="ml-6">
            <div className="text-sm font-medium">{workspace.title}</div>
            <div className="text-xs text-gray-500">{workspace.subtitle}</div>
          </div>
        </div>

        <button className="text-gray-500 hover:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      <div className="flex" style={{ marginBottom: "10px" }}>
        {workspace.members.map((member, idx) => (
          <div
            key={member.id}
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white font-medium ${member.bgColor}`}
            style={{
              marginLeft: idx > 0 ? "-3px" : "0",
            }}
          >
            {member.initials}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkspaceCard;
