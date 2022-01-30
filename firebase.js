// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";




const firebaseConfig = {
  apiKey: "AIzaSyB-GYRQDd1sDTlwXjQmPZRVlxt2knhQaXo",
  authDomain: "high-codex-339607.firebaseapp.com",
  projectId: "high-codex-339607",
  storageBucket: "high-codex-339607.appspot.com",
  messagingSenderId: "543180972388",
  appId: "1:543180972388:web:45f486be8cb10ee68c5a71"
};


// const analytics = getAnalytics(app);

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };