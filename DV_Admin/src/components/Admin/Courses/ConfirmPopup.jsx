import React from "react";
import { IMAGES } from "../../../assets";
import ScheduledClassesCard from "../../Dashboard/ScheduledClassesCard";

export default function ConfirmPopup({ toggleFunc }) {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center h-screen w-auto z-10">
        <div className="w-[350px] bg-customPopupBgColor p-4 rounded-3xl font-sans space-y-3 border border-gray-300">
          <div className="flex-1 flex flex-row items-center">
            <img
              src={IMAGES.schedule_class_icon2}
              alt="schedule_class_icon"
              className="h-[30px] w-[30px] "
            />
            <p className="text-customGray font-bold text-lg ml-2">
              Class Scheduled Successfully
            </p>
          </div>

          <div className="flex-[2] font-normal text-sm text-customPopupTextColor mb-2">
            The class has been scheduled successfully.
          </div>

          <div className="mb-2">
            <ScheduledClassesCard
              title={"App development"}
              location={"Online"}
              teacherName={"Ava Calvar"}
              teacherImg={IMAGES.teacher_avatar}
              studentName={"Alexa Jhons"}
              studentImg={IMAGES.student_avatar}
              time={"10:00am - 11:00am"}
              days={"Mon-Thu"}
              bgColor={"bg-customCard1Color"}
            />
          </div>

          <div className="flex gap-2">
            <button
              className="p-2 px-9 w-full bg-customLightGreyBg text-customGray text-sm font-normal rounded-3xl"
              onClick={toggleFunc}
            >
              Cancel
            </button>
            <button
              className="p-2 px-9 w-full bg-customGreen text-customPopupBgColor text-sm font-normal rounded-3xl"
              onClick={toggleFunc}
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
