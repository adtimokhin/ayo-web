import HomePage from "./components/HomePage/HomePage";
import JoinPartyPage from "./components/JoinPartyPage/JoinPartyPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App bg-[#4DD1C4]">
      {/* Router for different pages */}
      <BrowserRouter>
        {/* <Header /> */}
        <main>
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/join-party" element={<JoinPartyPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
