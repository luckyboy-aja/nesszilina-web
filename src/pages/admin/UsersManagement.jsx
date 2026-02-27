import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./UsersManagement.css";

export default function UsersManagement() {
    const { registerNewUser, currentUser } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState({ type: "", text: "" });
    const [loading, setLoading] = useState(false);

    // Iba pôvodný superadmin môže vytvárať ďalších adminov (voliteľná kontrola)
    const isSuperAdmin = currentUser?.email === "andrej.bosik@gmail.com";

    const handleCreateUser = async (e) => {
        e.preventDefault();

        if (!isSuperAdmin) {
            setMessage({ type: "error", text: "Len hlavný administrátor môže pridať nových používateľov." });
            return;
        }

        if (password.length < 6) {
            setMessage({ type: "error", text: "Heslo musí mať aspoň 6 znakov." });
            return;
        }

        try {
            setMessage({ type: "", text: "" });
            setLoading(true);
            await registerNewUser(email, password);
            setMessage({ type: "success", text: `Účet pre ${email} bol úspešne vytvorený.` });
            setEmail("");
            setPassword("");
        } catch (err) {
            console.error("Chyba pri vytváraní používateľa:", err);
            let errorMessage = "Nepodarilo sa vytvoriť účet. Skúste to znova.";
            if (err.code === "auth/email-already-in-use") {
                errorMessage = "Tento email sa už používa.";
            } else if (err.code === "auth/weak-password") {
                errorMessage = "Heslo je príliš slabé.";
            }
            setMessage({ type: "error", text: errorMessage });
        } finally {
            setLoading(false);
        }
    };

    if (!isSuperAdmin) {
        return (
            <div className="users-management-container">
                <div className="admin-content-card">
                    <h2>Správa používateľov</h2>
                    <p className="error-message">Na zobrazenie tejto stránky nemáte dostatočné oprávnenia. Len hlavný administrátor môže spravovať používateľov.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="users-management-container">
            <div className="admin-content-card">
                <h2>Pridať nového administrátora</h2>
                <p>Vytvorte prístup pre ďalšiu osobu. Bude sa prihlasovať zadaným emailom a heslom.</p>

                {message.text && (
                    <div className={`message ${message.type}-message`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleCreateUser} className="add-user-form">
                    <div className="form-group">
                        <label htmlFor="email">Email nového administrátora:</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="admin@domena.sk"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Heslo (min. 6 znakov):</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Silné heslo"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading} className="submit-btn">
                        {loading ? "Vytváram..." : "Vytvoriť účet"}
                    </button>
                </form>
            </div>
        </div>
    );
}
