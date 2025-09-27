import { Star, Trash } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const WishlistCard = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className={`notification-card`}>
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
          <span className="user">{user.name}</span>
        </p>
        <span className="date">{user.location}</span>
      </div>
      <div className="request-actions wishlist-actions">
        <button className="decline">
          {" "}
          <Trash />
        </button>
        <button className="accept">
          {" "}
          <Star />
        </button>
      </div>
    </div>
  );
};

export default WishlistCard;
