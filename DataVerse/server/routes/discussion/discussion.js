import express from "express";
import { 
    createDiscussion, 
    getDiscussionById, 
    getAllDiscussions, 
    upvoteDiscussion, 
    removeUpvote, 
    addReply,
    deleteDiscussion,
    updateDiscussion,
    getMyDiscussions,
    getTrendingDiscussions
} from "../../controllers/discussion/discussion.js";
import { verifyToken } from "../../utils/verifyToken.js";
const router = express.Router();

router.post("/create", verifyToken, createDiscussion);
router.get("/trending", verifyToken, getTrendingDiscussions);
router.get("/me", verifyToken, getMyDiscussions)
router.get("/:id", verifyToken, getDiscussionById);
router.get("/", verifyToken, getAllDiscussions);
router.put("/:id", verifyToken, updateDiscussion);
router.delete("/:id", verifyToken, deleteDiscussion);
router.post("/:id/reply", verifyToken, addReply);
router.post("/:id/upvote", verifyToken, upvoteDiscussion);
router.post("/:id/remove-upvote", verifyToken, removeUpvote);
router.get("/trending", verifyToken, removeUpvote);

export default router;
