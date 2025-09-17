import React, { useState } from "react";
import "./Chats.css";
import Users from "../../Users"; // adjust path if needed
import StatusBar from "../../Components/StatusBar/StatusBar";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ChevronLeft, MoveLeft } from "lucide-react";

const Chats = () => {
  const [search, setSearch] = useState("");

  // Filter users based on search text
  const filteredUsers = Users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // Active users only
  const activeUsers = Users.filter((user) => user.active);

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

  console.log(activeUsers, "activeUsers");
  return (
    <div className="Home">
      <div className="Home-main">
        <div className="Home-box">
          <div className="matches-title">
            <ChevronLeft />
            <h2>Message</h2>
          </div>
          <div className="chats-page">
            {/* Search Bar */}
            <div className="chat-search">
              <input
                type="text"
                placeholder="Search chats..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Active Users (scrollable row) */}
            {activeUsers.length > 0 && (
              <div className="active-users">
                <StatusBar Users={activeUsers} />
              </div>
            )}
            <div className="chats-list">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div key={user.id} className="chat-item">
                    <div className="chat-avatar">
                      <img src={user.img} alt={user.name} />
                      {user.active && <span className="online-dot"></span>}
                    </div>
                    <div className="chat-info">
                      <h4>{user.name}</h4>
                      <p>Tap to start chatting...</p>
                    </div>
                    <div className="chat-time">
                      {formatTime(user.lastMessageTime)}
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-chats">
                  <DotLottieReact
                    src="https://lottie.host/28e15be9-ba88-412d-83e8-a2fa4cc14c87/HgXo15XDCw.lottie"
                    loop
                    autoplay
                  />
                  <p>No chats yet. Start a conversation with people!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
