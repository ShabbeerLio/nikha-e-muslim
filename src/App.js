import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Pnav from "./Components/Navbar/Pnav";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Login/Signup";
import { useEffect, useState } from "react";
import Loading from "./Components/Loading/Loading";
import ContextState from "./Context/ContextState";
import Matches from "./Pages/Matches/Matches";
import Chats from "./Pages/Chats/Chats";
import Profile from "./Pages/Profile/Profile";
import Welcome from "./Pages/Login/Welcome"; // ✅ new
import Congrats from "./Pages/Login/Congrats";
import "./App.css";
import ChatDetails from "./Pages/Chats/ChatDetails";
import ProfileDetail from "./Pages/Profile/ProfileDetail";
import Notification from "./Pages/Notification/Notification";
import Subscription from "./Pages/Subscription/Subscription";
import Checkout from "./Pages/Checkout/Checkout";
import ProfileEdit from "./Pages/Profile/ProfileEdit";
import Wishlist from "./Pages/Wishlist/Wishlist";

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
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/welcome" ||
    location.pathname === "/congrats" ||
    location.pathname === "/notification" ||
    location.pathname === "/subscription" ||
    location.pathname === "/checkout" ||
     location.pathname.startsWith("/chat/") ||
     location.pathname.startsWith("/profile-detail/") ||
     location.pathname.startsWith("/profile-edit/");

  if (loading) {
    return <Loading />;
  }

  return (
    <ContextState>
      <div className="app-container">
        {hideNav && <Navbar />}
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/congrats" element={<Congrats />} />
          <Route path="/" element={<Home />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/chat/:id" element={<ChatDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile-detail/:id" element={<ProfileDetail />} />
          <Route path="/profile-edit/:section" element={<ProfileEdit />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        {!hidePnav && <Pnav />}
      </div>
    </ContextState>
  );
}

export default App;
