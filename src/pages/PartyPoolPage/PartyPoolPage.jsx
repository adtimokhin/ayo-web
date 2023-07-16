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
  const peopleToShow = [];

  for (let i = 0; i < people.length; i++) {
    const userRef = people[i];
    const userId = userRef.id;
    const personData = await getUserData(userId);
    if (personData.sexOfInterest === userData.sex) {
      const alreadyLiked = await isUserLikedByCurrentUser(
        userData.uid,
        userId,
        pool.uid
      );
      if (!alreadyLiked) {
        peopleToShow.push(<PersonCard key={userId} userData={personData} poolData={pool} />);
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
          setPool(await getPool(user));
        } else {
          navigate(`${homeDirectory}/login`);
        }
      } else {
        navigate(`${homeDirectory}/login`);
      }
    };

    if (pool === null) {
      fetchUserData();
    }
  }, [pool]);

  return (
    <div className="bg-background min-h-screen">
      <nav className="bg-peach py-4 fixed top-0 w-full">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
          <div>
              <Link
                to={`${homeDirectory}/home`}
                className="bg-white text-gray-900 font-bold px-2 rounded-lg border-2 border-secondary hover:bg-secondary hover:text-white transition-all duration-300 ease-in-out font-body text-3xl w-full"
              >
                X
              </Link>
            </div>
            <div className="text-white font-bold text-3xl">
            <span style={{ textDecoration: 'underline', textDecorationColor: '#FE6244' }}>AYO | Party Pool</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-background py-24">
        <div className="max-w-6xl mx-auto px-4">
          {pool ? (
            <div className="grid grid-cols-2 gap-4">
              {pool.length !== 0 ? (
                pool.map((item, index) => (
                  <div key={index} className="grid-item">
                    {item}
                  </div>
                ))
              ) : (
                <h1 className="text-gray col-span-2 text-center font-display font-bold text-6xl">
                  Party Pool is currently empty
                </h1>
              )}
            </div>
          ) : (
            <LoadingPage />
          )}
        </div>
      </div>
    </div>
  );
}

export default PartyPoolPage;
