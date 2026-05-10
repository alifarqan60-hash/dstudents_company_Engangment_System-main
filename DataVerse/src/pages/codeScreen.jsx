import React, { useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { FaRegSun } from "react-icons/fa";
import { TbReload } from "react-icons/tb";
import { GoNote } from "react-icons/go";
import { FaRegCheckCircle } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../config/api";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../components/Loader";
import { completeLecture, goToNextLecture, setCurrentLecture } from "../redux/course/CourseSlice";


const CodeExerciseScreen = () => {
  const [isCorrect, setIsCorrect] = useState(null);
  const [submissionFeedback, setSubmissionFeedback] = useState('');
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [quiz, setQuiz] = useState();
  const [dark, setDark] = useState(true);
  const [hints, setHints] = useState([]);
  const [hintCount, setHintCount] = useState(0);
  const [hintDisable, setHintDisable] = useState(false);

  const dispatch = useDispatch();
  const { courseId, index } = useParams();
  const navigate = useNavigate();
  const course = useSelector((state) => state.course.course);
  const currentLecture = useSelector((state) => state.course.currentLecture);

  const lectureIndex = parseInt(index, 10) - 1;
  const numIndex = parseInt(index, 10);

  const resetState = () => {
    setQuiz(null);
    setCode("");
    setOutput("");
    setHints([]);
    setHintCount(0);
    setHintDisable(false);
    setSubmissionFeedback("");
    setIsCorrect(null);
  };

  const fetchQuiz = async () => {
    if (!course || !course.lectures || !course.lectures[lectureIndex]) {
      return;
    }

    const lecture = course.lectures.find(lec => lec.index === numIndex) || course.lectures[lectureIndex];
    if (!lecture.quiz) return;

    try {
      const response = await axiosInstance.get(`/learning/quiz/${lecture.quiz}`);
      const quizData = response.data.quiz;
      setQuiz(quizData);
      setCode(quizData.codeTemplate || "");
    } catch (err) {
      console.error("Quiz fetch error:", err);
      toast.error("Failed to load quiz data");
    }
  };

  useEffect(() => {
    if (!course && courseId) {
      dispatch(fetchSingleCourse(courseId));
    }
  }, [courseId, course, dispatch]);

  useEffect(() => {
    if (course) {
      resetState();
      fetchQuiz();
    }
  }, [course, index]);


  const handleSubmitAnswer = async () => {

    const userOutput = await handleExecuteCode(code);

    const correctOutput = await handleExecuteCode(quiz.correctCode);
    console.log(correctOutput, userOutput)

    if (userOutput.trim() === correctOutput.trim()) {
      toast.success("Correct Answer!")
      const lecture = course.lectures.find(lec => lec.index === numIndex) || course.lectures[lectureIndex];
      const lectureId = lecture._id;

      await dispatch(completeLecture({ lectureId, courseId }))

      if (course.lectures.length == index) {
        toast.success("Course Completed Successfully")
        navigate("/app/dashboard");
      }
      else {
        const num = parseInt(index, 10);;
        dispatch(setCurrentLecture(num + 1));
      }


    } else {
      setSubmissionFeedback('Incorrect. Please try again.');
    }
  };

  const handleExecuteCode = async (codeToExecute) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/execute", {
        code: codeToExecute,
      });
      return response.data.output;
    } catch (err) {
      return `Error: ${err.message}`;
    }
  };

  console.log(course);

  useEffect(() => {
    const numIndex = parseInt(index, 10);
    if (!currentLecture) {
      dispatch(setCurrentLecture(numIndex));
      return;
    }

    // Only redirect if trying to access a lecture BEYOND what is unlocked/reached
    // But allow revisiting previous lectures
    if (numIndex > currentLecture) {
      const lecture = course.lectures[currentLecture - 1];
      if (lecture) {
        if (lecture.type === "video") {
          navigate(`/course-started/video-screen/${courseId}/${currentLecture}`);
        } else {
          navigate(`/course-started/notes-screen/${courseId}/${currentLecture}`);
        }
      }
    }
  }, [dispatch, currentLecture, index, course, courseId, navigate]);

  const handleRunCode = async () => {

    try {
      const response = await axios.post("http://127.0.0.1:5000/execute", {
        code: code,
      });
      console.log("response: ", response)
      setOutput(response.data.output);
    } catch (err) {
      setOutput(`Error: ${err.message}`);
    }
  };

  const handleEditorMount = (editor, monaco) => {
    monaco.editor.defineTheme("myCustomTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "ffa500" },
        { token: "keyword", foreground: "ff0000" },
        { token: "identifier", foreground: "00ff00" },
      ],
      colors: {
        "editor.background": "#001C27",
        "editor.foreground": "#ffffff",
        "editor.lineHighlightBackground": "#001C27",
      },
    });
    monaco.editor.setTheme("myCustomTheme");
  };

  const addHint = () => {
    if (hintCount < quiz?.hints.length) {
      setHints([...hints, quiz?.hints[hintCount]]);
      setHintCount(hintCount + 1);
    }
    else {
      setHintDisable(true)
    }
  };

  if (!course) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center">
        <Loader />
        <p className="mt-4 text-gray-600">Loading course content...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden mt-2 font-sans px-4">
      {/* Sidebar */}
      <div className="w-1/3 bg-white shadow-sm rounded-md overflow-auto">

        <div className="w-full h-64 flex flex-col">

          <div className="sticky top-0 z-10 w-full h-7 py-1 px-4 bg-slate-200 flex-none">
            <p className="text-customDarkBlue font-semibold text-sm flex items-center">
              <span className="mr-2"><GoNote size={15} /></span>Exercise
            </p>
          </div>
          <div className="flex-1 p-2 overflow-y-auto">
            {quiz ?
              <p className="text-xs leading-tight" dangerouslySetInnerHTML={{ __html: quiz.excercise }} />
              :
              <Loader />
            }
          </div>
        </div>

        {/* Instructions Section */}
        <div className="w-full mt-1 flex flex-col flex-1 overflow-y-auto">
          {/* Instructions Heading */}
          <div className="sticky top-0 z-10 w-full h-7 py-1 px-4 bg-slate-200 flex-none">
            <p className="text-customDarkBlue font-semibold text-sm flex items-center">
              <span className="mr-2"><FaRegCheckCircle size={12} /></span>Instructions
            </p>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {quiz ?
              <ul className="list-disc pl-6 text-sm">
                {quiz.instructions.map((point, index) => (
                  <li key={index} className="mb-1 text-sm leading-tight" dangerouslySetInnerHTML={{ __html: point }}>
                  </li>
                ))}
              </ul>

              :
              <Loader />
            }
            <button
              onClick={addHint}
              className={`w-36 hover:scale-110 cursor-pointer transform-all duration-200 h-10 p-2 flex items-center text-sm font-semibold justify-center rounded-md border-2 border-customDarkBlue`}
              disabled={hintDisable}
            >
              <span className="mr-2"><HiOutlineLightBulb size={20} /></span>Take Hint!
            </button>

            {/* Hint Section */}
            <div className="mt-4">
              {hints.map((hint, index) => (
                <div key={index} className="p-2 mt-2 bg-gray-100 rounded-md">
                  <p className="text-sm">{hint}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="w-2/3 flex flex-col pl-4 relative">
        {/* Code Editor Section */}
        <div className="flex-1 bg-customDarkBlue shadow-sm rounded flex flex-col relative">
          {/* File name section fixed at the top */}
          <div className="h-6 w-full z-10 rounded-md">
            <div className="bg-[#062e3d] w-full h-full flex items-center justify-between rounded-md overflow-hidden">
              <div className="flex px-4 items-center bg-customDarkBlue h-full justify-center">
                <p className="font-semibold text-white text-sm">script.py</p>
              </div>
              <div className="flex h-full items-center">
                <button
                  onClick={() => {
                    setDark(!dark);
                    handleEditorMount();
                  }}
                  className="border-l-[1px] h-full hover:b border-black flex items-center px-4 text-white text-sm font-semibold space-x-4"
                >
                  <span className="mr-1"><FaRegSun size={12} /></span>Light
                </button>
              </div>
            </div>
          </div>

          {/* Monaco Editor */}
          <div className="h-80 overflow-y-auto relative rounded-md">
            <MonacoEditor
              height="100%"
              language="python"
              theme={dark ? "vs-dark" : "vs-light"}
              value={code}
              options={{
                automaticLayout: true,
                scrollBeyondLastLine: false,
                minimap: { enabled: false },
              }}
              onChange={(value) => setCode(value)}
              onMount={handleEditorMount}
            />

          </div>

          {/* Buttons at bottom */}
          <div className="absolute bottom-0 h-12 w-full px-4 py-2 flex items-center justify-end space-x-2 z-20">
            <button
              onClick={handleRunCode}
              className="px-2 py-1 h-full rounded-sm border-2 text-gray-300 border-gray-300"
            >
              <TbReload />
            </button>
            <button
              onClick={handleRunCode}
              className="px-2 py-1 h-full text-sm font-medium rounded-sm border-2 flex items-center text-gray-300 border-gray-300"
            >
              <p>Run Code</p>
            </button>
            <button
              onClick={handleSubmitAnswer} // Change here to call the new submission logic
              className="px-4 h-full py-1 bg-theme text-sm text-white rounded-sm"
            >
              Submit Answer!
            </button>

          </div>
        </div>

        {/* Output Display */}
        <div className="flex-1 bg-[#001C27] shadow-md rounded-sm overflow-auto mt-1">
          <div className="bg-[#062e3d] w-full h-6 flex items-center justify-between rounded-md overflow-hidden">
            <div className="flex px-4 items-center bg-customDarkBlue h-full justify-center">
              <p className="font-semibold text-white text-sm">Console</p>
            </div>
          </div>
          <div className="p-4 text-white">
            <pre>{output}</pre>
          </div>
        </div>
        <div className="mt-2">
          {submissionFeedback && (
            <p className={`text-sm ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
              {submissionFeedback}
            </p>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>

  );
};

export default CodeExerciseScreen;
