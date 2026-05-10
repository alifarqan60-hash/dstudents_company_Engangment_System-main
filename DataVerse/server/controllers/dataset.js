import { createError } from "../utils/error.js";
import Dataset from "../models/Dataset.js";

export const uploadDataset = async (req, res, next) => {
    try {
        const newDataset = new Dataset({
            url: req.body.url,
            imgurl: req.body.imgurl || null,
            title: req.body.title,
            description: req.body.description,
            tags: req.body.tags,
        });
        await newDataset.save();
        res.status(200).json("Dataset record has been saved");
    }
    catch (err) {
        next(err);
    }
}

export const getAllDatasets = async (req, res, next) => {
    try {
        const Datasets = await Dataset.find();
        if (!Datasets)
            return next(createError(404, "No Datasets found not found"));
        res.status(200).json(Datasets);
    }
    catch (err) {
        next(err);
    }
}


export const getDatasetById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const dataset = await Dataset.findById(id);
        if (!dataset) return next(createError(404, "Dataset not found"));
        res.status(200).json(dataset);
    } catch (err) {
        next(err);
    }
};

export const deleteDataset = async (req, res, next) => {
    try {
        const { id } = req.params;
        const oldDataset = await Dataset.findByIdAndDelete(id);

        if (!oldDataset)
            return next(createError(404, "Dataset not found"));

        res.status(200).json({ message: "Dataset Deleted Successfully", oldDataset });
    }
    catch (err) {
        next(err);
    }
}