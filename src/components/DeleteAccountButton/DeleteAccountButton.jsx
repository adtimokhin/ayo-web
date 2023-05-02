import { useNavigate } from "react-router";
import { getCurrentUser, signOutUser } from "../../util/auth";
import { homeDirectory } from "../../util/routing";
import { deleteUserAccount } from "../../util/database";

function DeleteAccountButton(props) {
  const onLoading = props.onLoading;
  const onSuccess = props.onSuccess;
  const onError = props.onError;


  const handleSignOut = async () => {
    try {
        onLoading();
      // TODO: Add leave party action before deleting the account.
      await deleteUserAccount(getCurrentUser());
      //   TODO: Add a message overlay
      onSuccess();
    } catch (error) {
        //   TODO: Add an error message overlay
      console.error("Error signing out user: ", error);
      onError("Internal error");
    }
  };

  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      onClick={handleSignOut}
    >
      Delete Account
    </button>
  );
}

export default DeleteAccountButton;
