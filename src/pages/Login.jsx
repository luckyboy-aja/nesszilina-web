import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

export default function Login() {
    const { loginWithGoogle, currentUser } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // If already logged in, redirect to admin
    if (currentUser) {
        navigate("/admin");
    }

    const handleGoogleSignIn = async () => {
        try {
            setError("");
            setLoading(true);
            await loginWithGoogle();
            navigate("/admin");
        } catch (err) {
            console.error(err);
            setError("Nepodarilo sa prihlásiť cez Google. Skúste to znova.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Admin Prihlásenie</h2>
                <p>Prístup len pre autorizovaných administrátorov.</p>

                {error && <div className="error-message">{error}</div>}

                <button
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="google-btn"
                >
                    <img
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                        alt="Google logo"
                        className="google-icon"
                    />
                    {loading ? "Prihlasujem..." : "Prihlásiť sa cez Google"}
                </button>

                <p className="return-home">
                    <a href="/">Návrat na hlavnú stránku</a>
                </p>
            </div>
        </div>
    );
}
