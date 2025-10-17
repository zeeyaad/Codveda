import React, { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { useLocation, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";
import { WHATSAPP_NUMBER } from "../config";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // 🔗 replace with your backend URL in production

export default function WhatsAppButton() {
  const { user } = useAuth();
  const [message, setMessage] = useState("Hi! I'd like to ask about your cars.");
  const [newCarAlert, setNewCarAlert] = useState(false);
  const location = useLocation();
  const params = useParams();

  // 🧠 Dynamic WhatsApp message
  useEffect(() => {
    const fetchCarIfNeeded = async () => {
      if (location.pathname.startsWith("/cars/") && params.id) {
        try {
          const res = await API.get(`/cars/${params.id}`);
          const car = res.data;
          setMessage(
            `Hi! I'm interested in the ${car.brand} ${car.model}. Can you tell me more?`
          );
        } catch (err) {
          console.error("Could not fetch car:", err);
        }
      } else {
        setMessage("Hi! I'd like to ask about your cars.");
      }
    };
    fetchCarIfNeeded();
  }, [location.pathname, params.id]);

  // 🔔 Listen for new car event
  useEffect(() => {
    socket.on("newCar", () => {
      setNewCarAlert(true);
    });
    return () => socket.off("newCar");
  }, []);

  // Show button for all users, but with different behavior
  // if (!user) return null;

  const handleClick = () => {
    setNewCarAlert(false); // hide alert when user opens chat
  };

  return (
    <div className="fixed bottom-5 left-5 z-[9999]">
      {/* Floating WhatsApp button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="relative bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition-transform hover:scale-105"
        title="Chat on WhatsApp"
      >
        <MessageCircle size={28} />
        {/* 🔴 Notification badge */}
        {newCarAlert && (
          <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        )}
      </a>
    </div>
  );
}
