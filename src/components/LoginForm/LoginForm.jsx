import "./LoginForm.css";
import { useState } from "react";
import { signInUser } from "../../util/auth";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { homeDirectory } from "../../util/routing";

function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onError = props.onError;
  const onLoading = props.onLoading;

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    onLoading();

    try {
      // TODO: Add support for add check tokens
      const user = await signInUser(email, password);
      setErrorMessage("");
      navigate(`${homeDirectory}/home`);
    } catch (error) {
      if (
        error.message == "Firebase: Error (auth/wrong-password)." ||
        error.message == "Firebase: Error (auth/user-not-found)."
      ) {
        onError("Invalid Credentials");
      } else {
        onError(error.message);
      }
    }
  };

  return (
    <form
      className="bg-[#17193f] rounded-lg p-10 flex flex-col items-center mt-16 lg:w-fit w-full text-[#f5aeae] font-body"
      onSubmit={handleSubmit}
    >
      {errorMessage && <p className="text-secondary">{errorMessage}</p>}
      <div className="mb-6 w-full">
        <label
          className="font-bold mb-2 font-body text-xl"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="w-full p-2 mb-6 text-[#8c8e9b] border-b-2 border-[#f5aeae] focus:outline-none focus:border-[#ff2b2b] bg-[transparent]"
          id="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="mb-6 w-full">
        <label
          className="font-bold mb-2 font-body text-xl"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="w-full p-2 mb-6 text-gray-700 text-[#1d1e26] border-b-2 focus:outline-none focus:border-[#ff2b2b] bg-[transparent] border-[#f5aeae]"
          id="password"
          type="password"
          placeholder="*******"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div className="flex items-center justify-between w-[60%]">
        <button
          className="bg-[#0f1ca1] hover:bg-[#0c1bc0] active:bg-[#1122df]  text-gray py-4 px-4 font-bold text-3xl rounded focus:outline-none focus:shadow-outline w-full"
          type="submit"
          onClick={handleSubmit}
        >
          Sign In
        </button>
      </div>
      <div className="text-center mt-6">
        <Link to={`${homeDirectory}/register`} className="text-[#1122df] hover:underline">
          Don't have an account yet? <span className="gradient-text">Register now!</span>
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
