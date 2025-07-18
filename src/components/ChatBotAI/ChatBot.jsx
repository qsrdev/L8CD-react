import { useState } from "react";
import "./ChatBot.css";

const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { sender: "You", text: message };
    setChatLog((prev) => [...prev, userMessage]);
    setMessage("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let aiMessage = "";

      setChatLog((prev) => [...prev, { sender: "Gemini", text: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        aiMessage += chunk;

        setChatLog((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { sender: "Gemini", text: aiMessage };
          return updated;
        });
      }
    } catch (error) {
      console.error("Error fetching chat response:", error);
      setChatLog((prev) => [
        ...prev,
        {
          sender: "Gemini",
          text: "Mi scuso, c'è stato un problema nel connettermi. Riprova più tardi.",
        },
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        <h2 className="chat-title">Gemini ChatBot</h2>
        <div className="chat-log">
          {chatLog.length > 0 ? (
            chatLog.map((msg, index) => (
              <p key={index} className={`chat-message ${msg.sender.toLowerCase()}`}>
                <strong className="sender-name">{msg.sender}: </strong>
                <span className="message-text">{msg.text}</span>
              </p>
            ))
          ) : (
            <p className="welcome-message">
              Ciao! Sono il tuo assistente virtuale specializzato in scarpe. Come posso aiutarti oggi?
            </p>
          )}
        </div>
        <div className="chat-input-area">
          <input
            className="chat-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Chiedi qualcosa sulle scarpe..."
          />
          <button className="send-button" onClick={sendMessage}>
            Invia
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
