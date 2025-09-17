import React, { useState } from "react";
import "./Matches.css";
import { ChevronLeft, Heart } from "lucide-react"; // heart icon
import Users from "../../Users";

const Matches = () => {
  const [search, setSearch] = useState("");
  // Filter users based on search text
  const filteredUsers = Users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="Home">
      <div className="Home-main">
        <div className="Home-box">
          <div className="matches-title">
            <ChevronLeft />
            <h2>Matches</h2>
          </div>
          <div className="chat-search">
            <input
              type="text"
              placeholder="Search chats..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="matches-page">
            <div className="matches-grid">
              {filteredUsers.map((user) => (
                <div key={user.id} className="match-card">
                  <img src={user.img} alt={user.name} className="match-img" />
                  <div className="match-info glass">
                    <span>
                      {user.name}, {user?.age}
                    </span>
                    <Heart
                      size={22}
                      fill="#928dab"
                      color="#928dab"
                      stroke="white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matches;
