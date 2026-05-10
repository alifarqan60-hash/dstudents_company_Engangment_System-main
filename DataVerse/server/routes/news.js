
import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import {
    createNews,
    getAllNews,
    getNewsById,
    updateNews,
    deleteNews
} from "../controllers/news.js";

const router = express.Router();

router.post("/create", verifyToken, createNews);
router.get("/all", verifyToken, getAllNews);
router.get("/:id", verifyToken, getNewsById);
router.put("/:id", verifyToken, updateNews);
router.delete("/:id", verifyToken, deleteNews);

export default router;
