import express from "express";
import { applyForJob, createJob, deleteJob, getAllJobs, getJobById, updateJob } from "../controllers/job.js";

const router = express.Router();

router.post("/create", createJob); 
router.get("/get-all", getAllJobs); 
router.get("/:id", getJobById); 
router.put("/:id", updateJob); 
router.delete("/:id", deleteJob);
router.post("/:id/apply", applyForJob); 

export default router;
