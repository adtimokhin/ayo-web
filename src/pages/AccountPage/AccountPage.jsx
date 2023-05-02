import { useState } from "react";
import DeleteAccountButton from "../../components/DeleteAccountButton/DeleteAccountButton";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";
import MessageScreen from "../../components/MessageScreen/MessageScreen";
import { useNavigate } from "react-router";
import { homeDirectory } from "../../util/routing";
import ErrorMessageScreen from "../../components/ErrorMessageScreen/ErrorMessageScreen";

function AccountPage() {
  const [overlay, setOverlay] = useState(null);
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen flex flex-col justify-between bg-primary">
      {overlay}
      <h1 className="text-6xl font-display text-peach font-bold">ACCOUNT</h1>

      <DeleteAccountButton
        onLoading={()=>setOverlay(<LoadingOverlay />)}
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
