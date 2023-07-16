import { getCurrentUser } from "../../util/auth";
import { addLike } from "../../util/database";
import { useState } from "react";

function LikeButton({ userData }) {
  const [disabled, setDisabled] = useState(false);
  const [liked, setLiked] = useState(false);

  const stopProp = (event) => {
    event.stopPropagation();
  };

  const handleLikeClick = async (event) => {
    stopProp(event); // Fix: Call the stopProp function with the event parameter
    const currentUser = getCurrentUser();
    await addLike(currentUser.uid, userData.uid);
    setDisabled(true);
    setLiked(true);
  };

  return (
    <button
      className={`flex items-center justify-center bg-transparent border-none outline-none ${
        liked ? "text-blue-500" : "text-red-500 hover:text-blue-500"
      }`}
      onClick={(event) => handleLikeClick(event)} // Оберните handleLikeClick в анонимную функцию
      disabled={disabled || liked}
    >
  
      <span
        role="img"
        aria-label="Heart"
        style={{
          fontSize: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          background: "white",
        }}
      >
        {liked ? "💙" : "❤️"}
      </span>
    </button>
  );
}

export default LikeButton;
