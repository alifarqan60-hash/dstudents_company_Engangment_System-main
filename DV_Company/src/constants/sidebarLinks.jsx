import { BiSupport } from "react-icons/bi";
import { IMAGES } from "../assets";

export const sidebar_links = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <img src={IMAGES.dashboard_icon} alt="dashboard_icon" className="" />,
    path: "/company/dashboard",
  },
  {
    key: "jobs",
    label: "Jobs",
    icon: (
      <img
        src={IMAGES.schedule_class_icon}
        alt="schedule classesicon"
        className=""
      />
    ),
    path: "/company/jobs",
  },
  // {
  //   key: "jobs",
  //   label: "Jobs",
  //   icon: <img src={IMAGES.teachers_icon} alt="teachers_icon" className="" />,
  //   path: "/company/teachers",
  // },
  {
    key: "applications",
    label: "Applications",
    icon: <img src={IMAGES.students_icon} alt="students_icon" className="" />,
    path: "/company/applications",
  },
  // {
  //   key: "parents",
  //   label: "Parents",
  //   icon: <img src={IMAGES.parents_icon} alt="parents_icon" className="" />,
  //   path: "/company/parents",
  // },

  // {
  //   key: "about",
  //   label: "About Us",
  //   icon: <img src={IMAGES.wellbeing_icon} alt="wellbeing_icon" className="" />,
  //   path: "/company/about",
  // },
  // {
  //   key: "support",
  //   label: "Support",
  //   icon: <BiSupport size={20} />,
  //   path: "/company/support",
  // },
  {
    key: "settings",
    label: "Settings",
    icon: <img src={IMAGES.settings_icon} alt="settings_icon" className="" />,
    path: "/company/settings",
  },
];
