import express from "express";
import { verifyToken } from "../../utils/verifyToken.js";
import { acceptFriendRequest, getAllCommunityUsers, getAllFriends, getFriendRequests, rejectFriendRequest, sendFriendRequest } from "../../controllers/community/community.js";

const router = express.Router();

router.get("/requests", verifyToken, getFriendRequests);
router.get("/friends", verifyToken, getAllFriends);
router.get("/may-know", verifyToken, getAllCommunityUsers);
router.post("/:receiverId/request", verifyToken, sendFriendRequest)
router.patch("/:requestId/accept", verifyToken, acceptFriendRequest)
router.patch("/:requestId/reject", verifyToken, rejectFriendRequest)

export default router;