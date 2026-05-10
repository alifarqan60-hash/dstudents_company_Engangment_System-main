import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import dotenv from "dotenv";
dotenv.config();

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to DB");

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync("12345678", salt);

        // Create Super Admin
        let admin = await User.findOne({ email: "admin@dataverse.com" });
        if (!admin) {
            admin = new User({
                username: "Super Admin",
                email: "admin@dataverse.com",
                password: hash,
                isAdmin: true,
            });
            await admin.save();
            console.log("Created Super Admin: admin@dataverse.com / 12345678");
        } else {
            admin.password = hash;
            admin.isAdmin = true;
            await admin.save();
            console.log("Updated Super Admin: admin@dataverse.com / 12345678");
        }

        // Create Test Company
        let company = await User.findOne({ email: "hr@company.com" });
        if (!company) {
            company = new User({
                username: "TechCorp HR",
                email: "hr@company.com",
                password: hash,
                isCompany: true,
            });
            await company.save();
            console.log("Created Company User: hr@company.com / 12345678");
        } else {
            company.password = hash;
            company.isCompany = true;
            await company.save();
            console.log("Updated Company User: hr@company.com / 12345678");
        }

        console.log("Seeding completed successfully");
        process.exit(0);
    } catch (err) {
        console.error("Seeding failed:");
        console.error(err);
        process.exit(1);
    }
};

seedUsers();
