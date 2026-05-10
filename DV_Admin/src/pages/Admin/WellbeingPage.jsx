import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import WellbeingCard from "../../components/Admin/Wellbeing/WellbeingCard";

export default function WellbeingPage() {
  const navigate = useNavigate();

  const handleAddNewClick = () => {
    navigate("/admin/wellbeing/new-wellbeing");
  };

  return (
    <>
      <div
        className={`flex flex-row rounded-tl-3xl bg-white rounded-bl-3xl h-full `}
      >
        <div className=" flex-[5] w-full font-sans mb-10">
          {/* NavBar  */}
          <Navbar heading={"Well Beings"} name={"Alex Jhons"} role={"Admin"} />

          {/* Heading and Buttons Div  */}
          <div className="flex flex-row justify-between px-10 pt-10 pb-4">
            {/* Name and Image div  */}
            <p className="text-lg font-medium">All Well Beings</p>

            <div className="text-white text-sm font-normal flex flex-col smMd:flex-row">
              <button
                onClick={handleAddNewClick}
                className="bg-customMaroon p-2 px-4 border rounded-md flex flex-row items-center"
              >
                <IoAdd size={16} />
                <p className="ml-2">Add New</p>
              </button>
            </div>
          </div>
          <div className="px-10 flex flex-col items-center mdLg:grid mdLg:grid-cols-2 xl:grid-cols-3 gap-2 gap-y-4">
            <WellbeingCard />
            <WellbeingCard />
            <WellbeingCard />
          </div>
        </div>
      </div>
    </>
  );
}
