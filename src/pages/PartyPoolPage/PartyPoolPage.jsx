import { useEffect, useState } from "react";
import { getCurrentUser } from "../../util/auth";
import {
  getPartyPoolByParty,
  getUserData,
  getUserRefsFromPoolDoc,
  isUserLikedByCurrentUser,
  refToDoc,
} from "../../util/database";
import { useNavigate } from "react-router";
import PersonCard from "../../components/PersonCard/PersonCard";

const getPool = async (userData) => {
  const partyRef = userData.party;
  const party = refToDoc(partyRef);
  const partyId = party.id;
  const pool = await getPartyPoolByParty(partyId);
  const people = await getUserRefsFromPoolDoc(pool.uid, userData.sexOfInterest);
  let peopleToShow = [];

  for (let i = 0; i < people.length; i++) {
    const userRef = people[i];
    const userId = userRef.id;
    const personData = await getUserData(userId);
    if (personData.sexOfInterest === userData.sex) {
      // Only showing if there is a match
      // TODO: If user already has liked that user do not show them again.
      const alreadyLiked = await isUserLikedByCurrentUser(
        userData.uid,
        userId,
        pool.uid
      );
      if (!alreadyLiked) {
        peopleToShow.push(<PersonCard userData={personData} poolData={pool} />);
      }
    }
  }

  return peopleToShow;
};

function PartyPoolPage() {
  const navigate = useNavigate();
  const [userCredentials, setUserCredentials] = useState(null);
  const [userData, setUserData] = useState(null);
  const [pool, setPool] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = getCurrentUser();
      setUserCredentials(currentUser);

      if (currentUser) {
        if (currentUser.emailVerified) {
          const user = await getUserData(currentUser.uid);
          setUserData(user);
          setPool(<p>{await getPool(user)}</p>);
        } else {
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };

    fetchUserData();
  }, []);

  return <div>{pool}</div>;
}

export default PartyPoolPage;
