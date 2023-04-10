import { db } from "./firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { uploadProfileImage } from "./storage";

async function addNewUser(userCredentials, sex, sexOfInterest, photo) {
  const user = await setDoc(doc(db, "users", userCredentials.uid), {
    uid: userCredentials.uid,
    email: userCredentials.email,
    sex: sex,
    sexOfInterest: sexOfInterest,
    imageGS: null,
  });

  await uploadProfileImage(photo, userCredentials.uid);
  return user;
}

export { addNewUser };
