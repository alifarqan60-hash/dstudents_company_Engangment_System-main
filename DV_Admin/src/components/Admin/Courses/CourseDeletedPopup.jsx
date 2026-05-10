import React from "react";
import { LuTrash2 } from "react-icons/lu";
import { deleteCourse } from "../../../api/Course/deleteCourse";
import Loader from "../../Loader/Loader";
import { toast } from "react-toastify";

export default function CourseDeletedPopup({ course, toggleFunc }) {
    const [loader, setLoader] = React.useState(false);

    const handleDeleteClick = async () => {
        setLoader(true);
        try {
            await deleteCourse(course.id);
            toast.success("Course Deleted Successfully");
            setTimeout(() => {
                window.location.reload();
            }, 1500);
            toggleFunc();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete course");
            console.error("Error deleting course:", error);
        } finally {
            setLoader(false);
        }
    };

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center h-screen w-auto z-50">
                <div className="bg-black fixed inset-0 opacity-50 transition-opacity" onClick={toggleFunc}></div>
                <div className="w-[350px] bg-white p-6 rounded-3xl font-sans space-y-4 border border-gray-200 relative z-10 shadow-2xl">
                    <div className="flex items-center p-2 ">
                        <LuTrash2 className="text-red-500" size={28} />
                        <p className="text-red-600 font-bold text-xl ml-3">
                            Delete Course
                        </p>
                    </div>

                    <div className="font-normal text-sm text-gray-700">
                        Are you sure you want to delete{" "}
                        <span className="font-bold text-customDarkBlue italic">
                            "{course.name}"
                        </span>?
                    </div>

                    <div className="font-normal text-xs text-red-500 bg-red-50 p-3 rounded-xl">
                        This action is permanent and cannot be undone. All lectures and data associated with this course will be lost.
                    </div>

                    <div className="flex flex-col space-y-3 pt-2">
                        <button
                            className="p-3 bg-gray-100 text-gray-700 text-sm font-semibold rounded-2xl w-full hover:bg-gray-200 transition-colors"
                            onClick={toggleFunc}
                        >
                            Cancel
                        </button>
                        {loader ? (
                            <div className="flex justify-center p-2">
                                <Loader />
                            </div>
                        ) : (
                            <button
                                className="p-3 bg-red-500 text-white text-sm font-semibold rounded-2xl w-full hover:bg-red-600 transition-colors shadow-lg shadow-red-200"
                                onClick={handleDeleteClick}
                            >
                                Yes, Delete Course
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
