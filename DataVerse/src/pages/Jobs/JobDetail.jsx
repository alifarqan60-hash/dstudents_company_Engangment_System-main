import React, { useEffect, useState } from "react";
import { FiMapPin, FiClock, FiDollarSign } from "react-icons/fi";
import { useParams } from "react-router-dom";
import axiosInstance from "../../config/api";
import { MdPunchClock } from "react-icons/md";
import { CiViewTimeline } from "react-icons/ci";
import { cloudname, preset } from "../../config/cloudinary";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

export default function JobDetail() {
  const { jobId } = useParams();
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [file, setFile] = useState(null); // File input state
  const [uploading, setUploading] = useState(false); // Uploading state
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axiosInstance.get(`/jobs/${jobId}`);
        console.log("job: ", response.data);
        setJob(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file!");
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axiosInstance.post(
        "/upload-local",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status !== 200) {
        throw new Error("Failed to upload file to local storage");
      }
      const urlDoc = response.data.secure_url;
      console.log("Uploaded file URL: ", urlDoc);
      const body = {
        userId: user?._id,
        docUrl: urlDoc
      }

      const applicationResponse = await axiosInstance.post(`/jobs/${jobId}/apply`, body);
      if (applicationResponse) {
        toast.success("Job applied successfully")
        setFile(null);
        setIsModalOpen(false);
      }


    } catch (err) {
      console.error("Error uploading file: ", err);
      alert("Failed to upload the file.");
    } finally {
      setUploading(false);
      setFile(null);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <div className="max-w-5xl mx-auto py-12 px-6">
        {/* Job Title and Company Info */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800">{job?.title}</h1>
          <p className="text-gray-500 mt-2">{job?.company?.name}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 mt-4 text-gray-600">
              <div className="flex items-center space-x-1">
                <MdPunchClock />
                <span>{job?.workingMode}</span>
              </div>
              <div className="flex items-center space-x-1">
                <CiViewTimeline />
                <span>{job?.experienceRequired} experience required</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              {job?.applicationDeadline && (
                <p className="text-red-500 font-semibold">
                  Application Deadline: {formatDate(job.applicationDeadline)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Job Description</h2>
          <p className="text-gray-700 leading-relaxed">{job?.description}</p>
        </div>

        {/* Qualifications */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Qualifications</h2>
          <ul className="list-disc list-inside text-gray-700">
            {job?.skills.map((qualification, index) => (
              <li key={index}>{qualification}</li>
            ))}
          </ul>
        </div>

        {/* Apply Section */}
        <div className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Ready to Apply?</h2>
            <p className="text-gray-600">Take the next step towards your dream job.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-theme text-white px-6 py-3 rounded-md font-bold hover:bg-theme-dark transition"
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-1/3 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Upload Your Resume</h2>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="block w-full mb-4 border border-gray-300 rounded-md p-2"
            />
            <div className="flex justify-between">
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="bg-blue-600 text-white px-6 py-2 rounded-md font-bold hover:bg-blue-700 transition"
              >
                {uploading ? "Uploading..." : "Submit Application"}
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-500 text-white px-6 py-2 rounded-md font-bold hover:bg-red-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
