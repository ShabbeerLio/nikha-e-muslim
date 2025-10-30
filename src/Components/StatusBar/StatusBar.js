import React from "react";
import { useNavigate } from "react-router-dom";
import "./StatusBar.css";

const StatusBar = ({ Users, userDetail, onlineUsers }) => {
  const navigate = useNavigate();
  const currentUserId = userDetail?._id;

  const getProfilePic = (profilePic, currentUserId) => {
    if (!profilePic) return "/default-hidden.jpg"; // fallback

    if (profilePic.isHidden === false && profilePic.url) {
      return profilePic.url;
    }

    if (
      profilePic.isHidden === true &&
      profilePic.allowedUsers?.includes(currentUserId)
    ) {
      return profilePic.url;
    }

    return "/default-hidden.jpg";
  };

  const handleClick = (receiverId) => {
    if (receiverId) navigate(`/chat/${receiverId}`);
  };

  return (
    <div className="StatusBar">
      {Users && Users.length > 0 ? (
        Users.map((item) => {
          const receiver = item;
          const imageUrl = getProfilePic(receiver?.profilePic, currentUserId);
          return (
            <div
              key={receiver?._id}
              className="statusbar-box"
              onClick={() => handleClick(receiver?._id)}
            >
              <img
                src={
                  imageUrl ||
                  "https://static.vecteezy.com/system/resources/previews/031/401/516/large_2x/unlock-account-icon-in-trendy-outline-style-isolated-on-white-background-unlock-account-silhouette-symbol-for-your-website-design-logo-app-ui-illustration-eps10-free-vector.jpg"
                }
                alt={receiver?.name || "User"}
                className="match-img"
              />
              {onlineUsers.includes(receiver._id) && (
                <span className="status active"></span>
              )}
            </div>
          );
        })
      ) : (
        <div className="statusbar-box">
          <img
            src="https://static.vecteezy.com/system/resources/previews/052/435/181/large_2x/a-red-and-pink-icon-with-a-person-and-a-plus-sign-free-vector.jpg"
            alt="No Users"
            className="match-img"
          />
          <span className="status"></span>
        </div>
      )}
    </div>
  );
};

export default StatusBar;
