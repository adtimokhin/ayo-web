import "./HomePage.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../util/firebaseConfig";
import SignOutButton from "../SignOutButton/SignOutButton";

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      }else{
        if (!user.emailVerified) {
          // Redirect to login page if user is not signed in
          navigate("/login");
        }
      }
    });
    return unsubscribe;
  });

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center my-8">Logged in!</h1>
      <SignOutButton />
    </div>
  );
}

export default HomePage;
