import React, { useState } from "react";
import { TbBell } from "react-icons/tb";
import { IMAGES } from "../../assets";
import { GoDotFill } from "react-icons/go";
import NotificationPopup from "../global/NotificationPopup";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Navbar({ heading }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const navigate = useNavigate();

  // Pull the company user from Redux store
  const user = useSelector((state) => state.auth?.user);
  const name = user?.username || "Company Partner";
  const role = "Company Admin";
  const avatar = user?.imgUrl || user?.photo || IMAGES.dataverse_logo;

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <div className="flex flex-row w-auto h-[80px] bg-white rounded-tl-3xl pl-10 items-center sticky top-0 z-20 shadow-sm border-b border-gray-100">
      {isPopupVisible && (
        <div
          className="bg-black fixed inset-0 opacity-50 z-10"
          onClick={togglePopup}
        />
      )}
      {/* Heading Div */}
      <div className="flex-1 md:flex-1 lg:flex-[4] pl-10 md:pl-0 flex justify-start">
        <p className="font-semibold font-inter text-2xl text-gray-800">{heading}</p>
      </div>

      {/* SearchBar Div  */}
      <div className="flex flex-1 lg:flex-[2] items-center border border-gray-200 rounded-lg bg-gray-50 hover:border-gray-300 transition-colors">
        <button className="bg-transparent px-3 py-3 flex rounded-l-lg items-center justify-center">
          <img
            src={IMAGES.search_icon1}
            alt="Search Icon"
            className="w-[16px] h-[16px] opacity-50"
          />
        </button>
        <input
          type="text"
          placeholder="Search..."
          className="text-sm focus:outline-none bg-transparent h-10 w-full px-1 py-1 text-gray-600 placeholder-gray-400"
        />
      </div>

      {/* Notification and Profile Div */}
      <div className="flex-1 md:flex-1 lg:flex-[2] flex items-center">
        {/* Notification Icon  */}
        <div
          className="flex-1 ml-5 cursor-pointer pr-3 md:pr-2 lg:pr-1 xl:pr-0 relative"
          onClick={togglePopup}
        >
          {isPopupVisible && <NotificationPopup toggleFunc={togglePopup} />}
          <div className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
            <TbBell size={20} className="text-gray-600" />
            <GoDotFill
              className="text-red-500 absolute top-0.5 right-0.5"
              size={12}
            />
          </div>
        </div>

        {/* Profile Div  */}
        <div
          className="flex-[6] flex justify-start items-center border-l border-l-gray-200 cursor-pointer"
          onClick={() => navigate("/company/settings")}
        >
          {/* Profile Icon  */}
          <div className="flex justify-center md:justify-normal md:flex-none pl-3 mdLg:pl-4 lg:pl-5">
            <img
              src={avatar}
              alt="Profile Pic"
              onError={(e) => { e.target.src = IMAGES.dataverse_logo; }}
              className={`h-[38px] w-[38px] object-cover border-2 border-gray-200 ${avatar === IMAGES.dataverse_logo ? "logo-diamond logo-contrast-light" : "rounded-full"}`}
            />
          </div>

          {/* Text  */}
          <div className="ml-20 flex-1 md:flex-auto md:mr-0 md:ml-4 hidden md:block">
            <p className="font-bold text-blue-900 text-sm font-inter truncate max-w-[120px]">
              {name}
            </p>
            <p className="text-gray-500 text-xs font-inter">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
