import { getCurrentUser } from "../../util/auth";
import { addLike } from "../../util/database";
import { useState } from "react";

function LikeButton({ userData, poolData }) {
  const [disabled, setDisabled] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleLikeClick = async () => {
    const currentUser = getCurrentUser();
    await addLike(currentUser.uid, userData.uid, poolData.uid);
    setDisabled(true);
    setLiked(true);
  };

  return (
    <button
      className={`flex py-2 px-4 rounded-lg h-fit ${
        liked ? "bg-gray-500 cursor-default" : "bg-[#ffa7a7] hover:bg-blue-700"
      } text-[#172aff] font-semibold text-xl`}
      onClick={handleLikeClick}
      disabled={disabled || liked}
    >
      {liked ? "Liked" : "Like"}
    </button>
  );
}

export default LikeButton;
