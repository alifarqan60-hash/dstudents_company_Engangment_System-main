import React from "react";
import { useNavigate } from "react-router-dom";


const ConnectionScreen = () => {
  const navigate = useNavigate();

  const handleNextPage = () => {
    navigate("/connection/post-screen"); // Update the path as needed for the next page
  };

  return (
    <div className="flex flex-col w-full h-screen bg-gradient-to-br from-customBlue to-customDarkBlue items-center justify-center text-white">
      {/* Intro Section */}
      <div className="text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to Community & Networking</h1>
        <p className="text-lg mb-6">
          Start building your network with fellow professionals. Connect, collaborate, and grow your influence.
        </p>

        {/* Images or Illustrations */}
        <div className="flex justify-center mb-6">
          {/* <img
            src={IMAGES.networking_illustration} // Replace with your image
            alt="Networking"
            className="w-1/2 rounded-xl shadow-lg"
          /> */}
        </div>

        {/* Next Page Button */}
        <button
          onClick={handleNextPage}
          className="bg-theme hover:bg-blue-600 text-xl text-white font-semibold py-3 px-6 rounded-lg shadow-md transform transition-transform hover:scale-105"
        >
          Explore 
        </button>
      </div>
    </div>
  );
};

export default ConnectionScreen;
