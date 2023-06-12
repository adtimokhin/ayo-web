import { getCurrentUser } from "../../util/auth";
import { addLike } from "../../util/database";
import { useState } from "react";

function LikeButton({ userData, poolData }) {
  const [disabled, setDisabled] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleLikeClick = async () => {
    const currentUser = getCurrentUser();
    setDisabled(true);
    addLike(currentUser.uid, userData.uid, poolData.uid); // TODO: I am unsure, whether we should wait for the response.
    setLiked(true);
  };

  return (
    <button
      className={`flex py-2 px-4 rounded-lg h-fit w-[94%] text-center ${
        liked ? "bg-gray-500 cursor-default" : "bg-[#ffa7a7] hover:bg-blue-700"
      } text-[#172aff] font-semibold text-xl`}
      onClick={handleLikeClick}
      disabled={disabled || liked}
    >
      <p className="w-full">
      {liked ? "Liked" : "Like"}
      </p>
    </button>
  );
}

export default LikeButton;
