
import { createLecture, deleteLecture, getLecture, lectureCompleted } from "../../controllers/learning/lecture.js";
import { verifyToken, verifyUser } from "../../utils/verifyToken.js";

import express from "express";

const router = express.Router();

router.get("/:lectureId", verifyUser, getLecture);
// router.post("/create", verifyUser, createLecture);
router.post("/create", createLecture);
// router.delete("/:courseId/del/:lectureId", verifyToken, deleteLecture)
router.delete("/:courseId/del/:lectureId", deleteLecture)
router.post("/completed/:courseId/:lectureId", verifyUser, lectureCompleted);




export default router;