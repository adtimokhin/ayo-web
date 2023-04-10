import { storage } from "./firebaseConfig";
import { ref, uploadBytes } from "firebase/storage";
import { db } from "./firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

async function uploadProfileImage(file, userId) {
  // Create a storage reference
  const imageRef = ref(storage, `images/${userId}.${file.name.split(".")[1]}`);
  // Upload image to the storage
  const snapshot = await uploadBytes(imageRef, file);

  // FIXME: WE don't need to save image url!
  // Setting proprty imaageGS to point to the new image
  //   const imageGS = `gs://bucket/images/${userId}.${file.name.split(".")[1]}`;

  //   await updateDoc(doc(db, "users", userId), {
  //     imageGS: imageGS,
  //   });

  console.log("Uploaded a blob or file!");
  return snapshot;
}

export { uploadProfileImage };
