import React, { useEffect, useState } from "react";
import "./Home.css";
import { motion, AnimatePresence } from "framer-motion";
import StatusBar from "../../Components/StatusBar/StatusBar";
import Users from "../../Users";
import { CircleDot, Dot, MapPin, MoveUpRight } from "lucide-react";

const Home = () => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/login");
  //   }
  // }, [navigate]);
  const [active, setActive] = useState(2);
  const [index, setIndex] = useState(0); // track current card
  const [swipeDir, setSwipeDir] = useState("left"); // track swipe direction

  const userData = Users;
  const handleSwipe = (direction) => {
    setSwipeDir(direction);
    if (direction === "left" && index < userData.length - 1) {
      setIndex((prev) => prev + 1);
    } else if (direction === "right" && index > 0) {
      setIndex((prev) => prev - 1);
    }
  };
  console.log(userData, "userData")

  return (
    <div className="Home">
      <div className="Home-main">
        <div className="Home-box">
          <StatusBar Users={Users} />
          <div className="home-style">
            <div className="home-location">
              <div className="home-location-btn">
                <div
                  className="active-bg"
                  style={{ transform: active === 1 ? "translateX(0%)" : "translateX(100%)" }}
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
              <AnimatePresence mode="popLayout">
                {userData.slice(index, index + 2).map((user, i) => {
                  const isTop = i === 0;

                  return (
                    <motion.div
                      key={user.id}
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
                      <img src={user.img} alt={user.name} />
                      <div className="card-title-box glass">
                        <div className="cart-title">
                          {user.active === true ? <span className="online"><CircleDot />Active</span> : <span className="ofline"><CircleDot />Ofline</span>}
                          <h3>{user.name}</h3>
                        </div>
                        <p><MoveUpRight /></p>
                      </div>
                      <div className="card-location-box glass">
                        <p><MapPin />Delhi</p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Home;
