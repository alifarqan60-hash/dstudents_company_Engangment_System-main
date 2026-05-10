import mongoose from "mongoose";

const discussionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [String],
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  replies: [
    {
      author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      content: String,
      repliedAt: { type: Date, default: Date.now },
      upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
  ],
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  lastReplyAt: { type: Date, default: Date.now },
});

export default mongoose.model("Discussion", discussionSchema);
