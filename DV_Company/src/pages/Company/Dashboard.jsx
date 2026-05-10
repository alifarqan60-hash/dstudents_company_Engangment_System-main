import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import DetailsCard from "../../components/Dashboard/DetailsCard";
import ScheduledClassesCard from "../../components/Dashboard/ScheduledClassesCard";
import { getDetailsData } from "../../constants/detailsData";
import { useNavigate } from "react-router-dom";
import { getAllJobs } from "../../api/Jobs/allJobs";
import Loader from "../../components/Loader/Loader";

export default function Dashboard() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const giveBgColor = (index) => {
    const mod = index % 6;
    if (mod == 0) return "bg-customCard1Color";
    else if (mod == 1) return "bg-customCard2Color";
    else if (mod == 2) return "bg-customCard3Color";
    else if (mod == 3) return "bg-customCard4Color";
    else if (mod == 4) return "bg-customCard5Color";
    else if (mod == 5) return "bg-customCard6Color";
    else if (mod == 6) return "bg-customCard7Color";
    else return "bg-green-500";
  };

  const fetchJobs = async () => {
    const data = await getAllJobs();
    setJobs(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const applications = jobs?.flatMap((job) => job.applications);
  console.log("applications: ", applications);

  const detailsData =
    jobs && applications
      ? getDetailsData({ jobs, applications, navigate })
      : [];

  return (
    // Full Screen
    <div className="flex flex-row h-full">
      {/* White section */}
      <div className="bg-white flex-[5] w-full rounded-tl-3xl rounded-bl-3xl">
        <Navbar heading={"Dashboard"} />
        {/* Gradient Section  */}
        <div className="bg-custom-gradient3 w-full h-[100px] lg:h-[150px]"></div>

        {/* Main Section  */}

        {/* Details Cards */}
        <div className="-mt-20 mx-10 grid grid-cols-2 gap-2 md:flex-wrap">
          {detailsData?.map((item, index) => (
            <DetailsCard
              key={index}
              icon={item.icon}
              label={item.label}
              value={item.value}
              onClick={item.onClick}
              loading={loading}
            />
          ))}
        </div>

        {/* Recently Posted Jobs  */}
        <div className="mt-5">
          <div className="flex flex-row justify-between mx-8 mb-3">
            <p className="text-lg font-medium font-sans">
              Recently Posted Jobs
            </p>
            <p
              onClick={() => navigate("/company/jobs")}
              className="text-sm text-customBlue hover:underline cursor-pointer"
            >
              See all
            </p>
          </div>

          <div className="mx-5 flex flex-col md:flex-row gap-4">
            {loading ? (
              <div className="flex h-40 justify-center items-center w-full">
                <Loader />
              </div>
            ) : jobs?.length === 0 ? (
              <div className="flex h-40 justify-center items-center">
                <p>No Jobs added</p>
              </div>
            ) : (
              jobs
                ?.slice()
                .reverse()
                .slice(0, 3)
                .map((item, index) => (
                  <ScheduledClassesCard
                    key={index}
                    title={item?.title}
                    workingMode={item?.workingMode}
                    description={item?.description}
                    experienceRequired={item?.experienceRequired}
                    experienceLevel={item?.level}
                    skills={item?.skills}
                    deadline={item?.applicationDeadline?.slice(0, 10)}
                    company={item?.company}
                    type={item?.type}
                    bgColor={giveBgColor(index)}
                  // onDelete={onDelete}
                  />
                ))
            )}
          </div>
        </div>

        {/* Recently Added Users Table */}
        <div className="mt-5 mb-6">
          <div className="flex flex-row justify-between mx-8 mb-2">
            <p className="text-lg font-medium font-sans">Recent Applications</p>
            <p
              onClick={() => navigate("/company/applications")}
              className="text-sm text-customBlue hover:underline cursor-pointer"
            >
              See all
            </p>
          </div>

          <div className="mx-6 flex flex-col lg:grid lg:grid-cols-2 gap-3 font-medium mb-10">
            {loading ? (
              <div className="lg:col-span-2 flex justify-center py-10">
                <Loader />
              </div>
            ) : applications?.length === 0 ? (
              <div className="lg:col-span-2 flex justify-center py-10 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-gray-500 font-medium">No applications received recently</p>
              </div>
            ) : (
              applications
                ?.slice()
                .reverse()
                .slice(0, 4)
                .map((item, index) => (
                  <div
                    key={index}
                    onClick={() => navigate("/company/applications")}
                    className="w-full flex flex-col md:flex-row items-start md:items-center justify-between p-4 shadow-sm border border-gray-100 hover:border-blue-300 hover:shadow-md transition-all rounded-xl cursor-pointer bg-white"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                        {item?.userId?.username?.charAt(0)?.toUpperCase()}
                      </div>
                      <div>
                        <p className="text-gray-900 font-bold text-sm">
                          {item?.userId?.username || "Unknown Candidate"}
                        </p>
                        <p className="text-gray-500 text-xs mt-0.5">{item?.userId?.email}</p>
                      </div>
                    </div>
                    <div className="mt-3 md:mt-0 text-right w-full md:w-auto flex flex-row md:flex-col justify-between items-center md:items-end">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-100 text-emerald-700">
                        {item?.userId?.totalPoints || 0} Points
                      </span>
                      <p className="text-gray-400 text-xs mt-1">{item?.userId?.phoneNo || "No Phone"}</p>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
