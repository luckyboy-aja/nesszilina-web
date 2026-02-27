import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

export default function Login() {
    const { loginWithGoogle, loginWithEmail, currentUser } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
            // Zobraziť konkrétnu chybovú hlášku z AuthContext ak existuje
            setError(err.message || "Nepodarilo sa prihlásiť cez Google. Skúste to znova.");
        } finally {
            setLoading(false);
        }
    };

    const handleEmailSignIn = async (e) => {
        e.preventDefault();
        try {
            setError("");
            setLoading(true);
            await loginWithEmail(email, password);
            navigate("/admin");
        } catch (err) {
            console.error(err);
            setError("Nesprávny email alebo heslo.");
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

                <form onSubmit={handleEmailSignIn} className="email-login-form">
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Heslo"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading} className="email-btn">
                        {loading ? "Prihlasujem..." : "Prihlásiť sa heslom"}
                    </button>
                </form>

                <div className="divider">
                    <span>ALEBO</span>
                </div>

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
                    Pre superadmina
                </button>

                <p className="return-home">
                    <a href="/">Návrat na hlavnú stránku</a>
                </p>
            </div>
        </div>
    );
}
