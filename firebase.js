import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAzoc_FA1VCT5nsYdG2kfYIz56HLaYr-jA",
    authDomain: "myreactapp-3b36d.firebaseapp.com",
    projectId: "myreactapp-3b36d",
    storageBucket: "myreactapp-3b36d.firebasestorage.app",
    messagingSenderId: "736441170500",
    appId: "1:736441170500:web:60585171af6787db529a11"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
