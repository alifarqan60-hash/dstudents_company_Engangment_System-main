import book from '../assets/book.svg'
import ProgressBar from './progressbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH} from '@fortawesome/free-solid-svg-icons';
import { FaTrophy } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CourseProgress = ({id, progress, title, totalLectures}) =>{
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`/app/courses/course-screen/${id}`)
    }      
    return(
        <div 
            className="flex items-center w-full px-4 py-2 border-b cursor-pointer hover:bg-customLightBlueShade rounded mt-2 transition-all duration-200 border-grey-300 text-textgrey"
            onClick={() => handleNavigate()}
        >
            <div className="w-32 h-20 bg-themeblack flex items-center justify-center rounded">
                <img src={book} alt="" className=''/>
            </div>
            <div className='flex flex-col w-96 p-2 ml-4'>
                <p className='text-sm font-semibold w-max'>{title}</p>
                {progress!==100?<>
                <div className='flex items-center space-x-4'>
                    <p className='text-sm font-medium text-grey-500'>progress</p>
                    <ProgressBar progress={progress} label={false} width="50%"  containerHeight='10px' containerWidth="40%"/>
                </div>
                </>:
                <>
                <div className='flex items-center justify-center w-24 rounded-full bg-theme text-white p-1'>
                    <p className='text-xs'>Completed</p>
                </div>
                </>
                }
            </div>
            <div className='flex items-center0 pl-48'>
                <div className='flex w-16 items-center justify-around rounded-full bg-gray-100'>
                    <FaTrophy className="trophy-icon" size={15}/>
                    <p>{parseInt(totalLectures)*50}</p>

                </div>
            </div>
        </div>
    )
}

export default CourseProgress