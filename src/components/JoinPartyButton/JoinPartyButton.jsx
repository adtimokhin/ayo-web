import { useNavigate } from "react-router-dom";

function JoinPartyButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/join-party");
  };

  return (
    <div className="flex justify-center items-center">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        Join Party
      </button>
    </div>
  );
}

export default JoinPartyButton;
