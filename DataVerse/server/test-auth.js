import cloudinary from "./utils/cloudinary.js";
import fs from "fs";

async function run() {
    try {
        fs.writeFileSync("test.pdf", "%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");
        const uploadResult = await cloudinary.uploader.upload("test.pdf", {
            resource_type: "raw",
            public_id: "test_pdf_auth",
            type: "authenticated"
        });
        console.log("Upload result authenticated:", uploadResult);

        const signedUrl = cloudinary.url(uploadResult.public_id, {
            resource_type: "raw",
            type: "authenticated",
            sign_url: true,
            secure: true
        });
        console.log("Signed URL auth:", signedUrl);

    } catch (e) {
        console.error("Error:", e);
    }
}
run();
