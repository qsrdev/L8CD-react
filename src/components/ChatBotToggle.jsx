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
      >
        {showChat ? "Chiudi chat" : <i className="fa-solid fa-headset"></i>}
      </button>

      {showChat && <ChatBot />}
    </>
  );
};

export default ChatBotToggle;
