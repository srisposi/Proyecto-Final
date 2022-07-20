const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const { randomUUID } = require("crypto");
const server = http.createServer(app);
//const { Server } = require("socket.io");
//const sio = new Server(server);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

const corsOption = {
  origin: ["*"],
};
app.use(cors());

let clients = [];
let messages = [];

app.get("/chat", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/room", (req, res) => {
  res.send({ room: randomUUID() });
});

app.get("/admin", (req, res) => {
  res.sendFile(__dirname + "/index_admin.html");
});

app.get("/dashboard", (req, res) => {
  res.sendFile(__dirname + "/index_groups.html");
});

app.get("/clients", (req, res) => {
  res.send({ clients: getClientsClean() });
});

function getClientsClean(newMessageOrRoom) {
  if (!newMessageOrRoom) newMessageOrRoom = "";

  let clientsClean = [];

  clients.forEach((item) => {
    clientsClean.push({
      id: item.socket.id,
      room: item.room,
      user: item.user,
      read: !(newMessageOrRoom === item.room),
    });
  });

  return clientsClean;
}

app.get("/messages", (req, res) => {
  let username = req.query.username;

  let messageFiltered = [];

  messages.forEach((item) => {
    if (item.username === username) messageFiltered.push(item);
  });

  res.send({ messages: messageFiltered });
});

function getMessageRoom(roomName) {
  let messageFiltered = [];

  messages.forEach((item) => {
    if (item.room === roomName) messageFiltered.push(item);
  });

  return messageFiltered;
}

io.on("connection", (socket) => {
  //cuando se conecta un socket, lo agrega a la lista de clientes
  if (!socket.handshake.query.rol) {
    clients.push({
      socket,
      room: socket.handshake.query.room,
      user: socket.handshake.query.user,
    });

    //lo suma al room donde esta especificando el socket en su query
    socket.join(socket.handshake.query.room);

    io.emit("get clients", getClientsClean(socket.handshake.query.room));
  }

  socket.on("join", (msg) => {
    socket.join(msg.room);
    socket.emit("get messages", getMessageRoom(msg.room));
  });

  socket.on("leave", (msg) => {
    socket.leave(msg.room);
  });

  socket.on("get clients", () => {
    io.emit("get clients", getClientsClean());
  });

  //listener evento disconnect donde saca al socket de la lista de clientes y avisa al admin de la desconexion si tiene el chat abierto
  socket.on("disconnect", () => {
    newClients = [];

    clients.forEach((client) => {
      if (client.socket.id !== socket.id) {
        newClients.push(client);
      }
    });
    clients = newClients;

    socket.broadcast
      .to(socket.handshake.query.room)
      .emit(
        "disconnected",
        `El cliente ${socket.handshake.query.user} se desconecto`
      );

    io.emit("get clients", getClientsClean());
  });

  socket.on("chat message", (msg) => {
    messages.push({
      message: msg,
      room: socket.handshake.query.room || msg.room,
    });
    io.in(socket.handshake.query.room || msg.room).emit("chat message", msg);
    io.emit(
      "get clients",
      getClientsClean(socket.handshake.query.room || msg.room)
    );
  });

  socket.on("typing", (msg) => {
    socket.broadcast
      .to(socket.handshake.query.room || msg.room)
      .emit("typing", msg);
  });

  socket.on("get messages", (msg) => {
    socket.emit("get messages", getMessageRoom(msg.room));
  });

  socket.on("get old messages", (msg) => {
    socket.emit(
      "get old messages",
      getMessageRoom(socket.handshake.query.room)
    );
  });
});

server.listen(3001, () => {
  console.log("listening on *:3001");
});
