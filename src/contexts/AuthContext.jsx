import { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Hardcoded allowed email for the admin zone as requested
    const allowedAdminEmail = "andrej.bosik@gmail.com";

    function loginWithGoogle() {
        if (!auth || !auth.name) {
            return Promise.reject(new Error("Firebase is not configured yet."));
        }
        return signInWithPopup(auth, googleProvider);
    }

    function logout() {
        if (!auth || !auth.name) {
            return Promise.resolve();
        }
        return signOut(auth);
    }

    useEffect(() => {
        // Mock auth object check
        if (!auth || !auth.name) {
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        loginWithGoogle,
        logout,
        isAdmin: currentUser?.email === allowedAdminEmail
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
