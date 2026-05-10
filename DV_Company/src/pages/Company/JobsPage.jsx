import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { IoAdd } from "react-icons/io5";
import ScheduledClassesCard from "../../components/Dashboard/ScheduledClassesCard";
import AddSchedule from "../../components/Admin/Schedule_Classes/AddJobOpening";
import { useOverLay } from "../../contexts/OverlayContext";
import SelectStudentPopup from "../../components/Admin/Schedule_Classes/SelectStudentPopup";
import SelectTeacherPopup from "../../components/Admin/Schedule_Classes/SelectTeacherPopup";
import SelectLocationPopup from "../../components/Admin/Schedule_Classes/SelectLocationPopup";
import SelectTimePopup from "../../components/Admin/Schedule_Classes/SelectTimePopup";
import SelectDaysPopup from "../../components/Admin/Schedule_Classes/SelectDaysPopup";
import ConfirmPopup from "../../components/Admin/Schedule_Classes/ConfirmPopup";
import { scheduleClassesData } from "../../constants/schdeuleClassPageData";
import AddJobOpening from "../../components/Admin/Schedule_Classes/AddJobOpening";
import { getAllJobs } from "../../api/Jobs/allJobs";
import DeletePopup from "../../components/Admin/Schedule_Classes/DeletePopup";
import Loader from "../../components/Loader/Loader";

export default function JobsPage() {
  const [scheduleModal, setScheduleModal] = useState(false);
  const { toggleOverlay, isOverlayEnable } = useOverLay();
  const [selectStPopup, setSelectStPopup] = useState(false);
  const [selectTPopup, setSelectTPopup] = useState(false);
  const [selectLocationPopup, setSelectLocationPopup] = useState(false);
  const [selectTimePopup, setSelectTimePopup] = useState(false);
  const [selectDaysPopup, setSelectDaysPopup] = useState(false);
  const [confrimPopup, setConfrimPopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [newJob, setNewJob] = useState({});
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState({});

  const fetchJobs = async () => {
    const data = await getAllJobs();
    setJobs(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const toggleDeletePopup = (job) => {
    setSelectedJob(job);
    setDeletePopup(!deletePopup);
    toggleOverlay();
  };

  console.log("CHeck Jobs: ", jobs);

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

  const toggleScheduleModal = () => {
    setScheduleModal(!scheduleModal);
    toggleOverlay();
  };

  const toggleSelectStPopup = () => {
    setSelectStPopup(!selectStPopup);
  };

  const toggleSelectTPopup = () => {
    setSelectTPopup(!selectTPopup);
  };

  const toggleSelectLocationPopup = () => {
    setSelectLocationPopup(!selectLocationPopup);
  };

  const toggleSelectTimePopup = () => {
    setShowPopup(!showPopup);
  };

  const toggleSelectDaysPopup = () => {
    setSelectDaysPopup(!selectDaysPopup);
  };

  const toggleConfirmPopup = (job) => {
    setNewJob(job);
    setConfrimPopup(!confrimPopup);
  };

  useEffect(() => {
    if (scheduleModal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [scheduleModal]);

  return (
    <>
      <div
        className={`flex flex-row rounded-tl-3xl bg-white rounded-bl-3xl h-full `}
      >
        <div className=" flex-[5] w-full font-sans">
          {/* NavBar  */}
          <Navbar heading={"Jobs"} name={"Alex Jhons"} role={"Admin"} />

          {/* Heading and Buttons Div  */}
          <div className="flex flex-row justify-between px-10 pt-10 pb-4">
            {/* Name and Image div  */}
            <p className="text-lg font-medium">Job Openings</p>

            <div className="text-white text-sm font-normal flex flex-col smMd:flex-row">
              <button
                onClick={toggleScheduleModal}
                className="bg-customMaroon p-2 px-4 border rounded-md flex flex-row items-center"
              >
                <IoAdd size={16} />
                <p className="ml-2">Add New Job Opening</p>
              </button>
            </div>
          </div>
          {selectStPopup && (
            <SelectStudentPopup toggleFunc={toggleSelectStPopup} />
          )}
          {selectTPopup && (
            <SelectTeacherPopup toggleFunc={toggleSelectTPopup} />
          )}
          {selectLocationPopup && (
            <SelectLocationPopup toggleFunc={toggleSelectLocationPopup} />
          )}
          {selectTimePopup && (
            <SelectTimePopup toggleFunc={toggleSelectTimePopup} />
          )}
          {selectDaysPopup && (
            <SelectDaysPopup toggleFunc={toggleSelectDaysPopup} />
          )}
          {deletePopup && (
            <DeletePopup toggleFunc={toggleDeletePopup} job={selectedJob} />
          )}
          {confrimPopup && (
            <ConfirmPopup
              toggleFunc={toggleConfirmPopup}
              toggleModal={toggleScheduleModal}
              job={newJob}
            />
          )}

          {loading && (
            <div className="flex h-80 items-center justify-center">
              <Loader />
            </div>
          )}

          {!loading && (
            <div className="mx-5 grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {jobs?.length === 0 ? (
                <div className="flex h-40 justify-center items-center col-span-full">
                  <p>No jobbs posted</p>
                </div>
              ) : (
                jobs
                  ?.slice()
                  .reverse()
                  .map((item, index) => (
                    <ScheduledClassesCard
                      key={index}
                      title={item?.title}
                      workingMode={item?.workingMode}
                      description={item?.description}
                      experienceRequired={item?.experienceRequired}
                      experienceLevel={item?.level}
                      skills={item?.skills}
                      type={item?.type}
                      deadline={item?.applicationDeadline.slice(0, 10)}
                      company={item?.company}
                      bgColor={giveBgColor(index)}
                      toggleDeletePopup={toggleDeletePopup}
                      job={item}
                      dotsMenu={true}
                    />
                  ))
              )}
            </div>
          )}
        </div>
        {scheduleModal && (
          <AddJobOpening
            toggleFunc={toggleScheduleModal}
            selectTimePopup={selectTimePopup}
            toggleSelectTimePopup={toggleSelectTimePopup}
            showPopup={showPopup}
            setShowPopup={setShowPopup}
            confrimPopup={confrimPopup}
            toggleConfirmPopup={toggleConfirmPopup}
            // selectStPopup={selectStPopup}
            // toggleSelectStPopup={toggleSelectStPopup}
            // selectTPopup={selectTPopup}
            // toggleSelectTPopup={toggleSelectTPopup}
            // selectLocationPopup={selectLocationPopup}
            // toggleSelectLocationPopup={toggleSelectLocationPopup}
            // selectDaysPopup={selectDaysPopup}
            // toggleSelectDaysPopup={toggleSelectDaysPopup}
          />
        )}
      </div>
    </>
  );
}
