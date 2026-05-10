import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../config/api";
import { completeLecture, setCurrentLecture, fetchSingleCourse } from "../redux/course/CourseSlice";
import Loader from "../components/Loader";

const MCQScreen = ({ onQuizEnd }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [feedback, setFeedback] = useState("");

  const { courseId, index } = useParams();
  const numIndex = parseInt(index, 10);
  const lectureIndex = numIndex - 1;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const course = useSelector((state) => state.course.course);
  const currentLecture = useSelector((state) => state.course.currentLecture);

  useEffect(() => {
    if (!course && courseId) {
      dispatch(fetchSingleCourse(courseId));
    }
  }, [courseId, course, dispatch]);

  useEffect(() => {
    if (!currentLecture && numIndex) {
      dispatch(setCurrentLecture(numIndex));
    }
  }, [numIndex, currentLecture, dispatch]);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!course || !course.lectures || !course.lectures[lectureIndex]) return;

      try {
        const lecture = course.lectures.find(lec => lec.index === numIndex) || course.lectures[lectureIndex];
        if (!lecture.quiz) return;

        const response = await axiosInstance.get(`/learning/quiz/${lecture.quiz}`);
        const fetchedQuiz = response.data.quiz;

        if (fetchedQuiz.type === "multiple-choice") {
          setQuiz({
            title: fetchedQuiz.title,
            questions: fetchedQuiz.choices.map((choice) => ({
              question: fetchedQuiz.title,
              options: fetchedQuiz.choices,
              correctAnswer: fetchedQuiz.correctAnswer,
            })),
          });
        } else {
          console.error("Invalid quiz type:", fetchedQuiz.type);
        }
      } catch (err) {
        toast.error("Failed to load quiz: " + err.message);
      }
    };

    if (course) fetchQuiz();
  }, [course, index]);

  const handleAnswerClick = async (optionIndex) => {
    setSelectedAnswer(optionIndex);
    const currentQuestion = quiz.questions[currentQuestionIndex];

    if (optionIndex === currentQuestion.correctAnswer) {
      const lecture = course.lectures.find(lec => lec.index === numIndex) || course.lectures[lectureIndex];
      const lectureId = lecture._id;

      // Mark the current lecture as completed
      await dispatch(completeLecture({ lectureId, courseId }));

      if (course.lectures.length === numIndex) {
        toast.success("Course Completed Successfully");
        navigate("/app/dashboard");
      } else {
        // Navigate to the next lecture
        const nextLectureIndex = numIndex + 1;
        dispatch(setCurrentLecture(nextLectureIndex));
        // We might want to see what the next lecture type is, but for now we follow the existing logic or redirect safely
        navigate(`/app/courses/course-screen/${courseId}`);
      }
    } else {
      setFeedback("Try Again!");
    }
  };

  useEffect(() => {
    if (!course) return;

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
  }, [dispatch, currentLecture, numIndex, course, courseId, navigate]);

  if (!course) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center">
        <Loader />
        <p className="mt-4 text-gray-600">Loading quiz...</p>
      </div>
    );
  }

  const currentQuestion = quiz?.questions[currentQuestionIndex];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-11/12 md:w-1/2">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{currentQuestion?.question}</h2>
        <div className="flex flex-col space-y-4">
          {currentQuestion?.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswerClick(idx)}
              className={`py-2 px-4 rounded border transition-all duration-300 ${selectedAnswer === idx
                ? idx === currentQuestion.correctAnswer
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              disabled={feedback === "Correct!"}
            >
              {option}
            </button>
          ))}
        </div>
        {feedback && (
          <p
            className={`mt-4 text-lg font-medium ${feedback === "Correct!" ? "text-green-600" : "text-red-600"
              }`}
          >
            {feedback}
          </p>
        )}
      </div>
    </div>
  );
};

export default MCQScreen;
