import { Check, X } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotificationCard = ({user}) => {
  const navigate = useNavigate();
  return (
    <div className={`notification-card ${user.status}` }>
      <img
        onClick={() => navigate(`/profile-detail/${user.id}`)}
        src={user.img}
        alt={user.name}
        className="profile-img"
      />
      <div
        className="notification-info"
        onClick={() => navigate(`/profile-detail/${user.id}`)}
      >
        <p>
          <span className="user">{user.name}</span> {user.action}
        </p>
        <span className="date">{user.date}</span>
      </div>
      {user.status === "request" ? (
        <div className="request-actions">
          <button className="decline">
            {" "}
            <X />
          </button>
          <button className="accept">
            {" "}
            <Check />
          </button>
        </div>
      ) : (
        <span className="time">{user.time}</span>
      )}
      <span className={`dot ${user.status}`}></span>
    </div>
  );
};

export default NotificationCard;
