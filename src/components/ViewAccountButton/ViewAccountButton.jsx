import { useNavigate } from "react-router-dom";
import { homeDirectory } from "../../util/routing";

function ViewAccountButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${homeDirectory}/account`);
  };

  return (
    <div className="flex justify-center items-center">
      <button
        className="bg-peach text-gray-900 font-bold rounded-lg border-2 border-gray-900 hover:bg-gray-900 hover:text-primary transition-all duration-300 ease-in-out py-3 px-6 font-body text-3xl"
        onClick={handleClick}
      >
        Account
      </button>
    </div>
  );
}

export default ViewAccountButton;
