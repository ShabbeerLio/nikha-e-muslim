import React, { useContext, useEffect, useState } from "react";
import "./Matches.css";
import { ChevronLeft, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../../Context/NikhaContext";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import defaultimg from "../../Assets/default.jpg"

const Matches = () => {
  const { userDetail, getAccountDetails, allConnected, getAllConnected } =
    useContext(NoteContext);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/app/welcome");
    } else {
      getAccountDetails();
      getAllConnected();
    }
  }, [navigate]);

  console.log(allConnected,"allConnected")

  // ✅ Function to calculate age from DOB object
  const calculateAge = (dob) => {
    if (!dob?.year || !dob?.month || !dob?.day) return null;
    const birthDate = new Date(`${dob.year}-${dob.month}-${dob.day}`);
    const ageDiff = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  // ✅ Function to safely get profile picture based on privacy
  const getProfilePic = (profilePic, currentUserId) => {
    if (!profilePic) return defaultimg; // fallback

    if (profilePic.isHidden === false && profilePic.url) {
      return profilePic.url;
    }

    // if hidden but allowed for this user
    if (
      profilePic.isHidden === true &&
      profilePic.allowedUsers?.includes(currentUserId)
    ) {
      return profilePic.url;
    }

    // otherwise show default hidden image
    return defaultimg;
  };
  // ✅ Get logged-in user ID from token payload or store (assuming context has it)
  const currentUserId = userDetail?._id; // set when user logs in

  // ✅ Filter users based on search text
  const filteredUsers = allConnected.filter((user) =>
    user?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="Home">
      <div className="Home-main">
        <div className="Home-box">
          <div className="matches-title">
            <ChevronLeft onClick={() => navigate(-1)} />
            <h2>Matches</h2>
          </div>

          <div className="chat-search">
            <input
              type="text"
              placeholder="Search matches..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="home-style">
            <div className="matches-page">
              <div className="matches-grid">
                {filteredUsers.length === 0 ? (
                  <div className="empty-chats">
                    <DotLottieReact
                      src="https://lottie.host/5da26d68-f8cd-4ce6-bb5f-405c9e3e9525/2q8jrFO60R.lottie"
                      loop
                      autoplay
                    />
                    <p className="no-users">No matches found</p>
                  </div>
                ) : (
                  filteredUsers.map((match) => {
                    const receiver = match;
                    const age = calculateAge(receiver?.dob);
                    const imageUrl = getProfilePic(
                      receiver?.profilePic,
                      currentUserId
                    );

                    return (
                      <div
                        key={match._id}
                        className="match-card"
                        onClick={() =>
                          navigate(`/profile-detail/${receiver?._id}`)
                        }
                      >
                        <img
                          src={
                            receiver?.profilePic.url ||
                            defaultimg
                          }
                          alt={receiver?.name}
                          className="match-img"
                        />
                        <div className="match-info glass">
                          <span>
                            {receiver?.name}
                            {age && `, ${age}`}
                          </span>
                          <Heart
                            size={22}
                            fill="pink"
                            color="pink"
                            stroke="white"
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matches;
