import React, { useState } from "react";
import Header from "../../components/Navbar/CourseToggleBtnHeader";
import ScheduledClassesCard from "../../components/Dashboard/ScheduledClassesCard";
import { IMAGES } from "../../assets";
import { scheduleClassesData } from "../../constants/dashboardSchClasssesData";
import AttendanceChart from "../../components/Admin/Users/AttendanceChart";
import ClassEngChart from "../../components/Admin/Users/ClassEngChart";
import HittingObjChart from "../../components/Admin/Users/HittingObjChart";
import DropDown from "../../components/Admin/Users/DropDown";

export default function ViewStudentProfile() {
  const [profileSelectedPage, setProfileSelectedPage] = useState("Profile");
  const [selectedOption, setSelectedOption] = useState("This Week");

  const handleProfilePageToggle = (page) => {
    setProfileSelectedPage(page);
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
        <div className="flex flex-col text-customGray font-medium text-lg">
          {/* Upper Div  */}
          <div className="flex flex-col items-center mdLg:flex-row mdLg:items-start gap-x-10 px-5 mt-5 ">
            {/* Left Div  */}
            <div className="flex-1 mb-8 mdLg:mb-0 ">
              <p className="mb-2 text-center mdLg:text-start">Profile</p>
              <div className="w-[400px] h-[400px] mdLg:w-auto mdLg:h-[800px] lg:h-[540px] border-2 border-gray-300 rounded-lg p-4 px-6 space-y-4">
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
                    <p className="text-sm">alexa@student.rosewood.com</p>
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
            <div className="mdLg:flex-[2] flex-1 flex flex-col justify-center md:w-8/12 w-6/12  ">
              <div className="flex flex-row justify-between mb-4">
                <p className="mb-2 text-start flex-start">Report</p>
                <DropDown
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                />
              </div>
              {/* Recently Scheduled Classes Cards  */}
              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 ">
                <AttendanceChart />
                <ClassEngChart />
                <HittingObjChart />
              </div>
            </div>
          </div>

          {/* Lower Div  */}
          <div className="px-5 mt-10 mb-8">
            <div className="">
              <div className="flex flex-row justify-between mb-3">
                <p className="font-semibold">Recently Scheduled Classes</p>
                <p className="text-sm text-customYellow hover:underline cursor-pointer">
                  See all
                </p>
              </div>
              {/* Recently Scheduled Classes Cards  */}
              <div className="flex flex-row gap-4 ">
                {scheduleClassesData.map((item, index) => (
                  <ScheduledClassesCard
                    key={index}
                    title={item.title}
                    location={item.location}
                    teacherName={item.teacherName}
                    teacherImg={item.teacherImg}
                    studentName={item.studentName}
                    studentImg={item.studentImg}
                    time={item.time}
                    days={item.days}
                    bgColor={item.bgColor}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
