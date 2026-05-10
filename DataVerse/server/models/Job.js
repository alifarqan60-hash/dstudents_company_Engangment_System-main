import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    type: {
      type: String,
      // enum: ["full-time", "part-time", "internship"],
      // required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    experienceRequired: {
      type: String,
      trim: true,
    },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      // required: true,
    },
    workingMode: {
      type: String,
      enum: ["onsite", "hybrid", "remote"],
      // required: true,
    },
    skills: [
      {
        type: String,
        trim: true,
      }
    ],
    applicationDeadline: {
      type: Date,
      // required: true,
    },
    applications: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        docUrl: {
          type: String,
          trim: true,
        },
        applicationDate: {
          type: Date,
          default: Date.now,
        }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
