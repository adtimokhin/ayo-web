import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="h-screen bg-primary text-gray-800 flex flex-col justify-center items-center">
      <h1 className="text-9xl font-bold font-display mb-4 text-gray">AYO</h1>
      <h2 className="text-2xl font-thin font-display mb-8 text-gray">
        Scan. Match. Act.
      </h2>
      <div className="flex flex-col justify-center items-center py-12">
        <div className="flex justify-between">
          <Link
            to="/login"
            className="bg-peach hover:bg-secondary text-white font-bold py-2 px-4 rounded mb-4 m-4"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-peach hover:bg-secondary text-white font-bold py-2 px-4 rounded mb-4 m-4"
          >
            Register
          </Link>
        </div>
      </div>
      <p className="text-peach font-body mt-8 absolute bottom-3">v 0.0.2</p>
    </div>
  );
};

export default LandingPage;
