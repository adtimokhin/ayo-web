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
    return user;
  } catch (error) {
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
    return user;
  } catch (error) {
    throw error;
  }
};

const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

const sendVerificationEmail = async () => {
  const user = auth.currentUser;
  try {
    await sendEmailVerification(user);
  } catch (error) {
    throw error;
  }

}

function getCurrentUser() {
  return auth.currentUser;
}


export { registerUser, signInUser, signOutUser, sendVerificationEmail, getCurrentUser };
