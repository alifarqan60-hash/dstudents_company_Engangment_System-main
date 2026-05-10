import express from "express";
import { addPhone, addTitleAndSkills, deleteUserById, fetchUserByToken, fetchUserProgress, forgotPassword, getAllUsers, getAllUsersRankings, getUserById, login, register, updateProfile, updateUserById } from "../controllers/auth.js";
import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.patch("/:id/phone", addPhone);
router.patch("/:id/title", addTitleAndSkills);
router.get("/rankings", getAllUsersRankings);
router.get("/me", verifyToken, fetchUserByToken)
router.get("/progress", verifyToken, fetchUserProgress)
// router.get("/get-all-users",verifyToken, getAllUsers)
router.get("/get-all-users", getAllUsers)
router.post("/forgot-password", forgotPassword)
router.put("/update-profile", upload.single("profilePicture"), verifyToken, updateProfile)
router.delete("/:id", deleteUserById);
router.put("/:id", updateUserById);
router.get("/:id", getUserById);

router.get("/", (req, res) => {
  res.send("Auth endpoints: POST /register, POST /login, PATCH /:id/phone, PATCH /:id/title, GET /rankings, GET /me, GET /progress, GET /get-all-users, POST /forgot-password, PUT /update-profile, DELETE /:id, GET /:id");
});

export default router;