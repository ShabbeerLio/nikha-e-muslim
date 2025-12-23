import React, { useEffect, useRef, useState, useContext } from "react";
import "./ChatDetails.css";
import { Check, CheckCheck, CheckCheckIcon, ChevronLeft, EllipsisVertical, Paperclip, Pen, Send, Trash, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import NoteContext from "../../Context/NikhaContext";
import Host from "../../Host/Host";
import defaultimg from "../../Assets/default.jpg"

const ChatDetails = () => {
    const { userDetail, getAccountDetails, onlineUsers, socket } = useContext(NoteContext);
    const { id: partnerId } = useParams();
    const navigate = useNavigate();
    const messagesEndRef = useRef(null);

    const [chat, setChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMsg, setNewMsg] = useState("");
    const [user, setUser] = useState([]);

    const [selectedMessage, setSelectedMessage] = useState(null); // message clicked
    const [showOptionsModal, setShowOptionsModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editContent, setEditContent] = useState("");

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/welcome");
        } else {
            getAccountDetails();
        }
    }, [navigate]);

    useEffect(() => {
        const initChat = async () => {
            try {
                // Create or get chat between current user and partner
                const res = await fetch(`${Host}/api/chat/create/${partnerId}`, {
                    method: "POST",
                    headers: {
                        "auth-token": localStorage.getItem("token"),
                    },
                });

                const chatData = await res.json(); // ✅ Parse JSON body
                // console.log(chatData, "chatData");
                setChat(chatData);

                // Fetch messages for this chat
                const msgsRes = await fetch(
                    `${Host}/api/chat/messages/${chatData._id}`,
                    {
                        method: "GET",
                        headers: {
                            "auth-token": localStorage.getItem("token"),
                        },
                    }
                );

                const msgs = await msgsRes.json(); // ✅ Parse JSON body
                // console.log(msgs, "msgs");
                setMessages(msgs);
                // ✅ Mark all messages as seen
                await fetch(`${Host}/api/chat/seen/${chatData._id}`, {
                    method: "PUT",
                    headers: {
                        "auth-token": localStorage.getItem("token"),
                    },
                });

                setMessages((prev) =>
                    prev.map((m) =>
                        m.sender !== userDetail._id ? { ...m, isSeen: true } : m
                    )
                );
            } catch (err) {
                console.error("Chat init error:", err);
            }
        };
        initChat();
    }, [partnerId, userDetail]);

    useEffect(() => {
        if (!socket || !chat?._id) return;

        // Leave previous listeners before joining new chat
        socket.off("receiveMessage");

        socket.emit("joinChat", chat._id);
        console.log("🟢 Joined chat room:", chat._id);

        const handleReceiveMessage = (data) => {
            console.log("📩 New message received:", data);
            setMessages((prev) => {
                const alreadyExists = prev.some((m) => m._id === data._id);
                if (alreadyExists) return prev;
                return [...prev, data];
            });
        };

        socket.on("receiveMessage", handleReceiveMessage);

        return () => {
            socket.off("receiveMessage", handleReceiveMessage);
            console.log("🔴 Left chat room listener");
        };
    }, [chat?._id]);

    const handleSend = async () => {
        if (!newMsg.trim() || !chat?._id) return;
        try {
            const res = await fetch(`${Host}/api/chat/message/${chat._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // ✅ this is required
                    "auth-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({ content: newMsg }), // ✅ properly encoded body
            });

            const sentMsg = await res.json();
            console.log(sentMsg, "sentMsg");
            setMessages((prev) => [...prev, sentMsg]);
            setNewMsg("");

            // ✅ Emit socket event
            socket.emit("sendMessage", sentMsg);
        } catch (err) {
            console.error("Send message error:", err);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${Host}/api/auth/${partnerId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("token"),
                    },
                });
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUser();
    }, [partnerId]);

    // Auto-scroll to latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const currentUserId = userDetail?._id;

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

    //   console.log(user, "user");
    const imageUrl = getProfilePic(user?.profilePic, currentUserId);
    //   console.log(messages, "messages");
    if (!messages) return <div>Loading chat...</div>;

    const handleDelete = async (messageId) => {
        try {
            const res = await fetch(`${Host}/api/chat/message/delete/${messageId}`, {
                method: "DELETE",
                headers: {
                    "auth-token": localStorage.getItem("token"),
                },
            });

            const data = await res.json();
            if (res.ok) {
                setMessages((prev) => prev.filter((m) => m._id !== messageId));
            } 
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    const handleEdit = async (messageId, newContent) => {
        if (!newContent.trim()) return;

        try {
            const res = await fetch(`${Host}/api/chat/message/update/${messageId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({ content: newContent }),
            });

            const updatedMsg = await res.json();
            if (res.ok) {
                setMessages((prev) =>
                    prev.map((m) => (m._id === updatedMsg._id ? updatedMsg : m))
                );
            }
        } catch (err) {
            console.error("Edit error:", err);
        }
    };

    return (
        <div className="chatDetails">
            {/* Header */}
            <div className="profile-title">
                <button onClick={() => navigate(-1)} className="back-btn">
                    <ChevronLeft />
                </button>
                <h2>Message</h2>
                <EllipsisVertical />
            </div>
            <div className="chatDetails-header">
                <div className="chatDetails-user" onClick={() =>
                    navigate(`/profile-detail/${user._id}`)
                }>
                    <img
                        src={
                            imageUrl ||
                            "https://static.vecteezy.com/system/resources/previews/008/433/598/non_2x/men-icon-for-website-symbol-presentation-free-vector.jpg"
                        }
                        alt={user?.name}
                        className="match-img"
                    />
                    <span
                        className={`status ${user?.active ? "online" : "offline"}`}
                    ></span>
                    <div>
                        <h4>{user?.name}</h4>
                        <span className={onlineUsers.includes(user._id) ? "online" : "offline"}>
                            {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                        </span>
                    </div>
                </div>
                {/* <button className="more-btn">
                    <MoreVertical />
                </button> */}
            </div>

            {/* Messages */}
            <div className="chatDetails-messages">
                {messages?.map((msg) => {
                    const isMe =
                        msg.sender._id === userDetail._id || msg.sender === userDetail._id;
                    const createdAt = new Date(msg.createdAt);
                    const diff = (new Date() - createdAt) / 1000 / 60; // minutes
                    const canEditOrDelete = isMe && diff <= 5;

                    return (
                        <div
                            key={msg._id}
                            className={`chat-bubble ${isMe ? "me" : "other"}`}
                        >
                            <p>{msg.content}</p>
                            <span className="chat-time">
                                {createdAt.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                                {isMe && (
                                    <span className={`msg-status ${msg.isSeen ? "seen" : "sent"
                                        }`}>
                                        {msg.isSeen ? <CheckCheck /> : <Check />}
                                    </span>
                                )}
                            </span>

                            {canEditOrDelete && (
                                <EllipsisVertical
                                    className="message-options-icon"
                                    onClick={() => {
                                        setSelectedMessage(msg);
                                        setShowOptionsModal(true);
                                    }}
                                />
                            )}
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Box */}
            <div className="chatDetails-input">
                <div className="chatDetail-input-box">
                    <Paperclip />
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={newMsg}
                        onChange={(e) => setNewMsg(e.target.value)}
                    />
                </div>
                <button onClick={handleSend}>
                    <Send />
                </button>
            </div>
            {/* Options Modal */}
            {/* {showOptionsModal && selectedMessage && ( */}
            <div
                className={`modal-overlay chat-option ${showOptionsModal}`}
                onClick={() => setShowOptionsModal(false)}
            >
                <div
                    className="modal-content liquid-glass"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Display the message */}
                    <p className="modal-message">{selectedMessage?.content}</p>

                    {/* Buttons */}
                    <div className="modal-buttons">
                        <button
                            onClick={() => {
                                setEditContent(selectedMessage?.content);
                                setShowEditModal(true);
                                setShowOptionsModal(false);
                            }}
                        >
                            <Pen /> Edit
                        </button>
                        <button
                            onClick={() => {
                                handleDelete(selectedMessage?._id);
                                setShowOptionsModal(false);
                            }}
                        >
                            <Trash /> Delete
                        </button>
                    </div>
                    {/* <button onClick={() => setShowOptionsModal(false)}>Cancel</button> */}
                </div>
            </div>
            {/* )} */}

            {/* Edit Modal */}
            <div className={`modal-overlay chat-edit-modal ${showEditModal}`} onClick={() => setShowEditModal(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h4 className="chat-edit-heading">Edit Message < X onClick={() => setShowEditModal(false)} /></h4>
                    <p className="modal-message">{selectedMessage?.content}</p>
                    <div className="chatDetails-input">
                        <div className="chatDetail-input-box">
                            <Paperclip />
                            <input
                                type="text"
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                            />
                        </div>
                        <button onClick={() => {
                            handleEdit(selectedMessage._id, editContent);
                            setShowEditModal(false);
                        }}>
                            <Send />
                        </button>
                    </div>
                </div>
            </div>
            {/* <div className="chatmessage-status success">
                <p> <Check /> Successful</p>
            </div> */}
            {/* <div className="chatmessage-status fail">
                <p> <X /> Failed</p>
            </div> */}
        </div>
    );
};

export default ChatDetails;
