import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { Bell, CircleQuestionMark, Heart, WalletMinimal } from "lucide-react";
import NoteContext from "../../Context/NikhaContext";

const Navbar = () => {
  const {
    userDetail,
    getAccountDetails,
    allNotification,
    getNotifications
  } = useContext(NoteContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getAccountDetails();
      getNotifications();
    }
  }, [navigate]);

  if (!userDetail) return null;

  return (
    <div className="navbar">
      <div className="navbar-main">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid nav-name">
            <Link to={"/profile"} className="navbar-brand">
              <img
                src={
                  userDetail.profilePic?.url
                    ? userDetail.profilePic?.url
                    : "https://static.vecteezy.com/system/resources/previews/068/013/243/large_2x/muslim-male-character-free-vector.jpg"
                }
                alt={userDetail.name}
              />
              <div className="navbar-title">
                <h5>{userDetail.name}</h5>
                <span>{userDetail.city}</span>
              </div>
            </Link>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
                <Link className="nav-link" to="/feeds">
                  Feeds
                </Link>
                <Link className="nav-link" to="/add">
                  Add
                </Link>
                <Link className="nav-link" to="/search">
                  Search
                </Link>
                <Link className="nav-link" to="/history">
                  History
                </Link>
              </div>
            </div>
            <div className="profile">
              <div className="notification">
                <Link
                  to={"/wishlist"}
                  className="notification-items"
                  style={{ marginRight: "15px" }}
                >
                  <Heart />
                  <span>{userDetail?.wishlist?.length}</span>
                </Link>
                <Link to={"/notification"} className="notification-items">
                  <Bell />
                  <span>{allNotification?.length}</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
