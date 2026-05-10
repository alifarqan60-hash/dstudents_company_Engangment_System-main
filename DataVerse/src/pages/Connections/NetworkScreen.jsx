import React, { useEffect, useState } from "react";
import { IMAGES } from "../../assets";
import { FaUserPlus } from "react-icons/fa";
import { pendingInvitations } from "../../constants/pendingInvitations";
import { suggestedConnections } from "../../constants/suggestedConnections";
import { useNavigate } from "react-router-dom";
import RequestCard from "./components/RequestCard";
import { useSelector } from "react-redux";
import { acceptFriendRequest, getAllFriendRequest, getMayKnowUsers, rejectFriendRequest, sendFriendRequest } from "../../api/connection";
import Loader from "../../components/Loader";

const NetworkScreen = () => {
  const navigate = useNavigate();
  const [pendingInvites, setPendingInvites] = useState([]);
  const [requests, setRequests] = useState(0)
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [pendingConnections, setPendingConnections] = useState([]);

  const currentUser = useSelector((state) => state.auth.user);
  

  const [connectionSuggestions, setConnectionSuggestions] =
    useState(suggestedConnections);

  const [seeAllInvitesView, setSeeAllInvitesView] = useState(false);
  const toggleSeeAllInvitesView = () => {
    setSeeAllInvitesView(!seeAllInvitesView);
  };

  useEffect(() => {

    if (!currentUser) return;
    
    const fetchUsers = async () => {
      setLoading(true); 
      setError(null); 
      try {
        const response = await getMayKnowUsers();
        setUsers(response)
      } catch (err) {
        console.error(err);
        setError(err.message || "An error occurred while fetching users.");
      } finally {
        setLoading(false); 
      }
    };

    const fetchAllRequests = async () => {
      setLoading(true); 
      setError(null); 
      try {
        const response = await getAllFriendRequest();
        setPendingInvites(response)
        setRequests(response.length)
      } catch (err) {
        console.error(err);
        setError(err.message || "An error occurred while fetching users.");
      } finally {
        setLoading(false); 
      }
    };

  
    fetchUsers();
    fetchAllRequests();
  }, [currentUser]);

  const handleConnect = async (userId) => {
    try {
      const response = await sendFriendRequest(userId); 
      if (response) {
        setPendingConnections((prev) => [...prev, userId]); 
      }
    } catch (error) {
      console.error("Failed to send connection request:", error);

    }
  };

  const handleAcceptInvite = async (requestId) => {
    console.log(`Accepted invite: ${requestId}`);
    try {
      const response = await acceptFriendRequest(requestId); 
      if (response) {  
        setPendingInvites((prev) => prev.filter((invite) => invite._id !== requestId));
      }
    } catch (error) {
      console.error("Failed to send connection request:", error);

    }
  };
  
  const handleRejectInvite = async (requestId) => {
    console.log(`Rejected invite: ${requestId}`);
    try {
      const response = await rejectFriendRequest(requestId); 
      if (response) {  
        setPendingInvites((prev) => prev.filter((invite) => invite._id !== requestId));
      }
    } catch (error) {
      console.error("Failed to send connection request:", error);

    }
  };
  
  


  return (
    <div className="flex bg-gray-100 max-h-max">
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-customBlue mb-8">
          Manage Your Network
        </h1>

        {/* Network Activity */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Recent Network Activity</h2>
          <div className="bg-white p-4 rounded-md shadow-sm">
            <ul className="space-y-3 text-gray-700">
              <li>💼 You have {requests} new connection requests this week</li>
            </ul>
          </div>
        </div>

        {/* Pending Invitations */}
        <div className="mb-8">
          <div className="flex justify-between items-center text-sm">
            <h2 className="text-lg font-semibold mb-4">Pending Invitations</h2>
            {pendingInvites.length==0?
              "No pending Invitations"
            :<p
              onClick={toggleSeeAllInvitesView}
              className={`text-theme hover:underline cursor-pointer`}
            >
              {seeAllInvitesView ? "See Less" : "See All"}
            </p>
            }
          </div>

          <div className="grid grid-cols-2 gap-4">
            {seeAllInvitesView
              ?
              pendingInvites.map((invite, i) => (
                
                  <RequestCard invite={invite} key={i}
                    onAccept={() => handleAcceptInvite(invite._id)}
                    onIgnore={() => handleRejectInvite(invite._id)}
                  />
                
              ))
              :
              pendingInvites.slice(0, 2).map((invite, i) => (
  
                  <RequestCard invite={invite} key={i}
                    onAccept={() => handleAcceptInvite(invite._id)}
                    onIgnore={() => handleRejectInvite(invite._id)}
                  />
                
                ))}
          </div>
        </div>

        {/* Connection Suggestions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">People You May Know</h2>
          <div className="grid grid-cols-2 gap-4">
            {users.length==0
            ?
            <Loader/>
            :users?.map((suggestion,i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-md shadow-md flex items-center justify-between"
              >
                <div className="flex items-center cursor-pointer"
                  onClick={() => navigate("/connection/post-screen/user")}
                >
                  <img
                    src={suggestion.imgUrl || "https://robohash.org/placeholder-avatar"}
                    alt={suggestion.username}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">{suggestion.username}</p>
                    <p className="text-sm text-gray-600">{suggestion.title}</p>
                  </div>
                </div>
                <button 
                  onClick={()=> handleConnect(suggestion._id)}
                  className={`py-2 px-4 bg-customBlue  rounded-lg shadow hover:bg-blue-600 transition-colors duration-200 flex items-center
                  ${pendingConnections.includes(suggestion._id)?
                    "bg-white text-black"
                    :
                    "text-white"
                  }
                  `}>
                    {pendingConnections.includes(suggestion._id)?
                    "Pending.."
                    :
                    <><FaUserPlus className="mr-2" /> Connect</>
                  }
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="bg-gray-200 p-6 w-[20%]">
        <h2 className="text-lg font-bold mb-4">Popular Topics</h2>
        <ul className="space-y-2">
          <li>#AI</li>
          <li>#MachineLearning</li>
          <li>#DataScience</li>
        </ul>

        <h2 className="text-lg font-bold mt-6 mb-4">Trending Articles</h2>
        <ul className="mb-6">
          <li className="text-blue-600 cursor-pointer hover:underline">
            <a
              href="https://www.iqvia.com/blogs/2024/02/the-future-of-ai-in-healthcare"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Future of AI in Healthcare
            </a>
          </li>
          <li className="text-blue-600 cursor-pointer hover:underline">
            <a
              href="https://www.kdnuggets.com/5-essential-skills-every-data-scientist-needs-in-2024"
              target="_blank"
              rel="noopener noreferrer"
            >
              5 Must-Have Skills for Data Scientists
            </a>
          </li>
          <li className="text-blue-600 cursor-pointer hover:underline">
            <a
              href="https://www.elastic.co/blog/popular-ml-algorithms"
              target="_blank"
              rel="noopener noreferrer"
            >
              Exploring Popular Machine Learning Algorithms
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NetworkScreen;
