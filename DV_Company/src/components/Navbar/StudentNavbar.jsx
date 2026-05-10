import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { TbBell } from "react-icons/tb";
import NotificationPopup from "../global/NotificationPopup";

export default function StudentNavbar({ name, img }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <div className="flex flex-row w-full h-[70px] rounded-tl-3xl md:pl-10 items-center font-sans font-medium text-base">
      {isPopupVisible && (
        <div className="bg-black fixed inset-0 opacity-50"></div>
      )}
      <div className=" flex flex-row items-center space-x-3 ml-20 md:ml-2">
        <img src={img} alt="Student Avatar" className="w[40px] h-[40px]" />
        <p className="text-customDarkBlue text-sm font-medium">{name}</p>
      </div>

      {/* Notification Icon  */}
      <div className="flex-1 ml-5 relative  border-l border-l-gray-200 pl-4 pr-3 md:pr-2 lg:pr-1 xl:pr-0">
        {isPopupVisible && <NotificationPopup toggleFunc={togglePopup} />}
        <TbBell size={22} />
        <GoDotFill
          className="text-customLightRed cursor-pointer absolute top-0 ml-[10px] "
          size={13}
          onClick={togglePopup}
        />
      </div>
    </div>
  );
}
