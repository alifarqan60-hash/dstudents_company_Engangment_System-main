import React from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";

export default function SelectTeacherCard({
  img,
  name,
  email,
  selected,
  bgColor,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`flex justify-between items-center rounded-2xl mb-2 w-full ${bgColor} p-3 ${
        selected ? "border border-customMaroon" : ""
      } cursor-pointer`}
    >
      <div className="flex flex-row gap-2">
        <img src={img} alt="Student Image" className="w-[40px] h-[40px]" />

        <div className="text-customDarkBlue font-medium">
          <p className="text-sm">{name}</p>
          <p className="text-xxs">{email}</p>
        </div>
      </div>

      <div>
        {selected && (
          <div>
            <IoIosCheckmarkCircle className="text-customMaroon" size={24} />
          </div>
        )}
      </div>
    </div>
  );
}
