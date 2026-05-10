import { useNavigate, useParams } from "react-router-dom";
import introVideo from "../assets/introVideo.mp4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "../components/Loader/Loader";
import courseIll from "../assets/course-ills.svg"
import { FaRegClock } from "react-icons/fa6";
import { IoPlayOutline } from "react-icons/io5";
import { IoCode } from "react-icons/io5";
import { ToastContainer } from 'react-toastify';
import { GoPeople } from "react-icons/go";
import { useEffect, useState } from "react";
import {
  faArrowLeft,
  faVideo,
  faCode,
  faQuestionCircle,
  faFlask,
  faProjectDiagram,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { enrollCourse, fetchSingleCourse, setCurrentLecture } from "../redux/course/CourseSlice";
import { fetchUserProgress } from "../redux/course/ProgressSlice";

import { motion } from 'framer-motion';
import { toast } from "react-toastify";

const EnrollmentPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center font-sans bg-black bg-opacity-50">
      <motion.div
        className="bg-white p-4 rounded-lg flex flex-col items-center shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-semibold ">Successfully Enrolled!</h2>
        <p className="mt-2 ">You have successfully enrolled in the course.</p>
        <button
          className="mt-4 px-4 py-2 text-white hover:scale-110 transition-all duration-200 bg-slate-900 rounded-lg font-bold"
          onClick={onClose}
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};




