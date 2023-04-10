import { db } from "./firebaseConfig";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { uploadProfileImage } from "./storage";

async function addNewUser(userCredentials, sex, sexOfInterest, photo) {
  const user = await setDoc(doc(db, "users", userCredentials.uid), {
    uid: userCredentials.uid,
    email: userCredentials.email,
    sex: sex,
    sexOfInterest: sexOfInterest,
    partyId: null,
  });

  await uploadProfileImage(photo, userCredentials.uid);
  return user;
}

async function getUserData(userUID) {
  const docSnap = await getDoc(doc(db, "users", userUID));
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    return {}; //Error - no such file exists
  }
}

async function updateUserPartyId(userUID, partyId) {
  const userRef = doc(db, "users", userUID);
  await updateDoc(userRef, {
    partyId: partyId,
  });
}

async function checkPartyExists(partyId) {
  const partyRef = doc(db, "parties", partyId);
  const partyDoc = await getDoc(partyRef);
  return partyDoc.exists();
}

async function checkPartyActive(partyId) {
  const partyRef = doc(db, "parties", partyId);
  const partyDoc = await getDoc(partyRef);

  if (!partyDoc.exists()) {
    return false;
  }

  const partyData = partyDoc.data();
  const untilDT = new Date(partyData.untilDT.seconds * 1000);
  const fromDT = new Date(partyData.fromDT.seconds * 1000);
  const now = new Date();

  return fromDT <= now && now <= untilDT;
}

export { addNewUser, getUserData, updateUserPartyId, checkPartyExists, checkPartyActive };
