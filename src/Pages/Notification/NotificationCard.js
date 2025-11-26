import { Check, X } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Host from "../../Host/Host";

const NotificationCard = ({ user, getNotifications }) => {
  const navigate = useNavigate();
  console.log(user, "user");
  // Format last message time
  const formatTime = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const now = new Date();

    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday =
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear();

    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (isToday) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (isYesterday) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: "long" });
    } else {
      return date.toLocaleDateString([], {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      });
    }
  };

  const handleAccept = async (userId) => {
    try {
      const res = await fetch(`${Host}/api/connection/accept/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ fromUserId: user.fromUser._id }),
      });
      const data = res.json();
      if (data.success) {
        getNotifications();
        // Refresh notifications or update state as needed
      }
    } catch (error) {
      console.log(error, "error");
    }
    // Handle accept connection request
  };
  const handleReject = async (userId) => {
    try {
      const res = await fetch(`${Host}/api/connection/reject/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ fromUserId: user.fromUser._id }),
      });
      const data = res.json();
      if (data.success) {
        getNotifications();
        // Refresh notifications or update state as needed
      }
    } catch (error) {
      console.log(error, "error");
    }
    // Handle accept connection request
  };

  const handleApprovePicture = async (userId) => {
    try {
      const res = await fetch(`${Host}/api/auth/approve-picture/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const data = await res.json();
      if (res.ok) {
        alert("Picture request approved!");
        getNotifications(); // refresh
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRejectPicture = async (userId) => {
    try {
      const res = await fetch(`${Host}/api/auth/reject-picture/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const data = await res.json();
      if (res.ok) {
        alert("Picture request rejected.");
        getNotifications();
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={`notification-card ${
        user.type === "connection_request" || "profile_picture_request"
          ? "request"
          : ""
      }`}
    >
      <img
        onClick={() => navigate(`/profile-detail/${user.fromUser._id}`)}
        src={
          user?.fromUser?.profilePic?.url
            ? user?.fromUser?.profilePic?.url
            : "https://static.vecteezy.com/system/resources/previews/068/013/243/large_2x/muslim-male-character-free-vector.jpg"
        }
        alt="profile"
        className="profile-img"
      />
      <div
        className="notification-info"
        onClick={() => navigate(`/profile-detail/${user.fromUser._id}`)}
      >
        <p>
          <span className="user">{user?.fromUser?.name}</span> {user.message}
        </p>
        <span className="date">{formatTime(user.createdAt)}</span>
      </div>
      {user?.type === "connection_request" ||
      user?.type === "profile_picture_request" ? (
        <div className="request-actions">
          <button className="decline">
            <X
              onClick={() => {
                if (user.type === "profile_picture_request") {
                  handleRejectPicture(user.fromUser._id);
                } else {
                  handleReject(user.fromUser._id);
                }
              }}
            />
          </button>
          <button className="accept">
            <Check
              onClick={() => {
                if (user.type === "profile_picture_request") {
                  handleApprovePicture(user.fromUser._id);
                } else {
                  handleAccept(user.fromUser._id);
                }
              }}
            />
          </button>
        </div>
      ) : (
        <span className="time">{formatTime(user.createdAt)}</span>
      )}
      <span className={`dot ${user.isRead === false ? "new" : ""}`}></span>
    </div>
  );
};

export default NotificationCard;
