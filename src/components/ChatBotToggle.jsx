import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import ChatBot from "./ChatBotAI/ChatBot";

const ChatBotToggle = () => {
  const [showChat, setShowChat] = useState(false);
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

useEffect(() => {
  if (location.pathname !== prevPathRef.current) {
    setShowChat(false);
    prevPathRef.current = location.pathname;
  }
}, [location.pathname]);



  const toggleChat = () => {
    setShowChat((prev) => !prev);
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className="chatbox-btn"
        style={{
          opacity: showChat ? 0.5 : 1,
          position: "fixed",
          bottom: "80px",
          right: "20px",
          backgroundColor: "#f4ae3f",
          color: "#000",
          border: "none",
          padding: "10px 16px",
          borderRadius: "50px",
          cursor: "pointer",
          zIndex: 10000,
        }}
      >
        {showChat ? "Chiudi chat" : "Apri chat"}
      </button>

      {showChat && <ChatBot />}
    </>
  );
};

export default ChatBotToggle;
