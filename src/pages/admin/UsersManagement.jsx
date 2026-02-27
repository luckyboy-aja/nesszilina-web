import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./UsersManagement.css";

export default function UsersManagement() {
    const { registerNewUser, getAdminUsers, deleteAdminUser, updateAdminUser, sendResetEmail, currentUser } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState({ type: "", text: "" });
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [editingUser, setEditingUser] = useState(null);
    const [editEmail, setEditEmail] = useState("");
    const [confirmDelete, setConfirmDelete] = useState(null);

    const isSuperAdmin = currentUser?.email === "andrej.bosik@gmail.com";

    // Load users on mount
    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            setLoadingUsers(true);
            const adminUsers = await getAdminUsers();
            setUsers(adminUsers);
        } catch (err) {
            console.error("Chyba pri načítaní používateľov:", err);
        } finally {
            setLoadingUsers(false);
        }
    };

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
            // Reload the users list
            await loadUsers();
        } catch (err) {
            console.error("Chyba pri vytváraní používateľa:", err);
            let errorMessage = err.message || "Nepodarilo sa vytvoriť účet. Skúste to znova.";
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

    const handleDelete = async (user) => {
        try {
            setMessage({ type: "", text: "" });
            await deleteAdminUser(user.uid);
            setMessage({ type: "success", text: `Používateľ ${user.email} bol odstránený.` });
            setConfirmDelete(null);
            await loadUsers();
        } catch (err) {
            console.error("Chyba pri mazaní:", err);
            setMessage({ type: "error", text: "Nepodarilo sa odstrániť používateľa." });
        }
    };

    const handleStartEdit = (user) => {
        setEditingUser(user.uid);
        setEditEmail(user.email);
    };

    const handleSaveEdit = async (uid) => {
        try {
            setMessage({ type: "", text: "" });
            await updateAdminUser(uid, { email: editEmail });
            setMessage({ type: "success", text: "Údaje boli aktualizované." });
            setEditingUser(null);
            await loadUsers();
        } catch (err) {
            console.error("Chyba pri editácii:", err);
            setMessage({ type: "error", text: "Nepodarilo sa aktualizovať údaje." });
        }
    };

    const handleResetPassword = async (email) => {
        try {
            setMessage({ type: "", text: "" });
            await sendResetEmail(email);
            setMessage({ type: "success", text: `Email na reset hesla bol odoslaný na ${email}.` });
        } catch (err) {
            console.error("Chyba pri resete hesla:", err);
            setMessage({ type: "error", text: "Nepodarilo sa odoslať reset hesla." });
        }
    };

    if (!isSuperAdmin) {
        return (
            <div className="users-management-container">
                <div className="admin-content-card">
                    <h2>Správa používateľov</h2>
                    <p className="message error-message">Na zobrazenie tejto stránky nemáte dostatočné oprávnenia.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="users-management-container">
            <div className="admin-content-card">
                <h2>Správa administrátorov</h2>

                {message.text && (
                    <div className={`message ${message.type}-message`}>
                        {message.text}
                    </div>
                )}

                {/* Users List */}
                <div className="users-list-section">
                    <h3>Existujúci administrátori</h3>
                    {loadingUsers ? (
                        <p className="loading-text">Načítavam...</p>
                    ) : users.length === 0 ? (
                        <p className="empty-text">Zatiaľ nie sú žiadni administrátori vytvorení cez email/heslo.</p>
                    ) : (
                        <div className="users-table">
                            <div className="table-header">
                                <span>Email</span>
                                <span>Vytvoril</span>
                                <span>Akcie</span>
                            </div>
                            {users.map((user) => (
                                <div key={user.uid} className="table-row">
                                    {editingUser === user.uid ? (
                                        <>
                                            <span className="edit-field">
                                                <input
                                                    type="email"
                                                    value={editEmail}
                                                    onChange={(e) => setEditEmail(e.target.value)}
                                                />
                                            </span>
                                            <span>{user.createdBy || "—"}</span>
                                            <span className="actions">
                                                <button className="btn-save" onClick={() => handleSaveEdit(user.uid)}>Uložiť</button>
                                                <button className="btn-cancel" onClick={() => setEditingUser(null)}>Zrušiť</button>
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <span>{user.email}</span>
                                            <span>{user.createdBy || "—"}</span>
                                            <span className="actions">
                                                {confirmDelete === user.uid ? (
                                                    <>
                                                        <span className="confirm-text">Naozaj?</span>
                                                        <button className="btn-delete" onClick={() => handleDelete(user)}>Áno</button>
                                                        <button className="btn-cancel" onClick={() => setConfirmDelete(null)}>Nie</button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button className="btn-edit" onClick={() => handleStartEdit(user)}>✏️</button>
                                                        <button className="btn-reset" onClick={() => handleResetPassword(user.email)}>🔑</button>
                                                        <button className="btn-delete" onClick={() => setConfirmDelete(user.uid)}>🗑️</button>
                                                    </>
                                                )}
                                            </span>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Add User Form */}
                <div className="add-user-section">
                    <h3>Pridať nového administrátora</h3>
                    <form onSubmit={handleCreateUser} className="add-user-form">
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
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
        </div>
    );
}
