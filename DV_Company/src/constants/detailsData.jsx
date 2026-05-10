import { MdOutlineWork } from "react-icons/md";
import { GrNotes } from "react-icons/gr";

export const getDetailsData = ({ jobs, applications, navigate }) => {
  return [
    // {
    //   icon: <img src={IMAGES.users_card_icon} alt="users_icon" className="" />,
    //   label: "Employees",
    //   value: 510,
    // },
    {
      icon: (
        // <img src={IMAGES.teachers_card_icon} alt="teachers_icon" className="" />
        <MdOutlineWork size={40} color="darkBlue" />
      ),
      label: "Jobs Openings",
      value: jobs?.length,
      onClick: () => navigate("/company/jobs"),
    },
    {
      icon: <GrNotes size={40} color="darkBlue" />,

      label: "Applications",
      value: applications?.length,
      onClick: () => navigate("/company/applications"),
    },
    // {
    //   icon: (
    //     <img src={IMAGES.teachers_card_icon} alt="parents_icon" className="" />
    //   ),
    //   label: "Departments",
    //   value: 180,
    // },
  ];
};
