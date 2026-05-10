import React from "react";

export default function ProfileCard({ role, name, img }) {
  return (
    <div className="bg-white rounded-lg py-2 px-4 pr-8 md:px-2 md:pr-4">
      <div>
        <p className="font-sans font-normal text-sm mb-2">{role}</p>
      </div>

      <div className="flex flex-row items-center">
        <img
          src={img}
          alt="Image"
          className="h-[30px] w-[30px] flex-1 flex-shrink-0 flex-grow-0"
        />
        <p className="font-sans font-normal text-sm flex-[5] ml-2">{name}</p>
      </div>
    </div>
  );
}
