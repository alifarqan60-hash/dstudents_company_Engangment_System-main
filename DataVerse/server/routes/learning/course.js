
import { addCourse, deleteCourse, enrollCourse, getAllCourses, getCourse, getEnrolledCourses } from "../../controllers/learning/course.js";
import { verifyUser } from "../../utils/verifyToken.js";

import express from "express";

const router = express.Router();

// router.get("/all", verifyUser, getAllCourses);
router.get("/all",  getAllCourses);
router.get("/:courseId", verifyUser, getCourse);
router.post("/create", verifyUser, addCourse);
router.get("/enroll/:courseId", verifyUser, enrollCourse);
router.get("/enrolled-courses", verifyUser, getEnrolledCourses);
router.delete("/delete/:courseId", verifyUser, deleteCourse);


export default router;