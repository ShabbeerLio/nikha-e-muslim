import React, { useEffect, useRef, useState } from "react";
import "./ChatDetails.css";
import { ChevronLeft, EllipsisVertical, MoreVertical, Paperclip, Send } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Users from "../../Users"; // using your same Users data

const ChatDetails = () => {
     const messagesEndRef = useRef(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const user = Users.find((u) => u.id.toString() === id);

    // Dummy chat messages
    const [messages, setMessages] = useState([
        { id: 1, text: "Hey there! How are you?", sender: "other", time: "9:30 am" },
        { id: 2, text: "I'm good, thanks! What about you?", sender: "me", time: "9:32 am" },
        { id: 3, text: "Doing great! Wanna catch up later?", sender: "other", time: "9:35 am" },
    ]);

    const [newMsg, setNewMsg] = useState("");

    const handleSend = () => {
        if (!newMsg.trim()) return;
        setMessages([
            ...messages,
            { id: Date.now(), text: newMsg, sender: "me", time: "Now" },
        ]);
        setNewMsg("");
    };

    useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

    if (!user) return <div>User not found</div>;

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
                <div className="chatDetails-user">
                    <img src={user.img} alt={user.name} />
                    <span className={`status ${user.active ? "online" : "offline"}`}></span>
                    <div>
                        <h4>{user.name}</h4>
                        <span className={user.active ? "online" : "offline"}>
                            {user.active ? "Online" : "Offline"}
                        </span>
                    </div>
                </div>
                {/* <button className="more-btn">
                    <MoreVertical />
                </button> */}
            </div>

            {/* Messages */}
            <div className="chatDetails-messages">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`chat-bubble ${msg.sender === "me" ? "me" : "other"}`}
                    >
                        <p>{msg.text}</p>
                        <span className="chat-time">{msg.time}</span>
                    </div>
                ))}
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
                <button onClick={handleSend}><Send /></button>
            </div>
        </div>
    );
};

export default ChatDetails;