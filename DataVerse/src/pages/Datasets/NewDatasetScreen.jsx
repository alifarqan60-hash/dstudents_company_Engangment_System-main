import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tag from '../../components/Datasets/Tag';
import { TAGS } from '../../constants/datasets';
import Loader from "../../components/Loader";
import { cloudname, preset } from '../../config/cloudinary';
import axios from 'axios';
import { uploadDataset } from '../../api/dataset';
import { toast } from 'react-toastify';


const NewDatasetScreen = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        tags: [],
        file: null,
    });
    const [isUploading, setIsUploading] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleTagClick = (tagTitle) => {
        setFormData((prevFormData) => {
            const tags = prevFormData.tags.includes(tagTitle)
                ? prevFormData.tags.filter((tag) => tag !== tagTitle)
                : [...prevFormData.tags, tagTitle];
            return { ...prevFormData, tags };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.file) {
            alert("Please upload a file before submitting.");
            return;
        }

        try {
            setIsUploading(true);
            const fileData = new FormData();
            fileData.append("file", formData.file);
            fileData.append("upload_preset", preset);
            fileData.append("access_mode", "public");

            // Upload file to Cloudinary
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudname}/auto/upload`,
                fileData
            );

            console.log(response.data);

            if (response.status !== 200) {
                throw new Error("Failed to upload file to Cloudinary");
            }

            const data = response.data
            const uploadedFileUrl = data.secure_url;

            const finalData = {
                title: formData.name,
                description: formData.description,
                tags: formData.tags,
                url: uploadedFileUrl,
            };

            const datasetResponse = await uploadDataset(finalData);

            if (!datasetResponse)
                throw new Error("Failed to Upload dataset after file uploading!");

            toast.success("Dataset Uploaded Successfully")

            setFormData({
                name: '',
                description: '',
                tags: [],
                file: null,
            });


        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Failed to upload the dataset. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="min-h-screen w-full max-w-screen-lg bg-gray-100 p-8">
            <div className="bg-customBlue text-white p-6 rounded-lg shadow-lg mb-8">
                <h1 className="text-3xl font-bold">Upload New Dataset</h1>
                <p className="text-lg mt-2">Provide the necessary information to upload a new dataset.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Dataset Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                            placeholder="Enter dataset name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                            rows="4"
                            placeholder="Enter dataset description"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Tags</label>
                        <div className="flex gap-2 items-center flex-wrap">
                            {TAGS?.map((item) => (
                                <Tag
                                    key={item.title}
                                    title={item.title}
                                    active={formData.tags.includes(item.title)}
                                    onclick={() => handleTagClick(item.title)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Upload File</label>
                        <input
                            type="file"
                            name="file"
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                        />
                        {formData.file && (
                            <p className="mt-2 text-sm text-gray-600">
                                {formData.file.name}
                            </p>
                        )}
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={() => navigate('/app/datasets')}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow hover:bg-gray-400 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`px-4 py-2 rounded-md shadow transition ${isUploading
                                ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                                : "bg-customBlue text-white hover:bg-blue-600"
                                }`}
                            disabled={isUploading}
                        >
                            {isUploading ? "Uploading..." : "Upload"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewDatasetScreen;
