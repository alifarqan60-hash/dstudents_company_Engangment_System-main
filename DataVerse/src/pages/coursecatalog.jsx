import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Coursetile from "../components/coursetile";
import coursecover from "../assets/coursecover.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../redux/course/CoursesSlice";
import Loader from "../components/Loader/Loader";

const Catalog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const courses = useSelector((state) => state.courses.courses || []); // Ensure courses is always an array


  console.log(courses)
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [selectedCategory, setSelectedCategory] = useState("All Courses"); // State for selected category
  const [filteredCourses, setFilteredCourses] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          await dispatch(fetchCourses());
        } catch (err) {
          console.log("error fetching courses for catalog: ", err);
        }
      }
    };

    fetchData();
  }, [user, location.pathname, dispatch]);

  useEffect(() => {
    if (Array.isArray(courses)) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const result = courses.filter(
        (course) => {
          const matchesSearch = course.title?.toLowerCase().includes(lowerCaseQuery) ||
            course.category?.toLowerCase().includes(lowerCaseQuery);
          const matchesCategory = selectedCategory === "All Courses" || course.category === selectedCategory;
          return matchesSearch && matchesCategory;
        }
      );
      setFilteredCourses(result);
    } else {
      console.warn("Courses is not an array:", courses);
      setFilteredCourses([]); // Handle cases where courses is not an array
    }
  }, [searchQuery, courses, selectedCategory]);


  return (
    <div className="bg-slate-50 min-h-screen w-full pt-[110px] pb-12">
      <div className="max-w-7xl mx-auto px-8 font-sans">

        {/* Page Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight font-heading">Course Catalog</h1>
            <p className="text-slate-500 font-medium">Empower your career with world-class data science curriculum.</p>
          </div>

          <div className="relative group">
            <input
              type="text"
              placeholder="Search across 50+ courses..."
              className="pl-12 pr-6 py-3.5 w-full md:w-[400px] bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all placeholder:text-slate-400 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-4.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors"
            />
          </div>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex items-center gap-2 mb-12 border-b border-slate-200 pb-4">
          {["All Courses", "Programming", "Machine Learning", "Data Science", "Deep Learning"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${selectedCategory === cat
                ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <Coursetile
                cover={coursecover}
                key={course._id}
                courseId={course._id}
                title={course.title}
                tutor="Zaki"
                lessons={course.totalLectures}
                quiz={course.totalLectures}
              />
            ))
          ) : searchQuery ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
                <FontAwesomeIcon icon={faSearch} className="text-slate-300 text-2xl" />
              </div>
              <p className="text-xl font-bold text-slate-900">No matches found</p>
              <p className="text-slate-500 mt-1">We couldn't find anything matching "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-6 text-slate-900 font-bold hover:underline"
              >
                Clear search and view all
              </button>
            </div>
          ) : (
            <div className="col-span-full py-20">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
