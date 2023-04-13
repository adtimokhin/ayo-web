import React from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const LoadingPage = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-primary">
      <LoadingSpinner />
    </div>
  );
};

export default LoadingPage;
