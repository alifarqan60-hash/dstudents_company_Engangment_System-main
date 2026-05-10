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
import CompanyDetailsCard from "../../components/Admin/Companies/CompanyDetailsCard";
import { companyDetails } from "../../constants/companyDetails";
import AddCompany from "../../components/Admin/Companies/AddCompany";
import { useOverLay } from "../../contexts/OverlayContext";
import CompanyAddedPopup from "../../components/Admin/Companies/CompanyAddedPopup";
import CompanyDeletedPopup from "../../components/Admin/Companies/CompanyDeletedPopup";
import EditCompany from "../../components/Admin/Companies/EditCompany";
import CompanyEditedPopup from "../../components/Admin/Companies/CompanyEditedPopup";
import { IMAGES } from "../../assets";
import { getAllCompanies } from "../../api/Company/allCompanies";
import Loader from "../../components/Loader/Loader";
import SelectTeacherPopup from "../../components/Admin/Companies/SelectTeacherPopup";

export default function CompanyPage() {
  // const [companies, setCompanies] = useState(companyDetails);
  const [companies, setCompanies] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [companyModal, setCompanyModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [addedPopup, setAddedPopup] = useState(false);
  const [deletedPopup, setDeletedPopup] = useState(false);
  const [editedPopup, setEditedPopup] = useState(false);
  const { toggleOverlay, isOverlayEnable } = useOverLay();
  const [deletedCompanyName, setDeletedCompanyName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectTPopup, setSelectTPopup] = useState(false);

  const [loading, setLoading] = useState(true);

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [deletedCompany, setDeletedCompany] = useState(null);

  const toggleSelectTPopup = () => {
    setSelectTPopup(!selectTPopup);
  };

  const fetchCompanies = async () => {
    try {
      const data = await getAllCompanies();
      setCompanies(data || []);
    } catch (error) {
      console.error("Failed to fetch companies:", error);
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (companyModal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [companyModal]);

  const filterCompanies = companies?.filter((company) =>
    company?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 6;

  // Calculate the index range of companies to display for the current page
  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = filterCompanies?.slice(
    indexOfFirstCompany,
    indexOfLastCompany
  );

  // Function to handle next page
  const nextPage = () => {
    if (indexOfLastCompany < filterCompanies?.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to handle previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleCompanyModal = () => {
    setCompanyModal(!companyModal);
    toggleOverlay();
  };

  const toggleEditModal = (company) => {
    setSelectedCompany(company);
    setEditModal(!editModal);
    toggleOverlay();
  };

  const toggleEditedPopup = () => {
    setEditedPopup(!editedPopup);
  };

  const toggleAddedPopup = () => {
    setAddedPopup(!addedPopup);
  };

  const toggleDeletedPopup = (company) => {
    setDeletedCompany(company);
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
          <Navbar heading={"Companies"} />

          {/* Screen Main Content  */}
          <div className="mt-10 w-full px-8 mb-16">
            {/* Buttons & Search Container  */}
            <div className="flex flex-row w-auto justify-between mb-2 font-sans">
              {/* Buttons Div  */}
              <div className="flex flex-1 flex-row flex-wrap md:flex-nowrap text-xxs md:text-xs gap-4 md:gap-0 space-x-2 items-center">
                <button
                  onClick={toggleCompanyModal}
                  className="flex flex-row items-center justify-center p-2 pr-3 border rounded-lg border-gray-300 bg-customMaroon"
                >
                  <GoPlus color="white" size={15} />
                  <p className="text-white font-normal ml-2">Add Company</p>
                </button>
              </div>

              {selectTPopup && (
                <SelectTeacherPopup toggleFunc={toggleSelectTPopup} />
              )}

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
                  placeholder="Search Company"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="text-sm focus:outline-none active:outline-none rounded-r-lg h-10 w-full px-2 py-1 "
                />
              </div>
            </div>

            {/* Table Headings  */}
            <div className="flex flex-row items-center shadow-md p-3 font-sans font-normal text-xs text-customGrayText">
              <p className="flex-[5] ">Company Name</p>
              <p className="flex-[7] ">Email</p>
              <p className="flex-[4] ">Employees</p>
              <p className="flex-[6] ">Details</p>
            </div>

            {/* Table  */}
            <div>
              {addedPopup && (
                <CompanyAddedPopup
                  name={"John Doe"}
                  toggleFunc={toggleAddedPopup}
                  toggleModal={toggleCompanyModal}
                />
              )}
              {deletedPopup && (
                <CompanyDeletedPopup
                  company={deletedCompany}
                  toggleFunc={toggleDeletedPopup}
                />
              )}
              {editedPopup && (
                <CompanyEditedPopup
                  toggleFunc={toggleEditedPopup}
                  toggleModal={toggleEditModal}
                />
              )}
              <div>
                {loading ? (
                  <div className="flex h-40 justify-center items-center w-full">
                    <Loader />
                  </div>
                ) : (companies?.length === 0 || !companies) ? (
                  <div className="flex h-40 justify-center items-center">
                    <p>No companies added</p>
                  </div>
                ) : (
                  currentCompanies?.map((company, index) => (
                    <CompanyDetailsCard
                      key={index}
                      id={company?._id}
                      name={company?.name}
                      email={company?.email}
                      employees={company?.noOfEmployees}
                      checked={company?.checked}
                      company={company}
                      // toggleCheckbox={toggleCheckbox}
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
                (filterCompanies?.length || 0) / companiesPerPage
              ) || 1}`}</p>
              <button
                onClick={nextPage}
                disabled={indexOfLastCompany >= filterCompanies?.length}
                className="flex justify-center p-2 pr-3 border rounded-lg border-gray-300"
              >
                <p className="text-xs font-medium ml-2">Next</p>
              </button>
            </div>
          </div>
        </div>
        {companyModal && (
          <AddCompany
            toggleFunc={toggleCompanyModal}
            selectTPopup={selectTPopup}
            toggleSelectTPopup={toggleSelectTPopup}
            addedPopup={addedPopup}
            toggleAddedPopup={toggleAddedPopup}
          />
        )}
        {editModal && (
          <EditCompany
            company={selectedCompany}
            toggleFunc={toggleEditModal}
            editedPopup={editedPopup}
            toggleEditedPopup={toggleEditedPopup}
          />
        )}
      </div>
    </>
  );
}
