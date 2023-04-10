import "./HomePage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../util/auth";
import SignOutButton from "../SignOutButton/SignOutButton";
import { getUserData } from "../../util/database";
import ViewPartyPoolButton from "../ViewPartyPoolButton/ViewPartyPoolButton";
import JoinPartyButton from "../JoinPartyButton/JoinPartyButton";



function HomePage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const user = getCurrentUser();
      if (!user) {
        navigate("/login");
      }else{
        if (!user.emailVerified) {
          // Redirect to login page if user is not signed in
          navigate("/login");
        }else{
            getUserData(user.uid).then((snapshot) => {
                setUserData(snapshot);
            })
            
        }
      }
  });

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center my-8">Logged in!</h1>
      <p>{userData?.email}</p>
      {userData?.party ? <ViewPartyPoolButton /> : <JoinPartyButton/>}
      <SignOutButton />
    </div>
  );
}

export default HomePage;
