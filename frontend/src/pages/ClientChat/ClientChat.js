import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import Chat from "../../component/chat/Chat";
const ENDPOINT = process.env.REACT_APP_BACKEND_URL;

export default function ClientChat() {
  const [messages, setMessages] = useState([]);
  const [typingData, setTypingData] = useState("");
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const connectChat = async () => {
    console.log(ENDPOINT);
    if (username !== "") {
      let newRoom = await getRoom();

      setRoom(newRoom);

      setSocket(
        socketIOClient(ENDPOINT, {
          query: { room: newRoom, user: username },
        })
      );

      setShowChat(true);
      console.log(`Connected as ${username} in ${newRoom}`);
    } else {
      alert("Debe completar el nombre de usuario");
    }
  };

  useEffect(() => {
    if (socket != null) {
      socket.on("get messages", (data) => {
        setMessages(data);
      });

      socket.on("chat message", function (msg) {
        setMessages((prev) => {
          return prev.concat({ message: msg });
        });
      });

      socket.on("typing", function (msg) {
        if (msg.status) {
          setTypingData(`${msg.username} esta escribiendo...`);
        } else setTypingData("");
      });
    }
  }, [socket]);

  const getRoom = async () => {
    return fetch(`${ENDPOINT}/room`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((json) => json.room);
  };

  const handleSendMessage = (message) => {
    socket.emit("chat message", {
      username: username,
      message: message,
      room: room,
    });
  };

  const handleOnTyping = (status) => {
    socket.emit("typing", {
      username: username,
      status: status,
    });
  };

  return (
    <div style={{ backgroundColor: "#fff" }}>
      {showChat || (
        <div>
          <input
            type={"text"}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></input>
          <button
            onClick={() => {
              connectChat();
            }}
          >
            Entrar al chat
          </button>
        </div>
      )}
      {!showChat || (
        <Chat
          typing={typingData}
          messages={messages}
          onSendMessage={handleSendMessage}
          onTyping={handleOnTyping}
        ></Chat>
      )}
    </div>
  );
}
