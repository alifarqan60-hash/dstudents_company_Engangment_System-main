import React, { useState, useEffect } from "react";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";
import { IoIosArrowForward } from "react-icons/io";
import { RxPencil1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useOverLay } from "../../../contexts/OverlayContext";
// import { IMAGES } from "../../../../assets";

export default function UserDetailsCard({
  id,
  title,
  type,
  points,
  lecture,
  course,
  toggleDeletedPopup,
  toggleEditModal,
}) {
  const navigate = useNavigate();
  const [deletedPopup, setDeletedPopup] = useState(false);
  const { toggleOverlay, isOverlayEnable } = useOverLay();
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    // Function to handle resizing
    function handleResize() {
      setIsLargeScreen(window.innerWidth >= 1024);
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const handleViewClick = () => {
  //   navigate("/admin/students/view-student-timetable", {
  //     state: { studentId: id },
  //   });

  //   const handleDeleteClick = () => {
  //     toggleDeletedPopup(name);
  //   };
  // };

  return (
    // Container Div
    <div className="flex flex-row w-full items-center p-3 text-xs lg:text-sm text-customStudentCardTextColor shadow-md">
      {/* name div  */}
      <div className="flex-[5] flex flex-row items-center">
        <div className="justify-center hidden md:flex md:justify-normal md:flex-none">
          {/* <img
            src={IMAGES.student_avatar}
            alt="Student Pic"
            className="h-[30px] w-[30px]"
          /> */}
        </div>
        <p className="ml-2">{title}</p>
      </div>
      {/* email  */}
      {/* <p className="flex-[7] ">
        {isLargeScreen
          ? email
          : email.length > 15
          ? email.slice(0, 12) + "..."
          : email}
      </p> */}
      <p className="flex-[5]">{type}</p>
      {/* phone No  */}
      {/* <p className="flex-[5]">{points}</p> */}
      <p className="flex-[5]">10</p>

      {/* Timetable  and Edit Delete Icons Div*/}
      <div className="flex-[5] flex flex-row items-center justify-between">
        {/* <div
          onClick={handleViewClick}
          className="flex text-theme items-center hover:underline cursor-pointer"
        >
          <p>View</p>
          <IoIosArrowForward className="ml-1" />
        </div> */}

        {/* Delete Edit Icons  */}
        <div className="text-customDeleteEditColor mdLg:mr-3 flex flex-row">
          <button
            onClick={() => toggleDeletedPopup({ id, course, title })}
            className="p-2 rounded-md mdLg:mr-2"
          >
            <LuTrash2 size={18} />
          </button>
          {/* <button
            onClick={() => toggleEditModal(user)}
            className="p-2 rounded-md mdLg:mr-2"
          >
            <RxPencil1 size={18} />
          </button> */}
        </div>
      </div>
    </div>
  );
}
