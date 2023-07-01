import "./HomePage.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, signOutUser } from "../../util/auth";
import { getUserData } from "../../util/database";

import SignOutButton from "../../components/SignOutButton/SignOutButton";
import ViewPartyPoolButton from "../../components/ViewPartyPoolButton/ViewPartyPoolButton";
import JoinPartyButton from "../../components/JoinPartyButton/JoinPartyButton";
import LoadingPage from "../../components/LoadinPage/LoadingPage";
import { homeDirectory } from "../../util/routing";
import LeavePartyButton from "../../components/LeavePartyButton/LeavePartyButton";
import ErrorMessageScreen from "../../components/ErrorMessageScreen/ErrorMessageScreen";
import MessageScreen from "../../components/MessageScreen/MessageScreen";
import ViewAccountButton from "../../components/ViewAccountButton/ViewAccountButton";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";

function HomePage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!message) {
      const user = getCurrentUser();
      if (!user) {
        navigate(`${homeDirectory}/login`);
      } else {
        if (!user.emailVerified) {
          // Redirect to login page if user is not signed in
          navigate(`${homeDirectory}/login`);
        } else {
          getUserData(user.uid)
            .then((snapshot) => {
              setUserData(snapshot);
            })
            .catch((err) => {
              setMessage(
                <ErrorMessageScreen
                  message={"Something went wrong... Try logging again later"}
                  onClose={() => {
                    signOutUser().then(() => {
                      navigate(`${homeDirectory}/login`);
                    });
                  }}
                />
              );
            });
        }
      }
    }
  }, [message]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-background">
      {message}
      <h1 className="text-9xl lg:text-9xl font-bold font-logo text-white relative mt-12">
        AYO
        <span className="underline" style={{ bottom: '5px' }}></span>
      </h1>
      <div className="flex flex-col justify-center items-center flex-grow pb-8">
        {userData ? (
          userData?.party ? (
            <div className="space-y-7">
              <div className="flex flex-col items-center">
                <ViewPartyPoolButton />
              </div>
              <div className="flex flex-col items-center">
                <LeavePartyButton
                  userUID={userData.uid}
                  partyUID={userData.party.id}
                  onFinish={() => {
                    setMessage(
                      <MessageScreen
                        onClose={() => {
                          setMessage(null);
                        }}
                        message={"You left the party"}
                      />
                    );
                  }}
                  onLoad={() => {
                    setMessage(<LoadingOverlay />);
                  }}
                />
              </div>
              <div className="flex flex-col items-center">
                <ViewAccountButton />
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              <JoinPartyButton />
              <ViewAccountButton />
            </div>
          )
        ) : (
          <LoadingPage />
        )}
      </div>
      <div className="flex justify-center pb-8">
        <SignOutButton />
      </div>
    </div>
  );
}

export default HomePage;
