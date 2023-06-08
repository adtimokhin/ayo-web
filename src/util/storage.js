import { storage } from "./firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "./firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

async function uploadProfileImage(file, userId) {
  // Create a storage reference
  const imageRef = ref(storage, `images/${userId}.${file.name.split(".")[1]}`);
  // Upload image to the storage
  const snapshot = await uploadBytes(imageRef, file);

  // FIXME: WE don't need to save image url!
  // Setting proprty imaageGS to point to the new image
  const imageName = `${userId}.${file.name.split(".")[1]}`;

  await updateDoc(doc(db, "users", userId), {
    imageName: imageName,
  });

  return snapshot;
}

async function loadImage(imageName) {
  const imageRef = ref(storage, imageName);
  try {
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
  } catch (error) {
    throw error;
  }
}

export { uploadProfileImage, loadImage };
