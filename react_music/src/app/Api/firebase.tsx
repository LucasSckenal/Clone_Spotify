import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRanpOs7FU0v7PkbPzjxY2a_PAlwmcsYo",
  authDomain: "playermusic-37f15.firebaseapp.com",
  projectId: "playermusic-37f15",
  storageBucket: "playermusic-37f15.appspot.com",
  messagingSenderId: "486955711604",
  appId: "1:486955711604:web:d7c4a183172b23ab362521",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db };
