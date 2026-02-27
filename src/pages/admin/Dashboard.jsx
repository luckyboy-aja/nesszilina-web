import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const { currentUser, logout, isSuperAdmin } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    return (
        <div style={{ padding: "40px", color: "white" }}>
            <h1>Admin Dashboard</h1>
            <p>Vitaj, {currentUser?.email}</p>
            <div style={{ marginTop: "20px" }}>
                <p>Toto je zabezpečená zóna len pre povolených administrátorov.</p>
                <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                    {isSuperAdmin && (
                        <button
                            onClick={() => navigate("/admin/users")}
                            style={{
                                padding: "10px 20px",
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                color: "white",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontWeight: "bold",
                                transition: "background 0.2s"
                            }}
                        >
                            Správa administrátorov
                        </button>
                    )}
                    <button
                        onClick={handleLogout}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "var(--color-accent)",
                            color: "var(--color-background)",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontWeight: "bold"
                        }}
                    >
                        Odhlásiť sa
                    </button>
                </div>
            </div>
        </div>
    );
}
