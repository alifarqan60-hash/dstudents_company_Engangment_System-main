import React, { useState, useEffect } from "react";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { IMAGES } from "../../../assets";
import { LuTrash2 } from "react-icons/lu";
import { IoIosArrowForward } from "react-icons/io";
import { RxPencil1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useOverLay } from "../../../contexts/OverlayContext";
import ChildrenDropDown from "./ChildrenDropDown";

export default function ParentDetailsCard({
  id,
  name,
  email,
  phoneNo,
  reg_children,
  checked,
  toggleCheckbox,
  toggleDeletedPopup,
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

  const handleViewClick = () => {
    navigate("/admin/teachers/view-teacher-timetable", {
      state: { teacherId: id },
    });

    const handleDeleteClick = () => {
      toggleDeletedPopup(name);
    };
  };

  return (
    // Container Div
    <div className="flex flex-row w-full items-center p-3 text-xs lg:text-sm text-customStudentCardTextColor shadow-md">
      {/* checkbox div  */}
      <div
        className={`flex-1 cursor-pointer ${
          checked ? "text-customMaroon" : "text-customLightGray"
        }`}
        onClick={() => toggleCheckbox(id)}
      >
        {checked ? (
          <MdOutlineCheckBox size={20} />
        ) : (
          <MdOutlineCheckBoxOutlineBlank size={20} />
        )}
      </div>

      {/* name div  */}
      <div className="flex-[4] flex flex-row items-center">
        <div className="justify-center hidden md:flex md:justify-normal md:flex-none">
          <img
            src={IMAGES.avatar}
            alt="Student Pic"
            className="h-[30px] w-[30px]"
          />
        </div>
        <p className="ml-2">{name}</p>
      </div>
      {/* email  */}
      <p className="flex-[6] ">
        {isLargeScreen
          ? email
          : email.length > 20
          ? email.slice(0, 17) + "..."
          : email}
      </p>
      {/* Phone No */}
      <p className="flex-[4]">{phoneNo}</p>

      {/* Registered Children   and Edit Delete Icons Div*/}
      <div className="flex-[6] flex flex-row items-center justify-between">
        <ChildrenDropDown children={reg_children} />

        {/* Delete Edit Icons  */}
        <div className="text-customDeleteEditColor mdLg:mr-3 flex flex-row">
          <button
            onClick={() => toggleDeletedPopup(name)}
            className="p-2 rounded-md mdLg:mr-2"
          >
            <LuTrash2 size={18} />
          </button>
          <button className="p-2 rounded-md mdLg:mr-2">
            <RxPencil1 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
