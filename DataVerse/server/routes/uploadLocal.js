import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Ensure uploads folder exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

router.post("/", upload.single("file"), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json("No file uploaded");
        }

        // Generate the URL for the uploaded file
        // Using environment variable or default localhost:4000
        const baseUrl = process.env.API_BASE_URL ? process.env.API_BASE_URL.replace("/api", "") : "http://localhost:4000";
        const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;

        res.status(200).json({ secure_url: fileUrl });
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;
