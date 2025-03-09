import Login from "./views/Login";
import Signup from "./views/Signup";
import Homepage from "./views/Homepage";
import Dashboard from "./views/Dashboard";
import Sidebar from "./component/Sidebar";
import Navbar from "./component/Navbar";
import { Routes, Route } from "react-router-dom";
import React from "react";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/sidebar" element={<Sidebar />} />
      <Route path="/navbar" element={<Navbar />} />
    </Routes>
  );
}

export default App;
