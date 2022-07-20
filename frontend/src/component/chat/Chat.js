import { useState } from "react";
import "./Chat.css";

export default function Chat({ onSendMessage, messages, typing, onTyping }) {
  const [text, setText] = useState("");

  const handleOnTyping = (status) => {
    onTyping(status);
  }

  return (
    <div>
      <div className="messageBlock borders">
        <ul className="messageSpace">
          {messages.map((msg, index) => (
            <li key={index}>
              {msg.message.username}: {msg.message.message}
            </li>
          ))}
        </ul>
      </div>
      <div className="writeArea borders">
        <input
          type="text"
          value={text}
          onChange={(data) => {
            handleOnTyping(true);
            setText(data.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSendMessage(text);
              setText("");
              handleOnTyping(false);
            }
          }}
        ></input>
        <button
          onClick={() => {
            onSendMessage(text);
            setText("");
          }}
        >
          Enviar
        </button>
        <div className="typingPlace borders">{typing}</div>
      </div>
    </div>
  );
}
