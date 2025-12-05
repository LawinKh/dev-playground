import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    //using .env to hide public API
    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_authDomain,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_appId
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app);

export async function loginUser(email: string, password: string) {

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user;
        console.log("Logged in: ", user);
        return true;
    } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        alert(errorMessage)
        return false;
    }
};

export async function registerUser(email: string, password: string) {
    try {

        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user;
        console.log("User Registered: ", user);
        return true;

    } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        alert(errorMessage)
        return false;
    }
};


export async function userSignOut(){
    try{
        await signOut(auth)
        return true;

    } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        alert(errorMessage)
        return false;
    }
    
}
export { db, auth, onAuthStateChanged };
export type { User };