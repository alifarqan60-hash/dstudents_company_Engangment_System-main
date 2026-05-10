import React from "react";
import SimpleBackHeader from "../../components/Navbar/SimpleBackHeader";
import { useLocation } from "react-router-dom";
import TeacherScheduledClassesCard from "../../components/Admin/Teachers/TeacherScheduleClassesCard";
import { reviewsAnswers } from "../../constants/teacherReviews";

export default function ReviewClass() {
  const location = useLocation();
  const { selectedClass } = location.state || {};
  const review = reviewsAnswers[0];

  return (
    <>
      <div
        className={`flex flex-col p-2 rounded-tl-3xl bg-white rounded-bl-3xl h-full w-full`}
      >
        <SimpleBackHeader />

        {/* Main Page Content  */}
        <div className="font-sans text-customGray p-6">
          {/* Class Details Div  */}
          <div className="w-10/12 sm:w-8/12 md:w-5/12 lg:w-4/12">
            <p className="font-semibold text-lg mb-2">Class Details</p>
            {selectedClass && (
              <TeacherScheduledClassesCard
                bgColor={selectedClass.bgColor}
                time={selectedClass.time}
                status={selectedClass.status}
              />
            )}
          </div>

          {/* Teacher Reviews Div */}
          <div className="mt-5">
            <p className="font-semibold text-lg mb-2">Teacher Reviews</p>
            <div>
              <table className="table-fixed w-full border-collapse border border-gray-300 text-base">
                <tbody>
                  <tr className="border border-gray-200">
                    <td className="p-2 border border-gray-200 w-1/2">
                      1. Did the student attend the lesson?
                    </td>
                    <td className="p-2 border border-gray-200 w-1/2 text-customGreen">
                      {review.a1}
                    </td>
                  </tr>
                  <tr className="border border-gray-200 ">
                    <td className="p-2 border border-gray-200 w-1/2 ">
                      2. Did the student engage in the lesson?
                    </td>
                    <td className="p-2 border border-gray-200 w-1/2 text-customGreen">
                      {review.a2}
                    </td>
                  </tr>
                  <tr className="border border-gray-200">
                    <td className="p-2 border border-gray-200 w-1/2">
                      3. What was the objective of the lesson?
                    </td>
                    <td className="p-2 border border-gray-200 w-1/2 text-customDarkBlue">
                      {review.a3}
                    </td>
                  </tr>
                  <tr className="border border-gray-200">
                    <td className="p-2 border border-gray-200 w-1/2">
                      4. Did the student hit the objective?
                    </td>
                    <td className="p-2 border border-gray-200 w-1/2 text-customYellow">
                      {review.a4}
                    </td>
                  </tr>
                  <tr className="border border-gray-200">
                    <td className="p-2 border border-gray-200 w-1/2">
                      5. Has CPOMS been updated if required?
                    </td>
                    <td className="p-2 border border-gray-200 w-1/2 text-customLightRed">
                      {review.a5}
                    </td>
                  </tr>
                  <tr className="border border-gray-200">
                    <td className="p-2 border border-gray-200 w-1/2">
                      6. Has evidence of learning been saved?
                    </td>
                    <td className="p-2 border border-gray-200 w-1/2 text-customLightRed">
                      {review.a6}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
