import hat from "../assets/hat.svg";
import clock from "../assets/clock.svg";
import flag from "../assets/flag.svg";
import LearningHeatmap from "../components/heatmap";
import Dashcourse from "../components/dashcourse";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserProgress } from "../redux/course/ProgressSlice";
import Loader from "../components/Loader";
import illustration from "../assets/dashboard-learning.svg";
import { Link } from "react-router-dom";
import { FaTrophy } from "react-icons/fa6";


export const NoCoursesEnrolled = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4 p-6">
      <img src={illustration} alt="Start Learning" className="w-64 h-64" />
      <h2 className="text-2xl font-semibold text-customDarkBlue">
        You haven't enrolled in any courses yet!
      </h2>
      <p className="text-lg text-gray-600">
        Start your learning journey by exploring our wide range of courses.
      </p>
      <Link
        to="/app/courses/catalog"
        className="mt-4 bg-slate-900 text-white py-2.5 px-6 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-95"
      >
        Browse Courses
      </Link>
    </div>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const progress = useSelector((state) => state.progress.enrolledCourses);


  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchUserProgress());
      } catch (error) {
        console.error("Failed to fetch progress:", error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user, dispatch]);

  return (
    <div className="bg-slate-50 min-h-screen w-full pt-[90px] pb-12">
      <div className="max-w-7xl mx-auto px-8 font-sans">

        {/* Header Section */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight font-heading">Dashboard</h1>
            {user ? (
              <p className="text-lg font-medium text-slate-500 mt-1">
                Welcome back, <span className="text-slate-900 font-bold">{user.username}</span>! 👋
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-slate-200 shadow-sm transition-all hover:shadow-md">
            <div className="p-2 bg-amber-50 rounded-xl">
              <FaTrophy className="text-amber-500" size={24} />
            </div>
            <div>
              <p className="text-xxs font-bold text-slate-400 uppercase tracking-widest">Total Points</p>
              <p className="text-xl font-black text-slate-900 leading-none">{user?.totalPoints || 0}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="card-premium p-8 text-center group">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <img src={hat} alt="Courses" className="w-8 h-8" />
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Courses in Progress</p>
            <p className="text-4xl font-extrabold text-slate-900 mt-2">
              {progress ? `${progress.filter(c => c.courseId).length}` : <div className="loader mx-auto" />}
            </p>
          </div>

          <div className="card-premium p-8 text-center group">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <img src={clock} alt="Hours" className="w-8 h-8" />
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Learning Hours</p>
            <p className="text-4xl font-extrabold text-slate-900 mt-2">
              {progress ? `${progress.length}h 15m` : <div className="loader mx-auto" />}
            </p>
          </div>

          <div className="card-premium p-8 text-center group">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <img src={flag} alt="Points" className="w-8 h-8" />
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Current Points</p>
            <p className="text-4xl font-extrabold text-slate-900 mt-2">
              {progress ? user.totalPoints : <div className="loader mx-auto" />}
            </p>
          </div>
        </div>

        {user?.activityLog && (
          <div className="card-premium p-8 mb-12 bg-white">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <div className="w-2 h-6 bg-primary-500 rounded-full"></div>
              Learning Activity
            </h3>
            <LearningHeatmap activityLog={user.activityLog} />
          </div>
        )}

        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <div className="w-2 h-6 bg-primary-500 rounded-full"></div>
              Continue Learning
            </h3>
            {progress?.length > 0 && (
              <Link to="/app/courses/catalog" className="text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors">
                View All Courses →
              </Link>
            )}
          </div>

          <div className="flex flex-wrap gap-8 justify-start">
            {progress?.filter(course => course.courseId).length === 0 ? (
              <div className="w-full">
                <NoCoursesEnrolled />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                {progress?.filter(course => course.courseId).map((course) => (
                  <Dashcourse
                    key={course.courseId._id}
                    tutor="Zaki Bin Mazhar"
                    title={course.courseId.title}
                    percentage={course.progress}
                    courseId={course.courseId._id}
                    course={course}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
