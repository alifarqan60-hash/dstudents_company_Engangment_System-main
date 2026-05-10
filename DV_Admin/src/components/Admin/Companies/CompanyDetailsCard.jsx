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
import { IMAGES } from "../../../assets";

export default function CompanyDetailsCard({
  id,
  name,
  email,
  employees,
  toggleDeletedPopup,
  company,
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

  const handleViewClick = () => {
    navigate("/admin/companies/details", {
      state: { company },
    });
  };

  const handleDeleteClick = () => {
    toggleDeletedPopup({ id, name });
  };

  return (
    // Container Div
    <div className="flex flex-row w-full items-center p-3 text-xs lg:text-sm text-customStudentCardTextColor shadow-md border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
      {/* name div  */}
      <div className="flex-[5] flex flex-row items-center">
        <div className="justify-center hidden md:flex md:justify-normal md:flex-none">
          <img
            src={company?.profileUrl || IMAGES.teacher_avatar}
            alt="Company Logo"
            className="h-[30px] w-[30px] rounded-full object-cover shadow-sm"
          />
        </div>
        <p className="ml-2 font-medium">{name}</p>
      </div>
      {/* email  */}
      <p className="flex-[7] text-gray-600 truncate px-2">
        {email || "N/A"}
      </p>
      {/* Employees Count  */}
      <p className="flex-[4] text-center">{employees || 0}</p>

      {/* Actions Div */}
      <div className="flex-[6] flex flex-row items-center justify-between">
        <div
          onClick={handleViewClick}
          className="flex text-blue-600 items-center hover:underline cursor-pointer font-medium"
        >
          <p className="ml-1">View</p>
          <IoIosArrowForward className="ml-1" />
        </div>

        {/* Delete Edit Icons  */}
        <div className="text-customDeleteEditColor mdLg:mr-3 flex flex-row gap-1">
          <button
            onClick={handleDeleteClick}
            className="p-2 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors"
            title="Delete Company"
          >
            <LuTrash2 size={18} />
          </button>
          <button
            onClick={() => toggleEditModal(company)}
            className="p-2 rounded-full hover:bg-blue-50 hover:text-blue-500 transition-colors"
            title="Edit Company"
          >
            <RxPencil1 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
