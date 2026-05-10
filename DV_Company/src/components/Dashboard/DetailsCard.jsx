import React from "react";
import { HiOutlineUserGroup } from "react-icons/hi";
import Loader from "../Loader/Loader";
// import { detailsData } from "../../constants/detailsData";

export default function DetailsCard({ icon, label, value, loading, onClick }) {
  return (
    <>
      <div
        onClick={onClick}
        className="flex flex-row flex-1 px-5 mr-5 backdrop-blur-sm justify-between opacity-90 h-[150px] bg-blue-50 md:bg-customWhite55 rounded-2xl  border-[1.5px]  border-customDetailCardBorderColor shadow-customDetailCardShadow cursor-pointer"
      >
        {loading ? (
          <div className="flex justify-center items-center h-full w-full">
            <Loader /> {/* Display loader */}
          </div>
        ) : (
          <>
            <div className="flex flex-col">
              <div className="flex-1 mt-10">
                <p className="text-customDarkerBlue text-sm md:text-sm lg:text-lg font-medium font-inter">
                  {label}
                </p>
              </div>

              <div className="flex-[2]">
                <p className="text-customMaroon font-bold text-2xl">{value}</p>
              </div>
            </div>
            <div className="bg-white mt-5 mb-2 w-16 h-14 rounded-xl flex justify-center items-center">
              <div className="flex-shrink-0 w-10 h-10 ">{icon}</div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
