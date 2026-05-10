import cloudinary from "./utils/cloudinary.js";

async function run() {
    try {
        const publicId = "dataverse/bpi8hicvc6vsutckieu4";
        const result = await cloudinary.api.resource(publicId, { type: 'upload', resource_type: 'image' });
        console.log("Resource:", result);

        // Try updating it
        const updateResult = await cloudinary.api.update(publicId, {
            access_mode: 'public',
            type: 'upload',
            resource_type: 'image'
        });
        console.log("Update result:", updateResult);

    } catch (e) {
        console.error("Error:", e);
    }
}

run();
