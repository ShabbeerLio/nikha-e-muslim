import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Pnav from "./Components/Navbar/Pnav";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import { useEffect, useState } from "react";
import Loading from "./Components/Loading/Loading";
import ContextState from "./Context/ContextState";
import Matches from "./Pages/Matches/Matches";
import Chats from "./Pages/Chats/Chats";
import Profile from "./Pages/Profile/Profile";

function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

function MainLayout() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  // Simulate loading on first mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const hideNav =
    location.pathname === "/" ||
    location.pathname === "/matches" ||
    location.pathname === "/chats";

  const hidePnav =
    location.pathname === "/login" || location.pathname === "/signup";

  if (loading) {
    return <Loading />;
  }

  return (
    <ContextState>
      <div className="app-container">
        {hideNav && <Navbar />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        {!hidePnav && <Pnav />}
      </div>
    </ContextState>
  );
}

export default App;
