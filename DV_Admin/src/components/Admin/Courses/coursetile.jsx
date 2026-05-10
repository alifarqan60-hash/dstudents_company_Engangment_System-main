import tutot from "../../../assets/tutoricon.svg";
import { useNavigate } from "react-router-dom";
import { LuTrash2 } from "react-icons/lu";

const Coursetile = ({
  course,
  cover,
  title,
  tutor,
  lessons,
  quiz,
  courseId,
  showBtn,
  onDelete,
}) => {
  const navigate = useNavigate();

  const handleStartCourse = (e) => {
    e.stopPropagation();
    navigate("/admin/courses/lessons", {
      state: { course },
    });
  };

  return (
    <div
      onClick={handleStartCourse}
      className="container w-60 h-76 font-poppins mt-4 shadow-md cursor-pointer rounded-xl bg-white relative hover:shadow-lg transition-shadow"
    >
      <img src={cover} alt="cover here" className="rounded-t-xl w-full h-32 object-cover" />
      <div className="flex flex-col justify-around px-3 py-2 gap-2 text-textgrey">
        <p className="mt-1 text-sm font-abeezee font-semibold line-clamp-2 min-h-[2.5rem]">
          {title}
        </p>
        <div className="flex flex-col justify-normal">
          <div className="flex items-center space-x-2 mb-2">
            <img src={tutot} alt="icon here" className="w-3 h-3" />
            <p className="text-[10px] font-semibold truncate">{tutor}</p>
          </div>
          <div className="flex flex-row justify-between items-center mt-1">
            <p className="text-[10px] font-medium">
              {lessons} Lessons<span className="text-[10px] font-normal"> / </span>
              {quiz} Quizzes{" "}
            </p>
          </div>
          <div className="flex flex-row justify-between items-center mt-3 border-t pt-2 gap-2">
            {showBtn && (
              <button
                onClick={handleStartCourse}
                className="flex-1 px-3 py-1.5 bg-theme text-white rounded-md text-[11px] font-medium hover:bg-opacity-90 transition-all"
              >
                Details
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(course._id, title);
              }}
              className="p-1.5 bg-red-50 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-all"
              title="Delete Course"
            >
              <LuTrash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coursetile;
