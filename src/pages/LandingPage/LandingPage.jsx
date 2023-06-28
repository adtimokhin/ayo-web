import { Link } from "react-router-dom";
import { homeDirectory } from "../../util/routing";
import "./LandingPage.css";


const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div
        className="absolute inset-0 flex flex-col justify-center items-center"
        id="title--holder"
      >
        <h1 className="text-9xl lg:text-9xl font-bold font-logo text-white relative">
          AYO
          <span className="underline" style={{ bottom: '5px' }}></span>
        </h1>

       <h2 className="text-lg md:text-2xl lg:text-3xl font-thin mb-8 text-white flex justify-center items-center">
          <span className="flex items-center">Scan. Match.</span>&nbsp;<span className="text-gradient font-bold flex items-center">Act.</span>
       </h2>
      <div className="button-container">
        <Link
          to={`${homeDirectory}/login`}
          className="navigation-button"
        >
        <p className="text-base md:text-2xl lg:text-3xl button-text">Join the party!</p>
      </Link>
    </div>
</div>
</div>
  );
};

export default LandingPage;
