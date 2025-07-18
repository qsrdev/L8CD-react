import { useState } from "react";
import ChatBot from "./ChatBotAI/ChatBot";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const ChatBotToggle = () => {
  const [showChat, setShowChat] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setShowChat(false);
  }, [location]);
  return (
    <>
      <button
        onClick={() => setShowChat(!showChat)}
           style={{
    position: "fixed",
    bottom: "80px",
    right: "20px",
    backgroundColor: "#f4ae3fff",
    color: "#000",
    border: "none",
    padding: "10px 16px",
    borderRadius: "50px",
    cursor: "pointer",
    zIndex: 9999,
    opacity: showChat ? 0.5 : 1,
        }}
      >
        {showChat ? "Chiudi chat" : "Apri chat"}
      </button>

    {showChat && <ChatBot />}
    </>
  );
};

export default ChatBotToggle;
