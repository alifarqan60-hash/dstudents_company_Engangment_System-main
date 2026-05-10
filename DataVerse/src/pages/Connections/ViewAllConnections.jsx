import React, { useEffect, useState } from "react";
import { IMAGES } from "../../assets"; // Ensure you have proper image assets
import { FaCheckCircle, FaUserPlus, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllFriends } from "../../api/connection";

const connectionsData = [
  {
    id: 1,
    name: "Jane Smith",
    avatar: IMAGES.avatar7,
    status: "Connected",
  },
  {
    id: 2,
    name: "Mark Johnson",
    avatar: IMAGES.avatar3,
    status: "Pending",
  },
  {
    id: 3,
    name: "Alice Williams",
    avatar: IMAGES.avatar9,
    status: "Connected",
  },
  // Add more connections as needed
];

const suggestedConnections = [
  {
    id: 4,
    name: "John Doe",
    avatar: IMAGES.avatar3,
  },
  {
    id: 5,
    name: "Emily Davis",
    avatar: IMAGES.avatar7,
  },
  // Add more suggested connections as needed
];

const ViewAllConnections = () => {
  const navigate = useNavigate(); 
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState(null);
  const currentUser = useSelector((state) => state.auth.user);

  const handleMessageClick = () => {
    navigate("/connection/messaging-screen"); // Change to your messaging screen path
  };

  const handleProfileClick = (userId) => {
    // navigate(`/connection/post-screen/${id}`);
    navigate(`/connection/post-screen/user/${userId}`);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredConnections = connectionsData.filter((connection) =>
    connection.name.toLowerCase().includes(searchText.toLowerCase())
  );


  useEffect(() => {

    if (!currentUser) return;

    const fetchAllFriends = async () => {
      setLoading(true); 
      setError(null); 
      try {
        const response = await getAllFriends();
        console.log(response);
        setFriends(response)
      } catch (err) {
        console.error(err);
        setError(err.message || "An error occurred while fetching users.");
      } finally {
        setLoading(false); 
      }
    };

  
    fetchAllFriends();
  }, [currentUser]);


  return (
    <div className="flex flex-col bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-customBlue mb-8">
        All Connections
      </h1>
      <div className="bg-white p-6 rounded-md shadow-lg mb-8">
        <div className="flex items-center mb-6">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search connections..."
            value={searchText}
            onChange={handleSearchChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        {friends.length === 0 ? (
          <p className="text-gray-500 text-lg text-center">
            No connections found.
          </p>
        ) : (
          friends.map((connection) => (
            <div
              key={connection._id}
              
              className="flex items-center border-b last:border-b-0 py-4 p-2 hover:bg-gray-50 transition duration-200 cursor-pointer rounded" 
            >
              <img
                src={connection.imgUrl || "https://robohash.org/placeholder-avatar"}
                alt={connection.username}
                className="w-14 h-14 rounded-full border-2 border-gray-200 mr-4 shadow-md"
              />
              <div className="flex-1"
                onClick={() => handleProfileClick(connection._id)}
              >
                <p className="font-semibold text-customBlack text-lg">
                  {connection.username}
                </p>
                <p
                  className={`text-sm text-green-600`}
                >
                      <FaCheckCircle className="inline mr-1" /> Connected

                </p>
              </div>
              <button
                className="bg-customBlue text-white py-1 px-4 rounded-md shadow hover:bg-blue-700 transition duration-200"
                onClick={handleMessageClick} 
              >
                Message
              </button>
            </div>
          ))
        )}
      </div>

      <div className="bg-white p-6 rounded-md shadow-lg">
        <h2 className="text-2xl font-bold text-customBlue mb-4">
          Suggested Connections
        </h2>
        {suggestedConnections.map((suggestion) => (
          <div
            key={suggestion.id}
            onClick={() => handleProfileClick(suggestion.id)}
            className="flex items-center border-b last:border-b-0 py-4 hover:bg-gray-50 transition duration-200 cursor-pointer"
          >
            <img
              src={suggestion.avatar}
              alt={suggestion.name}
              className="w-14 h-14 rounded-full border-2 border-gray-200 mr-4 shadow-md"
            />
            <div className="flex-1">
              <p className="font-semibold text-customBlack text-lg">
                {suggestion.name}
              </p>
            </div>
            <button
              className="bg-theme text-white py-1 px-4 rounded-md shadow hover:bg-blue-700 transition duration-200"
              onClick={() => navigate(`/connection/networks-screen`)} // Navigate to profile on button click
            >
              Connect
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAllConnections;
