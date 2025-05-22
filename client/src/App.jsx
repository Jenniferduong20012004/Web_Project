import { Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import AuthWrapper from "./views/AuthWrapper"; // Add this import
import Homepage from "./views/Homepage";
import Dashboard from "./views/Dashboard";
import Profile from "./views/Profile";
import Trash from "./views/Trash";
import Board from "./views/Board";
import TaskDetail from "./views/TaskDetail";
import Members from "./views/Members";
import ProtectedRoute from "./redux/ProtectedRoute";
import LandingPage from "./views/LandingPage";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/landing" element={<LandingPage />} />

      {/* Animated Auth Routes */}
      <Route path="/login" element={<AuthWrapper />} />
      <Route path="/signup" element={<AuthWrapper />} />

      {/* Fallback routes for direct component access if needed */}
      <Route path="/login-direct" element={<Login />} />
      <Route path="/signup-direct" element={<Signup />} />

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
