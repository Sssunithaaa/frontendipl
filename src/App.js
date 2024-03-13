import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Leaderboard from "./pages/leaderboard/Leaderboard";
import ProfilePage from "./pages/ProfilePage";
import { useState, useEffect } from "react";
import FixturePage from "./pages/fixtures/fixturePage";
import PredictMatch from "./pages/fixtures/predict";
import UserSubmission from "./pages/leaderboard/UserSubmission";
import Authform from "./pages/Authform";
import LeaderboardForm from "./pages/leaderboard/BoardParticipate";
import Introo from "./pages/Homepage/Introo";
import Loading from "./Components/loading";
import AboutUsPage from "./pages/AboutUs";
import RulesPage from "./pages/Rules";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <div className="App bg-gray-100  lg:w-[100vw] overflow-hidden w-[100vw]">
      {isLoading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Introo />}></Route>
            <Route exact path="/register" element={<Authform />}></Route>
            <Route exact path="/board" element={<Leaderboard />}></Route>
            <Route
              exact
              path="/usersubmission"
              element={<UserSubmission />}
            ></Route>
            <Route exact path="/fixtures" element={<FixturePage />}></Route>
            <Route
              exact
              path="/fixtures/:matchId"
              element={<PredictMatch />}
            ></Route>
            <Route path="/about" element={<AboutUsPage />}></Route>
            <Route path="/terms" element={<RulesPage />}></Route>
            <Route
              exact
              path="/lbparticipate"
              element={<LeaderboardForm />}
            ></Route>
            <Route exact path="/user" element={<ProfilePage />}></Route>
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
