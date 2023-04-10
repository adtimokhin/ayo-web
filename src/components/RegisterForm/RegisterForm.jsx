import React from "react";
import "./RegisterForm.css";
import { registerUser, sendVerificationEmail, signOutUser } from "../../util/auth";
import { addNewUser } from "../../util/database";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const validateEmail = (email) => {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(email);
};

function RegisterForm() {
  const [error, setError] = useState("");
  const navigate = useNavigate()

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
      setError("Invalid email format");
      return;
    }

    // Check password fields for errors
    if (password !== verificationPassword) {
      setError("Passwords do not match");
      return;
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters long");
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
        setError("Email already in use");
      } else {
        setError("Unknown error!");
      }
    }
  };

  return (
    <div className="RegisterForm">
      <h1 className="text-3xl font-bold mb-6">Register Form</h1>{" "}
      {error && <p className="text-red-500">{error}</p>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block font-medium mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full border-gray-400 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring focus:ring-gray-500 focus:border-gray-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block font-medium mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="w-full border-gray-400 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring focus:ring-gray-500 focus:border-gray-500"
          />
        </div>
        <div>
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
            className="w-full border-gray-400 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring focus:ring-gray-500 focus:border-gray-500"
          />
        </div>
        <div>
          <label htmlFor="sex" className="block font-medium mb-2">
            Sex:
          </label>
          <select
            id="sex"
            name="sex"
            required
            className="w-full border-gray-400 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring focus:ring-gray-500 focus:border-gray-500"
          >
            <option value=""></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="sexOfInterest" className="block font-medium mb-2">
            Sex of Interest:
          </label>
          <select
            id="sexOfInterest"
            name="sexOfInterest"
            required
            className="w-full border-gray-400 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring focus:ring-gray-500 focus:border-gray-500"
          >
            <option value=""></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="picture" className="block font-medium mb-2">
            Picture:
          </label>
          <input
            type="file"
            id="picture"
            name="picture"
            accept="image/*"
            className="w-full border-gray-400 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring focus:ring-gray-500 focus:border-gray-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
