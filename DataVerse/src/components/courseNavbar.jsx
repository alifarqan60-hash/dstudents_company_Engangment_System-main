import React, { useEffect, useState } from "react"; // Combined import for React and useState
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/new_logo.png"
import {
  faArrowLeft,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { modules } from "../constants/modules"; // Assuming modules import
import { FaPen, FaTrophy, FaVideo } from "react-icons/fa";
import { RiFeedbackFill } from "react-icons/ri";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader/Loader";
import { fetchSingleCourse } from "../redux/course/CourseSlice";

const CourseNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showOverview, setShowOverview] = useState(false);
  const [open, setOpen] = useState(false);
  const { courseId } = useParams();
  const course = useSelector((state) => state.course.course);


  const handleOpen = () => setOpen(!open);

  const handleToggleOverview = () => {
    setShowOverview(!showOverview);
  };

  useEffect(() => {

    const fetchCourse = async () => {
      await dispatch(fetchSingleCourse(courseId))
    }
    if (!course)
      fetchCourse();

  }, [dispatch])


  return (
    <div className="bg-gray-100 shadow-md p-2 flex items-center w-full">
      <div className="flex flex-1 space-x-1 items-center font-sans">
        <div className="flex items-center h-6 px-1 rounded-md hover:bg-gray-200 cursor-pointer" onClick={() => navigate("/app/dashboard")}>
          <img src={logo} alt="" className="w-6 h-6 logo-diamond logo-contrast-dark" />
          <p className="text-sm font-medium">DataSphere</p>
        </div>
        <p className="text-xs font-semibold cursor-default">/</p>
        <div className="flex items-center h-6 px-1 rounded-md hover:bg-gray-200 cursor-pointer">
          <p className="text-sm font-medium">course</p>
        </div>
        <p className="text-xs font-semibold cursor-default">/</p>
        <div className="flex items-center h-6 px-1 rounded-md hover:bg-gray-200 cursor-pointer">
          {course ?
            <p className="text-sm font-medium">{course.title}</p> :
            <Loader />
          }
        </div>
      </div>
      <div className="flex flex-1 items-center">
        {/* <button className="mr-2 border-2 border-gray-500 hover:bg-gray-300 px-2 py-1">
          <FontAwesomeIcon icon={faChevronLeft} className="text-gray-700" />
        </button> */}
        <button
          className="px-2 py-1 border-2 border-gray-500 bg-gray-100 hover:bg-gray-300 transition rounded"
          onClick={() => handleOpen()}
        >
          <span className="mx-2 font-medium text-gray-700">
            Course Overview
          </span>
        </button>
        {/* <button className="ml-2 border-2 border-gray-500 hover:bg-gray-300 px-2 py-1">
          <FontAwesomeIcon icon={faChevronRight} className="text-gray-700" />
        </button> */}
      </div>

      <div className="flex flex-row space-x-4 items-center">
        <div className="flex flex-row space-x-2 items-center bg-gray-200 p-2 rounded-2xl">
          <FaTrophy className="trophy-icon" size={15} />
          <p className="font-medium text-sm">
            Quiz XP <span className="text-theme font-semibold text-sm">50</span>
          </p>
        </div>
      </div>

      <Dialog size="lg" open={open} handler={handleOpen}>
        <DialogHeader>Course Overview</DialogHeader>
        <DialogBody>
          {modules.map((module, index) => (
            <li key={index} className="mb-2">
              <strong>{module.title}:</strong> {module.description} (
              {module.contentType})
            </li>
          ))}
        </DialogBody>
        <DialogFooter>
          {/* <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button> */}
          <Button variant="filled" className="bg-slate-900" onClick={handleOpen}>
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Course Overview Popup */}
      {/* {showOverview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Course Modules</h2>
            <ul className="list-disc list-inside text-gray-700">
              {modules.map((module, index) => (
                <li key={index} className="mb-2">
                  <strong>{module.title}:</strong> {module.description} (
                  {module.contentType})
                </li>
              ))}
            </ul>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => setShowOverview(false)}
            >
              Close
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default CourseNavbar;
