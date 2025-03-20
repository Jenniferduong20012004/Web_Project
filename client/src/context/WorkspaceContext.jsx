import React, { createContext, useContext, useState } from "react";

const WorkspaceContext = createContext();

export const WorkspaceProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("myWorkspace");
  const [currentWorkspace, setCurrentWorkspace] = useState(null);
  const [workspaces, setWorkspaces] = useState([]);

  const isWorkspaceInActiveTab = (workspace) => {
    if (!workspace) return false;
    return activeTab === "myWorkspace" ? workspace.isOwner : !workspace.isOwner;
  };

  return (
    <WorkspaceContext.Provider
      value={{
        activeTab,
        setActiveTab,
        currentWorkspace,
        setCurrentWorkspace,
        workspaces,
        setWorkspaces,
        isWorkspaceInActiveTab,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => useContext(WorkspaceContext);
