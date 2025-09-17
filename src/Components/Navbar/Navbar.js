import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { Bell, CircleQuestionMark, WalletMinimal } from "lucide-react";
import NoteContext from "../../Context/SadaqahContext";
import Profile from "../../Profile";

const Navbar = () => {
  // const { userDetail, getAccountDetails } = useContext(NoteContext);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!localStorage.getItem("token")) {
  //     navigate("/login");
  //   } else {
  //     getAccountDetails();
  //   }
  // }, [navigate]);

  const userDetail = Profile;

  if (!userDetail) return null;

  return (
    <div className="navbar">
      <div className="navbar-main">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid nav-name">
            <Link to={"/profile"} className="navbar-brand">
              <img
                src={
                  userDetail.avatar
                    ? userDetail.avatar
                    : "https://static.vecteezy.com/system/resources/previews/068/013/243/large_2x/muslim-male-character-free-vector.jpg"
                }
                alt={"Shabbeer"}
              />
              <div className="navbar-title">
                <h5>{userDetail.userName}</h5>
                <span>{userDetail.location}</span>
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
                <Link to={"/notification"}>
                  <Bell />
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
