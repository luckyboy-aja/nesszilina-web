import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AdminHeader from "./AdminHeader";

export default function ProtectedRoute() {
    const { currentUser, isAdmin } = useAuth();

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="admin-layout">
            <AdminHeader />
            <main className="admin-main">
                <Outlet />
            </main>
        </div>
    );
}
