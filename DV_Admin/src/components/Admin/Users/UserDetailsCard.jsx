import React, { useState, useEffect } from "react";
import { LuTrash2 } from "react-icons/lu";
import { RxPencil1 } from "react-icons/rx";
import { IMAGES } from "../../../assets";
import { MdAdminPanelSettings, MdBusiness, MdPerson } from "react-icons/md";

export default function UserDetailsCard({
  id,
  name,
  email,
  phoneNo,
  photo,
  enrolledCourses,
  isAdmin,
  isCompany,
  toggleDeletedPopup,
  toggleEditModal,
  user, // full user object for edit
}) {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsLargeScreen(window.innerWidth >= 1024);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDeleteClick = () => {
    toggleDeletedPopup({ id, name });
  };

  const handleEditClick = () => {
    // Pass the full user object so EditUser can populate all fields
    toggleEditModal(user || { _id: id, username: name, email, phoneNo, enrolledCourses, isAdmin, isCompany, imgUrl: photo });
  };

  const roleBadge = isAdmin
    ? { label: "Admin", color: "bg-purple-100 text-purple-600", icon: <MdAdminPanelSettings size={11} /> }
    : isCompany
      ? { label: "Company", color: "bg-blue-100 text-blue-600", icon: <MdBusiness size={11} /> }
      : { label: "User", color: "bg-green-100 text-green-600", icon: <MdPerson size={11} /> };

  return (
    <div className="flex flex-row w-full items-center p-3 text-xs lg:text-sm text-customStudentCardTextColor border-b border-gray-50 hover:bg-gray-50 transition-colors">
      {/* Avatar + Name */}
      <div className="flex-[5] flex flex-row items-center gap-2 min-w-0">
        <img
          src={photo || IMAGES.student_avatar}
          alt={name}
          onError={(e) => { e.target.src = IMAGES.student_avatar; }}
          className="h-[32px] w-[32px] rounded-full object-cover flex-shrink-0 border border-gray-200"
        />
        <div className="min-w-0">
          <p className="font-semibold text-gray-800 truncate">{name}</p>
          <span className={`inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded-full font-medium ${roleBadge.color}`}>
            {roleBadge.icon} {roleBadge.label}
          </span>
        </div>
      </div>

      {/* Email */}
      <p className="flex-[7] text-gray-500 truncate">
        {isLargeScreen ? email : email?.length > 15 ? email.slice(0, 12) + "..." : email}
      </p>

      {/* Phone */}
      <p className="flex-[5] text-gray-500">{phoneNo || "—"}</p>

      {/* Enrolled Courses + Actions */}
      <div className="flex-[5] flex flex-row items-center justify-between">
        <span className="inline-flex items-center justify-center w-7 h-7 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold">
          {enrolledCourses?.length || 0}
        </span>

        <div className="flex flex-row gap-1">
          <button
            onClick={handleDeleteClick}
            className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
            title="Delete User"
          >
            <LuTrash2 size={16} />
          </button>
          <button
            onClick={handleEditClick}
            className="p-2 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-500 transition-colors"
            title="Edit User"
          >
            <RxPencil1 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
