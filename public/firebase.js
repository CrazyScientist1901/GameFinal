// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getFirestore, doc, setDoc, onSnapshot, updateDoc, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

// Global variables provided by the Canvas environment
const canvasAppId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const canvasFirebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Your provided Firebase configuration details
const userProvidedFirebaseConfig = {
    apiKey: "AIzaSyD4mTQJ3pEjkaNrOV5DF7Ixmm-nrnIrkxw",
    authDomain: "mathgame-d8afe.firebaseapp.com",
    databaseURL: "https://mathgame-d8afe-default-rtdb.firebaseio.com", // Note: This app uses Firestore, not Realtime Database
    projectId: "mathgame-d8afe",
    storageBucket: "mathgame-d8afe.appspot.com",
    messagingSenderId: "339478386785",
    appId: "1:339478386785:web:fe25feb5bcb940c8983220",
    measurementId: "G-DPJ79JZFQ1"
};

// Prioritize Canvas environment config if available, otherwise use user-provided config
const firebaseConfig = canvasFirebaseConfig || userProvidedFirebaseConfig;
const appId = canvasAppId; // Use the appId from the Canvas environment

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore, as the app is built to use it
const auth = getAuth(app);

let userId = null; // Will store the current user's ID
let isAuthReady = false; // Flag to ensure auth is ready before Firestore ops

// Authenticate user and set userId
onAuthStateChanged(auth, async (user) => {
    if (user) {
        userId = user.uid;
        console.log("Authenticated with UID:", userId);
    } else {
        try {
            if (initialAuthToken) {
                await signInWithCustomToken(auth, initialAuthToken);
                userId = auth.currentUser.uid;
                console.log("Signed in with custom token. UID:", userId);
            } else {
                await signInAnonymously(auth);
                userId = auth.currentUser.uid;
                console.log("Signed in anonymously. UID:", userId);
            }
        } catch (error) {
            console.error("Firebase authentication error:", error);
            // In a real app, you might want a more robust way to show this error
            // For now, we'll just log it and let the main app handle messages
        }
    }
    isAuthReady = true; // Set flag once authentication is attempted/complete
    // You might want to trigger an event here for the main app to listen to
    // or rely on the main app's initGame to check isAuthReady
});

// Export the Firebase instances and state for use in other modules
export { app, db, auth, userId, isAuthReady, appId };

// Helper functions to get current userId and auth readiness (since userId is dynamic)
export function getUserId() {
    return userId;
}

export function getIsAuthReady() {
    return isAuthReady;
}

// Export specific Firestore functions for convenience if needed, or import directly in main file
export { doc, setDoc, onSnapshot, updateDoc, collection, query, where, getDocs };
