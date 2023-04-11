import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import LikeButton from "../LikeButton/LikeButton";

function PersonCard({ userData, poolData }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    async function loadImage() {
      const storage = getStorage();
      const imageRef = ref(storage, `images/${userData.imageName}`);
      try {
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
      } catch (error) {
        console.error(error);
      }
    }

    loadImage();
  }, [userData.uid]);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <img src={imageUrl} alt="Profile" className="w-full h-auto rounded-md" />
      <h2 className="text-lg font-semibold mt-2">{userData.email}</h2>
      <p className="text-gray-600">{userData.email}</p>
      <LikeButton  userData={userData} poolData={poolData}/>
    </div>
  );
}

export default PersonCard;
