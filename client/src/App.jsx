import ProtectedRoute from "./routes/ProtectedRoute";
import { Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import AgentDashboard from "./pages/AgentDashboard"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/agent-dashboard"
  element={
    <ProtectedRoute>
      <AgentDashboard />
    </ProtectedRoute>
  }
/>
    </Routes>
  )
}

export default App