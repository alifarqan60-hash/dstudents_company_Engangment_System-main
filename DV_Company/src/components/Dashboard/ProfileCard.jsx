import React from "react";

export default function ProfileCard({ description, skills }) {
  return (
    <div className="bg-white w-full rounded-lg py-2 ml-1 mr-2 px-4 pr-8 md:px-2 md:pr-4">
      <div>
        {/* <p className="font-sans font-normal text-sm mb-2">{role}</p>
      </div>

      <div className="flex flex-row items-center">
        <img
          src={img}
          alt="Image"
          className="h-[30px] w-[30px] flex-1 flex-shrink-0 flex-grow-0"
        />
        {/* HELLOOOOOOOOOOOO HELLOOOOOOOOOOOO HELLOOOOOOOOOOOO HELLOOOOOOOOOOOO
        HELLOOOOOOOOOOOO HELLOOOOOOOOOOOO HELLOOOOOOOOOOOO HELLOOOOOOOOOOOO what
        you gonna do about it ? but i am not gonna do anything about it */}
        <p className="font-sans font-normal text-sm flex-[5] ml-2">
          <strong>Description: </strong> {description}
        </p>
        <p className="font-sans text-customGray  font-semibold text-sm flex-[5] ml-2 mt-4">
          <strong>Skills: </strong>
          {skills}
        </p>
      </div>
    </div>
  );
}
