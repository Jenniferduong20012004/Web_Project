import Login from "./views/Login"
import Signup from "./views/Signup";
import Homepage from "./views/Homepage";
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/homepage" element={<Homepage />} />
    </Routes>
  );
}

export default App


