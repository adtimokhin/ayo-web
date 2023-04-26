import { leaveParty } from "../../util/database";

function LeavePartyButton(props) {
  const handleLeaveParty = async () => {
    try {
        // TODO: implement the two functions for button actinon processing.
    //   props.onLoad();
      await leaveParty(props.userUID, props.partyUID);
      props.onFinish();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      className="bg-secondary text-white py-2 px-4 rounded-md"
      onClick={handleLeaveParty}
    >
      Leave Party
    </button>
  );
}

export default LeavePartyButton;
