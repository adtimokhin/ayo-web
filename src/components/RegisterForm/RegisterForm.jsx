import React from "react";
import "./RegisterForm.css";
import {
  registerUser,
  sendVerificationEmail,
  signOutUser,
} from "../../util/auth";
import { addNewUser } from "../../util/database";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const validateEmail = (email) => {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(email);
};

function RegisterForm(props) {
  const onError = props.onError;
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    const verificationPassword =
      event.target.elements.verificationPassword.value;
    const sex = event.target.elements.sex.value;
    const sexOfInterest = event.target.elements.sexOfInterest.value;
    const picture = event.target.elements.picture.files[0];

    console.log(picture);

    // Check email format
    if (!validateEmail(email)) {
        onError("Invalid email format");
    //   setError("Invalid email format");
      return;
    }

    // Check password fields for errors
    if (password !== verificationPassword) {
        onError("Passwords do not match");
    //   setError("Passwords do not match");
      return;
    } else if (password.length < 6) {
        onError("Password must be at least 6 characters long");
    //   setError("Password must be at least 6 characters long");
      return;
    }

    try {
      const user = await registerUser(email, password);
      const userDB = await addNewUser(user, sex, sexOfInterest, picture);
      // If user has registered successfully
      sendVerificationEmail();
      console.log("User registered successfully:", user);
      console.log("Snapshot registered successfully:", userDB);

      await signOutUser();
      navigate("/home");
    } catch (error) {
      console.error("Error registering user:", error);
      if (error.message == "Firebase: Error (auth/email-already-in-use).") {
        onError("Email already in use");
        // setError("Email already in use");
      } else {
        onError("Unknown error!");
        // setError("Unknown error!");
      }
    }
  };

  return (
    <div className="RegisterForm">
      {error && <p className="text-red-500">{error}</p>}
      <form
        className="space-y-4 bg-white rounded-lg p-10 flex flex-col items-center mt-16"
        onSubmit={handleSubmit}
      >
        <div className="w-full">
          <label htmlFor="email" className="block font-medium mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full p-2 mb-6 text-gray-700 border-b-2 border-gray-300 focus:outline-none focus:border-secondary"
          />
        </div>
        <div className="w-full">
          <label htmlFor="password" className="block font-medium mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="w-full p-2 mb-6 text-gray-700 border-b-2 border-gray-300 focus:outline-none focus:border-secondary"
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="verificationPassword"
            className="block font-medium mb-2"
          >
            Verify Password:
          </label>
          <input
            type="password"
            id="verificationPassword"
            name="verificationPassword"
            required
            className="w-full p-2 mb-6 text-gray-700 border-b-2 border-gray-300 focus:outline-none focus:border-secondary"
          />
        </div>
        <div className="w-full">
          <label htmlFor="sex" className="block font-medium mb-2">
            Sex:
          </label>
          <select
            id="sex"
            name="sex"
            required
            className="w-full p-2 mb-6 text-gray-700 border-b-2 border-gray-300 focus:outline-none focus:border-secondary"
          >
            <option value=""></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="w-full">
          <label htmlFor="sexOfInterest" className="block font-medium mb-2">
            Sex of Interest:
          </label>
          <select
            id="sexOfInterest"
            name="sexOfInterest"
            required
            className="w-full p-2 mb-6 text-gray-700 border-b-2 border-gray-300 focus:outline-none focus:border-secondary"
          >
            <option value=""></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="w-full">
          <label htmlFor="picture" className="block font-medium mb-2">
            Picture:
          </label>
          <input
            type="file"
            id="picture"
            name="picture"
            accept="image/*"
            className="w-full p-2 mb-6 text-gray-700 border-b-2 border-gray-300 focus:outline-none focus:border-secondary"
          />
        </div>
        <button
          type="submit"
          className="bg-secondary text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Register
        </button>
        <div className="text-sm text-blue-500 hover:underline cursor-pointer">
          Already have an account?{" "}
          <Link to="/login" className="">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
