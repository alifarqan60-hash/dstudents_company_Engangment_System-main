import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { GoPlus } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import UserDetailsCard from "../../components/Admin/Users/UserDetailsCard";
import { userDetails } from "../../constants/userDetails";
import AddUser from "../../components/Admin/Users/AddUser";
import { useOverLay } from "../../contexts/OverlayContext";
import UserAddedPopup from "../../components/Admin/Users/UserAddedPopup";
import UserDeletedPopup from "../../components/Admin/Users/UserDeletedPopup";
import EditUser from "../../components/Admin/Users/EditUser";
import UserEditedPopup from "../../components/Admin/Users/UserEditedPopup";
import { IMAGES } from "../../assets";
import { getAllUsers } from "../../api/Users/allUsers";
import Loader from "../../components/Loader/Loader";

export default function UserPage() {
  // const [users, setUsers] = useState(userDetails);
  const [users, setUsers] = useState([]);
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

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data || []);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (userModal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [userModal]);

  // Filter users based on search query
  const filteredUsers = users?.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  // Calculate the index range of users to display for the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Function to handle next page
  const nextPage = () => {
    if (indexOfLastUser < filteredUsers.length) {
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
    // Full Screen
    <>
      <div
        className={`flex flex-row rounded-tl-3xl bg-white rounded-bl-3xl h-full`}
      >
        <div className=" flex-[5] w-full ">
          {/* NavBar  */}
          <Navbar heading={"Users"} />

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
                  <p className="text-white font-normal ml-2">Add User</p>
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
              <p className="flex-[5] ">Name</p>
              <p className="flex-[7] ">Email</p>
              <p className="flex-[5] ">Phone No</p>
              <p className="flex-[5] ">Enrolled Courses</p>
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
                ) : currentUsers?.length === 0 ? (
                  <div className="flex h-40 justify-center items-center">
                    <p>No users added</p>
                  </div>
                ) : (
                  currentUsers?.map((user, index) => (
                    <UserDetailsCard
                      key={user._id || index}
                      id={user._id}
                      name={user.username}
                      email={user.email}
                      phoneNo={user?.phoneNo}
                      photo={user?.photo || user?.imgUrl}
                      enrolledCourses={user?.enrolledCourses}
                      isAdmin={user?.isAdmin}
                      isCompany={user?.isCompany}
                      user={user}
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
                filteredUsers.length / usersPerPage
              )}`}</p>
              <button
                onClick={nextPage}
                disabled={indexOfLastUser >= filteredUsers.length}
                className="flex justify-center p-2 pr-3 border rounded-lg border-gray-300"
              >
                <p className="text-xs font-medium ml-2">Next</p>
              </button>
            </div>
          </div>
        </div>
        {userModal && (
          <AddUser
            toggleFunc={toggleUserModal}
            addedPopup={addedPopup}
            toggleAddedPopup={toggleAddedPopup}
          />
        )}
        {editModal && (
          <EditUser
            user={selectedUser}
            toggleFunc={toggleEditModal}
            editedPopup={editedPopup}
            toggleEditedPopup={toggleEditedPopup}
          />
        )}
      </div>
    </>
  );
}
