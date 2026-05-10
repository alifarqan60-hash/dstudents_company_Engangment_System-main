import { PiBuildingOfficeBold, PiGraduationCapDuotone } from "react-icons/pi";
import { IMAGES } from "../assets";
import { BsClipboardData } from "react-icons/bs";

export const getDetailsData = ({
  users,
  courses,
  companies,
  datasets,
  navigate,
}) => {
  return [
    {
      icon: <img src={IMAGES.users_card_icon} alt="users_icon" className="" />,
      label: "Users",
      value: users?.length,
      onClick: () => navigate("/admin/users"),
    },
    {
      icon: <PiBuildingOfficeBold size={20} />,
      label: "Companies",
      value: companies?.length,
      onClick: () => navigate("/admin/companies"),
    },
    {
      icon: <PiGraduationCapDuotone size={20} />,
      label: "Courses",
      value: courses?.length,
      onClick: () => navigate("/admin/courses"),
    },
    {
      icon: <BsClipboardData size={20} />,
      label: "Datasets",
      value: datasets?.length,
      onClick: () => navigate("/admin/datasets"),
    },
  ];
};
