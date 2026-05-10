import React, { useEffect, useState } from "react";
import { IMAGES } from "../../../../assets";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RiCloseLine } from "react-icons/ri";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
// import { addUser } from "../../../api/Users/addUser";
import Loader from "../../../Loader/Loader";
import { addLesson } from "../../../../api/Course/addLesson";
import { getAllQuizes } from "../../../../api/Course/allQuizes";
import { useNavigate } from "react-router-dom";

export default function AddUser({
  toggleFunc,
  toggleAddedPopup,
  addedPopup,
  cid,
  course,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfrimPassword, setShowConfrimPassword] = useState(false);

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPassword = () => {
    setShowConfrimPassword(!showConfrimPassword);
  };

  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [lessonType, setLessonType] = useState("");
  const [quiz, setQuiz] = useState("");
  const [quizes, setQuizes] = useState([]);

  const [loader, setLoader] = useState(false);

  // TODO: api call for get all quizes
  const fetchAllQuizes = async () => {
    const data = await getAllQuizes();
    setQuizes(data);
  };

  useEffect(() => {
    fetchAllQuizes();
  }, []);

  const handleAddClick = async () => {
    console.log("course is : ", course);
    setLoader(true);
    if (title !== "" && videoUrl !== "" && lessonType !== "" && quiz !== "") {
      const newLesson = {
        title,
        videoUrl,
        index: course?.lectures?.length + 1,
        type: lessonType,
        quizId: JSON.parse(quiz)._id,
        courseId: cid,
      };
      try {
        const response = await addLesson(newLesson);
        // window.location.reload();
        toast.success("New Lesson Added Successfully");
        toggleAddedPopup();
      } catch (error) {
        toast.error("Failed to add new lesson");
        console.error("Error adding new lesson:", error);
      }
    } else {
      toast.error("Please fill all the fields");
    }
    setLoader(false);
  };

  return (
    <div className="h-screen overflow-y-auto register-scrollbar2 rounded-l-3xl bg-customNewStudentCardColor absolute flex justify-end right-0 font-sans ">
      {addedPopup && <div className="bg-black fixed inset-0 opacity-50"></div>}
      <ToastContainer position="bottom-right" />

      <div className=" w-[400px]  items-center">
        {/* close button  */}
        <div className="flex justify-start flex-1">
          <div
            onClick={toggleFunc}
            className="bg-white mt-3 ml-4 border border-gray-200 rounded-full w-[35px] h-[35px] shadow-xl flex justify-center items-center cursor-pointer"
          >
            <RiCloseLine className="text-customGrayText" />
          </div>
        </div>
        {/* Heading  */}
        <div className="flex flex-1 justify-center mb-6">
          <p className=" mt-6 font-medium text-2xl">New Lesson</p>
        </div>

        {/* Form  */}
        <div className="flex-[5] p-8 text-xs ">
          {/* <form action=""> */}
          {/* Name Field  */}
          <div className="mb-4">
            <p className="text-customLightGray mb-1 ">Title</p>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Lesson's Title"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* VideoUrl Field  */}
          <div className="mb-4">
            <p className="text-customLightGray mb-1 ">Video Url</p>
            <input
              type="text"
              required
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Enter Video Url"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <p className="text-customLightGray mb-1 ">Lesson Type</p>
            <input
              type="text"
              required
              value={lessonType}
              onChange={(e) => setLessonType(e.target.value)}
              placeholder="Enter Lesson Type"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <p className="text-customLightGray mb-1 ">Quiz</p>
            <select
              onChange={(e) => {
                setQuiz(e.target.value);
              }}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select a Quiz </option>
              {quizes?.map((q) => (
                <option value={JSON.stringify(q)}>{q.title}</option>
              ))}
            </select>
            {/* <input
              type="text"
              required
              value={quiz}
              onChange={(e) => setQuiz(e.target.value)}
              placeholder="Enter Quiz ID"
              maxLength={35}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
            /> */}
          </div>

          {/* </form> */}
          {/* Register Button  */}
          <div className="w-full flex items-center justify-center mt-10 mb-8">
            {loader ? (
              <Loader />
            ) : (
              <button
                type="submit"
                onClick={handleAddClick}
                className="bg-customMaroon w-7/10 rounded-3xl py-3"
              >
                <p className=" text-white font-medium text-base">
                  Create Lesson
                </p>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
