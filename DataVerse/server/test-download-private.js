import cloudinary from "./utils/cloudinary.js";
import https from "https";

async function run() {
    try {
        const publicId = "dataverse/bpi8hicvc6vsutckieu4";

        // Let's try private_download_url
        const downloadUrl = cloudinary.utils.private_download_url(publicId, "pdf", {
            resource_type: "image",
            type: "upload"
        });

        console.log("Private Download URL:", downloadUrl);

        https.get(downloadUrl, (res) => {
            console.log("Private Download Status:", res.statusCode);
            res.on('data', d => process.stdout.write(d.toString().slice(0, 50)));
        });

    } catch (e) {
        console.error("Error:", e);
    }
}
run();
