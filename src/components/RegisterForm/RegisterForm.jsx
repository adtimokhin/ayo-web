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
import { homeDirectory } from "../../util/routing";

const validateEmail = (email) => {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(email);
};

function RegisterForm(props) {
  const [isDisabled, setIsDisabled] = useState(true);

  const onError = props.onError;
  const onLoading = props.onLoading;
  const stopLoading = props.stopLoading;
  const onSuccess = props.onSuccess;

  const handleSubmit = async (event) => {
    event.preventDefault();

    onLoading();

    const email = event.target.elements.email?.value;
    const password = event.target.elements.password?.value;
    const verificationPassword =
      event.target.elements.verificationPassword?.value;
    const sex = event.target.elements.sex?.value;
    const sexOfInterest = event.target.elements.sexOfInterest?.value;
    const picture = event.target.elements.picture?.files[0];

    if (
      !email ||
      !password ||
      !verificationPassword ||
      !sex ||
      !sexOfInterest ||
      !picture
    ) {
      onError("Please fill in all of the required fields");
      return;
    }

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

      // await signOutUser();
      onSuccess();
    } catch (error) {
      console.error("Error registering user:", error);
      if (error.message == "Firebase: Error (auth/email-already-in-use).") {
        onError("Email already in use");
        // setError("Email already in use");
      } else {
        onError(error);
        // setError("Unknown error!");
      }
    }
  };

  return (
    <div className="pb-20">
      <form
        className="rounded-lg py-5 px-10 flex flex-col items-center mt-4 lg:w-fit w-full text-[#f5aeae] font-body"
        style={{ border: "6px solid #4E22A1" }} //4E22A1
        onSubmit={handleSubmit}
      >
        <div className="w-full">
          <label
            htmlFor="email"
            className="block font-medium mb-2 text-[#FFFFFF]"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
            className="w-full p-2 mb-6 text-white border-b-2 border-[#FE6244] focus:outline-none focus:border-secondary bg-[transparent]"
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="password"
            className="block font-medium mb-2 text-[#FFFFFF]"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="******"
            required
            className="w-full p-2 mb-6 text-white border-b-2 border-[#FE6244] focus:outline-none focus:border-secondary bg-[transparent]"
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="verificationPassword"
            className="block font-medium mb-2 text-[#FFFFFF]"
          >
            Verify Password:
          </label>
          <input
            type="password"
            id="verificationPassword"
            name="verificationPassword"
            placeholder="******"
            required
            className="w-full p-2 mb-6 text-white border-b-2 border-[#FE6244] focus:outline-none focus:border-secondary bg-[transparent]"
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="sex"
            className="block font-medium mb-2 text-[#FFFFFF]"
          >
            What sex do you want to be associated with:
          </label>
          <select
            id="sex"
            name="sex"
            placeholder="M/F/NB"
            required
            className="w-full p-2 mb-6 text-white border-b-2 border-[#FE6244] focus:outline-none focus:border-secondary bg-[transparent]"
          >
            <option value=""></option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">NB</option>
          </select>
        </div>
        <div className="w-full">
          <label
            htmlFor="sexOfInterest"
            className="block font-medium mb-2 text-[#FFFFFF]"
          >
           Whose profiles do you want to see:
          </label>
          <select
            id="sexOfInterest"
            name="sexOfInterest"
            required
            className="w-full p-2 mb-6 text-white border-b-2 border-[#FE6244] focus:outline-none focus:border-secondary bg-[transparent]"
          >
            <option value=""></option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Everyone</option>
          </select>
        </div>
        <div className="w-full">
          <label
            htmlFor="picture"
            className="block font-medium mb-2 text-[#FFFFFF]"
          >
            Picture:
          </label>
          <input
            type="file"
            id="picture"
            name="picture"
            accept="image/*"
            className="w-full p-2 mb-2 text-white border-b-2 border-[#FE6244] focus:outline-none focus:border-secondary bg-[transparent]"
          />
        </div>

        <div className="w-full h-fit flex py-4">
          <button
            onClick={() => {
              setIsDisabled(!isDisabled);
            }}
          >
            {isDisabled ? (
              <div className="h-[20px] w-[20px] bg-white" />
            ) : (
              <div className="h-[20px] w-[20px] bg-secondary" />
            )}
          </button>
          <p className="w-fit ml-3 font-semibold font-body">
            Click to agree with{" "}
            <a href="https://github.com/adtimokhin/ayo-web/blob/main/terms.txt" target="_blank" className="text-secondary" style={{ textDecoration: "underline" }}>
              terms and conditions
            </a>
          </p>
        </div>

        <button
          className="bg-[#FE6244] hover:bg-[#FE6244] active:bg-[#FE6244] text-white py-1 px-3 font-bold text-xl rounded-full focus:outline-none focus:shadow-outline disabled:bg-secondary/30 disabled:text-white/30"
          type="submit"
          onClick={handleSubmit}
          disabled={isDisabled}
          style={{ borderRadius: "50px" }}
        >
          Register
        </button>
        <div className="text-sm text-white hover:underline cursor-pointer">
          <Link to={`${homeDirectory}/login`} className="">
            Already have an account?{" "}
            <span style={{ color: "#FE6244", textDecoration: "underline" }}>
              Login!
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
