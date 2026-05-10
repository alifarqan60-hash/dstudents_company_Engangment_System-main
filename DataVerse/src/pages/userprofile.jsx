import Navbar from "../components/navbar";
import profile from "../assets/tutoricon.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';


const UserProfile = () =>{
    return(
        <div >
            <Navbar/>

            <div className="container max-w-screen-lg h-max font-sans p-8 mt-8 ml-8 shadow-lg border-2 border-grey-300 rounded-lg bg-themeblack text-white">
                <div className="flex flex-col">
                    <div className="flex justify-between w-full">
                        <p className="text-xl font-semibold">Profile Card</p>
                        <div className="flex">
                            <div className="flex items-center justify-center w-20 h-20 bg-white rounded-full border-2 border-grey overflow-hidden">
                                <img src={profile} alt="imghere" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col items-start ml-2">
                                <p className="font-medium">OBAID</p>
                                <FontAwesomeIcon icon={faEdit} className="hover:text-theme cursor-pointer" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col p-4">
                        <p className="text-lg font-medium">Name</p>
                        <input type="text" placeholder="Obaid" className="w-64 h-8 rounded py-4 px-2 border-2 border-grey"/> 
                        <p className="text-lg font-medium">Email</p>
                        <input type="text" placeholder="0rehmanubaid@gmail.com" className="w-64 h-8 rounded py-4 px-2 border-2 border-grey"/> 
                    </div>

                    <div className="flex flex-col p-4 w-96">
                        <div className="flex justify-between items-center py-1">
                            <p className="text-md font-base">Account Verified</p>
                            <FontAwesomeIcon icon={faCheck} className="w-6 h-6 text-green-400" />                            

                        </div>
                        <div className="flex justify-between items-center py-1">
                            <p className="text-md font-base">Skill Level</p>
                            <p className="text-md font-bold">Beginner</p>

                        </div>
                    </div>
                    <div className="flex h-40 w-full items-end text-white space-x-8 p-4">
                        <button className="py-2 px-4 text-sm font-medium w-max bg-theme hover:bg-opacity-50 transform-all duration-200 rounded shadow-md">CHANGE PASSWORD</button>
                        <button className="py-2 px-4 text-sm font-medium w-max bg-theme hover:bg-opacity-50 transform-all duration-200 rounded shadow-md">EDIT PROFILE</button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default UserProfile;