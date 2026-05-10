import React from 'react';

const RequestCard = ({ invite, onAccept, onIgnore }) => {
  return (
    <div
      className="flex items-center justify-between w-full p-4 border-b border-gray-300 cursor-pointer"
      onClick={() => navigate("/connection/post-screen/user")}
    >
      <div className="flex items-center">
        <img
          src={invite.sender.imgUrl || "https://robohash.org/placeholder-avatar"}
          alt={invite.sender.username}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <p className="font-semibold">{invite.sender.username}</p>
          <p className="text-sm text-gray-600">{invite.sender.title}</p>
        </div>
      </div>

      <div className="flex space-x-4 font-normal">
        <button
          className="px-3 py-2 bg-customBlue text-white rounded-lg shadow hover:bg-blue-600 transition-colors duration-200"
          onClick={(e) => {
            e.stopPropagation(); // Prevent parent click
            onAccept();
          }}
        >
          Accept
        </button>
        <button
          className="px-3 py-2 bg-white text-customBlue font-medium border border-customBlue rounded-lg shadow hover:bg-gray-200 transition-colors duration-200"
          onClick={(e) => {
            e.stopPropagation(); // Prevent parent click
            onIgnore();
          }}
        >
          Ignore
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
