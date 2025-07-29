// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD4mTQJ3pEjkaNrOV5DF7Ixmm-nrnIrkxw",
    authDomain: "mathgame-d8afe.firebaseapp.com",
    databaseURL: "https://mathgame-d8afe-default-rtdb.firebaseio.com",
    projectId: "mathgame-d8afe",
    storageBucket: "mathgame-d8afe.appspot.com",
    messagingSenderId: "339478386785",
    appId: "1:339478386785:web:fe25feb5bcb940c8983220",
    measurementId: "G-DPJ79JZFQ1"
};

// Initialize Firebase
try {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const db = firebase.database();
    window.db = db; // Make it globally available
    console.log("Firebase initialized successfully");
} catch (error) {
    console.error("Firebase initialization error:", error);
}
