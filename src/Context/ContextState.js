import react, { useEffect } from "react";
import SadaqahContext from "./NikhaContext";
import { useState } from "react";
import Host from "../Host/Host";
import { io } from "socket.io-client";

const ContextState = (props) => {
  const userData = [];

  const [userDetail, setUserDetail] = useState(userData);
  const [allConnected, setAllConnected] = useState(userData);
  const [allNotification, setAllNotification] = useState(userData);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notification, setNotifications] = useState([]);
  const [plans, setPlans] = useState([]);

  // Get getAccount detail
  const getAccountDetails = async () => {
    const response = await fetch(`${Host}/api/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(json, "json");
    setUserDetail(json);
  };

  // Get getAccount detail
  const getAllConnected = async () => {
    const response = await fetch(`${Host}/api/connection/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(json, "json");
    setAllConnected(json);
  };

  // Get getAccount detail
  const getPlans = async () => {
    const response = await fetch(`${Host}/api/plans/getall`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    // console.log(json, "json");
    setPlans(json);
  };

  // Get getAccount detail
  const getNotifications = async () => {
    const response = await fetch(`${Host}/api/notifications`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(json, "json");
    setAllNotification(json);
  };

  // ✅ Initialize Socket.io Connection
  useEffect(() => {
    const newSocket = io(Host, { transports: ["websocket"] }); // backend URL
    setSocket(newSocket);

    newSocket.on("connect", () => console.log("🟢 Socket connected"));
    newSocket.on("disconnect", () => console.log("🔴 Socket disconnected"));

    // Listen for online user updates from backend
    newSocket.on("onlineUsers", (users) => setOnlineUsers(users));

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // ✅ Join socket room when user logs in
  useEffect(() => {
    if (socket && userDetail?._id) {
      socket.emit("joinUser", userDetail._id);
    }
  }, [socket, userDetail]);

  useEffect(() => {
    if (!socket) return;

    socket.on("newNotification", (notif) => {
      console.log("📩 New Notification received:", notif);
      setNotifications((prev) => [notif, ...prev]);
      getNotifications();
    });

    return () => {
      socket.off("newNotification");
    };
  }, [socket]);

  return (
    <SadaqahContext.Provider
      value={{
        userDetail,
        getAccountDetails,

        allConnected,
        getAllConnected,

        allNotification,
        getNotifications,

        socket,
        onlineUsers,
        notification,

        getPlans,
        plans,
      }}
    >
      {props.children}
    </SadaqahContext.Provider>
  );
};

export default ContextState;
