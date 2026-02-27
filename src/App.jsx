import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes with Navbar and Footer */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>

          {/* Standalone Login Route (No Navbar/Footer) */}
          <Route path="/login" element={<Login />} />

          {/* Admin Protected Routes */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route index element={<Dashboard />} />
            {/* Future admin routes can be added here */}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
