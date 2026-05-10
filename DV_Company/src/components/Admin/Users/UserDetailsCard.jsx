import React, { useState, useEffect } from "react";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";
import { IoIosArrowForward } from "react-icons/io";
import { RxPencil1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useOverLay } from "../../../contexts/OverlayContext";
import { IMAGES } from "../../../assets";

export default function UserDetailsCard({
  name,
  email,
  phoneNo,
  docUrl,
  id,
  toggleDeletedPopup,
}) {
  const navigate = useNavigate();
  const [deletedPopup, setDeletedPopup] = useState(false);
  const { toggleOverlay, isOverlayEnable } = useOverLay();
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const user = {
    name: name,
    email: email,
    phoneNo: "1234567890",
  };

  useEffect(() => {
    // Function to handle resizing
    function handleResize() {
      setIsLargeScreen(window.innerWidth >= 1024);
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleViewClick = () => {
    if (docUrl) {
      const link = document.createElement("a");
      link.href = docUrl;
      link.download = ""; // You can set a default file name here, e.g., "UserCV.pdf".
      link.target = "_blank"; // Opens the document in a new tab if not directly downloadable.
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error("No document URL available!");
    }
  };

  return (
    // Container Div
    <div className="flex flex-row w-full items-center p-3 text-xs lg:text-sm text-customStudentCardTextColor shadow-md hover:bg-gray-50 transition-colors">
      {/* name div  */}
      <div className="flex-[5] flex flex-row items-center">
        <div className="justify-center hidden md:flex md:justify-normal md:flex-none">
          <img
            src={IMAGES.student_avatar}
            alt="Student Pic"
            className="h-[30px] w-[30px]"
          />
        </div>
        <p className="ml-2 font-medium">{name}</p>
      </div>
      {/* email  */}
      <p className="flex-[7] break-all px-2">
        {isLargeScreen
          ? email
          : email.length > 15
            ? email.slice(0, 12) + "..."
            : email}
      </p>
      {/* phone No  */}
      <p className="flex-[5]">{phoneNo}</p>

      {/* Actions Div*/}
      <div className="flex-[5] flex flex-row items-center justify-between">
        <div className="flex items-center space-x-4">
          {docUrl ? (
            <>
              <a
                href={docUrl?.includes("cloudinary") ? `${"http://localhost:4000/api"}/resource/resolve?url=${encodeURIComponent(docUrl)}` : docUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-semibold hover:underline"
              >
                View
              </a>
              <a
                href={docUrl?.includes("cloudinary") ? `${"http://localhost:4000/api"}/resource/resolve?url=${encodeURIComponent(docUrl)}&download=true` : docUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-theme hover:text-theme-dark font-semibold hover:underline"
              >
                Download
              </a>
            </>
          ) : (
            <span className="text-gray-400 italic">No Resume</span>
          )}
        </div>

        {/* Delete Icons  */}
        <div className="text-customDeleteEditColor mdLg:mr-3 flex flex-row">
          <button
            onClick={() => toggleDeletedPopup({ id, name })}
            className="p-2 rounded-md hover:bg-red-50 text-red-500 transition-colors"
            title="Delete Application"
          >
            <LuTrash2 size={18} />
          </button>
        </div>
      </div>
    </div >
  );
}
