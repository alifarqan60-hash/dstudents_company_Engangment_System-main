// src/components/Profile/ChatCard.js
import React from "react";

const ChatCard = ({ img, name, lastSeen, msgShown, status, onClick, isSelected }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center p-3 cursor-pointer rounded-lg ${
        isSelected ? "bg-blue-100" : "hover:scale-105 transition-all duration-200"
      }`}
    >
      {img==null?
      <div className="w-[38px] h-[38px] rounded-full flex items-center justify-center bg-white">
        <p className="font-bold text-2xl">{name.at(0).toUpperCase()}</p>
      </div>
      :
        <img src={img} alt="Avatar" className="w-[38px] h-[38px] rounded-full" />
    
      
      }
      <div className="ml-3 flex-1">
        <div className="flex justify-between">
          <h5 className="text-sm font-semibold">{name}</h5>
          {/* <span className="text-xs text-gray-500">{lastSeen}</span> */}
        </div>
        <div className="flex justify-between">
          <p className="text-xs text-gray-600 truncate">{msgShown}</p>
          {/* <span className={`text-xs ${status === "online" ? "text-green-500" : "text-red-500"}`}>
            {status}
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
