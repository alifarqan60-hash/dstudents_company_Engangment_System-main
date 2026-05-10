import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RiCloseLine } from "react-icons/ri";
import { IMAGES } from "../../../assets";
import SelectTeacherPopup from "./SelectTeacherPopup";
import Loader from "../../Loader/Loader";
import { addCompany } from "../../../api/Company/addCompany";
import { ToastContainer, toast } from "react-toastify";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export default function AddCompany({
  toggleFunc,
  selectTPopup,
  toggleSelectTPopup,
  toggleAddedPopup,
  addedPopup,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [noOfEmployees, setNoOfEmployees] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null); // Selected Owner
  const [photo, setPhoto] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [loader, setLoader] = useState(false);

  const uploadFile = async () => {
    if (!photo || photo === "") {
      return IMAGES.student_avatar;
    }
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `companies/${Date.now()}_${photo.name}`);
      const response = await uploadBytes(storageRef, photo);
      const fileUrl = await getDownloadURL(response.ref);
      return fileUrl;
    } catch (error) {
      console.error("Firebase upload error:", error);
      return IMAGES.student_avatar;
    }
  };

  const handleAddClick = async () => {
    if (name !== "" && email !== "" && selectedTeacher) {
      setLoader(true);
      try {
        const fileUrl = await uploadFile();
        const newCompany = {
          name,
          email,
          phoneNo,
          noOfEmployees: parseInt(noOfEmployees) || 0,
          description,
          owner: selectedTeacher._id, // Pass only the ID
          profileUrl: fileUrl,
          websiteUrl,
        };
        const response = await addCompany(newCompany);
        toast.success("New Company Added Successfully");
        toggleAddedPopup();
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (error) {
        toast.error("Failed to add new company");
        console.error("Error adding new company:", error);
      } finally {
        setLoader(false);
      }
    } else {
      toast.error("Please fill all the fields including Owner");
    }
  };

  return (
    <div className="h-screen overflow-y-auto register-scrollbar3 rounded-l-3xl bg-customNewStudentCardColor absolute flex justify-end right-0 font-sans ">
      {addedPopup && <div className="bg-black fixed inset-0 opacity-50"></div>}
      {selectTPopup && (
        <div className="bg-black fixed inset-0 opacity-50"></div>
      )}
      <ToastContainer position="bottom-right" />

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
          <p className=" mt-6 font-medium text-2xl">New Company</p>
        </div>

        {/* Student Pic  */}
        <div className="flex-1 flex justify-center">
          <img
            src={IMAGES.student_avatar}
            alt="New Company Pic"
            className="w-24 h-24 rounded-full"
          ></img>
          <input
            type="file"
            id="file"
            onChange={(e) => {
              setPhoto(e.target.files[0]);
            }}
            className="hidden"
          />
          <label htmlFor="file" className="absolute mt-20 ml-14">
            <img
              src={IMAGES.edit_icon}
              alt="Edit Icon"
              className="w-[23px] h-[23px] cursor-pointer rounded-full "
            ></img>
          </label>
        </div>

        {/* Form  */}
        <div className="flex-[5] p-8 text-xs ">
          {/* <form action=""> */}
          {/* Name Field  */}
          <div className="mb-4">
            <p className="text-customLightGray mb-1 ">Company Name</p>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Company Name"
              maxLength={35}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Email Field  */}
          <div className="mb-4">
            <p className="text-customLightGray mb-1 ">Email</p>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Company's Email"
              maxLength={35}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Owner  */}
          <div className="mb-5">
            {!selectedTeacher ? (
              <>
                <p className="text-customLightGray mb-1 ">Owner</p>
                <div
                  onClick={toggleSelectTPopup}
                  className="w-full px-4 py-2 text-sm text-customLightGray bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  <p>+ Assign Owner</p>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-customLightGray mb-1 ">Owner</p>
                </div>
                <div
                  onClick={toggleSelectTPopup}
                  className="flex flex-row items-center gap-2 mb-2 cursor-pointer"
                >
                  <div className="relative inline-block">
                    {/* <img
                      src={selectedTeacher.photo}
                      alt="teacher avatar"
                      className="h-10 w-10 rounded-full"
                    /> */}
                  </div>
                  <p className="font-normal text-sm">
                    {selectedTeacher.username}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* No of employees */}
          <div className="mb-4">
            <p className="text-customLightGray mb-1 ">No of employees</p>
            <input
              type="text"
              required
              value={noOfEmployees}
              onChange={(e) => setNoOfEmployees(e.target.value)}
              placeholder="Enter No of employees"
              maxLength={35}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Description  */}
          <div className="mb-4">
            <p className="text-customLightGray mb-1 ">Description</p>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description of Company"
              maxLength={35}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Website URL  */}
          <div className="mb-4">
            <p className="text-customLightGray mb-1 ">Website URL</p>
            <input
              type="text"
              required
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="Enter Website URL"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* </form> */}
          {/* Register Button  */}
          <div className="w-full flex items-center justify-center mt-10 mb-8">
            {loader ? (
              <Loader />
            ) : (
              <button
                type="submit"
                onClick={handleAddClick}
                className="bg-customMaroon w-7/10 rounded-3xl py-3"
              >
                <p className=" text-white font-medium text-base">
                  Register Company
                </p>
              </button>
            )}
          </div>
        </div>
      </div>
      {selectTPopup && (
        <SelectTeacherPopup
          toggleFunc={toggleSelectTPopup}
          setSelectedTeacher={setSelectedTeacher}
          selectedTeacher={selectedTeacher}
        />
      )}
    </div>
  );
}
