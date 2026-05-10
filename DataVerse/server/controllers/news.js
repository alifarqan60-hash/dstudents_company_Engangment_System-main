// src/controllers/newsController.js
import News from "../models/news.js";
import { createError } from "../utils/error.js";

export const createNews = async (req, res, next) => {
    try {
        const newNews = new News({
            imgUrl: req.body.imgUrl,
            title: req.body.title,
            description: req.body.description,
            articleUrl: req.body.articleUrl,
        });

        await newNews.save();
        res.status(200).json("News has been created successfully");
    } catch (err) {
        next(err);
    }
};

// Get All News
export const getAllNews = async (req, res, next) => {
    try {
        const newsList = await News.find();
        res.status(200).json(newsList || []);
    } catch (err) {
        next(err);
    }
};

// Get Single News by ID
export const getNewsById = async (req, res, next) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) {
            return next(createError(404, "News not found"));
        }
        res.status(200).json(news);
    } catch (err) {
        next(err);
    }
};


export const updateNews = async (req, res, next) => {
    try {
        const updatedNews = await News.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        if (!updatedNews) {
            return next(createError(404, "News not found for updating"));
        }
        res.status(200).json("News has been updated successfully");
    } catch (err) {
        next(err);
    }
};

export const deleteNews = async (req, res, next) => {
    try {
        const deletedNews = await News.findByIdAndDelete(req.params.id);
        if (!deletedNews) {
            return next(createError(404, "News not found for deletion"));
        }
        res.status(200).json("News has been deleted successfully");
    } catch (err) {
        next(err);
    }
};
