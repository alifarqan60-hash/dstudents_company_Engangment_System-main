
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import authRoute from "./routes/auth.js";
import courseRoute from "./routes/learning/course.js";
import lectureRoute from "./routes/learning/lecture.js";
import quizRoute from "./routes/learning/quiz.js";
import datasetRoute from "./routes/dataset.js";
import messageRoutes from "./routes/community/message.js";
import newsRoutes from "./routes/news.js";
import jobsRoutes from "./routes/job.js";
import companyRoutes from "./routes/company.js";
import postRoutes from "./routes/community/post.js";
import connectionRoutes from "./routes/community/connection.js";
import discussionRoutes from "./routes/discussion/discussion.js";
import resourceRoutes from "./routes/resource.js";
import uploadLocalRoutes from "./routes/uploadLocal.js";
import path from "path";

import cors from "cors";
import http from "http";
import initSocket from "./config/socket.js";

import { MongoMemoryServer } from 'mongodb-memory-server';
import User from "./models/User.js";
import bcrypt from "bcryptjs";

dotenv.config();

const app = express();

const server = http.createServer(app);

initSocket(server);

// MongoDB Connection
const connectdb = async () => {
  try {
    if (process.env.MONGO) {
      await mongoose.connect(process.env.MONGO);
      console.log("Connected to MongoDB");
    } else {
      throw new Error("MONGO environment variable not set");
    }
  } catch (error) {
    console.warn("MongoDB connection failed or MONGO not set. Starting In-Memory MongoDB...");
    try {
      const mongoServer = await MongoMemoryServer.create({
        instance: {
          port: 27017,
          dbName: 'dataverse'
        }
      });
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri);
      console.log("Connected to In-Memory MongoDB at", mongoUri);

      // Auto-seed basic users for demo
      await seedBasicUsers();
    } catch (innerError) {
      console.error("Failed to start In-Memory MongoDB:", innerError);
      console.warn("Server will continue running WITHOUT a database connection. Most features will be unavailable.");
      // process.exit(1); // Removed to allow server to start for demo purposes
    }
  }
};

const seedBasicUsers = async () => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync("12345678", salt);

    // Admin
    await User.findOneAndUpdate(
      { email: "admin@dataverse.com" },
      { username: "Super Admin", password: hash, isAdmin: true },
      { upsert: true, new: true }
    );

    // Company
    await User.findOneAndUpdate(
      { email: "hr@company.com" },
      { username: "TechCorp HR", password: hash, isCompany: true },
      { upsert: true, new: true }
    );

    console.log("Basic users seeded: admin@dataverse.com, hr@company.com (password: 12345678)");
  } catch (err) {
    console.error("Seeding failed:", err);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Disconnected");
});

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176", "http://localhost:5177", "http://localhost:5178"],
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/dataset", datasetRoute);
app.use("/api/learning/course", courseRoute);
app.use("/api/learning/lecture", lectureRoute);
app.use("/api/learning/quiz", quizRoute);
app.use("/api/messages", messageRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/jobs", jobsRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/post", postRoutes);
app.use("/api/discussion", discussionRoutes);
app.use("/api/connection", connectionRoutes);
app.use("/api/resource", resourceRoutes);
app.use("/api/upload-local", uploadLocalRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));




app.get("/api", (req, res) => {
  res.send("API is running. Available endpoints: /api/auth, /api/dataset, /api/learning, /api/messages, /api/news, /api/jobs, /api/company, /api/post, /api/discussion, /api/connection");
});

app.get("/", (req, res) => {
  res.send("Hello API");
});

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  connectdb();
  console.log(`Server running on port ${PORT}`);
});
