import { BsClipboardData } from "react-icons/bs";
import { IMAGES } from "../assets";
import { PiBuildingOfficeBold, PiGraduationCapDuotone } from "react-icons/pi";
import { GiNewspaper } from "react-icons/gi";
import { BiSupport } from "react-icons/bi";
import { MdOutlineQuiz } from "react-icons/md";

export const sidebar_links = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <img src={IMAGES.dashboard_icon} alt="dashboard_icon" className="" />,
    path: "/admin/dashboard",
  },
  {
    key: "courses",
    label: "Courses",
    icon: <PiGraduationCapDuotone size={20} />,
    path: "/admin/courses",
  },
  {
    key: "quizzes",
    label: "Quizzes",
    icon: <MdOutlineQuiz size={20} />,
    path: "/admin/quizzes",
  },
  {
    key: "companies",
    label: "Companies",
    icon: <PiBuildingOfficeBold size={20} />,
    path: "/admin/companies",
  },
  {
    key: "users",
    label: "Users",
    icon: <img src={IMAGES.students_icon} alt="users" className="" />,
    path: "/admin/users",
  },
  {
    key: "datasets",
    label: "Datasets",
    icon: <BsClipboardData size={20} />,
    path: "/admin/datasets",
  },
  // {
  //   key: "news",
  //   label: "News & Updates",
  //   icon: <GiNewspaper size={20} />,
  //   path: "/admin/news",
  // },
  // {
  //   key: "support",
  //   label: "Support",
  //   icon: <BiSupport size={20} />,
  //   path: "/admin/support",
  // },
  {
    key: "settings",
    label: "Settings",
    icon: <img src={IMAGES.settings_icon} alt="settings_icon" className="" />,
    path: "/admin/settings",
  },
];
