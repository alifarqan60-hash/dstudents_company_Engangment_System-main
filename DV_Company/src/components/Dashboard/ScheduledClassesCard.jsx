import React from "react";
import { IoMdMore } from "react-icons/io";
import ProfileCard from "./ProfileCard";
import { BsClock } from "react-icons/bs";
import { IMAGES } from "../../assets";
import EditDeleteDropDown from "./EditDeleteDropDown";

export default function ScheduledClassesCard({
  title,
  workingMode,
  description,
  skills,
  experienceRequired,
  experienceLevel,
  deadline,
  company,
  type,
  bgColor,
  onDelete,
  job,
  toggleDeletePopup,
  dotsMenu,
}) {
  return (
    <div className={`flex-1 rounded-lg ${bgColor} p-3 pl-4`}>
      <div className="flex justify-between items-center">
        <p className="text-lg font-medium font-inter">
          {title} <span className="text-base font-normal">({type})</span>
        </p>
        {dotsMenu && (
          <EditDeleteDropDown
            onDelete={onDelete}
            job={job}
            toggleDeletePopup={toggleDeletePopup}
          />
        )}
      </div>

      <div>
        <p className="text-customRoleColor font-inter text-xs mb-2">
          {workingMode}
        </p>
      </div>

      <div className="flex flex-row mb-4">
        <ProfileCard description={description} skills={skills} />
      </div>

      <div>
        <p className="text-sm font-medium font-inter mb-2">
          <strong>Company Name:</strong> {company?.name}
        </p>
      </div>

      <div>
        <p className="text-customLightGrayShade font-inter text-sm mb-2">
          <strong>Level:</strong> {experienceLevel}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row lg:justify-between">
        <div>
          <p className="text-customRoleColor text-sm md:text-xs">
            Exp: {experienceRequired}
          </p>
        </div>

        <div className="flex flex-row items-center pr-2">
          <BsClock color="gray" />
          <p className="text-customRoleColor text-xs md:text-xxs lg:text-xs ml-2">
            {deadline}
          </p>
        </div>
      </div>
    </div>
  );
}
