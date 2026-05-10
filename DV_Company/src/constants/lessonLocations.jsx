import { BiLink } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";

export const lessonLocations = [
  {
    label: "Student's Home",
    icon: null,
    title: "",
    inputArea: "Student's Home",
  },
  {
    label: "Face to Face",
    icon: null,
    title: "",
    inputArea: "Face to Face",
  },
  {
    label: "Off-site",
    icon: <MdLocationOn size={22} />,
    title: "Add Location (Optional)",
    inputArea: "Choose from Map",
  },
  {
    label: "Virtual",
    icon: <BiLink size={22} />,
    title: "Add Class Link",
    inputArea: "http:classroom.google/32j43hi3jk32h4",
  },
  {
    label: "Learning Pack",
    icon: <BiLink size={22} />,
    title: "Add Learning Resources Link",
    inputArea: "http:drive.google/32j43hi3jk32h4",
  },
  {
    label: "Online Course",
    icon: <BiLink size={22} />,
    title: "Add Online Course Link",
    inputArea: "http:udemy.appdevelopment/32j43hi3jk32h4",
  },
];
