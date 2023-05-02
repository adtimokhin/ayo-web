import React from "react";

function MessageScreen(props) {
  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-primary bg-opacity-50 z-10"
      onClick={props.onClose}
    >
      <div className="p-6 rounded-md bg-white text-blue-600 z-20">
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

export default MessageScreen;
