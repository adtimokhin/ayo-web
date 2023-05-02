import React from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";


function LoadingOverlay() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-primary bg-opacity-50 z-10">
      <div className="p-6 rounded-md z-20">
        <LoadingSpinner />
      </div>
    </div>
  );
}

export default LoadingOverlay;
