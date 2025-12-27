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
import Welcome from "./Pages/Login/Welcome";
import Congrats from "./Pages/Login/Congrats";
import "./App.css";
import ChatDetails from "./Pages/Chats/ChatDetails";
import ProfileDetail from "./Pages/Profile/ProfileDetail";
import Notification from "./Pages/Notification/Notification";
import Subscription from "./Pages/Subscription/Subscription";
import Checkout from "./Pages/Checkout/Checkout";
import ProfileEdit from "./Pages/Profile/ProfileEdit";
import Wishlist from "./Pages/Wishlist/Wishlist";
import WebView from "./WebView/WebView/WebView";
import WPrivacyPolicy from "./WebView/OtherPages/WPrivacyPolicy";
import WTermCondition from "./WebView/OtherPages/WTermCondition";
import WReturnRefund from "./WebView/OtherPages/WReturnRefund";
import WAbout from "./WebView/OtherPages/WAbout";
import WContact from "./WebView/OtherPages/WContact";
import Footer from "./WebView/Footer/Footer";
import TopBar from "./WebView/TopBar/TopBar";

const isMobile = /Mobi|Android/i.test(navigator.userAgent);

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

  useEffect(() => {
    if (isMobile) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading && isMobile) {
    return <Loading />;
  }

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

  return (
    <>
      {isMobile ? (
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
      ) : (
        <div className="webview">
          <TopBar />
          <Routes>
            <Route path="/" element={<WebView />} />
            <Route path="/privacy-policy" element={<WPrivacyPolicy />} />
            <Route path="/term-and-conditions" element={<WTermCondition />} />
            <Route path="/return-refund" element={<WReturnRefund />} />
            <Route path="/about" element={<WAbout />} />
            <Route path="/contact-us" element={<WContact />} />
          </Routes>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
