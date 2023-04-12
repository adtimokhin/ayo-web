import { useNavigate } from "react-router-dom";

function ViewPartyPoolButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/party-pool`);
  };

  return (
    <div className="flex justify-center items-center">
      <button
        className="bg-peach text-gray-900 font-bold py-3 px-6 rounded-lg border-2 border-gray-900 hover:bg-gray-900 hover:text-primary transition-all duration-300 ease-in-out font-body text-3xl"
        onClick={handleClick}
      >
        Join Party
      </button>
    </div>
  );
}

export default ViewPartyPoolButton;
