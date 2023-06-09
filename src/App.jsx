import { useState } from "react";
import ErrorMessageScreen from "./components/ErrorMessageScreen/ErrorMessageScreen";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import JoinPartyPage from "./pages/JoinPartyPage/JoinPartyPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import PartyPoolPage from "./pages/PartyPoolPage/PartyPoolPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { homeDirectory } from "./util/routing";
import AccountPage from "./pages/AccountPage/AccountPage";

function App() {
  const [screenMessage, setScreenMessage] = useState(null);
  return (
    <div className="App bg-[#4DD1C4]">
      <HashRouter>
        <main>
          {screenMessage}
          <Routes>
            {/* TODO: Change back */}
            <Route exact index element={<LandingPage />} />
            <Route
              path={`${homeDirectory}/login`}
              element={
                <LoginPage
                  onError={(errorMessage) => {
                    setScreenMessage(
                      <ErrorMessageScreen
                        message={errorMessage}
                        onClose={() => {
                          setScreenMessage(null);
                        }}
                      />
                    );
                  }}
                />
              }
            />
            <Route
              path={`${homeDirectory}/register`}
              element={<RegisterPage />}
            />
            <Route path={`${homeDirectory}/home`} element={<HomePage />} />
            <Route
              path={`${homeDirectory}/join-party`}
              element={<JoinPartyPage />}
            />
            <Route
              path={`${homeDirectory}/party-pool`}
              element={<PartyPoolPage />}
            />
            <Route
              path={`${homeDirectory}/account`}
              element={<AccountPage />}
            />

            {/* This should go last */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </HashRouter>
      <Footer />
    </div>
  );
}

export default App;
