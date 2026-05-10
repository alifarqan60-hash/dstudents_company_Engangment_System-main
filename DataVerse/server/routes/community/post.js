
import express from "express";
import { addComment, createPost, decrementUpVotes, deleteComment, deletePost, getAllPosts, getPostById, incrementUpVotes, updatePost } from "../../controllers/community/post.js";
import { verifyToken } from "../../utils/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, createPost);
router.patch("/:id/upvote", verifyToken, incrementUpVotes);
router.patch("/:id/decrement-upvote", verifyToken, decrementUpVotes);
router.get("/all", verifyToken, getAllPosts);
router.get("/:id", verifyToken, getPostById);
router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);
router.post("/:id/comments", verifyToken, addComment);
router.delete("/:id/comments/:commentId", verifyToken, deleteComment);

export default router;
