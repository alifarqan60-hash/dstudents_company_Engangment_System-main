import { Server } from "socket.io";
import Message from "../models/community/Message.js";

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Your client URL
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Register user with their userId
    socket.on("registerUser", (userId) => {
      socket.join(userId); // Join a room named after the userId
      console.log(`User ${userId} registered with socket ID ${socket.id}`);
    });

    // Listen for private messages
    socket.on("privateMessage", async ({ senderId, receiverId, content }) => {
      // Emit the message to the receiver instantly
      const tempMessage = {
        _id: new Date().getTime(), // Temporary ID (you can use any unique value)
        senderId,
        receiverId,
        content,
        status: "sent", // Initially mark it as sent
        createdAt: new Date(), // Temporary timestamp
      };

      // Emit to the receiver's socket room
      io.to(receiverId).emit("messageReceived", tempMessage);

      // Now save the message to the database asynchronously
      try {
        const message = new Message({
          senderId,
          receiverId,
          content,
          status: "sent",
        });
        await message.save();

    } catch (error) {
        console.error("Error saving message:", error);
        socket.emit("error", { message: "Message could not be saved." });
      }
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

export default initSocket;
