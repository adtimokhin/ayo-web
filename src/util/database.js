import { db } from "./firebaseConfig";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  where,
  arrayUnion,
  collection,
  query,
} from "firebase/firestore";
import { uploadProfileImage } from "./storage";

async function addNewUser(userCredentials, sex, sexOfInterest, photo) {
  console.log("addNewUser envoked");
  const user = await setDoc(doc(db, "users", userCredentials.uid), {
    uid: userCredentials.uid,
    email: userCredentials.email,
    sex: sex,
    sexOfInterest: sexOfInterest,
  });

  await uploadProfileImage(photo, userCredentials.uid);
  return user;
}

async function getUserData(userUID) {
  console.log("getUserData envoked");
  const docSnap = await getDoc(doc(db, "users", userUID));
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    return {}; //Error - no such file exists
  }
}

async function updateUserPartyId(userUID, partyID) {
  console.log("updateUserPartyId envoked");
  const userRef = doc(db, "users", userUID);
  const partyRef = doc(db, "parties", partyID);
  await updateDoc(userRef, {
    party: partyRef,
  });
}

async function checkPartyExists(partyId) {
  console.log("checkPartyExists envoked");
  const partyRef = doc(db, "parties", partyId);
  const partyDoc = await getDoc(partyRef);
  return partyDoc.exists();
}

async function checkPartyActive(partyId) {
  console.log("checkPartyActive envoked");
  const partyRef = doc(db, "parties", partyId);
  const partyDoc = await getDoc(partyRef);

  if (!partyDoc.exists()) {
    return false;
  }

  const partyData = partyDoc.data();
  const untilDT = new Date(partyData.untilDT.seconds * 1000);
  const fromDT = new Date(partyData.fromDT.seconds * 1000);
  const now = new Date();

  if (fromDT <= now && now <= untilDT) {
    return partyData;
  }
  return false;
}

async function getPartyPoolByParty(partyUid) {
  console.log("getPartyPoolByParty envoked");
  const partyRef = doc(db, "parties", partyUid);
  const poolsRef = collection(db, "pools");

  const partyPoolQuery = query(poolsRef, where("party", "==", partyRef));
  const partyPoolQuerySnapshot = await getDocs(partyPoolQuery);

  const data = [];

  partyPoolQuerySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const partyPoolData = doc.data();
    partyPoolData.uid = doc.id;
    console.log("partyPoolData :>> ", partyPoolData);
    data.push(partyPoolData);
  });

  return data[0];
}

async function addUserToPartyPool(partyPool, user) {
  console.log("addUserToPartyPool envoked");
  const partyPoolRef = doc(db, "pools", partyPool.uid);
  const userRef = doc(db, "users", user.uid);

  if (user.sex == "male") {
    await updateDoc(partyPoolRef, {
      "pool.male": arrayUnion(userRef),
    });
  } else if (user.sex == "female") {
    await updateDoc(partyPoolRef, {
      "pool.female": arrayUnion(userRef),
    });
  }
}

async function getUserRefsFromPoolDoc(partyPoolId, sexOfInterest) {
  console.log("getUserRefsFromPoolDoc envoked");
  const partyPoolRef = doc(db, "pools", partyPoolId);
  const partyPoolSnap = await getDoc(partyPoolRef);

  if (partyPoolSnap.exists()) {
    const poolData = partyPoolSnap.data().pool;

    if (sexOfInterest === "male") {
      // Return the list of male user references
      return poolData.male;
    } else if (sexOfInterest === "female") {
      // Return the list of female user references
      return poolData.female;
    } else {
      console.log("Invalid sexOfInterest value!");
      return [];
    }
  } else {
    console.log("No such document!");
    return [];
  }
}

function refToDoc(ref) {
  const docRef = doc(db, ref.path);
  return docRef;
}

async function addLike(likingUserId, likedUserId, poolId) {
  console.log("addLike envoked");
  const poolDocRef = doc(db, "pools", poolId);
  const likeObj = {
    likedBy: doc(db, "users", likingUserId),
    liked: doc(db, "users", likedUserId),
  };
  await updateDoc(poolDocRef, {
    likes: arrayUnion(likeObj),
  });
}

async function isUserLikedByCurrentUser(currentUserUID, userUID, poolUID) {

  console.log("isUserLikedByCurrentUser envoked");
  const poolDocRef = doc(db, "pools", poolUID);
  const poolDocSnapshot = await getDoc(poolDocRef);

  if (poolDocSnapshot.exists()) {
    const likes = poolDocSnapshot.data().likes;
    if (likes && likes.length > 0) {
      for (const like of likes) {
        if (like.likedBy.id == currentUserUID && like.liked.id == userUID) {
          return true;
        }
      }
    }
  }

  return false;
}


export {
  addNewUser,
  getUserData,
  updateUserPartyId,
  checkPartyExists,
  checkPartyActive,
  getPartyPoolByParty,
  addUserToPartyPool,
  getUserRefsFromPoolDoc,
  refToDoc,
  addLike,
  isUserLikedByCurrentUser,
};
