import { useEffect, useState } from "react";
import { getCurrentUser } from "../../util/auth";
import { getUserData } from "../../util/database";
import { useNavigate } from "react-router";

function PartyPoolPage() {
  const navigate = useNavigate();
  const [userCredentials, setUserCredentials] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = await getCurrentUser();
      setUserCredentials(currentUser);

      if (currentUser) {
        if (currentUser.emailVerified) {
          const user = await getUserData(currentUser.uid);
          setUserData(user);
        } else {
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };

    fetchUserData();
  }, []);

  return <div>{userData && <h1>My Party ID: {userData.party.uid}</h1>}</div>;
}

export default PartyPoolPage;
