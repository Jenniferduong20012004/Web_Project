import { Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Homepage from "./views/Homepage";
import Dashboard from "./views/Dashboard";
import Profile from "./views/Profile";
import Trash from "./views/Trash"; 
import Board from "./views/Board";
import TaskDetail from "./views/TaskDetail"; 
import Members from "./views/Members"; 
import ProtectedRoute from "./redux/ProtectedRoute";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/trash" element={<Trash />} />
      <Route path="/Board" element={<Board />} />
      <Route path="/TaskDetail" element={<TaskDetail />} />
      <Route path="/Members" element={<Members />} />
      <Route path="/ProtectedRoute" element={<ProtectedRoute />} />
    </Routes>
  );
}

export default App;