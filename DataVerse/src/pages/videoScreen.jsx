import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import your custom video player
import CustomVideoPlayer from '../components/CustomVideoPlayer';
import introVideo from "../assets/introVideo.mp4";
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleCourse, setCurrentLecture } from '../redux/course/CourseSlice';
import Loader from '../components/Loader';

const VideoScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId, index } = useParams();
  const course = useSelector((state) => state.course.course) || {
    lectures: [
      {
        index: 1,
        videoUrl: introVideo,
        quiz: false,
        title: "Introduction"
      }
    ]
  };
  const currentLecture = useSelector((state) => state.course.currentLecture);

  const numIndex = parseInt(index, 10);
  const lectureIndex = numIndex - 1;

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

  // Find lecture by matching the 'index' property instead of array position
  const lecture = course?.lectures?.find(lec => lec.index === numIndex) || course?.lectures?.[lectureIndex];

  const handleGotIt = () => {
    if (lecture?.quiz) {
      navigate(`/course-started/code-screen/${courseId}/${index}`);
    } else {
      // If no quiz, maybe go to next lecture or dashboard
      navigate(`/app/courses/course-screen/${courseId}`);
    }
  };

  if (!course) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center">
        <Loader />
        <p className="mt-4 text-gray-600">Loading lesson...</p>
      </div>
    );
  }

  if (!lecture) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center">
        <p className="text-red-500">Lesson not found.</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-blue-500 underline">Go Back</button>
      </div>
    );
  }

  return (
    <div className="flex flex-row h-screen bg-gray-200">
      <div className="flex-1 w-full flex items-center flex-col justify-center p-4">
        {/* Replace default video tag with Custom Video Player */}
        <CustomVideoPlayer videoSrc={lecture.videoUrl} />

        {/* Buttons */}
        <div className="mt-4 w-3/4 flex items-center justify-between">
          {/* <button
            onClick={handleShowTranscript}
            className="px-4 py-2 bg-white text-customDarkBlue border-2 border-gray-400 rounded-sm"
          >
            {showTranscript ? 'Hide Transcript' : 'Show Transcript'}
          </button> */}

          <button
            onClick={handleGotIt}
            className="px-4 py-2 bg-theme text-white rounded"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoScreen;
