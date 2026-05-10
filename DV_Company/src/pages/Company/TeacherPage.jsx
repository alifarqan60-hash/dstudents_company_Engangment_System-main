import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineFilterList,
} from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import TeacherDetailsCard from "../../components/Admin/Teachers/TeacherDetailsCard";
import { teacherDetails } from "../../constants/teacherDetails";
import AddTeacher from "../../components/Admin/Teachers/AddTeacher";
import { useOverLay } from "../../contexts/OverlayContext";
import TeacherAddedPopup from "../../components/Admin/Teachers/TeacherAddedPopup";
import TeacherDeletedPopup from "../../components/Admin/Teachers/TeacherDeletedPopup";

export default function TeacherPage() {
  const [teachers, setTeachers] = useState(teacherDetails);
  const [allChecked, setAllChecked] = useState(false);
  const [teacherModal, setTeacherModal] = useState(false);
  const [addedPopup, setAddedPopup] = useState(false);
  const [deletedPopup, setDeletedPopup] = useState(false);
  const { toggleOverlay, isOverlayEnable } = useOverLay();
  const [deletedTeacherName, setDeletedTeacherName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (teacherModal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [teacherModal]);

  const filterTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const teachersPerPage = 6;

  // Calculate the index range of teachers to display for the current page
  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = filterTeachers.slice(
    indexOfFirstTeacher,
    indexOfLastTeacher
  );

  // Function to handle next page
  const nextPage = () => {
    if (indexOfLastTeacher < filterTeachers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to handle previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleTeacherModal = () => {
    setTeacherModal(!teacherModal);
    toggleOverlay();
  };

  const toggleAddedPopup = () => {
    setAddedPopup(!addedPopup);
  };

  const toggleDeletedPopup = (name) => {
    setDeletedTeacherName(name);
    setDeletedPopup(!deletedPopup);
    toggleOverlay();
  };

  const toggleCheckbox = (id) => {
    setTeachers((prevTeachers) =>
      prevTeachers.map((teacher) =>
        teacher.id === id ? { ...teacher, checked: !teacher.checked } : teacher
      )
    );
  };

  const toggleAllCheckboxes = () => {
    setAllChecked(!allChecked);
  };

  return (
    // Full Screen
    <>
      <div
        className={`flex flex-row rounded-tl-3xl bg-white rounded-bl-3xl h-full`}
      >
        <div className=" flex-[5] w-full ">
          {/* NavBar  */}
          <Navbar heading={"Teachers"} name={"Alex Jhons"} role={"Admin"} />

          {/* Screen Main Content  */}
          <div className="mt-10 w-full px-8 mb-16">
            {/* Buttons & Search Container  */}
            <div className="flex flex-row w-auto justify-between mb-2 font-sans">
              {/* Buttons Div  */}
              <div className="flex flex-1 flex-row flex-wrap md:flex-nowrap text-xxs md:text-xs gap-4 md:gap-0 space-x-2 items-center">
                <button className="flex flex-row justify-center p-2 pr-3 border rounded-lg border-gray-300">
                  <MdOutlineFilterList
                    className="text-customBlue font-bold"
                    size={16}
                  />
                  <p className=" text-customBlue font-medium ml-2">Filters</p>
                </button>
                <button
                  onClick={toggleTeacherModal}
                  className="flex flex-row items-center justify-center p-2 pr-3 border rounded-lg border-gray-300 bg-customMaroon"
                >
                  <GoPlus color="white" size={15} />
                  <p className="text-white font-normal ml-2">Add Teacher</p>
                </button>

                <p className="text-xs text-customDarkBlue font-medium">
                  1 row selected
                </p>
              </div>

              {/* SearchBar Div  */}
              <div className="flex items-center border h-12 border-gray-300 rounded-lg">
                <button className="bg-white px-2 py-3 rounded-l-lg flex items-center justify-center">
                  <FiSearch className="text-gray-400" size={18} />
                </button>
                <input
                  type="text"
                  placeholder="Search Teacher"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="text-sm focus:outline-none active:outline-none rounded-r-lg h-10 w-full px-2 py-1 "
                />
              </div>
            </div>

            {/* Table Headings  */}
            <div className="flex flex-row items-center shadow-md p-3 font-sans font-normal text-xs text-customGrayText">
              {/* checkbox  */}
              <div
                className="flex-1 cursor-pointer text-customMaroon"
                onClick={toggleAllCheckboxes}
              >
                {allChecked ? (
                  <MdOutlineCheckBox size={20} />
                ) : (
                  <MdOutlineCheckBoxOutlineBlank
                    size={20}
                    className="text-customLightGray"
                  />
                )}
              </div>

              <p className="flex-[5] ">Name</p>
              <p className="flex-[7] ">Email</p>
              <p className="flex-[4] ">Assigned Classes</p>
              <p className="flex-[6] ">Timetable</p>
            </div>

            {/* Table  */}
            <div>
              {addedPopup && (
                <TeacherAddedPopup
                  name={"John Doe"}
                  toggleFunc={toggleAddedPopup}
                />
              )}
              {deletedPopup && (
                <TeacherDeletedPopup
                  name={deletedTeacherName}
                  toggleFunc={toggleDeletedPopup}
                />
              )}
              <div>
                {currentTeachers.map((teacher) => (
                  <TeacherDetailsCard
                    key={teacher.id}
                    id={teacher.id}
                    name={teacher.name}
                    email={teacher.email}
                    assignedClasses={teacher.assignedClasses}
                    checked={teacher.checked}
                    toggleCheckbox={toggleCheckbox}
                    toggleDeletedPopup={toggleDeletedPopup}
                  />
                ))}
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
                filterTeachers.length / teachersPerPage
              )}`}</p>
              <button
                onClick={nextPage}
                disabled={indexOfLastTeacher >= filterTeachers.length}
                className="flex justify-center p-2 pr-3 border rounded-lg border-gray-300"
              >
                <p className="text-xs font-medium ml-2">Next</p>
              </button>
            </div>
          </div>
        </div>
        {teacherModal && (
          <AddTeacher
            toggleFunc={toggleTeacherModal}
            addedPopup={addedPopup}
            toggleAddedPopup={toggleAddedPopup}
          />
        )}
      </div>
    </>
  );
}
