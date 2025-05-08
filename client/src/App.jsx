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

      {/* Protected Routes */}
      <Route
        path="/homepage"
        element={
          <ProtectedRoute>
            <Homepage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/:workspacedId"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/board/:workspacedId"
        element={
          <ProtectedRoute>
            <Board />
          </ProtectedRoute>
        }
      />
      <Route
        path="/board/:workspaceId/task/:taskId"
        element={
          <ProtectedRoute>
            <TaskDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trash/:workspacedId"
        element={
          <ProtectedRoute>
            <Trash />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/members/:workspacedId"
        element={
          <ProtectedRoute>
            <Members />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;