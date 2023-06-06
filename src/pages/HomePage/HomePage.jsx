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
    <div className="h-screen flex flex-col justify-between bg-primary">
      {message}
      <h1 className="pt-8 text-center font-bold text-tertiary uppercase font-display text-outline text-9xl">
        AYO
      </h1>

      {userData ? (
        userData?.party ? (
          <div className="space-y-12">
            <ViewPartyPoolButton />
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
        ) : (
          <JoinPartyButton />
        )
      ) : (
        <LoadingPage />
      )}
      <ViewAccountButton />
      <SignOutButton />
    </div>
  );
}

export default HomePage;
