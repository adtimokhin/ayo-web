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
import LoadingPage from "../../components/LoadinPage/LoadingPage";
import { homeDirectory } from "../../util/routing";
import { Link } from "react-router-dom";

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
          navigate(`${homeDirectory}/login`);
        }
      } else {
        navigate(`${homeDirectory}/login`);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="bg-primary w-screen">
      <nav className="bg-peach py-4 fixed top-0 w-full">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div>
              <a
                href={`${homeDirectory}/`}
                className="text-primary font-bold text-lg hover:text-gray-600"
              >
                AYO!
              </a>
            </div>
            <div>
              <Link
                to={`${homeDirectory}/home`}
                className="text-gray-600 hover:text-primary px-3"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {pool ? (
        <div className="flex w-full items-center justify-center pt-20">
          <div className="flex flex-wrap justify-center">
            {pool.props.children.length != 0 ? (
              pool
            ) : (
              <h1 className="text-gray h-screen mx-auto text-center font-display font-bold text-9xl">
                Party Pool is currently empty
              </h1>
            )}
          </div>
        </div>
      ) : (
        <LoadingPage />
      )}
    </div>
  );
}

export default PartyPoolPage;
