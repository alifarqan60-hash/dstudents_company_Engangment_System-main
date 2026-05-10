import React, { useEffect, useState } from "react";
import Header from "../../components/Navbar/CourseToggleBtnHeader";
import { useLocation } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import UserAddedPopup from "../../components/Admin/Quizes/UserAddedPopup";
import UserDeletedPopup from "../../components/Admin/Quizes/UserDeletedPopup";
import UserEditedPopup from "../../components/Admin/Quizes/UserEditedPopup";
import Loader from "../../components/Loader/Loader";
import UserDetailsCard from "../../components/Admin/Quizes/UserDetailsCard";
import AddUser from "../../components/Admin/Quizes/AddUser";
import Navbar from "../../components/Navbar/Navbar";
import { useOverLay } from "../../contexts/OverlayContext";
import { IMAGES } from "../../assets";
import { getAllQuizes } from "../../api/Course/allQuizes";
import { ToastContainer } from "react-toastify";

export default function QuizPage() {
  const [quizSelectedPage, setQuizSelectedPage] = useState("Quiz");
  const [selectedOption, setSelectedOption] = useState("This Week");
  const location = useLocation();
  const course = location.state?.course;
  const lectures = course?.lectures;
  //   console.log("lectures: ", lectures);

  //   if (lectures) {
  //     const quizzes = lectures.map((lecture) => lecture.quiz);
  //     console.log("Quizzes: ", quizzes);
  //   } else {
  //     console.log("No lectures available");
  //   }

  const handleProfilePageToggle = (page) => {
    setQuizSelectedPage(page);
  };

  const [quizes, setQuizes] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [addedPopup, setAddedPopup] = useState(false);
  const [deletedPopup, setDeletedPopup] = useState(false);
  const { toggleOverlay, isOverlayEnable } = useOverLay();
  // const [deletedUserName, setDeletedUserName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [editedPopup, setEditedPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  const [selectedUser, setSelectedUser] = useState(null);
  const [deletedUser, setDeletedUser] = useState(null);

  const fetchQuizzes = async () => {
    const data = await getAllQuizes();
    setQuizes(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  useEffect(() => {
    if (userModal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [userModal]);

  // Filter users based on search query
  const filteredQuizes = quizes?.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const quizPerPage = 6;

  // Calculate the index range of users to display for the current page
  const indexOfLastQuiz = currentPage * quizPerPage;
  const indexOfFirstQuiz = indexOfLastQuiz - quizPerPage;
  const currentQuizes = filteredQuizes?.slice(
    indexOfFirstQuiz,
    indexOfLastQuiz
  );

  // Function to handle next page
  const nextPage = () => {
    if (indexOfLastQuiz < filteredQuizes?.length) {
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

  const toggleEditModal = (user) => {
    setSelectedUser(user);
    setEditModal(!editModal);
    toggleOverlay();
  };

  const toggleEditedPopup = () => {
    setEditedPopup(!editedPopup);
  };

  const toggleAddedPopup = () => {
    setAddedPopup(!addedPopup);
  };

  const toggleDeletedPopup = (user) => {
    setDeletedUser(user);
    setDeletedPopup(!deletedPopup);
    toggleOverlay();
  };

  return (
    <>
      <div
        className={`flex flex-col p-2 rounded-tl-3xl bg-white rounded-bl-3xl h-full w-full`}
      >
        {/* Header  */}

        <Navbar heading={"Quizzes"} name={"Alex Jhons"} role={"Admin"} />

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
                <p className="text-white font-normal ml-2">Add Quiz</p>
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
                placeholder="Search User"
                value={searchQuery}
                onChange={handleSearchChange}
                className="text-sm focus:outline-none active:outline-none rounded-r-lg h-10 w-full px-2 py-1 "
              />
            </div>
          </div>

          {/* Table Headings  */}
          <div className="flex flex-row items-center shadow-md p-3 font-sans font-normal text-xs text-customGrayText">
            <p className="flex-[5] ">Title</p>
            <p className="flex-[5] ">Type</p>
            <p className="flex-[5] ">Points</p>
            <p className="flex-[5] ">Actions</p>
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
                user={deletedUser}
                toggleFunc={toggleDeletedPopup}
              />
            )}
            {editedPopup && (
              <UserEditedPopup
                toggleFunc={toggleEditedPopup}
                toggleModal={toggleEditModal}
              />
            )}
            <div>
              {loading ? (
                <>
                  <div className="flex h-40 justify-center items-center w-full">
                    <Loader />
                  </div>
                </>
              ) : currentQuizes?.length === 0 ? (
                <div className="flex h-40 justify-center items-center">
                  <p>No users added</p>
                </div>
              ) : (
                currentQuizes?.map((quiz, index) => (
                  <UserDetailsCard
                    key={index}
                    id={quiz._id}
                    title={quiz.title}
                    type={quiz.type}
                    points={quiz.points}
                    lecture={lectures}
                    course={course}
                    toggleDeletedPopup={toggleDeletedPopup}
                    toggleEditModal={toggleEditModal}
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
              filteredQuizes.length / quizPerPage
            )}`}</p>
            <button
              onClick={nextPage}
              disabled={indexOfLastQuiz >= filteredQuizes.length}
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
