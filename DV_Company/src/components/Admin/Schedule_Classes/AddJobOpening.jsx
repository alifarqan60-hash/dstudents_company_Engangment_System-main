import React, { useEffect, useState } from "react";
import { IMAGES } from "../../../assets";
import { RiCloseLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import SelectStudentPopup from "./SelectStudentPopup";
import SelectTeacherPopup from "./SelectTeacherPopup";
import SelectLocationPopup from "./SelectLocationPopup";
import SelectTimePopup from "./SelectTimePopup";
import SelectDaysPopup from "./SelectDaysPopup";
import { lessonLocations } from "../../../constants/lessonLocations";
import { daysOfWeek } from "../../../constants/daysofWeek";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import { addJob } from "../../../api/Jobs/addJob";
import Loader from "../../Loader/Loader";
import axiosInstance from "../../../config/api";

export default function AddJobOpening({
  toggleFunc,
  toggleConfirmPopup,
  confirmPopup,
  selectTimePopup,
  showPopup,
  setShowPopup,
  toggleSelectTimePopup,
  // selectStPopup,
  // toggleSelectStPopup,
  // selectTPopup,
  // toggleSelectTPopup,
  // selectLocationPopup,
  // toggleSelectLocationPopup,
  // selectDaysPopup,
  // toggleSelectDaysPopup,
}) {
  // const [selectedStudents, setSelectedStudents] = useState(null);
  // const [selectedTeacher, setSelectedTeacher] = useState(null);
  // const [selectedLocation, setSelectedLocation] = useState(null);
  // const [selectedTime, setSelectedTime] = useState(null);
  // const [selectedDays, setSelectedDays] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("67558b97a2c20f2c75c4ae35");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [workingMode, setWorkingMode] = useState("");
  const [experienceRequired, setExperienceRequired] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [skills, setSkills] = useState("");
  const [deadline, setDeadline] = useState("");

  const [loading, setLoader] = useState(false);

  useEffect(() => {
    const fetchCompany = async () => {
      const response = await axiosInstance.get("/company/get-my-company");
      setCompany(response.data._id);
    };

    fetchCompany();
  }, []);

  const handleConfirmClick = async () => {
    console.log("experienceLevel: ", experienceLevel);
    console.log("workingMO: ", workingMode);
    setLoader(true);
    if (
      title !== "" &&
      description !== "" &&
      workingMode !== "" &&
      type !== "" &&
      experienceRequired !== "" &&
      experienceLevel !== "" &&
      skills !== ""
    ) {
      const newJob = {
        title,
        description,
        workingMode,
        experienceRequired,
        type,
        level: experienceLevel,
        skills,
        applicationDeadline: formatDate(selectedTime),
        company,
      };
      try {
        const response = await addJob(newJob);
        // window.location.reload();
        toast.success("New job Added Successfully");
        toggleConfirmPopup();
      } catch (error) {
        toast.error("Failed to add new job");
        console.error("Error adding new job:", error);
      }
    } else {
      toast.error("Please fill all the fields");
    }
    setLoader(false);
  };

  const handleDateChange = (date) => {
    // Reset time to midnight
    date.setHours(0, 0, 0, 0);
    setSelectedTime(date);
    setShowPopup(false);
  };

  const formatDate = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero
    return `${year}/${month}/${day}`;
  };

  // const formatSelectedDays = (days) => {
  //   if (days.length === 0) return "No days selected";

  //   const dayLabels = days.map((index) => daysOfWeek[index].label);
  //   const ranges = [];
  //   let start = dayLabels[0];
  //   let end = start;

  //   for (let i = 1; i < dayLabels.length; i++) {
  //     if (days[i] === days[i - 1] + 1) {
  //       end = dayLabels[i];
  //     } else {
  //       ranges.push(start === end ? start : `${start}-${end}`);
  //       start = dayLabels[i];
  //       end = start;
  //     }
  //   }
  //   ranges.push(start === end ? start : `${start}-${end}`);

  //   return ranges.join(", ");
  // };

  // const handleTimeSelect = (startTime, endTime) => {
  //   setSelectedTime(`${startTime} - ${endTime}`);
  // };

  return (
    <div className="h-screen overflow-y-auto register-scrollbar2 rounded-l-3xl bg-customNewStudentCardColor absolute flex justify-end right-0 font-sans ">
      {confirmPopup && (
        <div className="bg-black fixed inset-0 opacity-50"></div>
      )}
      {selectTimePopup && (
        <div className="bg-black fixed inset-0 opacity-50"></div>
      )}
      {/* {selectStPopup && (
        <div className="bg-black fixed inset-0 opacity-50"></div>
      )}
      {selectTPopup && (
        <div className="bg-black fixed inset-0 opacity-50"></div>
      )}
      {selectLocationPopup && (
        <div className="bg-black fixed inset-0 opacity-50"></div>
      )} */}
      {/* {selectDaysPopup && (
        <div className="bg-black fixed inset-0 opacity-50"></div>
      )} */}

      <div className=" w-[400px]  items-center">
        {/* close button  */}
        <div className="flex justify-start flex-1">
          <div
            onClick={toggleFunc}
            className="bg-white  mt-3 ml-4 border border-gray-200 rounded-full w-[35px] h-[35px] shadow-xl flex justify-center items-center cursor-pointer"
          >
            <RiCloseLine className="text-customGrayText" />
          </div>
        </div>
        {/* Heading  */}
        <div className="flex flex-1 justify-center mb-2">
          <p className=" mt-6 font-medium text-2xl">Create Job</p>
        </div>

        {/* Form  */}
        <div className="flex-[5] p-8 text-xs ">
          {/* <form action=""> */}
          {/* Title Field  */}
          <div className="mb-5">
            <p className="text-customLightGray mb-1 ">Job Title</p>
            <input
              type="text"
              required
              placeholder="Enter Class Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={35}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* DEscription */}
          <div className="mb-5">
            <p className="text-customLightGray mb-1 ">Description</p>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Job Description . . ."
              // maxLength={35}
              rows={4}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {showPopup && (
            <div className="absolute z-50 bg-white p-4 border rounded-md shadow-lg">
              <DatePicker
                selected={selectedTime}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                inline
              />
            </div>
          )}

          {/* Working Mode */}
          <div className="mb-5">
            <p className="text-customLightGray mb-1 ">Working Mode</p>
            <select
              required
              value={workingMode}
              onChange={(e) => setWorkingMode(e.target.value)}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
            >
              <option value="" disabled selected>
                Select Work Type
              </option>
              <option value="onsite">onsite</option>
              <option value="remote">remote</option>
              <option value="hybrid">hybrid</option>
            </select>
          </div>

          {/* Experience Required */}
          <div className="mb-5">
            <p className="text-customLightGray mb-1 ">Experience Required</p>
            <input
              type="text"
              required
              placeholder="Enter Experience Required"
              value={experienceRequired}
              onChange={(e) => setExperienceRequired(e.target.value)}
              maxLength={35}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Level */}
          <div className="mb-5">
            <p className="text-customLightGray mb-1 ">Experience Level</p>
            <select
              required
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
            >
              <option value="" disabled selected>
                Select Experience Level
              </option>
              <option value="beginner">beginner</option>
              <option value="intermediate">intermediate</option>
              <option value="advanced">advanced</option>
            </select>
          </div>

          <div className="mb-5">
            <p className="text-customLightGray mb-1 ">Job Type</p>
            <input
              type="text"
              required
              placeholder="Enter Job Type (e.g. Full Time, Part Time)"
              value={type}
              onChange={(e) => setType(e.target.value)}
              maxLength={35}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Skills  */}
          <div className="mb-5">
            <p className="text-customLightGray mb-1 ">Skills Required</p>
            <input
              type="text"
              required
              placeholder="Enter some required skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              maxLength={35}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/*Time Duration*/}
          <div className="mb-5">
            <p className="text-customLightGray mb-1">Deadline</p>
            <div
              onClick={toggleSelectTimePopup}
              className="w-full px-4 py-2 flex justify-between items-center text-sm text-customDarkBlue bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              <p>{selectedTime ? formatDate(selectedTime) : "Select Date"}</p>
            </div>
          </div>

          {/* Select Student Field  */}
          {/* <div className="mb-5">
            {!selectedStudents ? (
              <>
                <p className="text-customLightGray mb-1 ">Student</p>
                <div
                  onClick={toggleSelectStPopup}
                  className="w-full px-4 py-2 text-sm text-customLightGray bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  <p>+ Select Student</p>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-customLightGray mb-1 ">Student</p>
                </div>

                <div
                  onClick={toggleSelectStPopup}
                  className="flex flex-row items-center gap-2 mb-2 cursor-pointer"
                >
                  <div className="relative inline-block ">
                    <img
                      src={selectedStudents.img}
                      alt="student avatar"
                      className="h-[40px] w-[40px]"
                    />
                  </div>
                  <p className="font-normal text-sm">{selectedStudents.name}</p>
                </div>
              </>
            )}
          </div> */}

          {/* Select Teacher Field  */}
          {/* <div className="mb-5">
            {!selectedTeacher ? (
              <>
                <p className="text-customLightGray mb-1 ">Teacher</p>
                <div
                  onClick={toggleSelectTPopup}
                  className="w-full px-4 py-2 text-sm text-customLightGray bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  <p>+ Assign Teacher</p>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-customLightGray mb-1 ">Teacher</p>
                </div>
                <div
                  onClick={toggleSelectTPopup}
                  className="flex flex-row items-center gap-2 mb-2 cursor-pointer"
                >
                  <div className="relative inline-block">
                    <img
                      src={selectedTeacher.img}
                      alt="teacher avatar"
                      className="h-[40px] w-[40px]"
                    />
                  </div>
                  <p className="font-normal text-sm">{selectedTeacher.name}</p>
                </div>
              </>
            )}
          </div> */}

          {/* Location of Lesson  */}
          {/* <div className="mb-5">
            <p className="text-customLightGray mb-1">Location of Lesson</p>
            <div
              onClick={toggleSelectLocationPopup}
              className="w-full px-4 py-2 flex justify-between items-center text-sm text-customLightGray bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              {selectedLocation !== null ? (
                <>
                  <p>{lessonLocations[selectedLocation].label}</p>
                  <img
                    src={IMAGES.edit_icon2}
                    alt="edit icon"
                    className="h-4 w-4"
                  />
                </>
              ) : (
                <>
                  <p>Select</p>
                  <IoIosArrowDown className=" text-customGray" />
                </>
              )}
            </div>
            {selectedLocation !== null && (
              <div className="mt-2">
                <div className="flex items-center gap-2 text-customYellow text-xs">
                  {lessonLocations[selectedLocation].icon}
                  <p>{lessonLocations[selectedLocation].inputArea}</p>
                </div>
              </div>
            )}
          </div> */}

          {/*Days of Week*/}
          {/* <div className="mb-5">
            <p className="text-customLightGray mb-1">Days of Week</p>
            <div
              onClick={toggleSelectDaysPopup}
              className="w-full px-4 py-2 flex justify-between items-center text-sm text-customDarkBlue bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              <p>{formatSelectedDays(selectedDays)}</p>
            </div>
          </div> */}
          {/* </form> */}
          {/* Register Button  */}
          <div className="w-full flex items-center justify-center mt-10">
            {loading ? (
              <Loader />
            ) : (
              <button
                type="submit"
                onClick={handleConfirmClick}
                className="bg-customMaroon w-7/10 rounded-3xl py-3"
              >
                <p className=" text-white font-medium text-base">Confirm</p>
              </button>
            )}
          </div>
        </div>
      </div>
      {/* {selectStPopup && (
        <SelectStudentPopup
          toggleFunc={toggleSelectStPopup}
          setSelectedStudents={setSelectedStudents}
          selectedStudents={selectedStudents}
        />
      )}
      {selectTPopup && (
        <SelectTeacherPopup
          toggleFunc={toggleSelectTPopup}
          setSelectedTeacher={setSelectedTeacher}
          selectedTeacher={selectedTeacher}
        />
      )} */}
      {/* {selectLocationPopup && (
        <SelectLocationPopup
          toggleFunc={toggleSelectLocationPopup}
          setSelectedLocation={setSelectedLocation}
        />
      )}
      {selectDaysPopup && (
        <SelectDaysPopup
          toggleFunc={toggleSelectDaysPopup}
          setSelectedDays={setSelectedDays}
        />
      )} */}
    </div>
  );
}
