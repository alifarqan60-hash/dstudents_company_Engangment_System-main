import mongoose from "mongoose";
import User from "./models/User.js";
import dotenv from "dotenv";
dotenv.config();

const findAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to DB");

        // Look for real admin
        let admin = await User.findOne({ isAdmin: true });

        if (admin) {
            console.log("Found admin:");
            console.log("Email:", admin.email);
            // We don't know the password directly since it's hashed, but we can reset it.
        } else {
            console.log("No admin found.");
        }

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

findAdmin();
