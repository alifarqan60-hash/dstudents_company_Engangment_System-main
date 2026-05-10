import React, { useState } from "react";
import { IMAGES } from "../../../assets";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RiCloseLine } from "react-icons/ri";
import { FaCircleMinus } from "react-icons/fa6";
import SelectChildrenPopup from "./SelectChildrenPopup";

export default function AddParent({
  toggleFunc,
  toggleAddedPopup,
  addedPopup,
  selectPopup,
  toggleSelectPopup,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleRemoveStudent = (index) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="h-screen overflow-y-auto register-scrollbar3 rounded-l-3xl bg-customNewStudentCardColor absolute flex justify-end right-0 font-sans ">
      {addedPopup && <div className="bg-black fixed inset-0 opacity-50"></div>}
      {selectPopup && <div className="bg-black fixed inset-0 opacity-50"></div>}
      <div className=" w-[400px]  items-center">
        {/* close button  */}
        <div className="flex justify-start flex-1">
          <div
            onClick={toggleFunc}
            className="bg-white mt-3 ml-4 border border-gray-200 rounded-full w-[35px] h-[35px] shadow-xl flex justify-center items-center cursor-pointer"
          >
            <RiCloseLine className="text-customGrayText" />
          </div>
        </div>
        {/* Heading  */}
        <div className="flex flex-1 justify-center mb-6">
          <p className=" mt-6 font-medium text-2xl">New Parent</p>
        </div>

        {/* Student Pic  */}
        <div className="flex-1 flex justify-center">
          <img
            src={IMAGES.student_avatar}
            alt="New Student Pic"
            className="w-[100px] h-[100px]"
          ></img>
          <img
            src={IMAGES.edit_icon}
            alt="Edit Icon"
            className="w-[23px] h-[23px] cursor-pointer absolute mt-20 ml-14"
          ></img>
        </div>

        {/* Form  */}
        <div className="flex-[5] p-8 text-xs ">
          {/* <form action=""> */}
          {/* Name Field  */}
          <div className="mb-5">
            <p className="text-customLightGray mb-1 ">Parent Name</p>
            <input
              type="text"
              required
              placeholder="Enter Parent Name"
              maxLength={35}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Select Children Field  */}
          <div className="mb-5">
            {selectedStudents.length === 0 ? (
              <>
                <p className="text-customLightGray mb-1 ">Children</p>
                <div
                  onClick={toggleSelectPopup}
                  className="w-full px-3 py-2 text-sm text-customLightGray bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  <p>+ Select Children (Student)</p>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-customLightGray mb-1 ">Children</p>
                  <button
                    onClick={toggleSelectPopup}
                    className="p-2 px-3 rounded-lg bg-customMaroon text-xs text-white font-normal"
                  >
                    + Add
                  </button>
                </div>
                {selectedStudents.map((student, index) => (
                  <div
                    key={index}
                    className="flex flex-row items-center gap-2 mb-2"
                  >
                    <div className="relative inline-block">
                      <img
                        src={student.img}
                        alt="student avatar"
                        className="h-[45px] w-[45px]"
                      />
                      <FaCircleMinus
                        className="absolute top-0 right-0 text-customLightRed cursor-pointer"
                        size={15}
                        onClick={() => handleRemoveStudent(index)}
                      />
                    </div>
                    <p className="font-normal text-sm">{student.name}</p>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Email Field  */}
          <div className="mb-5">
            <p className="text-customLightGray mb-1 ">Email</p>
            <input
              type="email"
              required
              placeholder="Enter Parent's Email"
              maxLength={35}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Phone number Field  */}
          <div className="mb-5 ">
            <p className="text-customLightGray mb-1 ">PhoneNo</p>
            <div className="flex flex-row border border-gray-300 rounded-md shadow-md focus-within:outline-none focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-500">
              <select className="rounded-l-md outline-none pl-2">
                <option>+1</option>
                <option>+44</option>
                <option>+92</option>
                <option>+91</option>
              </select>
              <input
                type="tel"
                required
                placeholder="Enter Phone No"
                maxLength={11}
                className="w-full px-3 py-2 text-sm outline-none rounded-r-md"
              />
            </div>
          </div>

          {/* Password Field  */}
          <div className="mb-5">
            <p className="text-customLightGray mb-1">Password</p>
            <div className="flex flex-row items-center bg-white border border-gray-300 rounded-md shadow-md focus-within:outline-none focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-500">
              <input
                required
                type={`${showPassword ? "text" : "password"}`}
                placeholder="Enter Password"
                maxLength={25}
                className="w-full px-3 py-2 text-sm outline-none rounded-md"
              />
              <button onClick={handlePassword}>
                {showPassword ? (
                  <AiOutlineEye size={20} color="Gray" className="ml-3 mr-2" />
                ) : (
                  <AiOutlineEyeInvisible
                    size={20}
                    color="Gray"
                    className="ml-3 mr-2"
                  />
                )}
              </button>
            </div>
          </div>

          {/*Confirm Password Field  */}
          <div className="mb-5">
            <p className="text-customLightGray  mb-1">Confirm Password</p>
            <div className="flex flex-row items-center bg-white border border-gray-300 rounded-md shadow-md focus-within:outline-none focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-500">
              <input
                required
                type={`${showConfirmPassword ? "text" : "password"}`}
                placeholder="Enter Confrim Password"
                maxLength={25}
                className="w-full px-3 py-2 text-sm outline-none rounded-md"
              />
              <button onClick={handleConfirmPassword}>
                {showConfirmPassword ? (
                  <AiOutlineEye size={20} color="Gray" className="ml-3 mr-2" />
                ) : (
                  <AiOutlineEyeInvisible
                    size={20}
                    color="Gray"
                    className="ml-3 mr-2"
                  />
                )}
              </button>
            </div>
          </div>
          {/* </form> */}
          {/* Register Button  */}
          <div className="w-full flex items-center justify-center mt-10">
            <button
              type="submit"
              onClick={toggleAddedPopup}
              className="bg-customMaroon w-7/10 rounded-3xl py-3"
            >
              <p className=" text-white font-medium text-base">
                Register Account
              </p>
            </button>
          </div>
        </div>
      </div>
      {selectPopup && (
        <SelectChildrenPopup
          toggleFunc={toggleSelectPopup}
          setSelectedStudents={setSelectedStudents}
          selectedStudents={selectedStudents}
        />
      )}
    </div>
  );
}
