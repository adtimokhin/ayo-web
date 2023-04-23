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
    <div className="bg-[#f5e2df] shadow-md rounded-lg p-4 lg:w-64 sm:w-full md:w-full mx-auto my-4 h-fit">
      <div className="h-fit">
        <div className="h-fit w-fit border-2 border-spacing-1 border-blue-500">
          <img
            src={imageUrl}
            alt="Profile"
            className="w-full h-full object-contain"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
      <div className="flex justify-center items-center h-1/4 pt-3">
        <LikeButton userData={userData} poolData={poolData} />
      </div>
    </div>
  );
}

export default PersonCard;
