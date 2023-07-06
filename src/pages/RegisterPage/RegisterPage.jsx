import React, { useState } from "react";
import "./RegisterPage.css";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import ErrorMessageScreen from "../../components/ErrorMessageScreen/ErrorMessageScreen";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";
import MessageScreen from "../../components/MessageScreen/MessageScreen";
import { useNavigate } from "react-router";
import { homeDirectory } from "../../util/routing";

function RegisterPage() {
  const [overlayScreen, setOverlayScreen] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="RegisterPage flex flex-col w-screen bg-background justify-center items-center h-fit">
      {overlayScreen}
      <h1 className="text-6xl font-display text-white font-bold pt-5 pb-5">
        <span
          style={{
            textDecoration: "underline",
            textDecorationColor: "#FE6244",
          }}
        >
          REGISTER!
        </span>
      </h1>
      <RegisterForm
        onError={(msg) => {
          setOverlayScreen(null);
          setOverlayScreen(
            <ErrorMessageScreen
              message={msg}
              onClose={() => {
                setOverlayScreen(null);
              }}
            />
          );
        }}
        onLoading={() => {
          setOverlayScreen(<LoadingOverlay />);
        }}
        stopLoading={() => {
          setOverlayScreen(null);
        }}
        onSuccess={() => {
          setOverlayScreen(
            <ErrorMessageScreen
              message={"Nice! Now you have to verify your email. Check your email"}
              onClose={() => {
                navigate(`${homeDirectory}/home`);
              }}
            />
          );
        }}
      />
    </div>
  );
}

export default RegisterPage;
