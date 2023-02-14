import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDUYl1_4o-O5JMMo2fi_c0juoH1JeTSRZc",
  authDomain: "react-project-f0326.firebaseapp.com",
  projectId: "react-project-f0326",
  storageBucket: "react-project-f0326.appspot.com",
  messagingSenderId: "797092984257",
  appId: "1:797092984257:web:6c4f197e0141b0d38e6b40",
  
};


export const app = initializeApp(firebaseConfig);
export const auth= getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);