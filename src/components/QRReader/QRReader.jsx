import { useEffect } from "react";
import jsQR from "jsqr";
import {
  updateUserPartyId,
  checkPartyActive,
  getPartyPoolByParty,
  addUserToPartyPool,
  getUserData,
} from "../../util/database";
import { homeDirectory } from "../../util/routing";
import { useNavigate } from "react-router";

function QRReader({ onError, onLoad, user, videoRef, stopVideo }) {
  const constraints = {
    audio: false,
    video:
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
        ? { facingMode: { exact: "environment" } }
        : true,
  };

  const navigate = useNavigate();

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // Starting streaming
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        videoRef.current.srcObject = stream;
        const analyseInterval = setInterval(() => {
          if (videoRef.current) {
            // Drawing the video onto the screen of the user
            context.drawImage(
              videoRef.current,
              0,
              0,
              canvas.width,
              canvas.height
            );

            // Getting the image data
            const imageData = context.getImageData(
              0,
              0,
              canvas.width,
              canvas.height
            );

            // Analysing the image to find QR code
            const code = jsQR(
              imageData.data,
              imageData.width,
              imageData.height
            );
            if (code) {
              // Set loading screen
              onLoad();
              // Code is read:
              const partyId = code.data;
              // Step 1: Check that this party id actually exists
              checkPartyActive(partyId).then((party) => {
                if (party) {
                  // Step 2: Set current user to party id.
                  updateUserPartyId(user.uid, partyId)
                    .then(() => {
                      getPartyPoolByParty(partyId)
                        .then((pool) => {
                          if (pool) {
                            getUserData(user.uid)
                              .then((data) => {
                                addUserToPartyPool(pool, data)
                                  .then(() => {
                                    // Stop reading from the video stream
                                    stopVideo();
                                    navigate(`${homeDirectory}/home`);
                                  })
                                  .catch(() => {
                                    stopVideo();
                                    onError(
                                      "Failed to add you to the party pool"
                                    );
                                  });
                              })
                              .catch(() => {
                                stopVideo();
                                onError("Failed to add you to the party pool");
                              });
                          } else {
                            stopVideo();
                            onError("Failed to add you to the party pool");
                          }
                        })
                        .catch(() => {
                          stopVideo();
                          onError("Failed to add you to the party pool");
                        });
                    })
                    .catch(() => {
                      stopVideo();
                      onError("Failed to add you to the party pool");
                    });
                } else {
                  stopVideo();
                  onError("This is not a valid QR Code. Try again");
                }
              });
            }
          } else {
            clearInterval(analyseInterval);
          }
        }, 1000);
        return () => clearInterval(analyseInterval);
      })
      .catch((e) => {
        console.log(e);
        onError(
          "Ouch! There is something wrong with accesing your camera. Try again, maybe the issue will go away :)"
        );
      });
  }, []);

  return (
    <div className="sm:w-screen sm:h-[400px] lg:w-1/2 border-2 border-peach rounded-md overflow-hidden">
      <video ref={videoRef} autoPlay={true} className="w-full" />
    </div>
  );
}

export default QRReader;  