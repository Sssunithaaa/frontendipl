import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Leaderboard from "./pages/leaderboard/Leaderboard";
import ProfilePage from "./pages/ProfilePage";
import { useState, useEffect } from "react";
import FixturePage from "./pages/fixtures/fixturePage";
import PredictMatch from "./pages/fixtures/predict";
import UserSubmission from "./pages/leaderboard/UserSubmission";
// import SliderPages from "./Components/SliderPages";
import Intro from "./pages/Homepage/Intro";
import Authform from "./pages/Authform";
import LeaderboardForm from "./pages/leaderboard/BoardParticipate";
import Matches from "./pages/fixtures/match";
import Introo from "./pages/Homepage/Introo";
import Scrollable from "./Components/Scrollable";
import Loading from "./Components/loading";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <div className="App bg-neutral-100 lg:w-[100vw] w-[98vw] overflow-x-clip">
      {isLoading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Introo />}></Route>
            <Route exact path="/user" element={<Authform />}></Route>
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
            <Route exact path="/match" element={<Matches />}></Route>
            <Route
              exact
              path="/lbparticipate"
              element={<LeaderboardForm />}
            ></Route>
            <Route exact path="/profile" element={<ProfilePage />}></Route>

            <Route exact path="/images" element={<Scrollable />}></Route>
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
