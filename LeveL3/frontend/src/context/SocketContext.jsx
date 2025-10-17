import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import API from "../services/api";

const SocketContext = createContext();
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [toast, setToast] = useState(null);

  const playSound = () => {
    const audio = new Audio("/assets/notification.mp3");
    audio.volume = 0.5;
    audio.play().catch(() => {});
  };

  const fetchNotifications = async () => {
    try {
      const res = await API.get("/notifications");
      setNotifications(res.data);
    } catch (err) {
      console.error("Error fetching notifications", err);
    }
  };

  useEffect(() => {
    fetchNotifications();

    const s = io("http://localhost:3000");
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token) s.emit("registerRole", user.token);

    s.on("newCar", (notif) => {
      setNotifications((prev) => [notif, ...prev]);
      playSound();
      setToast(notif.message);
      setTimeout(() => setToast(null), 3000);
    });

    s.on("newBooking", (notif) => {
      setNotifications((prev) => [notif, ...prev]);
      playSound();
      setToast(notif.message);
      setTimeout(() => setToast(null), 3000);
    });

    return () => s.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={{ notifications, setNotifications, toast }}>
      {children}
    </SocketContext.Provider>
  );
};
