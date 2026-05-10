import express from "express";
import cloudinary from "../utils/cloudinary.js";

const router = express.Router();

router.get("/resolve", async (req, res, next) => {
    try {
        const { url } = req.query;
        if (!url) return res.status(400).json("URL is required");

        // Extract parts from the URL
        const parts = url.split("/");
        const uploadIndex = parts.indexOf("upload");
        if (uploadIndex === -1) {
            return res.redirect(url);
        }

        // Parts after 'upload/': [ 'v12345678', 'folder', 'publicId.pdf' ]
        const afterUpload = parts.slice(uploadIndex + 1);

        let version = null;
        let pathParts = [];

        if (afterUpload[0].startsWith("v") && /^\d+$/.test(afterUpload[0].slice(1))) {
            version = afterUpload[0].slice(1);
            pathParts = afterUpload.slice(1);
        } else {
            pathParts = afterUpload;
        }

        // pathParts: [ 'folder', 'publicId.pdf' ]
        const fullPath = pathParts.join("/");
        const lastDotIndex = fullPath.lastIndexOf(".");
        const publicId = lastDotIndex !== -1 ? fullPath.substring(0, lastDotIndex) : fullPath;
        const format = lastDotIndex !== -1 ? fullPath.substring(lastDotIndex + 1) : null;

        // Generate a private download URL which uses the Cloudinary API rather than CDN (bypasses Free account PDF restrictions)
        const downloadUrl = cloudinary.utils.private_download_url(publicId, format || 'pdf', {
            resource_type: "image",
            type: "upload",
            attachment: req.query.download === "true"
        });

        res.redirect(downloadUrl);
    } catch (err) {
        console.error("Resolve Error:", err);
        next(err);
    }
});

export default router;
