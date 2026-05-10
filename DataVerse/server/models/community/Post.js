import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imgUrl: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } 
);

const PostSchema = new mongoose.Schema(
  {
    imgUrl: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:true
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    upVotes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
    comments: [CommentSchema]
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
