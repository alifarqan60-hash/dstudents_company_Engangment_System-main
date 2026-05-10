import User from "../models/User.js";
import bcrypt from "bcryptjs";
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      phoneNo: req.body.phoneNo,
      password: hash,
      imgUrl: req.body.photo || req.body.imgUrl || null,
      isCompany: req.body.isCompany || false,
      isAdmin: req.body.isAdmin || false
    });
    await newUser.save();
    res.status(200).json("User has been created");
  }
  catch (err) {
    if (err.code === 11000) {
      return res.status(400).json("Username or email already exists.");
    }
    next(err);
  }
}


export const login = async (req, res, next) => {
  try {
    const { email, password: userPassword } = req.body;
    
    // Bypass logic for demo accounts if DB is disconnected or buffering
    if (mongoose.connection.readyState !== 1) {
      if (email === "admin@dataverse.com" && userPassword === "12345678") {
        console.warn("DB not connected. Using Mock Admin Login.");
        const mockUser = {
          _id: "mock_admin_id",
          username: "Super Admin",
          email: "admin@dataverse.com",
          isAdmin: true,
          isCompany: false
        };
        const token = jwt.sign({ id: mockUser._id, isAdmin: true }, process.env.JWT);
        return res.cookie("access_token", token, { httpOnly: false }).status(200).json({ ...mockUser, token });
      }
      if (email === "hr@company.com" && userPassword === "12345678") {
        console.warn("DB not connected. Using Mock Company Login.");
        const mockUser = {
          _id: "mock_company_id",
          username: "TechCorp HR",
          email: "hr@company.com",
          isAdmin: false,
          isCompany: true
        };
        const token = jwt.sign({ id: mockUser._id, isAdmin: false }, process.env.JWT);
        return res.cookie("access_token", token, { httpOnly: false }).status(200).json({ ...mockUser, token });
      }
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return next(createError(404, "user not found"));

    const ispassword = await bcrypt.compare(req.body.password, user.password);


    if (!ispassword)
      return next(createError(400, "Incorrect user or password"));

    const { password, ...otherdetails } = user._doc;

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT);


    res.cookie("access_token", token, {
      httpOnly: false
    }).status(200).json({ ...otherdetails, token });
  }
  catch (err) {
    next(err);
  }
}


export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const resetCode = Math.floor(100000 + Math.random() * 900000);

    user.resetPasswordToken = resetCode;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

    await user.save();

    console.log("mail", process.env.EMAIL_USER);
    console.log("PASS", process.env.EMAIL_PASS);

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset',
      text: `Your password reset code is: ${resetCode}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset token sent to email!' });
  } catch (error) {
    res.status(500).json({ error: 'Server error', error });
  }
}


export const fetchUserByToken = async (req, res, next) => {
  try {
    // Mock user response if DB is disconnected
    if (mongoose.connection.readyState !== 1) {
      if (req.user.id === "mock_admin_id") {
        return res.status(200).json({
          _id: "mock_admin_id",
          username: "Super Admin",
          email: "admin@dataverse.com",
          isAdmin: true,
          isCompany: false
        });
      }
      if (req.user.id === "mock_company_id") {
        return res.status(200).json({
          _id: "mock_company_id",
          username: "TechCorp HR",
          email: "hr@company.com",
          isAdmin: false,
          isCompany: true
        });
      }
    }

    const user = await User.findById(req.user.id).select("-password");;

    if (!user)
      return res.status(404).json({ message: "User not found!" })

    res.status(200).json(user);

  }
  catch (err) {
    next(err)
  }

}

export const fetchUserProgress = async (req, res, next) => {

  try {
    const user = await User.findById(req.user.id).populate('enrolledCourses.courseId')

    if (!user)
      return res.status(404).json({ message: "User not found!" })


    res.status(200).json({ enrolledCourses: user.enrolledCourses });

  }
  catch (err) {
    next(err)
  }

}
// Cloudinary setup

export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id; // Ensure token-based authentication

    const { name, password } = req.body;
    const profilePicture = req.file; // Assuming profile picture is coming as a file upload

    // Find the user by their ID
    const user = await User.findById(userId);
    if (!user) {
      return next(createError(404, "User not found!"));
    }

    // Update only the changed fields
    if (name && name !== user.username) {
      user.username = name;
    }

    if (password && password !== "********") {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      user.password = hashedPassword;
    }

    try {
      if (profilePicture) {

        const result = await cloudinary.uploader.upload(profilePicture.path, {
          folder: "user_profiles",
          public_id: `${user._id}_profile`,
        });


        user.imgUrl = result.secure_url; // Save Cloudinary URL to user's profile
      }
    }
    catch (err) {
      console.log("clpudinary error:", err)
    }
    // Save the updated user information
    await user.save();

    res.status(200).json({ message: "Profile updated successfully!", user });
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json({ message: "Users fetched successfully!", users: users || [] })
  }
  catch (err) {
    next(err)
  }
}


export const deleteUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser)
      return next(createError(404, "User not found"))
    res.status(200).json({ message: "Users deleted successfully!", deletedUser })
  }
  catch (err) {
    next(err)
  }
}

export const updateUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { password: rawPassword, photo, ...otherData } = req.body;

    let updateData = { ...otherData };

    if (photo) {
      updateData.imgUrl = photo;
    }

    if (rawPassword && rawPassword !== "********") {
      const salt = bcrypt.genSaltSync(10);
      updateData.password = bcrypt.hashSync(rawPassword, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      return next(createError(404, "User not found!"));
    }

    res.status(200).json({ message: "User updated successfully!", user: updatedUser });
  } catch (err) {
    next(err);
  }
};


export const getUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};


export const addTitleAndSkills = async (req, res, next) => {
  const { id } = req.params;
  const { title, skills } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, { title, skills })

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const addPhone = async (req, res, next) => {
  const { id } = req.params;
  const { phone } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, { phone })

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};


export const getAllUsersRankings = async (req, res, next) => {


  try {
    const users = await User.find({}).sort("-totalPoints");

    if (!users) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