const CourseScreen = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("lessons");
  const [showPopup, setShowPopup] = useState(false);
  const [completed, setCompleted] = useState(false);
  const { courseId } = useParams();

  const course = useSelector((state) => state.course.course);
  const enrolledCourses = useSelector((state) => state.progress.enrolledCourses);
  const currentLecture = useSelector((state) => state.course.currentLecture);

  const dispatch = useDispatch();

  const fetchCourse = async (courseId) => {
    try {
      await dispatch(fetchSingleCourse(courseId))
    }
    catch (err) {
      console.log("Error fetching single course")
    }
  }

  const fetchEnrolledCourses = async () => {
    try {
      await dispatch(fetchUserProgress());
    }
    catch (err) {
      console.log("Error fetching User Progress")
    }
  }

  const handleContinue = async () => {
    if (enrolledCourses?.some(course => course.courseId?._id === courseId)) {


      const filteredCourse = enrolledCourses.find(course => course.courseId?._id === courseId);
      if (filteredCourse.completed === true) {
        setCompleted(true);
        return
      }
      else {
        setCompleted(false);
      }
      let max = 0
      if (filteredCourse.lectureCompleted.length != 0)
        max = Math.max(...filteredCourse.lectureCompleted);
      dispatch(setCurrentLecture(max + 1));
      if (filteredCourse.courseId.type == "video")
        navigate(`/course-started/video-screen/${courseId}/${max + 1}`);
      else
        navigate(`/course-started/notes-screen/${courseId}/${max + 1}`);

    } else {
      try {
        await dispatch(enrollCourse(courseId)).unwrap();
        toast.success("Enrolled Successfully!")
        await dispatch(fetchUserProgress())
      } catch (error) {
        toast.error("Unable to enroll in course");
      }
    }
  };


  useEffect(() => {
    if (courseId && ((!course) || course._id !== courseId))
      fetchCourse(courseId)

    if (!enrolledCourses)
      fetchEnrolledCourses()

  }, [dispatch, courseId, course, enrolledCourses])








  const getContentTypeIcon = (type) => {
    switch (type) {
      case "video":
        return <FontAwesomeIcon icon={faVideo} className="text-theme mr-2" />;
      case "code":
        return <FontAwesomeIcon icon={faCode} className="text-green-500 mr-2" />;
      case "quiz":
        return <FontAwesomeIcon icon={faQuestionCircle} className="text-yellow-500 mr-2" />;
      case "practice":
        return <FontAwesomeIcon icon={faFlask} className="text-purple-500 mr-2" />;
      case "project":
        return <FontAwesomeIcon icon={faProjectDiagram} className="text-red-500 mr-2" />;
      default:
        return null;
    }
  };
  return (
    <div className="container max-w-screen-lg w-full mx-auto mb-5 p-6 bg-gray-50 shadow-lg rounded-lg">
      {/* Back Button */}
      <div className="flex items-center mb-8">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="w-6 h-6 text-gray-500 hover:text-theme transition duration-200 cursor-pointer"
          onClick={() => navigate("/app/courses/catalog")}
        />
        <p
          className="text-xl font-medium ml-4 text-gray-600 hover:text-blue-500 cursor-pointer transition duration-200"
          onClick={() => navigate("/app/courses/catalog")}
        >
          Go Back
        </p>
      </div>
      {course ?
        <div className="flex flex-col items-start bg-white md:items-center gap-8 p-6  text-customDarkBlue rounded-lg shadow-md">

          <div className="flex flex-row w-full">



            <div className="flex flex-col w-2/3">
              <h1 className="text-4xl font-bold">{course?.title}</h1>
              <p className="text-md mt-4">
                {course?.description}
              </p>
              {completed ?
                <div className="px-6 py-3 w-36 bg-slate-900 text-white rounded-lg font-bold transition-all duration-200 hover:scale-105 shadow-lg shadow-slate-900/20">
                  Completed!
                </div>
                :
                <div className="mt-6">

                  {enrolledCourses?.some(course => course.courseId?._id == courseId) ?
                    <button
                      onClick={() => handleContinue()}
                      className="px-6 py-3 bg-slate-900 text-white rounded-lg font-bold transition-all duration-200 hover:scale-105 shadow-lg shadow-slate-900/20"
                    >
                      Continue!
                    </button> :
                    <button
                      onClick={() => handleContinue()}
                      className="px-6 py-3 bg-slate-900 text-white rounded-lg font-bold transition-all duration-200 hover:scale-105 shadow-lg shadow-slate-900/20"
                    >
                      Start Now!
                    </button>
                  }
                </div>}
            </div>

            <div className="flex items-center justify-center w-1/3">
              <img src={courseIll} alt="Start Learning" className="w-48 h-48" />
            </div>
          </div>
          <div className="flex space-x-2 w-full">
            <div className="flex items-center h-5 px-3 py-4 space-x-1 bg-slate-900 text-white rounded-xl shadow-md cursor-default">
              <FaRegClock className="text-slate-400" />
              <p className="text-xs font-bold text-white uppercase tracking-tight">4 hours</p>
            </div>
            <div className="flex items-center h-5 px-3 py-4 space-x-1 bg-slate-900 text-white rounded-xl shadow-md cursor-default">
              <IoPlayOutline className="text-slate-400" />
              <p className="text-xs font-bold text-white uppercase tracking-tight">10 videos</p>
            </div>
            <div className="flex items-center h-5 px-3 py-4 space-x-1 bg-slate-900 text-white rounded-xl shadow-md cursor-default">
              <IoCode className="text-slate-400" />
              <p className="text-xs font-bold text-white uppercase tracking-tight">10 exercises</p>
            </div>
            <div className="flex items-center h-5 px-3 py-4 space-x-1 bg-slate-900 text-white rounded-xl shadow-md cursor-default">
              <GoPeople className="text-slate-400" />
              <p className="text-xs font-bold text-white uppercase tracking-tight">1,364 enrollments</p>
            </div>
            <div className="flex items-center h-5 px-3 py-4 space-x-1 bg-slate-800 text-white rounded-xl shadow-md cursor-default group">
              <p className="text-xs font-black text-white uppercase tracking-widest group-hover:text-amber-400 transition-colors">2550 XP</p>
            </div>
          </div>

        </div>
        :
        <Loader />
      }
      <div className="mt-10">
        <div className="flex justify-center">
          <button
            className={`px-8 py-3 font-bold text-sm uppercase tracking-widest transition-all duration-300 ${activeTab === "lessons"
              ? "bg-slate-900 text-white shadow-xl shadow-slate-900/30"
              : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              } rounded-2xl focus:outline-none`}
            onClick={() => setActiveTab("lessons")}
          >
            Lessons
          </button>

        </div>
      </div>

      {/* Content for Lessons or Discussions based on activeTab */}
      {activeTab === "lessons" ? (
        <div className="mt-10 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Course Modules</h2>
          <div className="space-y-4">
            {course && course.lectures ? (
              course.lectures.map((lecture) => (
                <div key={lecture._id} className="border rounded-lg">
                  <div className="flex items-center justify-between p-4 cursor-pointer">
                    <div className="flex items-center">
                      {getContentTypeIcon("video")}
                      <p className="text-lg font-medium text-gray-700">{lecture.title}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No lectures available</p>
            )}

          </div>
        </div>
      ) : (
        <div className="mt-10 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Discussions</h2>
          <div className="space-y-6">
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="font-semibold">John Doe:</p>
              <p className="mt-2 text-gray-600">
                "I have a question regarding the second module, how do you approach
                hyperparameter tuning for SVM models?"
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="font-semibold">Jane Smith:</p>
              <p className="mt-2 text-gray-600">
                "I found the project assignment on clustering really interesting. Could
                anyone share how they handled feature scaling in their solution?"
              </p>
            </div>
          </div>

          {/* Add a comment section */}
          <div className="mt-6">
            <textarea
              placeholder="Add your comment or question..."
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              rows="4"
            ></textarea>
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
              Post Comment
            </button>
          </div>
        </div>
      )}

      {/* Introductory Video and Course Details Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Introductory Video</h2>
          <video className="w-full rounded-lg shadow-lg" controls>
            <source src={introVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-800">
            Course Details
          </h2>
          <ul className="list-disc list-inside mt-4 text-gray-600 leading-relaxed">
            <li>7 Lessons covering key topics in machine learning and data science</li>
            <li>Hands-on projects and quizzes after each lesson</li>
            <li>Guidance from experienced tutors</li>
            <li>Quizzes to assess understanding</li>
            <li>Final project to build a complete machine learning model</li>
          </ul>
        </div>
      </div>

      {/* Course Reviews and Language */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Course Reviews</h2>
          <ul className="list-none space-y-4">
            <li className="bg-gray-100 p-4 rounded-md shadow-sm">
              <p className="font-medium">John Doe:</p>
              <p className="text-gray-600 mt-2">"A fantastic course! The content was thorough and easy to follow."</p>
              <p className="text-yellow-500 mt-2">★★★★☆</p>
            </li>
            <li className="bg-gray-100 p-4 rounded-md shadow-sm">
              <p className="font-medium">Jane Smith:</p>
              <p className="text-gray-600 mt-2">"Great introduction to machine learning with plenty of hands-on experience."</p>
              <p className="text-yellow-500 mt-2">★★★★★</p>
            </li>
          </ul>
        </div>
      </div>

      {/* Instructor Information Section */}
      <div className="mt-12 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800">About the Instructor</h2>
        <p className="mt-4 text-gray-600">
          The course is taught by Obaid Ur Rehman, an experienced data scientist
          with years of experience in machine learning and AI development. He has
          worked on several industry-leading projects in the field of AI.
        </p>
      </div>
      {showPopup && <EnrollmentPopup onClose={() => {
        setShowPopup(false)
        navigate(`/course-started/video-screen/${courseId}/${currentLecture}`)
      }
      } />}
      <ToastContainer />
    </div>
  );
};

export default CourseScreen;
