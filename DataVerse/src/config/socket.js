
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:4000"; // Replace with your server URL

const socket = io(SOCKET_SERVER_URL, {
  withCredentials: true,
  transports: ["websocket"],
});

export default socket;
