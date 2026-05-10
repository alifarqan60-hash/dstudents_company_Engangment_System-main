import { IMAGES } from "../assets";

export const student_sidebar_links = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <img src={IMAGES.dashboard_icon} alt="dashboard_icon" className="" />,
    path: "/student/dashboard",
  },
  {
    key: "chats",
    label: "Chats",
    icon: <img src={IMAGES.chats_icon} alt="settings_icon" className="" />,
    path: "/student/chats",
  },
  {
    key: "profile",
    label: "Profile",
    icon: <img src={IMAGES.profile_icon} alt="settings_icon" className="" />,
    path: "/student/profile",
  },
];
