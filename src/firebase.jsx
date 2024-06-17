import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqWK8cL_kqYtxTcCQorssNQH5swmrGL3c",
  authDomain: "students-e8797.firebaseapp.com",
  projectId: "students-e8797",
  storageBucket: "students-e8797.appspot.com",
  messagingSenderId: "581340970575",
  appId: "1:581340970575:web:80bfad62d7ab3da9f8743a",
  measurementId: "G-1HEE1X3CEF"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
