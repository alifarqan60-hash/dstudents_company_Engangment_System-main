import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { toast } from "react-toastify";
import Loader from "../../Loader/Loader";
import axios from "axios";
import { API_BASE__URL } from "../../../config/api";

export default function AddCourse({ toggleFunc, addCoursePopup }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [instructor, setInstructor] = useState("");
    const [type, setType] = useState("video");
    const [category, setCategory] = useState("");
    const [loader, setLoader] = useState(false);

    const handleAddClick = async () => {
        if (!title || !description || !instructor) {
            toast.error("Please fill all required fields");
            return;
        }

        setLoader(true);
        try {
            const courseData = {
                title,
                description,
                instructor,
                type,
                category,
            };

            const response = await axios.post(`${API_BASE__URL}/learning/course/create`, courseData, {
                withCredentials: true
            });

            if (response.status === 200) {
                toast.success("Course Added Successfully");
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add course");
            console.error("Error adding course:", error);
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="h-screen rounded-l-3xl bg-customNewStudentCardColor absolute flex justify-end right-0 font-sans z-50">
            {addCoursePopup && <div className="bg-black fixed inset-0 opacity-50 z-[-1]" onClick={toggleFunc}></div>}

            <div className=" w-[400px] items-center bg-white h-full overflow-y-auto shadow-2xl">
                {/* close button  */}
                <div className="flex justify-end p-5">
                    <RiCloseLine
                        className="text-customGray cursor-pointer"
                        size={24}
                        onClick={toggleFunc}
                    />
                </div>

                <div className="px-8 pb-10">
                    <div className="mb-8">
                        <p className="text-2xl font-bold text-customDarkBlue">Add New Course</p>
                        <p className="text-sm text-customLightGray">Fill in the details to create a new course</p>
                    </div>

                    {/* Title  */}
                    <div className="mb-4">
                        <p className="text-customLightGray mb-1">Course Title*</p>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter course title"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* Instructor  */}
                    <div className="mb-4">
                        <p className="text-customLightGray mb-1">Instructor*</p>
                        <input
                            type="text"
                            required
                            value={instructor}
                            onChange={(e) => setInstructor(e.target.value)}
                            placeholder="Enter instructor name"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* Description  */}
                    <div className="mb-4">
                        <p className="text-customLightGray mb-1">Description*</p>
                        <textarea
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter course description"
                            rows={4}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* Category  */}
                    <div className="mb-4">
                        <p className="text-customLightGray mb-1">Category</p>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="e.g. Data Science, Web Dev"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* Type  */}
                    <div className="mb-4">
                        <p className="text-customLightGray mb-1">Course Type</p>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="video">Video</option>
                            <option value="text">Text</option>
                        </select>
                    </div>

                    <div className="w-full flex items-center justify-center mt-10">
                        {loader ? (
                            <Loader />
                        ) : (
                            <button
                                onClick={handleAddClick}
                                className="bg-customMaroon text-white w-full rounded-3xl py-3 font-medium hover:bg-opacity-90 transition-all shadow-md"
                            >
                                Create Course
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
