//Servidor con express
const express = require("express");
const http = require("http");
const app = express();

//cors
//const cors = require("cors");
//const { config } = require("./config");
//app.use(cors(`${config.cors}`));

const servidor = http.createServer(app);

//Inicializamos socketio
const socketio = require("socket.io");
const io = socketio(servidor, {
  cors: {
    origin: "*",
    method: ["GET", "POST"],
  },
});

//Funcionalidad de socket.io en el servidor
//Establecemos la conexión
io.on("connection", (socket) => {
  let nombre;

  //Establecemos cuando alguien se conecta
  //Cada vez que un cliente se conecte, está función se ejecutará
  socket.on("conectado", (nomb) => {
    nombre = nomb;
    //Elegimos los métodos de comunicación que queremos utilizar, para este caso será broadcast
    //socket.broadcast.emit manda el mensaje a todos los clientes excepto al que ha enviado el mensaje
    socket.broadcast.emit("mensajes", {
      nombre: nombre,
      mensaje: `${nombre} ha entrado en la sala del chat`,
    });
  });

  socket.on("mensaje", (nombre, mensaje) => {
    //io.emit manda el mensaje a todos los clientes conectados al chat
    io.emit("mensajes", { nombre, mensaje });
  });

  socket.on("disconnect", () => {
    io.emit("mensajes", {
      servidor: "Servidor",
      mensaje: `${nombre} ha abandonado la sala`,
    });
  });
});

servidor.listen(5001, () =>
  console.log("Servidor inicializado en el puerto 5001")
);
