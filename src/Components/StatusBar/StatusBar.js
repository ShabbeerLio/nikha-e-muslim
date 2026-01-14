import React from "react";
import { useNavigate } from "react-router-dom";
import "./StatusBar.css";
import defaultimg from "../../Assets/default.jpg";

const StatusBar = ({ Users, userDetail, onlineUsers }) => {
  const navigate = useNavigate();

  const handleClick = (receiverId) => {
    if (receiverId) navigate(`/app/chats`);
  };

  return (
    <div className="StatusBar">
      {Users && Users.length > 0 ? (
        Users.map((item) => {
          const receiver = item;
          return (
            <div
              key={receiver?._id}
              className="statusbar-box"
              onClick={() => handleClick(receiver?._id)}
            >
              <img
                src={
                  receiver?.profilePic.url ||
                  defaultimg
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
