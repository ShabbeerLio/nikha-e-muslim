import React from "react";
import "./Notification.css";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import NotificationCard from "./NotificationCard";

const Notification = () => {
  const navigate = useNavigate();
  const notifications = [
    {
      id: 1,
      name: "Ava",
      img: "https://cdn.pixabay.com/photo/2021/03/29/07/44/fashion-6133263_1280.jpg",
      action: "and you are connected",
      date: "26/06/2025",
      time: "13 mins ago",
      status: "new",
    },
    {
      id: 2,
      name: "Michael",
      img: "https://cdn.pixabay.com/photo/2024/07/26/01/48/men-8922497_1280.jpg",
      action: "and you are connected",
      date: "26/06/2025",
      time: "2 hours ago",
      status: "seen",
    },
    {
      d: "3",
      name: "Michael",
      img: "https://cdn.pixabay.com/photo/2023/05/03/10/20/man-7967210_1280.jpg",
      action: "and you are connected",
      date: "26/06/2025",
      time: "3 hours ago",
      status: "new",
    },
    {
      id: "101",
      name: "Sophia",
      img: "https://cdn.pixabay.com/photo/2024/02/16/05/34/ai-generated-8576689_1280.jpg",
      action: "and you are connected",
      date: "25/06/2025",
      time: "1 day ago",
      status: "seen",
    },
    {
      id: "102",
      name: "Michael",
      img: "https://cdn.pixabay.com/photo/2020/06/26/14/46/india-5342931_1280.jpg",
      action: "wants to connect",
      date: "24/06/2025",
      time: "2 days ago",
      status: "request",
    },
    {
      id: "103",
      name: "Ava",
      img: "https://cdn.pixabay.com/photo/2020/12/17/20/02/woman-5840437_1280.jpg",
      action: "and you are connected",
      date: "23/06/2025",
      time: "3 days ago",
      status: "seen",
    },
  ];

  return (
    <div className="Profile">
      <div className="Profile-main">
        <div className="profile-box">
          <div className="profile-title notification">
            <ChevronLeft onClick={() => navigate(-1)} />
            <h2>Notification</h2>
          </div>
          <div className="notification-page">
            <div className="notification-section">
              <h4>Today</h4>
              {notifications
                .filter((n) => n.date === "26/06/2025")
                .map((n) => (
                  <NotificationCard key={n.id} user={n} />
                ))}
            </div>

            <div className="notification-section">
              <h4>Previous</h4>
              {notifications
                .filter((n) => n.date !== "26/06/2025")
                .map((n) => (
                  <NotificationCard key={n.id} user={n} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
