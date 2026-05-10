import CourseCompletionPieChart from "./coursecompletionchart";
import school from '../assets/school.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import tutot from "../assets/tutoricon.svg"
import { useNavigate } from "react-router-dom";

const Dashcourse = ({ tutor, title, percentage, courseId, course }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/app/courses/course-screen/${courseId}`, { state: course })}
            className="card-premium p-6 flex flex-col gap-6 cursor-pointer group h-fit w-72"
        >
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-primary-50 transition-colors">
                        <img src={school} alt="icon" className="w-5 h-5 opacity-70 group-hover:opacity-100" transition-opacity />
                    </div>
                    {/* Progress Badge */}
                    <div className="bg-slate-100 text-slate-800 text-xxs font-black px-2.5 py-1 rounded-lg uppercase tracking-wider">
                        {percentage}% Complete
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-base font-bold text-slate-900 leading-tight line-clamp-2 h-10 font-heading group-hover:text-slate-800 transition-colors">
                        {title}
                    </h3>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden">
                            <img src={tutot} alt="tutor" className="w-4 h-4" />
                        </div>
                        <p className="text-xs font-bold text-slate-500 tracking-wide uppercase">{tutor}</p>
                    </div>
                </div>
            </div>

            <div className="relative pt-4 border-t border-slate-50 flex items-center justify-center">
                <div className="w-32 h-32 transform group-hover:scale-110 transition-transform duration-300">
                    <CourseCompletionPieChart completedPercentage={percentage} />
                </div>
            </div>
        </div>
    )

}

export default Dashcourse;