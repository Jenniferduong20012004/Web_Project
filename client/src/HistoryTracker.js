import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const HistoryTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const prevPath = sessionStorage.getItem("currentPath");

    // Set current as previous for next visit
    sessionStorage.setItem("previousPath", prevPath || "");
    sessionStorage.setItem("currentPath", currentPath);
  }, [location]);

  return null; // This component just runs the effect
};

export default HistoryTracker;
