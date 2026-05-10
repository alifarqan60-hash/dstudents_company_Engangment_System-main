import React from "react";
import { GoCheck } from "react-icons/go";
import { LuTrash2 } from "react-icons/lu";
import { IMAGES } from "../../../assets";
import { deleteCompany } from "../../../api/Company/deleteCompany";
import Loader from "../../Loader/Loader";

export default function CompanyDeletedPopup({ company, toggleFunc }) {
  const [loader, setLoader] = React.useState(false);
  console.log("Company: ", company.id);
  console.log("CompanyName: ", company.name);
  const handleDeleteClick = async () => {
    setLoader(true);
    console.log("delete function called: ", company.id);
    try {
      await deleteCompany(company.id);
      // toast.success("User Deleted Successfully");
      console.log("Deleted Company, CLG in delete function");
      window.location.reload();
      toggleFunc();
    } catch (error) {
      // toast.error("Failed to delete company");
      console.error("Error deleting company:", error);
    }
    setLoader(false);
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center h-screen w-auto z-10">
        <div className="w-[320px] bg-customPopupBgColor p-4 rounded-3xl font-sans space-y-3 border border-gray-300">
          <div className="flex-1 flex flex-row items-center p-2 ">
            <LuTrash2 className="text-customLightRed" size={25} />
            <p className="text-customLightRed font-semibold text-xl ml-3">
              Delete
            </p>
          </div>

          <div className="flex-[2] font-normal text-sm text-customPopupTextColor mb-2">
            Are you sure you want to delete{" "}
            <span className="name font-semibold text-customDarkBlue">
              <span className="items-center">
                <img
                  src={IMAGES.avatar2}
                  alt="avatar"
                  className="w-6 h-6 mr-1 inline-block "
                />
                {company.name}
              </span>
            </span>{" "}
            from the system?
          </div>

          <div className="flex-[2] font-normal text-sm text-customPopupTextColor mb-2">
            This action cannot be undone. Deleting this company will remove all
            their data.
          </div>

          <div className=" flex flex-col space-y-2 ">
            <button
              className="p-2 px-9 bg-customCancelBtnColor text-customGray text-sm font-normal rounded-3xl w-full"
              onClick={toggleFunc}
            >
              Cancel
            </button>
            {loader ? (
              <Loader />
            ) : (
              <button
                className="p-2 px-9 bg-customLightRed text-white text-sm font-normal rounded-3xl w-full"
                onClick={handleDeleteClick}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
