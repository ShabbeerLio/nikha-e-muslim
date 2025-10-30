import React, { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import WishlistCard from "./WishlistCard";
import "./Wishlist.css";
import Host from "../../Host/Host";

const Wishlist = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/welcome");
    }
  }, [navigate]);

  useEffect(() => {
    fetchWishlist();
  }, [Host]);

  const [wishlist, setWishlist] = useState();

  const fetchWishlist = async () => {
    try {
      const response = await fetch(`${Host}/api/wishlist`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      setWishlist(data);
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleRemoveWishlist = async (userId) => {
    try {
      const response = await fetch(`${Host}/api/wishlist/remove/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (response.ok) {
        fetchWishlist();
      } else {
        console.error("Error updating wishlist:", data.error);
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  return (
    <div className="Profile">
      <div className="Profile-main">
        <div className="profile-box">
          <div className="profile-title notification">
            <ChevronLeft onClick={() => navigate(-1)} />
            <h2>Wishlist</h2>
          </div>
          <div className="notification-page">
            <div className="notification-section">
              {wishlist?.map((n) => (
                <WishlistCard key={n.id} user={n} handleRemoveWishlist={handleRemoveWishlist}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
