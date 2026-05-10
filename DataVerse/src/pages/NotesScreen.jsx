import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../config/api';
import { fetchSingleCourse, setCurrentLecture } from '../redux/course/CourseSlice';
import Loader from '../components/Loader';

const NotesScreen = () => {
  const { courseId, index } = useParams();
  const numIndex = parseInt(index, 10);
  const lectureIndex = numIndex - 1;
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  }, [currentLecture, numIndex, course, courseId, navigate]);

  const lecture = course?.lectures?.find(lec => lec.index === numIndex) || course?.lectures?.[lectureIndex] || null;
  const transcript = lecture?.transcript || [];

  const handleGotIt = async () => {
    if (!lecture) return;

    try {
      const response = await axiosInstance.get(`/learning/lecture/${lecture._id}`);
      const responseLecture = response.data;

      // Existing navigation logic based on lecture type
      if (responseLecture.quiz && responseLecture.quiz.length > 0) {
        if (responseLecture.quiz[0].type === "coding") {
          navigate(`/course-started/code-screen/${courseId}/${index}`);
        } else {
          navigate(`/course-started/mcq-screen/${courseId}/${index}`);
        }
      } else {
        // Fallback or move to next lecture
        navigate(`/app/courses/course-screen/${courseId}`);
      }
    } catch (err) {
      console.error("Error in handleGotIt:", err);
    }
  };

  const renderContent = () => {
    if (!lecture) {
      return <div className="text-center text-red-600">Lecture not found.</div>;
    }

    if (!transcript.length) {
      return <div className="text-center text-lg">No transcript available.</div>;
    }

    return transcript.map((section, idx) => (
      <div key={idx} className="my-6">
        {section.type === 'heading' && (
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {section.content}
          </h2>
        )}
        {section.type === 'text' && (
          <p className="text-base leading-relaxed text-gray-600" dangerouslySetInnerHTML={{ __html: section.content }} />
        )}
      </div>
    ));
  };

  if (!course) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center">
        <Loader />
        <p className="mt-4 text-gray-600">Loading lecture content...</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl w-full mx-auto p-8 font-sans bg-gray-50 shadow-lg rounded-lg mt-4">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6 w-full">
        Lecture : {index}   {lecture?.title}
      </h1>
      <div className="bg-white p-6 shadow rounded-lg border border-gray-200">
        {renderContent()}
      </div>
      <div className='flex items-center w-full  justify-end p-4'>
        <button
          onClick={handleGotIt}
          className="px-4 py-2 bg-theme hover:scale-105 transition-all duration-200 text-white rounded"
        >
          Got It
        </button>
      </div>
    </div>
  );
};

export default NotesScreen;
