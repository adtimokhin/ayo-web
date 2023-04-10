import { useNavigate } from "react-router-dom";

function ViewPartyPoolButton(props) {
    const navigate = useNavigate();
  const partyId = props.partyId;

  const handleClick = () => {
    navigate(`/pool?partyid=${partyId}`);
  };

  return (
    <div className="flex justify-center items-center">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        See party pool
      </button>
    </div>
  );
}

export default ViewPartyPoolButton;
