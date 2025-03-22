import { Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Homepage from "./views/Homepage";
import Dashboard from "./views/Dashboard"; 
import Members from "./views/Members";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/members" element={<Members />} />
    </Routes>
  );
}

export default App;
