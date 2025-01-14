import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";
import app from "./Firebase";

// Get the Auth instance
const auth = getAuth(app);

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Sign Up Function
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User Signed Up:", userCredential.user);
    return userCredential.user; // Return user data
  } catch (error) {
    console.error("Error signing up:", error.message);
    return { error: error.message }; // Return error for UI handling
  }
};

// Log In Function
export const logIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User Logged In:", userCredential.user);
    return userCredential.user; // Return user data
  } catch (error) {
    console.error("Error logging in:", error.message);
    return { error: error.message }; // Return error for UI handling
  }
};

// Google Sign-In Function
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log("Google User Signed In:", user);
    return user; // Return Google user data
  } catch (error) {
    console.error("Error with Google Sign-In:", error.message);
    return { error: error.message }; // Return error for UI handling
  }
};

// Optional: Export the Auth instance if needed elsewhere
export { auth };
