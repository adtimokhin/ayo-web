import { useState } from "react";
import DeleteAccountButton from "../../components/DeleteAccountButton/DeleteAccountButton";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";
import MessageScreen from "../../components/MessageScreen/MessageScreen";
import { useNavigate } from "react-router";
import { homeDirectory } from "../../util/routing";
import ErrorMessageScreen from "../../components/ErrorMessageScreen/ErrorMessageScreen";
import HomeButton from "../../components/HomeButton/HomeButton";

function AccountPage() {
  const [overlay, setOverlay] = useState(null);
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen flex flex-col justify-between bg-background">
      {overlay}
      <header className="mt-12 flex justify-center">
          <h1 className="text-6xl font-display text-white font-bold">
            <span style={{ textDecoration: 'underline', textDecorationColor: '#FE6244' }}>ACCOUNT</span>
          </h1>
        </header>
      <HomeButton />
      <DeleteAccountButton
        onLoading={() => setOverlay(<LoadingOverlay />)}
        onSuccess={() => {
          setOverlay(
            <MessageScreen
              message="Your account was deleted!"
              onClose={() => {
                navigate(`${homeDirectory}/login`);
              }}
            />
          );
        }}
        onError={(msg) => {
          setOverlay(
            <ErrorMessageScreen
              message={msg}
              onClose={() => {
                setOverlay(null);
              }}
            />
          );
        }}
      />
    </div>
  );
}

export default AccountPage;
