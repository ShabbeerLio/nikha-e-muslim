import React, { useContext, useEffect, useState } from "react";
import "./Notification.css";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import NotificationCard from "./NotificationCard";
import NoteContext from "../../Context/NikhaContext";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Notification = () => {
  const { allNotification, getNotifications } = useContext(NoteContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/welcome");
    } else {
      getNotifications();
    }
  }, [navigate]);

  const today = new Date();
  const formattedToday = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;

  // Helper function to format ISO date to dd/mm/yyyy
  const formatDate = (isoString) => {
    const d = new Date(isoString);
    return `${String(d.getDate()).padStart(2, "0")}/${String(
      d.getMonth() + 1
    ).padStart(2, "0")}/${d.getFullYear()}`;
  };

  console.log(allNotification, "allNotification");

  return (
    <div className="Profile">
      <div className="Profile-main">
        <div className="profile-box">
          <div className="profile-title notification">
            <ChevronLeft onClick={() => navigate(-1)} />
            <h2>Notification</h2>
          </div>
          {allNotification?.length === 0 ? (
            <div className="empty-chats">
              <DotLottieReact
                src="https://lottie.host/34ae3ac3-f596-4c6f-aa91-8ecad6f8d446/iMF6jCi3e5.lottie"
                loop
                autoplay
              />
              <p className="no-users">No Notifications</p>
            </div>
          ) : (
            <div className="notification-page">
              <div className="notification-section">
                <h4>Today</h4>
                {allNotification
                  ?.filter((n) => formatDate(n.createdAt) === formattedToday)
                  ?.map((n) => (
                    <NotificationCard key={n.id} user={n} getNotifications={getNotifications}/>
                  ))}
              </div>

              <div className="notification-section">
                <h4>Previous</h4>
                {allNotification
                  ?.filter((n) => formatDate(n.createdAt) !== formattedToday)
                  ?.map((n) => (
                    <NotificationCard key={n.id} user={n} getNotifications={getNotifications}/>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
