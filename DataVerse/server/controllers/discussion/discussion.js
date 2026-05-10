import Discussion from "../../models/discussion/Discussion.js";
import { createError } from "../../utils/error.js";


export const createDiscussion = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;
    const newDiscussion = new Discussion({
      title,
      content,
      tags,
      author: req.user.id,
    });

    await newDiscussion.save();
    res.status(201).json({ message: "Discussion created successfully!", newDiscussion });
  } catch (err) {
    next(err);
  }
};

export const getAllDiscussions = async (req, res, next) => {
  try {
    const discussions = await Discussion.find().populate("author", "username");
    res.status(200).json({ message: "Discussions fetched successfully!", discussions });
  } catch (err) {
    next(err);
  }
};


export const getDiscussionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const discussion = await Discussion.findById(id)
      .populate("author", "username")
      .populate("replies.author", "username imgUrl");

    if (!discussion) return next(createError(404, "Discussion not found!"));

    res.status(200).json({ message: "Discussion fetched successfully!", discussion });
  } catch (err) {
    next(err);
  }
};

export const updateDiscussion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, tags } = req.body;

    const discussion = await Discussion.findById(id);
    if (!discussion) return next(createError(404, "Discussion not found!"));

    if (discussion.author.toString() !== req.user.id)
      return next(createError(403, "You are not authorized to update this discussion!"));

    discussion.title = title || discussion.title;
    discussion.content = content || discussion.content;
    discussion.tags = tags || discussion.tags;

    await discussion.save();
    res.status(200).json({ message: "Discussion updated successfully!", discussion });
  } catch (err) {
    next(err);
  }
};

export const deleteDiscussion = async (req, res, next) => {
  try {
    const { id } = req.params;

    const discussion = await Discussion.findById(id);
    if (!discussion) return next(createError(404, "Discussion not found!"));

    if (discussion.author.toString() !== req.user.id)
      return next(createError(403, "You are not authorized to delete this discussion!"));

    await Discussion.findByIdAndDelete(id);
    res.status(200).json({ message: "Discussion deleted successfully!" });
  } catch (err) {
    next(err);
  }
};

export const addReply = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const discussion = await Discussion.findById(id);
    if (!discussion) return next(createError(404, "Discussion not found!"));

    discussion.replies.push({
      author: req.user.id,
      content,
      repliedAt: new Date(),
    });

    discussion.lastReplyAt = new Date();
    await discussion.save();

    // Refetch the updated discussion and populate necessary fields
    const updatedDiscussion = await Discussion.findById(id)
      .populate("author", "username")
      .populate("replies.author", "username imgUrl");

    res.status(201).json({ message: "Reply added successfully!", discussion: updatedDiscussion });
  } catch (err) {
    next(err);
  }
};


export const getTrendingDiscussions = async (req, res, next) => {
  try {
    const trendingDiscussions = await Discussion.find()
      .sort({ lastReplyAt: -1 })
      .limit(5)
      .populate("author", "username");

    res.status(200).json({ message: "Trending discussions fetched successfully!", trendingDiscussions });
  } catch (err) {
    next(err);
  }
};

export const upvoteDiscussion = async (req, res, next) => {
  try {
    const { id } = req.params; // Discussion ID
    const userId = req.user.id; // User ID from token

    const discussion = await Discussion.findById(id);
    if (!discussion) return next(createError(404, "Discussion not found!"));

    // Check if user has already upvoted
    if (discussion.upvotes.includes(userId)) {
      return res.status(400).json({ message: "You have already upvoted this discussion!" });
    }

    // Add user ID to upvotes array
    discussion.upvotes.push(userId);
    await discussion.save();

    res.status(200).json({ message: "Discussion upvoted successfully!", upvotes: discussion.upvotes.length });
  } catch (err) {
    next(err);
  }
};




export const removeUpvote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const discussion = await Discussion.findById(id);
    if (!discussion) return next(createError(404, "Discussion not found!"));


    if (!discussion.upvotes.includes(userId)) {
      return res.status(400).json({ message: "You haven't upvoted this discussion yet!" });
    }

    discussion.upvotes = discussion.upvotes.filter((upvote) => upvote.toString() !== userId);
    await discussion.save();

    res.status(200).json({ message: "Upvote removed successfully!", upvotes: discussion.upvotes.length });
  } catch (err) {
    next(err);
  }
};

export const getMyDiscussions = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const myDiscussions = await Discussion.find({ author: userId }).populate("author", "username");

    res.status(200).json({
      message: "Your discussions fetched successfully!",
      myDiscussions,
    });
  } catch (err) {
    next(err);
  }
};

export const voteReply = async (req, res, next) => {
  try {
    const { id, replyId } = req.params;
    const { voteType } = req.body; // 'upvote' or 'downvote' or null
    const userId = req.user.id;

    const discussion = await Discussion.findById(id);
    if (!discussion) return next(createError(404, "Discussion not found!"));

    const reply = discussion.replies.id(replyId);
    if (!reply) return next(createError(404, "Reply not found!"));

    // Remove user ID from both arrays first to reset the vote
    reply.upvotes = reply.upvotes.filter((uid) => uid.toString() !== userId);
    reply.downvotes = reply.downvotes.filter((uid) => uid.toString() !== userId);

    if (voteType === "upvote") {
      reply.upvotes.push(userId);
    } else if (voteType === "downvote") {
      reply.downvotes.push(userId);
    }

    await discussion.save();

    // Population for return
    const updated = await Discussion.findById(id)
      .populate("author", "username")
      .populate("replies.author", "username imgUrl");

    res.status(200).json({ message: "Reply voted successfully!", discussion: updated });
  } catch (err) {
    next(err);
  }
};
