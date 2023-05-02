import { getCurrentUser } from "../../util/auth";
import { deleteUserAccount } from "../../util/database";

function DeleteAccountButton(props) {
  const onLoading = props.onLoading;
  const onSuccess = props.onSuccess;
  const onError = props.onError;

  const handleSignOut = async () => {
    try {
      onLoading();
      // TODO: Add leave party action before deleting the account.
      // TODO: Remove user photo
      await deleteUserAccount(getCurrentUser());
      onSuccess();
    } catch (error) {
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
