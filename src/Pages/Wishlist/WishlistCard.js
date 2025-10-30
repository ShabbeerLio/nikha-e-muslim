import { Star, Trash } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const WishlistCard = ({ user, handleRemoveWishlist }) => {
  const navigate = useNavigate();

  return (
    <div className={`notification-card`}>
      <img
        onClick={() => navigate(`/profile-detail/${user._id}`)}
        src={
          user?.profilePic?.url
            ? user?.profilePic?.url
            : "https://static.vecteezy.com/system/resources/previews/068/013/243/large_2x/muslim-male-character-free-vector.jpg"
        }
        alt="profile"
        className="profile-img"
      />
      <div
        className="notification-info"
        onClick={() => navigate(`/profile-detail/${user._id}`)}
      >
        <p>
          <span className="user">{user.name}</span>
        </p>
        <span className="date">{user.city}</span>
      </div>
      <div className="request-actions wishlist-actions">
        <button
          className="decline"
          onClick={() => handleRemoveWishlist(user._id)}
        >
          <Trash />
        </button>
      </div>
    </div>
  );
};

export default WishlistCard;
