import React, { useEffect, useState } from "react";
import { FiSearch, FiBriefcase, FiSend } from "react-icons/fi";
import axiosInstance from "../../config/api";
import { useNavigate } from "react-router-dom";
import { IMAGES } from "../../constants/images";

export default function JobBoardLanding() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [filteredJobs, setFilteredJobs] = useState([]); 

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axiosInstance.get("/jobs/get-all");
        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter jobs based on search query
    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(query) ||
        job.company.name.toLowerCase().includes(query)
    );

    setFilteredJobs(filtered);
  };

  const handleNavigate = (id) => {
    navigate(`/app/jobs/detail/${id}`)
  }

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-customDarkBlue to-theme text-white py-20 px-8">
        <div className="mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Find Your Dream Job in Data Science</h1>
          <p className="text-lg mb-6">
            Explore thousands of job listings from top companies worldwide.
          </p>
          <div className="flex justify-center space-x-4">
            <div className="relative">
              {/* <FiSearch className="absolute left-3 top-3 text-gray-400" /> */}
              <img
                    src={IMAGES.search_icon1}
                    alt="Search Icon"
                    className="w-[20px]  h-[18px] absolute left-2 top-2.5"
                  />
              <input
                type="text"
                placeholder="Search for jobs..."
                value={searchQuery}
                onChange={handleSearch} // Handle search input
                className="px-10 py-2 rounded-md text-gray-800"
              />
            </div>
            <button className="bg-white text-theme px-6 py-2 rounded-md font-semibold">
              Search Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Featured Jobs */}
      <div className="max-w-7xl mx-auto mt-16 px-8">
        <h2 className="text-2xl font-bold text-customDarkBlue mb-6">Posted Jobs</h2>
        {loading ? (
          <p>Loading jobs...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300"
                >
                  <FiBriefcase className="text-theme mb-3" size={24} />
                  <h3 className="text-lg font-bold mb-2">{job.title}</h3>
                  <p className="text-gray-600">{job.company.name}</p>
                  <p className="text-sm text-gray-500 mb-4">
                    {job.workingMode} | {job.level}
                  </p>
                  <button 
                    className="bg-theme text-white px-6 py-3 rounded-md font-bold hover:bg-theme-dark transition"
                    onClick={() => handleNavigate(job._id)}
                  >
                    Details
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No jobs found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
