import { useState } from "react";
import ErrorMessageScreen from "./components/ErrorMessageScreen/ErrorMessageScreen";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import JoinPartyPage from "./pages/JoinPartyPage/JoinPartyPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import PartyPoolPage from "./pages/PartyPoolPage/PartyPoolPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [screenMessage, setScreenMessage] = useState(null);
  return (
    <div className="App bg-[#4DD1C4]">
      <BrowserRouter>
        <main>
          {screenMessage}
          <Routes>
            <Route
              exact
              path="/"
              element={
                <LoginPage
                  onError={(errorMessage) => {
                    setScreenMessage(
                      <ErrorMessageScreen message={errorMessage} onClose={() => {
                        setScreenMessage(null);
                      }} />
                    );
                  }}
                />
              }
            />
            <Route
              path="/login"
              element={
                <LoginPage
                  onError={(errorMessage) => {
                    setScreenMessage(
                      <ErrorMessageScreen message={errorMessage} onClose={() => {
                        setScreenMessage(null);
                      }} />
                    );
                  }}
                />
              }
            />
            <Route
              path="/register"
              element={
                <RegisterPage
                  onError={(errorMessage) => {
                    setScreenMessage(
                      <ErrorMessageScreen message={errorMessage} onClose={() => {
                        setScreenMessage(null);
                      }} />
                    );
                  }}
                />
              }
            />
            <Route path="/home" element={<HomePage />} />
            <Route path="/join-party" element={<JoinPartyPage />} />
            <Route path="/party-pool" element={<PartyPoolPage />} />
          </Routes>
        </main>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
