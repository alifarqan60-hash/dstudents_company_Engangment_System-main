import React, { useState } from "react";
import { IMAGES } from "../../../../assets";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RiCloseLine } from "react-icons/ri";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
// import { addUser } from "../../../api/Users/addUser";
import Loader from "../../../Loader/Loader";
import { addQuiz } from "../../../../api/Course/addQuiz";

export default function AddUser({
  toggleFunc,
  toggleAddedPopup,
  addedPopup,
  cid,
  course,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfrimPassword, setShowConfrimPassword] = useState(false);

  const [title, setTitle] = useState("");
  const [exercise, setExercise] = useState("");
  const [points, setPoints] = useState("");
  const [type, setType] = useState("");
  const [instructions, setInstructions] = useState([]);
  const [choices, setChoices] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [codeTemplate, setCodeTemplate] = useState("");
  const [correctCode, setCorrectCode] = useState("");
  const [hints, setHints] = useState([]);

  const [loader, setLoader] = useState(false);

  const handleAddClick = async () => {
    setLoader(true);
    if (title !== "" && instructions !== "" && type !== "") {
      const newQuiz = {
        title,
        exercise,
        points,
        type,
        instructions,
        choices,
        correctAnswer,
        codeTemplate,
        correctCode,
        hints,
      };
      try {
        const response = await addQuiz(newQuiz);
        // window.location.reload();
        toast.success("New quiz Added Successfully");
        toggleAddedPopup();
      } catch (error) {
        toast.error("Failed to add new quiz");
        console.error("Error adding new quiz:", error);
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
        {/* Heading */}
        <div className="flex flex-1 justify-center mb-6">
          <p className=" mt-6 font-medium text-2xl">New Quiz</p>
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
              placeholder="Enter Quiz Title"
              maxLength={35}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <p className="text-customLightGray mb-1 ">Exercise</p>
            <input
              type="text"
              required
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              placeholder="Enter Quiz Exercise"
              maxLength={35}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <p className="text-customLightGray mb-1 ">Points</p>
            <input
              type="text"
              required
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              placeholder="Enter Quiz Points"
              maxLength={35}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <p className="text-customLightGray mb-1 ">Type</p>
            <input
              type="text"
              required
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="Enter Quiz Type"
              maxLength={35}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <p className="text-customLightGray mb-1 ">Instructions</p>
            <input
              type="text"
              required
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Enter Quiz Instructions"
              maxLength={35}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <p className="text-customLightGray mb-1 ">Choices</p>
            <input
              type="text"
              required
              value={choices}
              onChange={(e) => setChoices(e.target.value)}
              placeholder="Enter Quiz Choices"
              maxLength={35}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <p className="text-customLightGray mb-1 ">Correct ANswer</p>
            <input
              type="text"
              required
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              placeholder="Enter Correct Answer"
              maxLength={35}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <p className="text-customLightGray mb-1 ">Correct Code</p>
            <input
              type="text"
              required
              value={correctCode}
              onChange={(e) => setCorrectCode(e.target.value)}
              placeholder="Enter Correct Code"
              maxLength={35}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <p className="text-customLightGray mb-1 ">Code Template</p>
            <input
              type="text"
              required
              value={codeTemplate}
              onChange={(e) => setCodeTemplate(e.target.value)}
              placeholder="Enter Correct Answer"
              maxLength={35}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <p className="text-customLightGray mb-1 ">Code Hints</p>
            <input
              type="text"
              required
              value={hints}
              onChange={(e) => setHints(e.target.value)}
              placeholder="Enter Hints"
              maxLength={35}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
            />
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
                <p className=" text-white font-medium text-base">Create Quiz</p>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
