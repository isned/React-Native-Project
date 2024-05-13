// Import the functions you need from the SDKs you need
import  app  from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7YkQpKMZjW1Od1SukgT8VFa_hBPSGDu8",
  authDomain: "whatsapp-907fb.firebaseapp.com",
  databaseURL: "https://whatsapp-907fb-default-rtdb.firebaseio.com",
  projectId: "whatsapp-907fb",
  storageBucket: "whatsapp-907fb.appspot.com",
  messagingSenderId: "936939998500",
  appId: "1:936939998500:web:d388faa9a5e5c01b3e77b1"
};

// Initialize Firebase
const firebase = app.initializeApp(firebaseConfig);
export default firebase;