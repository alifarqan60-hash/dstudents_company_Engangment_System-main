import React from "react";
import ProfileCard from "../../Dashboard/ProfileCard";
import EditDeleteDropDown from "../../Dashboard/EditDeleteDropDown";
import { IMAGES } from "../../../assets";

export default function TeacherScheduledClassesCard({
  bgColor,
  time,
  status,
  onClick,
  onDelete,
}) {
  return (
    <div
      onClick={onClick}
      className={`flex-1 rounded-lg ${bgColor} p-3 pl-4 cursor-pointer`}
    >
      <div className="flex justify-between items-center">
        <p className="text-lg font-medium font-inter">App Development</p>
        <EditDeleteDropDown onDelete={onDelete} />
      </div>

      <div>
        <p className="text-customRoleColor font-inter text-xs mb-2">Online</p>
      </div>

      <div className="flex flex-row md:flex-col lg:flex-row gap-6 md:gap-2 mb-4">
        <ProfileCard
          role={"Student"}
          name={"Alex Jhons"}
          img={IMAGES.student_avatar}
        />
        <ProfileCard
          role={"Teacher"}
          name={"Ava Calvar"}
          img={IMAGES.teacher_avatar}
        />
      </div>

      <div className="flex flex-col lg:flex-row lg:justify-between">
        <div>
          <p className="text-customRoleColor text-sm md:text-xs">{time}</p>
        </div>

        <p className="text-customGreen text-xs md:text-xxs lg:text-xs ">
          {status}
        </p>
      </div>
    </div>
  );
}
