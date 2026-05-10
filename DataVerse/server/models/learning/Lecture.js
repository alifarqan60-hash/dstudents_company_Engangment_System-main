import mongoose from "mongoose";


const LectureSchema = new mongoose.Schema(
    {
      title: {
        type: String,
      },
      videoUrl: {
        type: String,
      },
      index:{
        type: Number,
      },
      quiz: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
      }], 
      transcript: {
        type: [
          {
            type: {
              type: String,
              enum: ["heading", "text"],
              required: true,
            },
            content: {
              type: String,
              required: true, 
            },
          },
        ],
      },
    },
    { timestamps: true }
  );

  export default mongoose.model("Lecture", LectureSchema);