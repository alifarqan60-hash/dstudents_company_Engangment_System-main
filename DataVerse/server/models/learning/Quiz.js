import mongoose from "mongoose";

const QuizQuestionSchema = new mongoose.Schema(
    {
      title:{
        type: String,
        required: true
      },
      excercise: {
        type: String,
        // required: true,
      },
      points: {
        type: Number
      },
      type: {
        type: String,
        enum: ["multiple-choice", "coding"],
        required: true,
      },
      instructions:{
        type: [String],
        // required: true,
      },
      choices: {
        type: [String],
      }, 
      correctAnswer: {
        type: Number,
      },
      codeTemplate: {
        type: String,
      }, 
      correctCode: {
        type: String,
      },
      codeAnswer:{
        type: String
      },
      hints: {
        type: [String],
      }, 
    },
    { timestamps: true }
  );

  export default mongoose.model("Quiz", QuizQuestionSchema);
  