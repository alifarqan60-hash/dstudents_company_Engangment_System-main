import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import dotenv from "dotenv";
dotenv.config();

const testLogin = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to DB");

        const email = "admin@dataverse.com";
        const user = await User.findOne({ email });

        if (!user) {
            console.log("No user found with email", email);
        } else {
            console.log("Found user:", user.email, "| isAdmin:", user.isAdmin);
            const ismatch = await bcrypt.compare("12345678", user.password);
            console.log("Does 12345678 match hashed password?", ismatch);
        }

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

testLogin();
