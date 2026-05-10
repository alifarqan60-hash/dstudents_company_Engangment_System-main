

import express from "express";
import { deleteDataset, getAllDatasets, getDatasetById, uploadDataset } from "../controllers/dataset.js";

const router = express.Router();

router.post("/upload", uploadDataset);
router.get("/getAll", getAllDatasets);
router.get("/:id", getDatasetById);

router.delete("/:id", deleteDataset);


export default router;