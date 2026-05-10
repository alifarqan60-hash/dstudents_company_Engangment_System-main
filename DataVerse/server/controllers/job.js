import Job from "../models/Job.js";
import { createError } from "../utils/error.js";

export const createJob = async (req, res, next) => {
  try {
    const newJob = new Job({
      title: req.body.title,
      company: req.body.company,
      description: req.body.description,
      experienceRequired: req.body.experienceRequired,
      level: req.body.level,
      type: req.body.type,
      workingMode: req.body.workingMode,
      skills: req.body.skills,
      applicationDeadline: req.body.applicationDeadline,
    });
    await newJob.save();
    res.status(200).json("Job created successfully");
  } catch (err) {
    next(err);
  }
};


export const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find().populate("company applications.userId");
    res.status(200).json(jobs || []);
  } catch (err) {
    next(err);
  }
};

export const getJobById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id).populate("company applications.userId");
    if (!job) return next(createError(404, "Job not found"));
    res.status(200).json(job);
  } catch (err) {
    next(err);
  }
};

export const updateJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedJob = await Job.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    if (!updatedJob) return next(createError(404, "Job not found"));
    res.status(200).json({ message: "Job updated successfully", updatedJob });
  } catch (err) {
    next(err);
  }
};


export const deleteJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedJob = await Job.findByIdAndDelete(id);
    if (!deletedJob) return next(createError(404, "Job not found"));
    res.status(200).json({ message: "Job deleted successfully", deletedJob });
  } catch (err) {
    next(err);
  }
};

export const applyForJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const application = {
      userId: req.body.userId,
      docUrl: req.body.docUrl,
      applicationDate: new Date(),
    };

    const job = await Job.findById(id);
    if (!job) return next(createError(404, "Job not found"));

    job.applications.push(application);
    await job.save();

    res.status(200).json({ message: "Application submitted successfully", application });
  } catch (err) {
    next(err);
  }
};
