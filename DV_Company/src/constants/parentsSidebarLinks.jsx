import { IMAGES } from "../assets";

export const parents_sidebar_links = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <img src={IMAGES.dashboard_icon} alt="dashboard_icon" className="" />,
    path: "/parents/dashboard",
  },
  {
    key: "settings",
    label: "Settings",
    icon: <img src={IMAGES.settings_icon} alt="settings_icon" className="" />,
    path: "/parents/settings",
  },
];
