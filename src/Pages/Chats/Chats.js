import React, { useContext, useEffect, useState } from "react";
import "./Chats.css";
import StatusBar from "../../Components/StatusBar/StatusBar";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Check, CheckCheck, ChevronLeft, MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../../Context/NikhaContext";
import defaultimg from "../../Assets/default.jpg"

const Chats = () => {
  const {
    userDetail,
    getAccountDetails,
    allConnected,
    getAllConnected,
    socket,
    onlineUsers,
  } = useContext(NoteContext);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/welcome");
    } else {
      getAccountDetails();
      getAllConnected();
    }
  }, [navigate]);

   // ✅ Listen for incoming messages in real-time
  useEffect(() => {
    if (!socket) return;

    socket.on("receiveMessage", (data) => {
      console.log("📨 Message received in chat list:", data);
      getAllConnected(); // 🔁 refresh chat list with latest message
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [socket]);
  
  // Filter users based on search text
  const filteredUsers =
    allConnected?.filter((item) =>
      item?.name?.toLowerCase().includes(search.toLowerCase())
    ) || [];

  // Active users only
  // const activeUsers = Users.filter((user) => user.active);

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

  console.log(allConnected,"allConnected")
  // console.log(filteredUsers, "filteredUsers");

  return (
    <div className="Home">
      <div className="Home-main">
        <div className="Home-box">
          <div className="matches-title">
            <ChevronLeft onClick={() => navigate(-1)} />
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
            {allConnected.length > 0 && (
              <div className="active-users">
                <StatusBar
                  Users={allConnected}
                  userDetail={userDetail}
                  onlineUsers={onlineUsers}
                />
              </div>
            )}
            <div
              className={`chats-list  ${
                filteredUsers.length === 0 ? "empty" : ""
              }`}
            >
              {filteredUsers.length > 0 ? (
                filteredUsers.map((item) => {
                  const receiver = item;
                  const lastMsg = item?.lastMessage;
                  const isMine = lastMsg?.sentByMe;
                  const isSeen = lastMsg?.isSeen;

                  return (
                    <div
                      key={receiver?._id}
                      className="chat-item"
                      onClick={() => navigate(`/chat/${receiver?._id}`)}
                    >
                      <div className="chat-avatar">
                        <img
                          src={
                            receiver?.profilePic?.url ||
                            defaultimg
                          }
                          alt={receiver?.name}
                        />
                        {onlineUsers.includes(receiver._id) && (
                          <span className="online-dot"></span>
                        )}
                      </div>
                      <div className="chat-info">
                        <h4>{receiver?.name}</h4>
                        <p className={`last-message ${!isSeen ? "seen" : ""}`}>
                          {lastMsg ? (
                            <>
                              {isMine && (
                                <span
                                  className={`msg-status ${
                                    isSeen ? "seen" : "sent"
                                  }`}
                                >
                                  {isSeen ? <CheckCheck /> : <Check />}
                                </span>
                              )}{" "}
                              {lastMsg.content}
                            </>
                          ) : (
                            "Tap to start chatting..."
                          )}
                        </p>
                      </div>
                      <div className="chat-time">
                        {formatTime(receiver.lastMessage?.createdAt)}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="empty-chats">
                  <DotLottieReact
                    src="https://lottie.host/28e15be9-ba88-412d-83e8-a2fa4cc14c87/HgXo15XDCw.lottie"
                    loop
                    autoplay
                  />
                  <p>No chats yet. Start a conversation!</p>
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
