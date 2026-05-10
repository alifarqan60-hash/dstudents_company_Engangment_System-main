import React from "react";
import SimpleBackHeader from "../../components/Navbar/SimpleBackHeader";

export default function NewWellBeing() {
  return (
    <>
      <div
        className={`flex flex-col p-2 rounded-tl-3xl bg-white rounded-bl-3xl h-full w-full`}
      >
        <SimpleBackHeader />

        {/* Main Page Content  */}
        <div className="font-sans text-customGray p-6 ">
          <p className="text-customDarkBlue font-medium text-xl mb-4">
            New Well Being
          </p>
          <div className="mb-5">
            <p className="text-customLightGray mb-1 text-sm">Title</p>
            <input
              type="text"
              required
              placeholder="Enter Well Being Title"
              maxLength={35}
              className="w-8/12 md:w-7/12 lg:w-6/12 xl:w-5/12 px-4 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="mb-5">
            <p className="text-customLightGray mb-1 text-sm">Content</p>
            <textarea
              required
              placeholder="Enter Well Being Content"
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
              rows="13" // Adjust the number of rows as needed
            ></textarea>
          </div>
          <div className=" flex justify-center ">
            <button className="py-3 px-9 mt-2 bg-customMaroon w-5/12 lg:w-3/12 text-customPopupBgColor text-sm font-normal rounded-3xl">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
