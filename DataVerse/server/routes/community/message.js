import express from "express";
import { getPreviousMessages } from "../../controllers/community/message.js";
import { verifyToken } from "../../utils/verifyToken.js";

const router = express.Router();

router.get("/get-prev-msg/:userId", verifyToken, getPreviousMessages);


export default router;