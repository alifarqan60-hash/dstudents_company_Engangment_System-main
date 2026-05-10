import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import DetailsCard from "../components/Dashboard/DetailsCard";
import { useNavigate } from "react-router-dom";
import Coursetile from "../components/Admin/Courses/coursetile";
import coursecover from "../assets/coursecover.png";
import { getAllUsers } from "../api/Users/allUsers";
import { IMAGES } from "../assets";
import { getAllCourses } from "../api/Course/allCourses";
import { getAllCompanies } from "../api/Company/allCompanies";
import Loader from "../components/Loader/Loader";
import { getDetailsData } from "../constants/detailsData";
import { getAlldatasets } from "../api/dataset";
import { useSelector } from "react-redux";
import { MdBusiness, MdPerson, MdSchool } from "react-icons/md";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [usersData, coursesData, companiesData, datasetsData] =
          await Promise.allSettled([
            getAllUsers(),
            getAllCourses(),
            getAllCompanies(),
            getAlldatasets(),
          ]);

        if (usersData.status === "fulfilled") setUsers(usersData.value || []);
        if (coursesData.status === "fulfilled")
          setCourses(coursesData.value || []);
        if (companiesData.status === "fulfilled")
          setCompanies(companiesData.value || []);
        if (datasetsData.status === "fulfilled")
          setDatasets(datasetsData.value || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const detailsData =
    users && companies && courses && datasets
      ? getDetailsData({ users, courses, companies, datasets, navigate })
      : [];

  return (
    <div className="flex flex-row h-full">
      {/* White section */}
      <div className="bg-white flex-[5] w-full rounded-tl-3xl rounded-bl-3xl overflow-y-auto">
        {/* NavBar  */}
        <Navbar heading={"Dashboard"} name={user?.username} role={"Admin"} />
        {/* Gradient Section  */}
        <div className="bg-custom-gradient3 w-full h-[100px] lg:h-[150px]"></div>

        {/* Details Cards */}
        <div className="-mt-20 mx-10 grid grid-cols-2 md:flex gap-2 md:flex-wrap">
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

        {/* Recently Added Courses Cards  */}
        <div className="mt-8 px-8">
          <div className="flex flex-row justify-between mb-4">
            <p className="text-base font-bold text-gray-800 font-sans">
              Recently Added Courses
            </p>
            <p
              onClick={() => navigate("/admin/courses")}
              className="text-sm text-theme hover:underline cursor-pointer font-medium"
            >
              See all →
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 overflow-x-auto pb-2">
            {loading ? (
              <div className="flex h-40 justify-center items-center w-full">
                <Loader />
              </div>
            ) : courses?.length === 0 ? (
              <div className="flex h-40 justify-center items-center w-full border-2 border-dashed border-gray-200 rounded-2xl">
                <div className="text-center">
                  <MdSchool size={40} className="text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">No courses added yet</p>
                </div>
              </div>
            ) : (
              courses
                ?.slice()
                .reverse()
                .slice(0, 3)
                .map((course) => (
                  <Coursetile
                    key={course._id}
                    course={course}
                    cover={coursecover}
                    title={course.title}
                    tutor={course.instructor}
                    lessons={course.lectures?.length || 0}
                    quiz={course.lectures?.length || 0}
                    showBtn={false}
                    onDelete={() => { }}
                  />
                ))
            )}
          </div>
        </div>

        {/* Recently Added Users */}
        <div className="mt-8 px-8">
          <div className="flex flex-row justify-between mb-4">
            <p className="text-base font-bold text-gray-800 font-sans">
              Recently Added Users
            </p>
            <p
              onClick={() => navigate("/admin/users")}
              className="text-sm text-theme hover:underline cursor-pointer font-medium"
            >
              See all →
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {loading ? (
              <div className="flex h-40 justify-center items-center w-full col-span-2">
                <Loader />
              </div>
            ) : users?.length === 0 ? (
              <div className="flex h-40 justify-center items-center w-full col-span-2 border-2 border-dashed border-gray-200 rounded-2xl">
                <div className="text-center">
                  <MdPerson size={40} className="text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">No users added yet</p>
                </div>
              </div>
            ) : (
              users
                ?.slice()
                .reverse()
                .slice(0, 6)
                .map((item, index) => (
                  <div
                    key={index}
                    onClick={() => navigate("/admin/users")}
                    className="w-full flex flex-row items-center space-x-3 p-3 border border-gray-100 hover:border-gray-200 rounded-xl text-sm text-gray-600 cursor-pointer hover:shadow-sm transition-all"
                  >
                    <img
                      className="w-9 h-9 rounded-full object-cover bg-gray-100 flex-shrink-0"
                      src={item.imgUrl || item.photo || IMAGES.student_avatar}
                      alt={item.username}
                      onError={(e) => {
                        e.target.src = IMAGES.student_avatar;
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 truncate">
                        {item.username}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {item.email}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${item.isAdmin
                          ? "bg-purple-100 text-purple-600"
                          : item.isCompany
                            ? "bg-blue-100 text-blue-600"
                            : "bg-green-100 text-green-600"
                        }`}
                    >
                      {item.isAdmin
                        ? "Admin"
                        : item.isCompany
                          ? "Company"
                          : "User"}
                    </span>
                  </div>
                ))
            )}
          </div>
        </div>

        {/* Recently Added Companies */}
        <div className="mt-8 px-8 mb-10">
          <div className="flex flex-row justify-between mb-4">
            <p className="text-base font-bold text-gray-800 font-sans">
              Recently Added Companies
            </p>
            <p
              onClick={() => navigate("/admin/companies")}
              className="text-sm text-theme hover:underline cursor-pointer font-medium"
            >
              See all →
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {loading ? (
              <div className="flex h-40 justify-center items-center w-full col-span-2">
                <Loader />
              </div>
            ) : companies?.length === 0 ? (
              <div className="flex h-40 justify-center items-center w-full col-span-2 border-2 border-dashed border-gray-200 rounded-2xl">
                <div className="text-center">
                  <MdBusiness
                    size={40}
                    className="text-gray-300 mx-auto mb-2"
                  />
                  <p className="text-gray-400 text-sm">
                    No companies added yet
                  </p>
                </div>
              </div>
            ) : (
              companies
                ?.slice()
                .reverse()
                .slice(0, 6)
                .map((item, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      navigate("/admin/companies/details", {
                        state: { company: item },
                      })
                    }
                    className="w-full flex flex-row items-center space-x-3 p-3 border border-gray-100 hover:border-gray-200 rounded-xl text-sm text-gray-600 cursor-pointer hover:shadow-sm transition-all"
                  >
                    <img
                      className="w-9 h-9 rounded-full object-cover bg-gray-100 flex-shrink-0"
                      src={item.profileUrl || IMAGES.teacher_avatar}
                      alt={item.name}
                      onError={(e) => {
                        e.target.src = IMAGES.teacher_avatar;
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {item.email || "No email"}
                      </p>
                    </div>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium flex-shrink-0">
                      {item.noOfEmployees || 0} emp.
                    </span>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
