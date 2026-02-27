import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute() {
    const { currentUser, isAdmin } = useAuth();

    if (!currentUser) {
        // If not logged in, redirect to login page
        return <Navigate to="/login" replace />;
    }

    if (!isAdmin) {
        // If logged in but not an admin, redirect to home page
        return <Navigate to="/" replace />;
    }

    // If logged in and is admin, render the child routes (Admin zone)
    return <Outlet />;
}
