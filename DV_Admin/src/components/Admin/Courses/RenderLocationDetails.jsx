import { BiLink } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { lessonLocations } from "../../../constants/lessonLocations";

export const renderLocationDetails = ({ selectedLocation }) => {
  if (selectedLocation === null) return null;

  const location = lessonLocations[selectedLocation];
  if (
    location.label === "Student's Home" ||
    location.label === "Face to Face"
  ) {
    return null;
  } else {
    return (
      <>
        <div className="flex flex-row items-center text-customYellow font-sans text-sm font-medium gap-1">
          {location.icon}
          <p>{location.title}</p>
        </div>
        <div className="w-full px-4 py-3 text-xs text-customLightGray bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500 cursor-pointer">
          <p>{location.inputArea}</p>
        </div>
      </>
    );
  }
};
