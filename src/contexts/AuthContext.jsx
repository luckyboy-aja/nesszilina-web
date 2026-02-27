import { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, signOut, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Hardcoded allowed email for the admin zone via Google Auth
    const allowedAdminEmail = "andrej.bosik@gmail.com";

    async function loginWithGoogle() {
        if (!auth || !auth.name) {
            return Promise.reject(new Error("Firebase is not configured yet."));
        }
        
        const result = await signInWithPopup(auth, googleProvider);
        
        // Security check: Only allow specific email for Google login
        if (result.user.email !== allowedAdminEmail) {
            await logout();
            throw new Error(`Google prihlásenie je povolené len pre ${allowedAdminEmail}. Pre ostatné účty použite prihlásenie heslom.`);
        }
        
        return result;
    }

    function loginWithEmail(email, password) {
        if (!auth || !auth.name) {
            return Promise.reject(new Error("Firebase is not configured yet."));
        }
        return signInWithEmailAndPassword(auth, email, password);
    }

    function registerNewUser(email, password) {
         if (!auth || !auth.name) {
            return Promise.reject(new Error("Firebase is not configured yet."));
        }
        return createUserWithEmailAndPassword(auth, email, password);
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
        loginWithEmail,
        registerNewUser,
        logout,
        // Ak je niekto prihlásený, považujeme ho za admina, 
        // pretože Google auth nepustí nikoho iného a email/heslo je len pre vytvorené účty 
        isAdmin: !!currentUser 
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
