/ Initialize Firebase

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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Make it globally available
window.db = db;
