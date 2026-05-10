import React from "react";
import { GoCheck } from "react-icons/go";
import { useNavigate } from "react-router-dom";

export default function UserAddedPopup({ title, toggleFunc, toggleModal }) {
  const navigate = useNavigate();
  const handleOkClick = () => {
    toggleFunc();
    toggleModal();
    // navigate("/admin/courses");
  };
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center h-screen w-auto z-10">
        <div className="w-[340px] bg-customPopupBgColor p-4 rounded-3xl font-sans space-y-3 border border-gray-300">
          <div className="flex-1 flex flex-row items-center ">
            <GoCheck className="text-customMaroon" size={20} />
            <p className="text-customGray font-bold text-lg ml-2">
              Quiz Added Successfully
            </p>
          </div>

          <div className="flex-[2] font-normal text-sm text-customPopupTextColor mb-2">
            The quiz{" "}
            <span className="name font-semibold text-customDarkBlue">
              {title}
            </span>{" "}
            has been added to the system successfully.
          </div>

          <div className=" flex justify-end">
            <button
              className="p-2 px-9 bg-customMaroon text-customPopupBgColor text-sm font-normal rounded-3xl"
              onClick={handleOkClick}
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
