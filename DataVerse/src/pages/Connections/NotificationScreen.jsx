import React, { useEffect, useState } from "react";
import { IMAGES } from "../../assets";
import { FaUserPlus, FaComment, FaThumbsUp, FaBell } from "react-icons/fa";
import { MdCheckCircle, MdClose } from "react-icons/md";
import { notificationContent } from "../../constants/notificationContent";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllFriendRequest } from "../../api/connection";
import { formatDistanceToNow } from "date-fns";

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState(notificationContent);
  const navigate = useNavigate();
  const [pendingInvites, setPendingInvites] = useState([]);
  const [requests, setRequests] = useState(0)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const currentUser = useSelector((state) => state.auth.user);
  

  useEffect(() => {

    if (!currentUser) return;
    

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

  
    fetchAllRequests();
  }, [currentUser]);


  const getIcon = (type) => {
    switch (type) {
      case "connection":
        return <FaUserPlus className="text-customBlue" />;
      case "like":
        return <FaThumbsUp className="text-customBlue" />;
      case "comment":
        return <FaComment className="text-customBlue" />;
      case "mention":
        return <FaBell className="text-customBlue" />;
      default:
        return null;
    }
  };

  console.log("pendingInvites: ", pendingInvites)




  return (
    <div className="flex flex-col bg-gray-100 max-h-max p-8 space-y-6">
      {/* Title and Summary Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-customBlue">Notifications</h1>
        <div className="bg-white p-4 rounded-md shadow-sm flex items-center space-x-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-700">
              {pendingInvites.length}
            </p>
            <p className="text-sm text-gray-500">Total Notifications</p>
          </div>

        </div>
      </div>


      {/* Notification Cards */}
      <div className="bg-white p-6 rounded-md shadow-md">
        {pendingInvites.length === 0 ? (
          <p className="text-gray-500">No notifications available.</p>
        ) : (
          pendingInvites.map((notification) => (
            <div
              key={notification._id}
              className={`flex items-center justify-between p-4 mb-4 border rounded-lg shadow-sm ${
                notification.isRead ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100 transition duration-200`}
            >
              <div className="flex items-center">
                <div className="relative">
                  <img
                    src={notification.sender.imgUrl || "https://robohash.org/placeholder-avatar"}
                    alt={"user"}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  {!notification.isRead && (
                    <span className="absolute top-0 right-4 h-3 w-3 rounded-full bg-red-500"></span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-customBlack">
                    {notification.sender.username}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {"New Friend Request"}
                  </p>
                  <span className="text-xs text-gray-400">
                  {notification.createdAt
                  ? formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })
                  : ''}
                  </span>
                </div>
              </div>

            </div>
          ))
        )}
      </div>

      {/* Quick Actions */}
      <div className="flex justify-between items-center bg-white p-6 rounded-md shadow-md">
        <button
          onClick={() => navigate("/connection/view-all-connections")}
          className="bg-customBlue text-white py-2 px-6 rounded-md"
        >
          View All Connections
        </button>
        <button
          onClick={() => navigate("/connection/post-screen") }
          className="bg-customBlue text-white py-2 px-6 rounded-md"
        >
          Post an Update
        </button>
        <button onClick={() => navigate("/connection/messaging-screen")}
         className="bg-customBlue text-white py-2 px-6 rounded-md">
          Chat with Someone
        </button>
      </div>

      {/* Recent Activities */}
      {/* <div className="bg-white p-6 rounded-md shadow-md pb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Activities
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-gray-700">
              You liked a post from <strong>John Doe</strong>.
            </p>
            <span className="text-xs text-gray-400">10 minutes ago</span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-700">
              <strong>Alice Johnson</strong> commented on your post.
            </p>
            <span className="text-xs text-gray-400">20 minutes ago</span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default NotificationScreen;
