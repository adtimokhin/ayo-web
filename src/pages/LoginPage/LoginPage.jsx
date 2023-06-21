import { useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./LoginPage.css";
import ErrorMessageScreen from "../../components/ErrorMessageScreen/ErrorMessageScreen";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";

function LoginPage(props) {
  const onError = props.onError;
  const [overlayScreen, setOverlayScreen] = useState(null);
  return (
    <div className="RegisterPage flex flex-col items-center justify-start w-screen h-screen bg-background">
      {overlayScreen}
      <div className="mt-10">
        <h1 className="text-6xl font-display text-white font-bold pt-12">
          <span style={{ textDecoration: 'underline', textDecorationColor: '#FE6244' }}>
            LOGIN
          </span>
        </h1>
      </div>
      <div className="flex flex-col items-center mt-15">
        <LoginForm
          onError={(msg) => {
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
        />
      </div>
    </div>
  );
}

export default LoginPage;

