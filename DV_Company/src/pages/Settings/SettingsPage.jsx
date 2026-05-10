import React from "react";
import { useNavigate } from "react-router-dom";
import { IMAGES } from "../../assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserEdit,
  faLock,
  faFileAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { MdEditDocument } from "react-icons/md";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/AuthSlice";
import { toast } from "react-toastify";

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/admin/settings/edit-profile"); // Route to Edit Profile screen
  };

  const handlePrivacyPolicy = () => {
    navigate("/admin/privacy-policy"); // Route to Privacy Policy screen
  };

  const handleTermsConditions = () => {
    navigate("/admin/terms-conditions");
  };

  const handleLogout = () => {
    toast.success("Logged out successfully!");
    dispatch(logout());
    navigate("/");
  };

  const user = {
    name: "Zaki",
    email: "zaki@gmail.com",
    photo: IMAGES.student_avatar,
  };

  return (
    <>
      <div
        className={`flex items-center justify-center p-4 rounded-tl-3xl bg-white rounded-bl-3xl h-full w-full `}
      >
        <div className="flex flex-col w-full py-6 px-3 rounded-3xl font-semibold text-customBlue font-poppins">
          {/* Heading  */}
          <div className="flex text-4xl ml-4 mb-4 bg-customBlue text-white rounded-xl p-4">
            My Profile
          </div>

          {/* Pic and Details */}
          <div className="flex flex-row justify-start space-x-8 p-8">
            <div className="flex">
              <img
                src={IMAGES.student_avatar}
                alt="Avatar"
                className={`w-32 h-32 rounded-full cursor-pointer block`}
              />
            </div>
            <div className="flex flex-col">
              <p className="text-3xl">Zaki Mazhar</p>
              <p className="font-normal text-sm">zakimazharsultan@gmail.com</p>
            </div>
          </div>

          {/* Buttons  */}
          <div className="px-5 bg-gray-200 py-4">
            <p className="mb-3 ml-2">Account</p>
            <div>
              {/* <div
                onClick={handleEditProfile}
                className="flex items-center space-x-3 rounded-lg hover:bg-blue-200 p-2 cursor-pointer"
              >
                <div className={`bg-customPurpleShade p-3 rounded-lg`}>
                  <MdEditDocument color="purple" />
                </div>
                <p className="text-customGray font-medium text-sm">
                  Edit Profile
                </p>
              </div> */}
              <div
                onClick={handlePrivacyPolicy}
                className="flex items-center space-x-3 rounded-lg hover:bg-blue-200 p-2 cursor-pointer"
              >
                <div className={`bg-customLightBlueShade p-3 rounded-lg`}>
                  <img
                    src={IMAGES.lockColored_icon}
                    alt={`Lock icon`}
                    className="w-4 h-4"
                  />
                </div>
                <p className="text-customGray font-medium text-sm">
                  Privacy and Policy
                </p>
              </div>
              <div
                onClick={handleTermsConditions}
                className="flex items-center space-x-3 rounded-lg hover:bg-blue-200 p-2 cursor-pointer"
              >
                <div className={`bg-customLightYellowShade p-3 rounded-lg`}>
                  <img
                    src={IMAGES.termsColored_icon}
                    alt={`Tems icon`}
                    className="w-4 h-4"
                  />
                </div>
                <p className="text-customGray font-medium text-sm">
                  Terms & Conditions
                </p>
              </div>
              <div
                onClick={handleLogout}
                className="flex items-center space-x-3 rounded-lg hover:bg-blue-200 p-2 cursor-pointer"
              >
                <div className={`bg-customLightRedShade p-3 rounded-lg`}>
                  <img
                    src={IMAGES.logoutColored_icon}
                    alt={`Logout icon`}
                    className="w-4 h-4"
                  />
                </div>
                <p className="text-customGray font-medium text-sm">Log Out</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsScreen;
