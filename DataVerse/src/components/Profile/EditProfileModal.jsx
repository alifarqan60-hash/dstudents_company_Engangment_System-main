import React, { useEffect, useState } from "react";

const EditProfileModal = ({ isOpen, onClose, profileDetails, skills, onSave }) => {
  const [formData, setFormData] = useState({...profileDetails, skills});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
  }, [profileDetails]);

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md h-full max-h-[80vh] mt-5 overflow-y-auto register-scrollbar2">
        <h2 className="text-lg font-bold mb-4">Edit Profile</h2>

        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            name="username"
            value={formData?.username}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Profile Summary Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Profile Summary</label>
          <textarea
            name="summary"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            rows="3"
          />
        </div>

        {/* Skills Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Skills</label>
          <textarea
            name="skills"
            value={formData.skills.join(", ")}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            rows="2"
          />
          <p className="text-xs text-gray-500 mt-1">Separate skills with commas</p>
        </div>

        {/* Location Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Social Media Inputs */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Twitter</label>
          <input
            type="text"
            name="twitter"
            value={formData.twitter_Acc}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">GitHub</label>
          <input
            type="text"
            name="github"
            value={formData.github_Acc}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">LinkedIn</label>
          <input
            type="text"
            name="linkedin"
            value={formData.linkedIn_Acc}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Save and Cancel Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white text-customBlue font-medium rounded-md border border-customBlue hover:bg-gray-200 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-customBlue text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
