import cloudinary from "./utils/cloudinary.js";
import fs from "fs";

async function run() {
    try {
        fs.writeFileSync("test.pdf", "Dummy PDF content");
        const uploadResult = await cloudinary.uploader.upload("test.pdf", {
            resource_type: "raw",
            public_id: "test_pdf_raw",
            access_mode: 'public'
        });
        console.log("Upload result raw:", uploadResult.url);

        const uploadResultImage = await cloudinary.uploader.upload("test.pdf", {
            resource_type: "image",
            public_id: "test_pdf_image",
            access_mode: 'public'
        });
        console.log("Upload result image:", uploadResultImage.url);
    } catch (e) {
        console.error("Error:", e);
    }
}
run();
