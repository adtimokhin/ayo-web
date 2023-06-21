import { leaveParty } from "../../util/database";

function LeavePartyButton(props) {
  const handleLeaveParty = async () => {
    try {
      // TODO: implement the two functions for button actinon processing.
      //   props.onLoad();
      props.onLoad();
      await leaveParty(props.userUID, props.partyUID);
      props.onFinish();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <button
        // bg-peach text-gray-900 font-bold py-3 px-6 rounded-lg border-2 border-gray-900 hover:bg-gray-900 hover:text-primary transition-all duration-300 ease-in-out font-body text-3xl
        className="bg-white text-gray-900 font-bold py-3 rounded-lg border-2 border-secondary hover:bg-secondary hover:text-white transition-all duration-300 ease-in-out font-body text-3xl w-full"
        onClick={handleLeaveParty}
      >
        Leave the party
      </button>
    </div>
  );
}

export default LeavePartyButton;
