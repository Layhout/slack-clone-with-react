import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB88cHsfXcOyz761QPq0_4oSKOJ9BZ0UlI",
    authDomain: "test-with-react-5c0ff.firebaseapp.com",
    databaseURL: "https://test-with-react-5c0ff-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "test-with-react-5c0ff",
    storageBucket: "test-with-react-5c0ff.appspot.com",
    messagingSenderId: "251317291067",
    appId: "1:251317291067:web:f270c3bd51fe620183341e"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider()

export { db, auth, provider };