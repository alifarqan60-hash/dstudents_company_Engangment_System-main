import React, { useState, useEffect } from "react";
import { IMAGES } from "../../../assets";
import { RiCloseLine } from "react-icons/ri";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { updateCompany } from "../../../api/Company/updateCompany";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Loader/Loader";
import { MdOutlineEdit } from "react-icons/md";

export default function EditCompany({
  company,
  toggleFunc,
  toggleEditedPopup,
  editedPopup,
}) {
  const [name, setName] = useState(company?.name || "");
  const [email, setEmail] = useState(company?.email || "");
  const [phoneNo, setPhoneNo] = useState(company?.phoneNo || "");
  const [noOfEmployees, setNoOfEmployees] = useState(
    company?.noOfEmployees || ""
  );
  const [description, setDescription] = useState(company?.description || "");
  const [websiteUrl, setWebsiteUrl] = useState(company?.websiteUrl || "");
  const [photo, setPhoto] = useState(company?.profileUrl || "");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (company) {
      setName(company.name || "");
      setEmail(company.email || "");
      setPhoneNo(company.phoneNo || "");
      setNoOfEmployees(company.noOfEmployees || "");
      setDescription(company.description || "");
      setWebsiteUrl(company.websiteUrl || "");
      setPhoto(company.profileUrl || "");
    }
  }, [company]);

  const uploadFile = async () => {
    if (!photo || typeof photo === "string") {
      return photo;
    }
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `companies/${Date.now()}_${photo.name}`);
      const response = await uploadBytes(storageRef, photo);
      const fileUrl = await getDownloadURL(response.ref);
      return fileUrl;
    } catch (error) {
      console.error("Firebase upload error:", error);
      return company?.profileUrl;
    }
  };

  const handleUpdateClick = async () => {
    if (!name || !email) {
      toast.error("Company name and email are required");
      return;
    }
    setLoader(true);
    try {
      const fileUrl = await uploadFile();
      const updatedData = {
        name,
        email,
        phoneNo,
        noOfEmployees: parseInt(noOfEmployees) || 0,
        description,
        websiteUrl,
        profileUrl: fileUrl,
      };
      await updateCompany(company._id, updatedData);
      toast.success("Company updated successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update company");
      console.error("Error updating company:", error);
    } finally {
      setLoader(false);
    }
  };

  const photoSrc =
    photo
      ? typeof photo === "string"
        ? photo
        : URL.createObjectURL(photo)
      : IMAGES.teacher_avatar;

  return (
    <div className="z-50 h-screen rounded-l-3xl bg-gray-50 absolute flex justify-end right-0 font-sans shadow-2xl overflow-y-auto">
      {editedPopup && (
        <div className="bg-black fixed inset-0 opacity-40 z-[-1]" />
      )}
      <ToastContainer position="bottom-right" autoClose={2000} />

      <div className="w-[420px] bg-white h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Edit Company</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Update company information
            </p>
          </div>
          <button
            onClick={toggleFunc}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-colors"
          >
            <RiCloseLine size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {/* Avatar Upload */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img
                src={photoSrc}
                alt="Company Logo"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <label
                htmlFor="edit-company-file"
                className="absolute bottom-0 right-0 bg-customMaroon w-8 h-8 rounded-full flex items-center justify-center cursor-pointer shadow-md hover:bg-red-700 transition-colors"
              >
                <MdOutlineEdit size={15} color="white" />
              </label>
              <input
                type="file"
                id="edit-company-file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                className="hidden"
              />
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Company Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter company name"
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter company email"
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Phone Number
              </label>
              <div className="border border-gray-200 rounded-lg overflow-hidden focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <PhoneInput
                  country={"pk"}
                  enableSearch={true}
                  value={phoneNo}
                  onChange={(phone, country, e, formattedValue) =>
                    setPhoneNo(formattedValue)
                  }
                  placeholder="Enter phone number"
                  containerStyle={{ width: "100%" }}
                  inputStyle={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                    fontSize: "14px",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                  }}
                  buttonStyle={{ border: "none", background: "transparent" }}
                />
              </div>
            </div>

            {/* No. of Employees */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Number of Employees
              </label>
              <input
                type="number"
                min="0"
                value={noOfEmployees}
                onChange={(e) => setNoOfEmployees(e.target.value)}
                placeholder="e.g. 250"
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            {/* Website URL */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Website URL
              </label>
              <input
                type="text"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the company..."
                rows={3}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
          <div className="flex gap-3">
            <button
              onClick={toggleFunc}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            {loader ? (
              <div className="flex-1 flex justify-center items-center">
                <Loader />
              </div>
            ) : (
              <button
                onClick={handleUpdateClick}
                className="flex-1 py-2.5 bg-customMaroon rounded-xl text-white text-sm font-semibold hover:bg-opacity-90 transition-all shadow-md shadow-red-100"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
