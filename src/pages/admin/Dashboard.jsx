import { useAuth } from "../../contexts/AuthContext";

export default function Dashboard() {
    const { currentUser } = useAuth();

    return (
        <div style={{ padding: "40px", color: "white" }}>
            <h1>Admin Dashboard</h1>
            <p style={{ color: "#8892b0", marginTop: "10px" }}>
                Vitaj, <strong style={{ color: "#ccd6f6" }}>{currentUser?.email}</strong>
            </p>
            <div style={{ marginTop: "20px" }}>
                <p style={{ color: "#8892b0" }}>Toto je zabezpečená zóna len pre povolených administrátorov.</p>
            </div>
        </div>
    );
}
