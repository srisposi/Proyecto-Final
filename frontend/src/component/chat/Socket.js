import { io } from "socket.io-client";

let socket = io("//localhost:5001");

// const socket = io("http://localhost:5001", {
//   withCredentials: true,
//   extraHeaders: {
//     "my-custom-header": "probandoServicio",
//   },
// });

export default socket;
