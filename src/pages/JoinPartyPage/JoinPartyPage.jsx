import { useRef, useEffect } from "react";
import jsQR from "jsqr";
import { useNavigate } from "react-router";
import { getCurrentUser } from "../../util/auth";
import {
  updateUserPartyId,
  checkPartyActive,
  getPartyPoolByParty,
  addUserToPartyPool,
  getUserData,
} from "../../util/database";
import { homeDirectory } from "../../util/routing";

function JoinPartyPage() {
  const videoRef = useRef();
  const navigate = useNavigate();

  let user;

  useEffect(() => {
    user = getCurrentUser();
    console.log(user);
    if (!user) {
      navigate(`${homeDirectory}/login`);
    } else if (!user.emailVerified) {
      // Redirect to login page if user is not signed in
      navigate(`${homeDirectory}/login`);
    } else {
      const constraints = {
        audio: false,
        video: true,
      };

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          videoRef.current.srcObject = stream;
          const interval = setInterval(() => {
            context.drawImage(
              videoRef.current,
              0,
              0,
              canvas.width,
              canvas.height
            );
            const imageData = context.getImageData(
              0,
              0,
              canvas.width,
              canvas.height
            );
            const code = jsQR(
              imageData.data,
              imageData.width,
              imageData.height
            );
            if (code) {
              // Code is read:
              const partyId = code.data;
              // Step 1: Check that this party id actually exists
              checkPartyActive(partyId).then((party) => {
                if (party) {
                  // Step 2: Set current user to party id.
                  updateUserPartyId(user.uid, partyId).then(() => {
                    getPartyPoolByParty(partyId).then((pool) => {
                      console.log("pool :>> ", pool);
                      if (pool) {
                        getUserData(user.uid).then((data) => {
                          addUserToPartyPool(pool, data).then(() => {
                            navigate("/home");
                            console.log("User added to party");
                          });
                        });
                      }
                    });
                  });
                } else {
                  console.log(
                    "This is not a partyId or you cannot join party at this time!"
                  );
                }
              });
            }
          }, 1000);
          return () => clearInterval(interval);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  // TODO: FORCE DELETE THE LISTENER WHEN THE COMPONENT LEAVES THE SCREEN

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-primary">
      <h1 className="text-5xl font-extrabold text-peach mb-8 font-display">
        Scan party QR
      </h1>
      <div className="w-1/2 border-2 border-peach rounded-md overflow-hidden">
        <video ref={videoRef} autoPlay={true} className="w-full" />
      </div>
    </div>
  );
}

export default JoinPartyPage;
