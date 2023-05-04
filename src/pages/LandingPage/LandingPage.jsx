import React from "react";
import { Link } from "react-router-dom";
import { homeDirectory } from "../../util/routing";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-black">
      <div
        className="m-4 lg:mb-[25vh] mt-[7rem] mb-[50vh]"
        id="title--holder flex flex-col justify-center items-center"
      >
        <h1 className="lg:text-[16rem] text-[10rem] font-bold text-gray font-display">
          AYO!
        </h1>
        <h2 className="lg:text-4xl text-3xl font-thin mb-8 text-gray">
          Scan. Match. <span className="text-gradient">Act.</span>
        </h2>
      </div>

      <div className="flex flex-col justify-center items-center py-12" id="button--holder">
        <div className="button-container">
          <Link
            to={`${homeDirectory}/login`}
            className="navigation-button"
          >
            <p className="button-text">Begin</p>
            <i className="arrow right"></i>
            
          </Link>

       
         
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
