import { useNavigate } from "react-router-dom";
import { homeDirectory } from "../../util/routing";

function ViewPartyPoolButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${homeDirectory}/party-pool`);
  };

  return (
    <div className="flex justify-center items-center">
      <button
        className="bg-peach text-gray-900 font-bold py-3 px-6 rounded-lg border-2 border-gray-900 hover:bg-gray-900 hover:text-primary transition-all duration-300 ease-in-out font-body text-3xl"
        onClick={handleClick}
      >
        See who is at the party !
      </button>
    </div>
  );
}

export default ViewPartyPoolButton;
