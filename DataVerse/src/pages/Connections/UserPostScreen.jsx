import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDetails } from "../../api/user";
import { postsContent } from "../../constants/postsContent";
import Loader from "../../components/Loader";

const UserPostScreen = () => {
  const [postStates, setPostStates] = useState(postsContent);
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [profileDetails, setProfileDetails] = useState(null);

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleMessageClick = () => {
    navigate("/connection/messaging-screen");
  };

  const handleConnectClick = () => {
    // Implement connect logic if needed
    console.log("Connect clicked");
  };

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await getUserDetails(userId);
        if (response) {
          setProfileDetails(response);
        }
      } catch (err) {
        console.error("Error fetching user details:", err);
      } finally {
        setLoading(false);
      }
    };
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader /></div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 w-full">
      <div className="max-w-6xl mx-auto p-6 w-full flex flex-col md:flex-row gap-8">
        {/* Profile Sidebar */}
        <div className="md:w-1/3 bg-white p-6 shadow-lg rounded-xl h-fit">
          <div className="flex flex-col items-center">
            <img
              src={profileDetails?.imgUrl || "https://robohash.org/placeholder-avatar"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-blue-100 shadow-md mb-4 object-cover"
            />
            <h2 className="text-2xl font-bold text-gray-800 text-center">{profileDetails?.username}</h2>
            <p className="text-blue-600 font-medium text-center">{profileDetails?.title || "Data Science Enthusiast"}</p>

            <div className="flex mt-6 gap-4 w-full">
              <button
                onClick={handleMessageClick}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <FiMessageSquare /> Message
              </button>
              <button
                onClick={handleConnectClick}
                className="flex-1 border-2 border-blue-600 text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Connect
              </button>
            </div>
          </div>

          <div className="mt-8 border-t pt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">About</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {profileDetails?.summary || "Passionate about exploring data patterns and building impactful machine learning models."}
            </p>
          </div>

          <div className="mt-6 border-t pt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(profileDetails?.skills) ? (
                profileDetails.skills.map((skill, index) => (
                  <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {skill.trim()}
                  </span>
                ))
              ) : profileDetails?.skills ? (
                profileDetails.skills.split(",").map((skill, index) => (
                  <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {skill.trim()}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-500 italic">No skills listed</span>
              )}
            </div>
          </div>

          <div className="mt-6 border-t pt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Socials</h3>
            <div className="flex gap-4">
              <FaLinkedin className="text-2xl text-blue-700 cursor-pointer hover:scale-110 transition" />
              <FaTwitter className="text-2xl text-blue-400 cursor-pointer hover:scale-110 transition" />
              <FaGithub className="text-2xl text-gray-800 cursor-pointer hover:scale-110 transition" />
            </div>
          </div>
        </div>

        {/* User's Activity / Posts Section */}
        <div className="md:w-2/3">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
          {/* We can map through user's specific posts here if available */}
          {/* For now, just showing placeholder activity or a message */}
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <p className="text-gray-500 italic">No recent posts to display.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPostScreen;
