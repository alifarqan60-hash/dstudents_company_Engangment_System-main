import React from "react";
import { IoMdMore } from "react-icons/io";
import ProfileCard from "./ProfileCard";
import { BsClock } from "react-icons/bs";
import { IMAGES } from "../../assets";
import EditDeleteDropDown from "./EditDeleteDropDown";

export default function ScheduledClassesCard({
  title,
  location,
  teacherName,
  teacherImg,
  studentName,
  studentImg,
  time,
  days,
  bgColor,
  onDelete,
}) {
  return (
    <div className={`flex-1 rounded-lg ${bgColor} p-3 pl-4`}>
      <div className="flex justify-between items-center">
        <p className="text-lg font-medium font-inter">{title}</p>
        <EditDeleteDropDown onDelete={onDelete} />
      </div>

      <div>
        <p className="text-customRoleColor font-inter text-xs mb-2">
          {location}
        </p>
      </div>

      <div className="flex flex-row md:flex-col lg:flex-row gap-6 md:gap-2 mb-4">
        <ProfileCard role={"Student"} name={studentName} img={studentImg} />
        <ProfileCard role={"Teacher"} name={teacherName} img={teacherImg} />
      </div>

      <div className="flex flex-col lg:flex-row lg:justify-between">
        <div>
          <p className="text-customRoleColor text-sm md:text-xs">{days}</p>
        </div>

        <div className="flex flex-row items-center pr-2">
          <BsClock color="gray" />
          <p className="text-customRoleColor text-xs md:text-xxs lg:text-xs ml-2">
            {time}
          </p>
        </div>
      </div>
    </div>
  );
}
