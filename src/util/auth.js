import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification
} from "firebase/auth";
import { auth } from "./firebaseConfig";

async function registerUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    console.log("User registered:", user);
    return user;
  } catch (error) {
    console.error("Error registering user:", error.message);
    throw error;
  }
}

const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    if (!user.emailVerified) {
      // Deny access if email is not verified
      await signOut(auth);
      throw new Error("Email is not verified");
    }
    console.log("User signed in successfully: ", user);
    return user;
  } catch (error) {
    throw error;
  }
};

const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing user out: ", error);
    throw error;
  }
};

const sendVerificationEmail = async () => {
  const user = auth.currentUser;
  try {
    console.log("SendVerificationEmail to ", user);
    await sendEmailVerification(user);
    console.log("Verification email sent!");
  } catch (error) {
    console.error("Error sending verification email: ", error);
    throw error;
  }

}

export { registerUser, signInUser, signOutUser, sendVerificationEmail };
