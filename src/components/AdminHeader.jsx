import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import "./AdminHeader.css";

export default function AdminHeader() {
    const { currentUser, logout, isSuperAdmin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    return (
        <header className="admin-header">
            <div className="admin-header-inner">
                <div className="admin-header-left">
                    <span className="admin-logo" onClick={() => navigate("/admin")}>
                        Admin
                    </span>
                    <nav className="admin-nav">
                        <button
                            className={`admin-nav-link ${location.pathname === "/admin" ? "active" : ""}`}
                            onClick={() => navigate("/admin")}
                        >
                            Dashboard
                        </button>
                        {isSuperAdmin && (
                            <button
                                className={`admin-nav-link ${location.pathname === "/admin/users" ? "active" : ""}`}
                                onClick={() => navigate("/admin/users")}
                            >
                                Používatelia
                            </button>
                        )}
                    </nav>
                </div>
                <div className="admin-header-right">
                    <div className="admin-user-info">
                        <span className="admin-user-avatar">
                            {currentUser?.email?.charAt(0).toUpperCase()}
                        </span>
                        <span className="admin-user-email">{currentUser?.email}</span>
                    </div>
                    <button className="admin-logout-btn" onClick={handleLogout}>
                        Odhlásiť
                    </button>
                </div>
            </div>
        </header>
    );
}
