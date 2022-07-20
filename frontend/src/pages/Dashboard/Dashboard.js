import "./Dashboard.css";
import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import Chat from "../../component/chat/Chat.js";
const ENDPOINT = process.env.REACT_APP_BACKEND_URL;

function Dashboard() {
  const [clients, setClients] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [typingData, setTypingData] = useState("");
  const socket = useRef(socketIOClient(ENDPOINT, { query: { rol: "admin" } }));

  useEffect(() => {
    socket.current.emit("get clients");

    socket.current.on("get clients", (data) => {
      setClients(data.filter((x) => x.user !== "Admin"));
      console.log(data);
    });

    socket.current.on("get messages", (data) => {
      setMessages(data);
    });

    socket.current.on("chat message", function (msg) {
      setMessages((prev) => {
        return prev.concat({ message: msg });
      });
    });

    socket.current.on("typing", function (msg) {
      if (msg.status) {
        setTypingData(`${msg.username} esta escribiendo...`);
      } else setTypingData("");
    });
  }, []);

  const handleClickRoom = (room) => {
    socket.current.emit("leave", { room: selectedRoom });
    setSelectedRoom(room);
    socket.current.emit("join", { room: room });
  };

  const handleSendMessage = (message) => {
    socket.current.emit("chat message", {
      username: "Admin",
      message: message,
      room: selectedRoom,
    });
  };

  const handleOnTyping = (status) => {
    socket.current.emit("typing", {
      username: "Admin",
      status: status,
      room: selectedRoom,
    });
  };

  return (
    <div className="container">
      <div className="rooms">
        <div className="title">Nuevas conversaciones</div>
        {clients.map((item, index) => {
          return (
            <div
              onClick={() => {
                handleClickRoom(item.room);
              }}
              key={index}
              className="sala"
              style={{ backgroundColor: item.read ? "#202020" : "#2d7451" }}
            >
              Sala {item.room}
            </div>
          );
        })}
      </div>
      <div className="chat">
        {!selectedRoom || (
          <Chat
            typing={typingData}
            messages={messages}
            onSendMessage={handleSendMessage}
            onTyping={handleOnTyping}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
