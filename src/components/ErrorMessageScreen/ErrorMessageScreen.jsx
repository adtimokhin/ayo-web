import React from "react";
import "./ErrorMessageScreen.css";

function ErrorMessageScreen(props) {
  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-[#11142e] bg-opacity-50 z-10"
      onClick={props.onClose}
    >
      <div className="p-6 rounded-md bg-white text-red-600 z-20">
        <p>{props.message}</p>
        <button
          className="text-blue-600 underline mt-2"
          onClick={props.onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ErrorMessageScreen;
