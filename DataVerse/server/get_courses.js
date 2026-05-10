import mongoose from "mongoose";
import Course from "./models/learning/Course.js";
import dotenv from "dotenv";
dotenv.config();

async function getCourse() {
  await mongoose.connect(process.env.MONGO);
  const courses = await Course.find();
  console.log(JSON.stringify(courses));
  process.exit(0);
}
getCourse();
