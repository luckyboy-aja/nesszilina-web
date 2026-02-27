import { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider, db, secondaryAuth } from "../firebase";
import { signInWithPopup, signOut, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { collection, getDocs, setDoc, deleteDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";

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

    async function loginWithEmail(email, password) {
        if (!auth || !auth.name) {
            return Promise.reject(new Error("Firebase is not configured yet."));
        }

        const result = await signInWithEmailAndPassword(auth, email, password);

        // Verify user exists in Firestore admins collection
        const { getDoc } = await import("firebase/firestore");
        const userDoc = await getDoc(doc(db, "admins", result.user.uid));

        if (!userDoc.exists()) {
            await logout();
            throw new Error("Tento účet nie je autorizovaný. Kontaktujte administrátora.");
        }

        return result;
    }

    async function registerNewUser(email, password) {
        if (!secondaryAuth || !secondaryAuth.name) {
            return Promise.reject(new Error("Firebase is not configured yet."));
        }

        // Use secondary auth to prevent switching sessions
        const result = await createUserWithEmailAndPassword(secondaryAuth, email, password);

        // Store user info in Firestore
        await setDoc(doc(db, "admins", result.user.uid), {
            email: email,
            createdAt: serverTimestamp(),
            createdBy: currentUser?.email || "unknown"
        });

        // Sign out from secondary auth 
        await signOut(secondaryAuth);

        return result;
    }

    async function getAdminUsers() {
        if (!db || !db.type) return [];

        const querySnapshot = await getDocs(collection(db, "admins"));
        const users = [];
        querySnapshot.forEach((doc) => {
            users.push({ uid: doc.id, ...doc.data() });
        });
        return users;
    }

    async function deleteAdminUser(uid) {
        if (!db || !db.type) return;
        await deleteDoc(doc(db, "admins", uid));
    }

    async function updateAdminUser(uid, data) {
        if (!db || !db.type) return;
        await updateDoc(doc(db, "admins", uid), data);
    }

    async function sendResetEmail(email) {
        if (!auth || !auth.name) return;
        await sendPasswordResetEmail(auth, email);
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
        getAdminUsers,
        deleteAdminUser,
        updateAdminUser,
        sendResetEmail,
        logout,
        isAdmin: !!currentUser,
        isSuperAdmin: currentUser?.email === allowedAdminEmail
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
