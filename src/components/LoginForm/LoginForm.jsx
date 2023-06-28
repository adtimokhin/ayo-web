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
      className="rounded-lg p-10 flex flex-col items-center mt-16 lg:w-fit w-full text-[#f5aeae] font-body"
      style={{ border: "6px solid #4E22A1" }}
      onSubmit={handleSubmit}
    >
      {errorMessage && <p className="text-secondary">{errorMessage}</p>}
      <div className="mb-6 w-full">
        <label
          className="font-bold mb-2 font-body text-xl text-white"
          htmlFor="email"
        >
          Email:
        </label>
        <input
          className="w-full p-2 mb-6 text-[#FFFFFF] border-b-2 border-[#FE6244] focus:outline-none focus:border-[#FE6244] bg-[transparent]"
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
          className="font-bold mb-2 font-body text-xl text-white"
          htmlFor="password"
        >
          Password:
        </label>
        <input
          className="w-full p-2 mb-6 text-[#FFFFFF] text-[#FFFFFF] border-b-2 focus:outline-none focus:border-[#ff2b2b] bg-[transparent] border-[#FE6244]"
          id="password"
          type="password"
          placeholder="*******"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div className="flex flex-col items-center justify-between w-[60%]">
        <button
          className="bg-[#FE6244] hover:bg-[#FE6244] active:bg-[#FE6244] text-white py-2 px-4 font-bold text-2xl rounded-full focus:outline-none focus:shadow-outline w-full"
          type="submit"
          onClick={handleSubmit}
          style={{ borderRadius: '50px' }}
        >
          Sign In
        </button>
        <div className="text-white mt-6 whitespace-nowrap">
          Don't have an account yet?{" "}
          <Link to={`${homeDirectory}/register`}>
          <span style={{ color: '#FE6244', textDecoration: 'underline'}}>Register now!</span>
          </Link>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;


