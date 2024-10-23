import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCbzNQ715-IMAofCQyVywfCBQ4v5TX7Oxg",
    authDomain: "medical-appointments-82018.firebaseapp.com",
    projectId: "medical-appointments-82018",
    storageBucket: "medical-appointments-82018.appspot.com",
    messagingSenderId: "187228662961",
    appId: "1:187228662961:web:00fb1181cbd1d48d3f0690"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };