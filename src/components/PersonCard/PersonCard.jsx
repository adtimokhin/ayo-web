import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState, useRef } from "react";
import LikeButton from "../LikeButton/LikeButton";

function PersonCard({ userData }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [heartPosition, setHeartPosition] = useState(null);
  const [selectedCard, setSelectedCard] = useState(false);
  const cardRef = useRef(null);

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

  const handleCardClick = (event) => {
    const { clientX, clientY } = event;
    const cardRect = cardRef.current.getBoundingClientRect();
    const heartX = clientX - cardRect.left - 9;
    const heartY = clientY - cardRect.top - 40;

    setSelectedCard(!selectedCard);
    setHeartPosition({ x: heartX, y: heartY });
  };

  return (
    <div
      className="bg-transparent justify-self-center sm:col-span-3 lg:col-span-1 flex flex-col relative"
      ref={cardRef}
    >
      <div className="flex-1 cursor-pointer" onClick={handleCardClick}>
        <div className="rounded-3xl overflow-hidden">
          <img
            src={imageUrl}
            alt="A photo of a person at the party!"
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </div>
        {selectedCard && (
          <div
          className="absolute top-0 left-0 flex items-center justify-center"
          style={{
            transform: `translate(${heartPosition?.x}px, ${heartPosition?.y}px)`,
            position: "absolute",
          }}
          onClick={(event) => handleCardClick(event)} // Оберните handleCardClick в анонимную функцию
        >
          <LikeButton userData={userData} />
        </div>
        )}
      </div>
    </div>
  );
}

export default PersonCard;
