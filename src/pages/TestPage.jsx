import LikeButton from "../components/LikeButton/LikeButton";

function TestPage() {
  return (
    <div className="bg-lime-500 w-screen h-fit">
      {/* place where the cards go */}

      <div
        className="w-full min-h-screen grid grid-cols-3 sm:space-y-10 lg:space-y-0 lg:space-x-4"
        id="card_holder"
      >
        {/* Test Content */}

        {/*     <div className="bg-[#f5e2df] shadow-md rounded-lg p-4 mx-auto my-4 h-fit">
      <div className="h-fit">
        <div className="h-fit w-fit border-2 border-spacing-1 border-blue-500">
          <img
            src={imageUrl}
            alt="Profile"
            className="w-full h-full object-contain"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
      <div className="flex justify-center items-center h-1/4 pt-3">
        <LikeButton userData={userData} poolData={poolData} />
      </div>
    </div> */}
        <div className="bg-secondary h-fit justify-self-center sm:col-span-3 lg:col-span-1">
          <div className="h-fit">
            <img
              src="https://adtimokhin.github.io/family_photos_json_server/images/jacob/jacob13.jpg"
              alt="Profile"
              style={{ objectFit: "contain", height: "80vh" }}
            />
          </div>
          <div className="flex justify-center items-center h-1/4 py-3">
            <LikeButton userData={""} poolData={""} />
          </div>
        </div>
        <div className="bg-secondary h-fit justify-self-center sm:col-span-3 lg:col-span-1">
          <div className="h-fit">
            <img
              src="https://adtimokhin.github.io/family_photos_json_server/images/jacob/jacob13.jpg"
              alt="Profile"
              style={{ objectFit: "contain", height: "80vh" }}
            />
          </div>
          <div className="flex justify-center items-center h-1/4 py-3">
            <LikeButton userData={""} poolData={""} />
          </div>
        </div>
        <div className="bg-secondary h-fit justify-self-center sm:col-span-3 lg:col-span-1">
          <div className="h-fit">
            <img
              src="https://adtimokhin.github.io/family_photos_json_server/images/jacob/jacob13.jpg"
              alt="Profile"
              style={{ objectFit: "contain", height: "80vh" }}
            />
          </div>
          <div className="flex justify-center items-center h-1/4 py-3">
            <LikeButton userData={""} poolData={""} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestPage;
