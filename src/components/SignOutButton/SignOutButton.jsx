import { useNavigate } from "react-router";
import { signOutUser } from "../../util/auth";
import { homeDirectory } from "../../util/routing";


function SignOutButton() {
    const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOutUser();
      navigate(`${homeDirectory}/login`);
    } catch (error) {
      console.error("Error signing out user: ", error);
    }
  };

  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      onClick={handleSignOut}
    >
      Sign Out
    </button>
  );
}

export default SignOutButton;