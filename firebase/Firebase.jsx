import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB16KFuSUAmWeVN-2VPgJYvx4bERcXZlKc",
  authDomain: "iom-login-c92e3.firebaseapp.com",
  databaseURL: "https://iom-login-c92e3-default-rtdb.firebaseio.com",
  projectId: "iom-login-c92e3",
  storageBucket: "iom-login-c92e3.firebasestorage.app",
  messagingSenderId: "132037696745",
  appId: "1:132037696745:web:49e9231b0c1b2ac39a2478"
};

const app = initializeApp(firebaseConfig);

export default app;
export const auth = getAuth(app);
const db = getFirestore(app);

export { db, collection, addDoc };
