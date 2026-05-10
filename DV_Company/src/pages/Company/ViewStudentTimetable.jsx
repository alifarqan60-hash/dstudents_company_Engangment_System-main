import React, { useState } from "react";
import Header from "../../components/Navbar/StudentToggleBtnHeader";
import { BsDownload } from "react-icons/bs";
import { IoAdd, IoAddOutline } from "react-icons/io5";
import { timetableData } from "../../constants/timetableData";
import CustomCalendar from "../../components/Admin/Students/Calendar";
import CompletedClassesCard from "../../components/Admin/Students/StudentCompClassesCard";
import { IMAGES } from "../../assets";

export default function ViewStudentTimetable() {
  const [timetableSelectedPage, setTimetableSelectedPage] =
    useState("Timetable");

  const handleTimetablePageToggle = (page) => {
    setTimetableSelectedPage(page);
  };

  return (
    <>
      <div
        className={`flex flex-col p-2 rounded-tl-3xl bg-white rounded-bl-3xl h-full w-full space-y-4`}
      >
        {/* Header  */}
        <Header
          selectedPage={timetableSelectedPage}
          handlePageToggle={setTimetableSelectedPage}
        />

        {/* Name and Buttons Div  */}
        <div className=" flex flex-col smMd:flex-row justify-between px-10">
          {/* Name and Image div  */}
          <div className="flex flex-col items-center smMd:flex-row text-customDarkBlue text-sm font-semibold">
            <img
              src={IMAGES.avatar}
              alt="User Image"
              className="w-[35px] h-[35px]"
            />
            <p className="mb-3 smMd:ml-3 smMd:mb-0">Alex Jhons</p>
          </div>

          <div className="text-white gap-2 text-sm font-normal flex flex-col smMd:flex-row">
            <button className="bg-customYellow p-1 px-4 border rounded-md flex flex-row items-center">
              <BsDownload size={16} />
              <p className="ml-2">Download Report</p>
            </button>
            <button className="bg-customMaroon p-1 px-4 border rounded-md flex flex-row items-center">
              <IoAdd size={16} />
              <p className="ml-2">Schedule New Class</p>
            </button>
          </div>
        </div>

        {/* Main Page  */}
        <div className="flex flex-col lg:flex-row gap-x-4 px-10 text-customGray font-medium text-lg">
          {/* Timetable  */}
          <div className="flex-[2] mr-10 ">
            <p className="mb-4">Today's Timetable</p>

            <table className="w-full border-collapse text-xs text-customDarkerBlue ">
              <tbody>
                {timetableData.map((item, index) => (
                  <tr key={index}>
                    <td
                      style={{ width: "8%" }}
                      className={`pb-4 border-r border-gray-300 ${
                        item.class ? "" : "pb-4"
                      } align-top`}
                    >
                      {item.time}
                    </td>
                    <td
                      style={{ width: "90%" }}
                      className={`${item.class ? "" : "pb-4 "}`}
                    >
                      <hr
                        className={`w-full border-t-2 border-dashed border-gray-200 ${
                          item.class ? "" : "mt-[-8px]"
                        }`}
                      />
                      {item.class}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* right div  */}
          <div className="flex-1 ">
            <div className="flex items-center justify-center">
              <CustomCalendar />
            </div>
            {/* Completed Classes Div  */}
            <div className=" mt-8 p-2">
              <div className="flex flex-row items-center justify-between mb-2">
                <p className="text-base font-medium font-sans">
                  Completed Classes
                </p>
                <p className="text-xs text-customYellow hover:underline cursor-pointer">
                  See all
                </p>
              </div>

              <div className="h-[230px] overflow-y-auto register-scrollbar space-y-4 mr-2 ">
                <CompletedClassesCard
                  subject={"English Class"}
                  teacherName={"Sir Adnan"}
                  circleBgColor={"bg-customCompClassBorderColor1"}
                  bgColor={"bg-customCard2Color"}
                  borderColor={"border-customCompClassBorderColor1"}
                />
                <CompletedClassesCard
                  subject={"App Development"}
                  teacherName={"Sir Adnan"}
                  circleBgColor={"bg-customCompClassBorderColor2"}
                  bgColor={"bg-customCompClassBgColor2"}
                  borderColor={"border-customCompClassBorderColor2"}
                />
                <CompletedClassesCard
                  subject={"App Development"}
                  teacherName={"Sir Adnan"}
                  circleBgColor={"bg-customCompClassBorderColor3"}
                  bgColor={"bg-customCompClassBgColor3"}
                  borderColor={"border-customCompClassBorderColor3"}
                />
                <CompletedClassesCard
                  subject={"English Class"}
                  teacherName={"Sir Adnan"}
                  circleBgColor={"bg-customCompClassBorderColor1"}
                  bgColor={"bg-customCard2Color"}
                  borderColor={"border-customCompClassBorderColor1"}
                />
                <CompletedClassesCard
                  subject={"App Development"}
                  teacherName={"Sir Adnan"}
                  circleBgColor={"bg-customCompClassBorderColor2"}
                  bgColor={"bg-customCompClassBgColor2"}
                  borderColor={"border-customCompClassBorderColor2"}
                />
                <CompletedClassesCard
                  subject={"App Development"}
                  teacherName={"Sir Adnan"}
                  circleBgColor={"bg-customCompClassBorderColor3"}
                  bgColor={"bg-customCompClassBgColor3"}
                  borderColor={"border-customCompClassBorderColor3"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
