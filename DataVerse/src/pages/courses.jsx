import Navbar from "../components/navbar";
import ProgressBar from "../components/progressbar";
import book from '../assets/book.svg';
import apps from '../assets/apps.svg';
import hat from '../assets/hat.svg';
import chat from '../assets/chat.svg';
import tutor from '../assets/tutoricon.svg';
import timelapse from '../assets/timelapse.svg';
import CourseProgress from "../components/courseprogress";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserProgress } from "../redux/course/ProgressSlice";
import Loader from "../components/Loader";
import { NoCoursesEnrolled } from "./dashboard";


const Courses = () => {
    const enrolledCourses = useSelector((state) => state.progress.enrolledCourses);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (enrolledCourses)
            return

        dispatch(fetchUserProgress())

    }, [dispatch, enrolledCourses])

    console.log(enrolledCourses)
    return (
        <div >
            {/* <Navbar/> */}
            <div className="container w-full max-w-screen-lg mx-auto h-max font-sans mt-8 ">
                <p className="text-2xl font-medium ml-6">MY LEARNING</p>
                <div className="flex">
                    <div className="w-2/3 p-4">
                        <div className="flex flex-col">
                            {/* <div className="flex flex-col text-white p-8 bg-themeblack rounded-xl shadow-lg">
                                <p className="font-semibold">Weekly Goal</p>
                                <ProgressBar progress={30} label={true} width="50%" containerWidth='100%' containerHeight='50px'/>                   
                            </div>
                            <div className="flex flex-col mt-8">
                                <p>Weekly Progress</p>
                                <div className="flex h-32 w-full py-4 rounded-lg shadow-lg">
                                    <div className="flex flex-col justify-center px-16">
                                        <img src={book} alt="" className="h-6 w-6"/>
                                        <p className="text-sm font-semibold">3/7 Course</p>
                                    </div>
                                    <div className="flex flex-col justify-center border-r border-grey-700 border-l px-16">
                                        <img src={apps} alt="" className="h-6 w-6"/>
                                        <p className="text-sm font-semibold">30/74 Quizes</p>
                                    </div>
                                    <div className="flex flex-col justify-center px-16">
                                        <img src={timelapse} alt="" className="h-6 w-6"/>
                                        <p className="text-sm font-semibold">24 hrs Learning</p>
                                    </div>

                                </div>
                            </div> */}
                            <div className="flex flex-col w-full h-max p-2 mt-8">
                                <div className="flex items-center justify-between">
                                    <p className="text-xl font-semibold">Enrolled Courses</p>
                                    <button className="py-2 px-4 text-sm font-medium w-max bg-customBlue text-white items-center justify-between hover:scale-105 transform-all duration-200 rounded shadow-md flex" onClick={() => navigate('/app/courses/catalog')}><span><img src={hat} alt="icon" className="w-6 h-6 mr-2" /></span>COURSE CATALOG</button>
                                </div>
                                <div className="flex flex-col">
                                    {enrolledCourses == null ?
                                        <span><Loader /></span>
                                        :
                                        enrolledCourses.filter(item => item.courseId).length == 0 ?
                                            <NoCoursesEnrolled />
                                            :
                                            enrolledCourses.filter(item => item.courseId).map((item, i) =>
                                                <CourseProgress key={i} id={item.courseId._id} progress={item.progress} title={item.courseId.title} totalLectures={item.courseId.totalLectures} />
                                            )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/3 p-4">
                        <p className="font-semibold text-lg">Featured News</p>
                        <div className="flex flex-col w-full h-80 bg-white p-8 text-textgrey rounded-lg shadow-md hover:scale-105 transform-all duration-200">
                            <div className="w-12 h-12 rounded-full bg-theme flex items-center justify-center">
                                <img src={chat} alt="icon here" />
                            </div>
                            <p className="font-semibold py-2">Gpt 4o by OpenAI</p>
                            <p className="font-medium py-2">Check out whats new in gpt 4o launched newly by OpenAI.</p>
                            <div className="pt-16 flex items-center">
                                <img src={tutor} alt="icon" />
                                <p className="text-sm font-medium">Zaki</p>
                            </div>
                        </div>

                        <div className="flex flex-col w-full h-80 bg-themeblack p-8 text-gray-100 rounded-lg shadow-md mt-4 hover:scale-105 transform-all duration-200">
                            <div className="flex items-center justify-between">
                                <div className="w-12 h-12 rounded-full bg-theme flex items-center justify-center">
                                    <img src={hat} alt="icon here" className="w-8 h-8" />
                                </div>
                                <p className="text-semibold">7 lessons <span className="text-2xl font-bold">.</span> 9 Quizes</p>
                            </div>
                            <p className="font-semibold py-2">Data Analysis</p>
                            <p className="font-medium py-2">Dive into data analysis and get skilled.</p>
                            <div className="pt-16 flex items-center">
                                <img src={tutor} alt="icon" />
                                <p className="text-sm font-medium">Obaid Ur Rehman</p>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default Courses;