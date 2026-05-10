import React, { useEffect, useState } from "react";
import { IMAGES } from "../../assets";
import Loader from "../../components/Loader/Loader";
// import Loader from "../../components/global/Loader";
// import { IMAGES } from "../../assets";

const EditProfileScreen = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    password: "********",
    profilePicture: null,
  });

  const user = {};
  // This will trigger every time user changes

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setProfileData({ ...profileData, [name]: value });
  //   };

  //   const handleImageChange = (e) => {
  //     const file = e.target.files[0];
  //     setProfileData({ ...profileData, profilePicture: file });
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     // Check if name or password has changed or if a new file is uploaded
  //     if (
  //       profileData.name !== user?.username ||
  //       profileData.password !== "********" ||
  //       profileData.profilePicture
  //     ) {
  //       // Prepare form data if profile picture exists
  //       const formData = new FormData();
  //       formData.append("name", profileData.name);

  //       if (profileData.password !== "********") {
  //         formData.append("password", profileData.password);
  //       }

  //       // Check if a new profile picture has been uploaded
  //       if (profileData.profilePicture) {
  //         formData.append("profilePicture", profileData.profilePicture);
  //       }

  //       try {
  //         // Make API request to update the profile
  //         const response = await axiosInstance.put("/auth/update-profile", formData);

  //         if (response.status === 200) {
  //           toast.success("Profile updated successfully!");
  //         } else {
  //           toast.error("Failed to update profile.");
  //         }
  //       } catch (error) {
  //         console.error("Error updating profile:", error);
  //         toast.error("An error occurred while updating the profile.");
  //       }
  //     } else {
  //       toast.error("No changes found!");
  //     }
  //   };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center rounded-tl-3xl bg-white rounded-bl-3xl">
      {user ? (
        <div className="w-full bg-gray-100 shadow-md rounded-md p-6 ">
          <h1 className="text-4xl font-bold mb-6 text-center">Edit Profile</h1>

          {/* <form onSubmit={handleSubmit} className="space-y-4"> */}
          <form className="space-y-4">
            {/* Profile Picture Upload */}
            {/* <div className="flex flex-col items-center space-y-2">
            {user?.imgUrl ? (
              <img
                src={user?.imgUrl}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-customBlue font-bold text-6xl">
                  {user?.username?.at(0).toUpperCase()}
                </span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2 text-sm"
            />
          </div> */}
            <div className="flex flex-col items-center space-y-2">
              <img
                src={IMAGES.teacher_avatar}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
            {/* Name */}
            <div className="mt-10">
              <label htmlFor="name" className="block font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={profileData.name}
                // onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email (disabled) */}
            <div>
              <label htmlFor="email" className="block font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={profileData.email}
                // onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                disabled
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={profileData.password}
                // onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter a new password"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
            >
              Save Changes
            </button>
          </form>
        </div>
      ) : (
        <Loader />
      )}

      {/* Toast Notification */}
      {/* <ToastContainer /> */}
    </div>
  );
};

export default EditProfileScreen;
