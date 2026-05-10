import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function CourseHeader({
  selectedPage,
  handlePageToggle,
  course,
}) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/admin/courses");
  };

  useEffect(() => {
    if (selectedPage === "Quiz") {
      navigate(`/admin/courses/quizes`, {
        state: course,
      });
    } else {
      navigate(`/admin/courses/lessons`, {
        state: course,
      });
    }
  }, [selectedPage]);

  return (
    <div className="flex flex-row w-full h-[80px] rounded-tl-3xl md:pl-5 items-center font-sans font-medium text-base">
      <div className="flex-1">
        <button
          onClick={handleBackClick}
          className="flex items-center text-customDarkBlue ml-16 md:ml-0"
        >
          <IoIosArrowBack />
          <p className=" ml-1">Back</p>
        </button>
      </div>

      {/* Page Toggler   */}
      <div className="flex-[2]">
        <div className=" bg-customTogglePageBgColor w-64 ml-5 border rounded-full text-customDarkBlue text-sm">
          <button
            onClick={() => handlePageToggle("Lesson")}
            className={`py-2 px-4 w-1/2 rounded-full 
                ${selectedPage === "Lesson" ? "bg-customBlue text-white" : ""}
            `}
          >
            Lessons
          </button>
          <button
            onClick={() => handlePageToggle("Quiz")}
            className={`py-2 px-4 w-1/2 rounded-full 
              ${selectedPage === "Quiz" ? "bg-customBlue text-white" : ""}
          `}
          >
            Quizzes
          </button>
        </div>
      </div>
    </div>
  );
}
