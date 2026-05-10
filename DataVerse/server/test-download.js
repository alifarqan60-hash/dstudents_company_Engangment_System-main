import cloudinary from "./utils/cloudinary.js";
import https from "https";

async function run() {
    try {
        const publicId = "dataverse/bpi8hicvc6vsutckieu4";
        const signedUrl = cloudinary.url(publicId, {
            sign_url: true,
            resource_type: "image",
            type: "upload",
            format: "pdf",
            version: "1773160447",
            secure: true
        });
        console.log("Signed URL:", signedUrl);

        https.get(signedUrl, (res) => {
            console.log("Status:", res.statusCode);
            console.log("Headers:", res.headers);
            res.on('data', d => process.stdout.write(d.toString().slice(0, 50)));
        });

    } catch (e) {
        console.error("Error:", e);
    }
}
run();
