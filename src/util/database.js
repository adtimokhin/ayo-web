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
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { uploadProfileImage } from "./storage";

async function addNewUser(userCredentials, sex, sexOfInterest, photo) {
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
  const docSnap = await getDoc(doc(db, "users", userUID));
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    return {}; //Error - no such file exists
  }
}

async function updateUserPartyId(userUID, partyID) {
  const userRef = doc(db, "users", userUID);
  const partyRef = doc(db, "parties", partyID);
  await updateDoc(userRef, {
    party: partyRef,
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

  if (fromDT <= now && now <= untilDT) {
    return partyData;
  }
  return false;
}

async function getPartyPoolByParty(partyUid) {
  const partyRef = doc(db, "parties", partyUid);
  const poolsRef = collection(db, "pools");

  const partyPoolQuery = query(poolsRef, where("party", "==", partyRef));
  const partyPoolQuerySnapshot = await getDocs(partyPoolQuery);

  const data = [];

  partyPoolQuerySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const partyPoolData = doc.data();
    partyPoolData.uid = doc.id;
    data.push(partyPoolData);
  });

  return data[0];
}

async function addUserToPartyPool(partyPool, user) {
  const partyPoolRef = doc(db, "pools", partyPool.uid);
  const userRef = doc(db, "users", user.uid);

  if (user.sex == "other" || user.sexOfInterest == "other") {
    await updateDoc(partyPoolRef, {
      "pool.other": arrayUnion(userRef),
    });
  } else if (user.sex == "male") {
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
    } else if (sexOfInterest === "other") {
      return poolData.other;
    } else if (sexOfInterest === "all") {
      let dataToReturn = [];
      dataToReturn.push(...poolData.male);
      dataToReturn.push(...poolData.female);
      dataToReturn.push(...poolData.other);
      return dataToReturn;
    }
    return [];
  } else {
    return [];
  }
}

function refToDoc(ref) {
  const docRef = doc(db, ref.path);
  return docRef;
}

async function addLike(likingUserId, likedUserId, poolId) {
  const functionUrl =
    "https://us-central1-ayo-cc0f7.cloudfunctions.net/incrementLikeCount";

  fetch(functionUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      poolId: poolId,
      likedBy: likedUserId,
      liked: likingUserId,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
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

async function leaveParty(userUID, partyUID) {
  // Getting user object
  const userRef = doc(db, "users", userUID);
  const user = await getDoc(userRef);

  if (!user) {
    return;
  }

  // Getting party pool
  const partyPool = await getPartyPoolByParty(partyUID);
  if (!partyPool) {
    return;
  }

  const partyPoolRef = doc(db, "pools", partyPool.uid);

  // removing data from user object
  await updateDoc(userRef, { party: null });

  // Removing data from party pool object
  const userSex = user.data().sex;
  const userSexOfInterest = user.data().sexOfInterest;
  // Removing data about user's presence at the party
  if (userSex == "other" || userSexOfInterest == "other") {
    await updateDoc(partyPoolRef, {
      "pool.other": arrayRemove(userRef),
    });
  } else if (userSex == "male") {
    await updateDoc(partyPoolRef, {
      "pool.male": arrayRemove(userRef),
    });
  } else if (userSex == "female") {
    await updateDoc(partyPoolRef, {
      "pool.female": arrayRemove(userRef),
    });
  }

  // Removing data about user's likes
  const likes = partyPool.likes;
  if (likes && likes.length > 0) {
    for (const like of likes) {
      console.log("like :>> ", like.likedBy.id);
      if (like.likedBy.id == userUID || like.liked.id == userUID) {
        await updateDoc(partyPoolRef, {
          likes: arrayRemove(like),
        });
      }
    }
  }
}

async function deleteUserAccount(user) {
  try {
    const userId = user.uid;

    // Then, remove the user's document from the Firestore 'users' collection
    const userDocRef = doc(db, "users", userId);
    await deleteDoc(userDocRef);

    // First, delete the user's authentication account
    await deleteUser(user);
  } catch (error) {}
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
  leaveParty,
  deleteUserAccount,
};
