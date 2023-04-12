import "./LoginForm.css";
import { useState } from "react";
import { signInUser } from "../../util/auth";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onError = props.onError;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await signInUser(email, password);
      setErrorMessage("");
      navigate("/home");
    } catch (error) {
      if (
        error.message == "Firebase: Error (auth/wrong-password)." ||
        error.message == "Firebase: Error (auth/user-not-found)."
      ) {
        onError("Invalid Credentials");
        // setErrorMessage("Invalid Credentials");
      } else {
        onError(error.message);
        // setErrorMessage(error.message);
      }
    }
  };

  return (
    <form
      className="bg-white rounded-lg p-10 flex flex-col items-center mt-16"
      onSubmit={handleSubmit}
    >
      {errorMessage && <p className="text-secondary">{errorMessage}</p>}
      <div className="mb-6 w-full">
        <label
          className="text-gray-500 font-bold mb-2 font-body"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="w-full p-2 mb-6 text-gray-700 border-b-2 border-gray-300 focus:outline-none focus:border-secondary"
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
          className="text-gray-500 font-bold mb-2 font-body"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="w-full p-2 mb-6 text-gray-700 border-b-2 border-gray-300 focus:outline-none focus:border-secondary"
          id="password"
          type="password"
          placeholder="********"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-secondary text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={handleSubmit}
        >
          Sign In
        </button>
      </div>
      <div className="text-center mt-6">
        <Link to="/register" className="text-blue-500 hover:underline">
          Don't have an account yet? Register now!
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
