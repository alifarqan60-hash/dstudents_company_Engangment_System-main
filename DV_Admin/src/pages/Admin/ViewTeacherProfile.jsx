import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Navbar/TeacherToggleBtnHeader";
import DropDown from "../../components/Admin/Companies/DropDown";
import TeacherScheduledClassesCard from "../../components/Admin/Companies/TeacherScheduleClassesCard";
import { classes } from "../../constants/completedClasses";
import { IMAGES } from "../../assets";

export default function ViewTeacherProfile() {
  const [profileSelectedPage, setProfileSelectedPage] = useState("Profile");
  const [selectedOption, setSelectedOption] = useState("All");
  const navigate = useNavigate();

  const handleProfilePageToggle = (page) => {
    setProfileSelectedPage(page);
  };

  const handleDelete = () => {
    // Implement your delete logic here
    console.log("Delete action triggered");
  };

  const filteredClasses =
    selectedOption === "All"
      ? classes
      : classes.filter((cls) => cls.status === "Reviewed");

  const handleCardClick = (selectedClass) => {
    if (selectedClass.status === "Reviewed") {
      navigate("/admin/teachers/review-class", { state: { selectedClass } });
    }
  };

  return (
    <>
      <div
        className={`flex flex-col p-2 rounded-tl-3xl bg-white rounded-bl-3xl h-full w-full`}
      >
        {/* Header  */}
        <Header
          selectedPage={profileSelectedPage}
          handlePageToggle={setProfileSelectedPage}
        />

        {/* Main Page  */}
        <div className="flex flex-col items-center mdLg:flex-row mdLg:items-start gap-x-10 px-5 mt-10 text-customGray font-medium text-lg">
          {/* Left Div  */}
          <div className="flex-1 mb-8 mdLg:mb-0">
            <p className="mb-2 text-center mdLg:text-start">Profile</p>
            <div className="w-[400px] h-[500px] mdLg:w-auto mdLg:h-[600px] border-2 border-gray-300 rounded-lg p-4 px-6 space-y-4">
              {/* Edit Icon  */}
              <div className="flex flex-row-reverse items-center cursor-pointer ">
                <p className="text-sm ml-2">Edit</p>
                <img
                  src={IMAGES.edit_icon2}
                  alt="Edit Icon"
                  className="w-[15px] h-[15px]"
                />
              </div>

              {/* Profile Image and Name  */}
              <div className="flex flex-col items-center">
                <img
                  src={IMAGES.student_avatar}
                  alt="Edit Icon"
                  className="w-[100px] h-[100px] mb-1"
                />
                <p>Alexa Jhons</p>
              </div>

              {/* profile Data  */}
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-customLightGray font-normal">
                    Name
                  </p>
                  <p className="text-sm">Alexa Jhons</p>
                </div>
                <div>
                  <p className="text-xs text-customLightGray font-normal">
                    Email
                  </p>
                  <p className="text-sm">alexa@teacher.rosewood.com</p>
                </div>
                <div>
                  <p className="text-xs text-customLightGray font-normal">
                    Phone No
                  </p>
                  <p className="text-sm">+1 234 56789</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Div  */}
          <div className="flex-[2]">
            <div className="flex flex-row justify-between ">
              <p className="mb-2 text-center mdLg:text-start">
                Completed Classes
              </p>
              <DropDown
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
            </div>
            {/* Recently Scheduled Classes Cards  */}
            <div className="flex flex-col mdLg:grid mdLg:grid-cols-2 gap-4 ">
              {filteredClasses.map((item, index) => (
                <TeacherScheduledClassesCard
                  key={index}
                  time={item.time}
                  status={item.status}
                  bgColor={item.bgColor}
                  onClick={() => handleCardClick(item)}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
