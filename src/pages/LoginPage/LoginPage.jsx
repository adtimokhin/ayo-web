import { useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./LoginPage.css";
import ErrorMessageScreen from "../../components/ErrorMessageScreen/ErrorMessageScreen";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";

function LoginPage(props) {
  const onError = props.onError;
  const [overlayScreen, setOverlayScreen] = useState(null);
  return (
    <div className="RegisterPage flex flex-col w-screen bg-[#030415] justify-center items-center min-h-screen">
      {overlayScreen}
      <h1 className="text-9xl font-display text-[#e98787] font-bold">LOGIN!</h1>
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
        onLoading = {()=>{setOverlayScreen(<LoadingOverlay/>)}}
      />
    </div>
  );
}

export default LoginPage;
