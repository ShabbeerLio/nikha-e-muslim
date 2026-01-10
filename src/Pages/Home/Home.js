import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { motion, AnimatePresence } from "framer-motion";
import StatusBar from "../../Components/StatusBar/StatusBar";
import Users from "../../Users";
import { CircleDot, Dot, MapPin, MoveUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Host from "../../Host/Host";
import NoteContext from "../../Context/NikhaContext";
import Loading from "../../Components/Loading/Loading";

const Home = () => {
  const {
    userDetail,
    getAccountDetails,
    allConnected,
    getAllConnected,
    onlineUsers,
  } = useContext(NoteContext);
  const navigate = useNavigate();
  const [active, setActive] = useState(2); // 2 = "For You" default
  const [index, setIndex] = useState(0);
  const [swipeDir, setSwipeDir] = useState("left");
  const [userData, setUserData] = useState([]); // ✅ dynamic user data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/app/welcome");
    } else {
      getAllConnected();
      getAccountDetails();
    }
  }, [navigate]);

  // ✅ Fetch users when `active` changes
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // setLoading(true);
        const route = active === 1 ? "nearby" : "foryou";
        const res = await fetch(`${Host}/api/match/${route}`, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUserData(data);
        setIndex(0);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        // setLoading(false);
      }
    };

    fetchUsers();
  }, [active]);

  const handleSwipe = (direction) => {
    setSwipeDir(direction);
    if (direction === "left" && index < userData.length - 1) {
      setIndex((prev) => prev + 1);
    } else if (direction === "right" && index > 0) {
      setIndex((prev) => prev - 1);
    }
  };

  const calculateAge = (day, month, year) => {
    if (!day || !month || !year) return "";

    const monthIndex = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ].indexOf(month);

    const dob = new Date(year, monthIndex, day);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    return age;
  };
  // console.log(allConnected, "allConnected");

  // if (loading) {
  //   return <Loading/>;
  // }

  useEffect(() => {
    setIndex(0); // 🔥 reset card index
    setSwipeDir("left");
  }, [active]);

  return (
    <div className="Home">
      <div className="Home-main">
        <div className="Home-box">
          <StatusBar
            Users={allConnected}
            userDetail={userDetail}
            onlineUsers={onlineUsers}
          />
          <div className="home-style">
            <div className="home-location">
              <div className="home-location-btn">
                <div
                  className="active-bg"
                  style={{
                    transform:
                      active === 1 ? "translateX(0%)" : "translateX(100%)",
                  }}
                ></div>

                <p
                  className={active === 1 ? "active" : ""}
                  onClick={() => setActive(1)}
                >
                  Nearby
                </p>
                <p
                  className={active === 2 ? "active" : ""}
                  onClick={() => setActive(2)}
                >
                  For You
                </p>
              </div>
            </div>
            {/* <div className="cards">
            {active === 1 ? "Nearby cards" : "For You cards"}
          </div> */}
            <div className="cards">
              <AnimatePresence mode="popLayout" key={active}>
                {userData.length === 0 ? (
                  <p className="no-users">No users found</p>
                ) : (
                  userData.slice(index, index + 2).map((user, i) => {
                    const isTop = i === 0;
                    return (
                      <motion.div
                        key={user._id}
                        className="card"
                        drag={isTop ? "x" : false}
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.8}
                        onDragEnd={(e, info) => {
                          if (info.offset.x < -100) {
                            handleSwipe("left");
                          } else if (info.offset.x > 100) {
                            handleSwipe("right");
                          }
                        }}
                        initial={{
                          x: isTop
                            ? swipeDir === "left"
                              ? 300 // coming from right
                              : -300 // coming from left
                            : 0,
                          scale: isTop ? 1 : 0.9,
                          y: isTop ? 0 : 20,
                          opacity: 0,
                          rotate: isTop ? -5 : 5,
                        }}
                        animate={{
                          x: 0,
                          scale: isTop ? 1 : 0.9,
                          y: isTop ? 0 : 20,
                          opacity: 1,
                          rotate: isTop ? -5 : 5,
                        }}
                        exit={{
                          x: isTop
                            ? swipeDir === "left"
                              ? -300 // going left
                              : 300 // going right
                            : 0,
                          opacity: isTop ? 0 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                        style={{ zIndex: userData.length - (index + i) }}
                      >
                        <img
                          src={
                            user.profilePic?.url ||
                            "https://static.vecteezy.com/system/resources/previews/008/433/598/non_2x/men-icon-for-website-symbol-presentation-free-vector.jpg"
                          }
                          alt={user.name}
                        />
                        <div className="card-title-box glass">
                          <div className="cart-title">
                            {onlineUsers.includes(user._id) ? (
                              <span className="online">
                                <CircleDot />
                                Online
                              </span>
                            ) : (
                              <span className="ofline">
                                <CircleDot />
                                Ofline
                              </span>
                            )}
                            <h3>
                              {user.name}, {user.age}
                            </h3>
                          </div>
                          <p
                            onClick={() =>
                              navigate(`/app/profile-detail/${user._id}`)
                            }
                          >
                            <MoveUpRight />
                          </p>
                        </div>
                        <div className="card-location-box glass">
                          <p>
                            <MapPin />
                            {user.city || "Unknown"}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
