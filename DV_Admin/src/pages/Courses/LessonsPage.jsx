import React, { useEffect, useState } from "react";
import Header from "../../components/Navbar/CourseToggleBtnHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { useOverLay } from "../../contexts/OverlayContext";
import UserAddedPopup from "../../components/Admin/Courses/Lessons/UserAddedPopup";
import UserDeletedPopup from "../../components/Admin/Courses/Lessons/UserDeletedPopup";
import Loader from "../../components/Loader/Loader";
import UserDetailsCard from "../../components/Admin/Courses/Lessons/UserDetailsCard";
import AddUser from "../../components/Admin/Courses/Lessons/AddUser";
import { IMAGES } from "../../assets";

// "66e3daee8798ba3360952ac6"

export default function LessonsPage() {
  const [lessonSelectedPage, setLessonSelectedPage] = useState("Lesson");
  const location = useLocation();
  const course = location.state?.course;
  //   const lectures = course.lectures;

  const handleLessonPageToggle = (page) => {
    setLessonSelectedPage(page);
  };

  const [lectures, setLectures] = useState(course?.lectures);
  const [allChecked, setAllChecked] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [addedPopup, setAddedPopup] = useState(false);
  const [deletedPopup, setDeletedPopup] = useState(false);
  const { toggleOverlay, isOverlayEnable } = useOverLay();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [deletedUser, setDeletedUser] = useState(null);

  //   const fetchUsers = async () => {
  //     const data = await getAllUsers();
  //     setUsers(data);
  //     setLoading(false);
  //   };

  //   useEffect(() => {
  //     fetchUsers();
  //   }, []);

  useEffect(() => {
    if (userModal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [userModal]);

  // Filter users based on search query
  const filteredLectures = lectures?.filter((lecture) =>
    lecture.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const lecturesPerPage = 6;

  // Calculate the index range of users to display for the current page
  const indexOfLastLecture = currentPage * lecturesPerPage;
  const indexOfFirstLecture = indexOfLastLecture - lecturesPerPage;
  const currentLectures = filteredLectures.slice(
    indexOfFirstLecture,
    indexOfLastLecture
  );

  // Function to handle next page
  const nextPage = () => {
    if (indexOfLastLecture < filteredLectures.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to handle previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleUserModal = () => {
    setUserModal(!userModal);
    toggleOverlay();
  };

  const toggleAddedPopup = () => {
    setAddedPopup(!addedPopup);
  };

  const toggleDeletedPopup = (user) => {
    setDeletedUser(user);
    console.log("Toggle", user);
    setDeletedPopup(!deletedPopup);
    toggleOverlay();
  };

  return (
    <>
      <div
        className={`flex flex-col p-2 rounded-tl-3xl bg-white rounded-bl-3xl h-full w-full space-y-4`}
      >
        {/* Header  */}
        <Header
          selectedPage={lessonSelectedPage}
          handlePageToggle={setLessonSelectedPage}
          course={location.state}
        />

        {/* Screen Main Content  */}
        <div className="mt-10 w-full px-8 mb-16">
          {/* Buttons & Search Container  */}
          <div className="flex flex-row w-auto items-center justify-between mb-2 font-sans">
            {/* Buttons Div  */}
            <div className="flex flex-1 flex-row flex-wrap md:flex-nowrap text-xxs md:text-xs gap-4 md:gap-0 space-x-2 items-center">
              <button
                onClick={toggleUserModal}
                className="flex flex-row items-center justify-center p-2 pr-3 border rounded-lg border-gray-300 bg-customMaroon"
              >
                <GoPlus color="white" size={15} />
                <p className="text-white font-normal ml-2">Add Lesson</p>
              </button>
            </div>

            {/* SearchBar Div  */}
            <div className="flex items-center border h-12 border-gray-300 rounded-lg">
              <button className="bg-white px-2 py-3 rounded-l-lg flex items-center justify-center">
                {/* <FiSearch className="text-gray-400" size={18} /> */}
                <img
                  src={IMAGES.search_icon1}
                  alt="Search Icon"
                  className="w-[18px]  h-[16px]"
                />
              </button>
              <input
                type="text"
                placeholder="Search Lecture"
                value={searchQuery}
                onChange={handleSearchChange}
                className="text-sm focus:outline-none active:outline-none rounded-r-lg h-10 w-full px-2 py-1 "
              />
            </div>
          </div>

          {/* Table Headings  */}
          <div className="flex flex-row items-center shadow-md p-3 font-sans font-normal text-xs text-customGrayText">
            <p className="flex-[5] ">Title</p>
            <p className="flex-[5] ">Content</p>
            <p className="flex-[5] ">Lesson Type</p>
            <p className="flex-[5] ">Action</p>
          </div>

          {/* Table  */}
          <div>
            {addedPopup && (
              <UserAddedPopup
                toggleModal={toggleUserModal}
                toggleFunc={toggleAddedPopup}
              />
            )}
            {deletedPopup && (
              <UserDeletedPopup
                cid={course?._id}
                user={deletedUser}
                toggleFunc={toggleDeletedPopup}
              />
            )}
            <div>
              {loading ? (
                <>
                  <div className="flex h-40 justify-center items-center w-full">
                    <Loader />
                  </div>
                </>
              ) : currentLectures?.length === 0 ? (
                <div className="flex h-40 justify-center items-center">
                  <p>No lectures added</p>
                </div>
              ) : (
                currentLectures?.map((lecture, index) => (
                  <UserDetailsCard
                    key={index}
                    type={lecture?.type}
                    id={lecture._id}
                    title={lecture.title}
                    videoUrl={lecture.videoUrl}
                    quiz={lecture.quiz}
                    index={lecture.index}
                    toggleDeletedPopup={toggleDeletedPopup}
                    // toggleEditModal={toggleEditModal}
                  />
                ))
              )}
            </div>
          </div>

          {/* Prev & Next Buttons  */}
          <div className="flex flex-row items-center text-customBlue font-sans justify-between p-3 px-4 shadow-md">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className=" flex justify-center p-2 pr-3 border rounded-lg border-gray-300"
            >
              <p className=" text-xs font-medium ml-2">Previous</p>
            </button>
            <p className=" font-medium text-sm">{`${currentPage} out of ${Math.ceil(
              filteredLectures.length / lecturesPerPage
            )}`}</p>
            <button
              onClick={nextPage}
              disabled={indexOfLastLecture >= filteredLectures.length}
              className="flex justify-center p-2 pr-3 border rounded-lg border-gray-300"
            >
              <p className="text-xs font-medium ml-2">Next</p>
            </button>
          </div>
        </div>
        {userModal && (
          <AddUser
            cid={course?._id}
            course={course}
            toggleFunc={toggleUserModal}
            addedPopup={addedPopup}
            toggleAddedPopup={toggleAddedPopup}
          />
        )}
      </div>
    </>
  );
}
