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
    <div className="bg-[#f5e2df] h-fit justify-self-center sm:col-span-3 lg:col-span-1">
      <div className="h-fit min-w-[300px]">
        <img
          src={imageUrl}
          alt="A photo of a person at the party!"
          style={{ objectFit: "contain", height: "80vh" }}
        />
      </div>
      <div className="flex justify-center items-center h-1/4 py-3">
        <LikeButton userData={userData} poolData={poolData} />
      </div>
    </div>
  );
}

export default PersonCard;
