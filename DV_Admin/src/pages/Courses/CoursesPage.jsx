import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Coursetile from "../../components/Admin/Courses/coursetile";
import coursecover from "../../assets/coursecover.png";
import { getAllCourses } from "../../api/Course/allCourses";
import Loader from "../../components/Loader/Loader";
import AddCourse from "../../components/Admin/Courses/AddCourse";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CourseDeletedPopup from "../../components/Admin/Courses/CourseDeletedPopup";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addCoursePopup, setAddCoursePopup] = useState(false);
  const [deletedPopup, setDeletedPopup] = useState(false);
  const [deletedCourse, setDeletedCourse] = useState(null);

  const navigate = useNavigate();

  const toggleAddCoursePopup = () => {
    setAddCoursePopup(!addCoursePopup);
  };

  const toggleDeletedPopup = (course) => {
    setDeletedCourse(course);
    setDeletedPopup(!deletedPopup);
  };

  const handleDeleteCourse = (id, name) => {
    toggleDeletedPopup({ id, name });
  };

  const handleAddButton = () => {
    toggleAddCoursePopup();
  };

  const fetchCourses = async () => {
    try {
      const data = await getAllCourses();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <>
      <div
        className={`flex flex-row rounded-tl-3xl bg-white rounded-bl-3xl h-full relative`}
      >
        <ToastContainer position="bottom-right" />
        <div className=" flex-[5] w-full font-sans">
          {/* NavBar  */}
          <Navbar heading={"Courses"} />

          {/* Heading and Buttons Div  */}
          <div className="flex flex-row justify-between px-10 pt-10 pb-4">
            <p className="text-lg font-medium">Recently Added Courses</p>

            <div className="text-white text-sm font-normal flex flex-col smMd:flex-row">
              <button
                onClick={handleAddButton}
                className="bg-customMaroon p-2 px-4 border rounded-md flex flex-row items-center"
              >
                <IoAdd size={16} />
                <p className="ml-2">Add New Course</p>
              </button>
            </div>
          </div>
          <div className="mx-5 grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 pl-5">
            {loading ? (
              <div className="flex h-40 justify-center items-center w-full">
                <Loader />
              </div>
            ) : courses.length === 0 ? (
              <div className="flex h-40 justify-center items-center">
                <p>No courses added</p>
              </div>
            ) : (
              courses?.map((course) => (
                <Coursetile
                  key={course._id}
                  course={course}
                  cover={coursecover}
                  title={course.title}
                  tutor={course.instructor}
                  lessons={course.lectures?.length || 0}
                  quiz={course.lectures?.length || 0}
                  showBtn={true}
                  onDelete={handleDeleteCourse}
                />
              ))
            )}
          </div>
        </div>
        {addCoursePopup && (
          <AddCourse
            toggleFunc={toggleAddCoursePopup}
            addCoursePopup={addCoursePopup}
          />
        )}
        {deletedPopup && (
          <CourseDeletedPopup
            course={deletedCourse}
            toggleFunc={toggleDeletedPopup}
          />
        )}
      </div>
    </>
  );
}
