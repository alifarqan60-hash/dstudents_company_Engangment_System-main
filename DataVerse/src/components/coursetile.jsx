import tutot from "../assets/tutoricon.svg"
import { useNavigate } from "react-router-dom";

const Coursetile = ({ cover, title, tutor, lessons, quiz, courseId }) => {
    const navigate = useNavigate();

    const handleStartCourse = () => {
        navigate(`/app/courses/course-screen/${courseId}`);
    };
    return (
        <div className="card-premium group w-64 overflow-hidden flex flex-col h-[340px]">
            <div className="relative h-32 w-full overflow-hidden">
                <img
                    src={cover}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
            </div>

            <div className="p-5 flex flex-col flex-1 gap-4">
                <div className="space-y-2">
                    <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2 h-10 font-heading">
                        {title}
                    </h3>
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center">
                            <img src={tutot} alt="tutor" className="w-3 h-3 grayscale" />
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{tutor}</p>
                    </div>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex flex-col">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Curriculum</p>
                        <p className="text-xs font-black text-slate-700">{lessons} Modules</p>
                    </div>

                    <button
                        onClick={handleStartCourse}
                        className="btn-primary !px-4 !py-1.5 !text-xs !rounded-lg"
                    >
                        Learn
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Coursetile;