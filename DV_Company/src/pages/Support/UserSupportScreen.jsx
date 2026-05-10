import React, { useState } from "react";
import { IMAGES } from "../../assets";
import { IoIosCheckmark, IoMdMore } from "react-icons/io";
import { FiPhone } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import { SlOptionsVertical } from "react-icons/sl";
import { BiSolidMicrophone } from "react-icons/bi";
import { HiPaperClip } from "react-icons/hi";
import { RiSendPlaneFill } from "react-icons/ri";
import ChatCard from "../../components/Admin/Support/ChatCard";
import { chatsCardDetails } from "../../constants/chatsCardDetails";

export default function UserSupportScreen() {
  const [message, setMessage] = useState("");
  const [sentMsg, setSentMsg] = useState("");
  const [receiveMsg, setReceiveMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSentMsg(message);
    setMessage("");
    setTimeout(() => {
      setReceiveMsg("Thank you for reaching out to us. How can we assist you?");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-customDarkBlue">
          Support Dashboard
        </h1>
      </div>

      <div className="flex flex-row max-h-screen">
        {/* Left Column - User Queries */}
        <div className="flex-1 bg-white p-4 rounded-l-3xl shadow-lg">
          <h2 className="text-xl font-semibold text-customDarkBlue mb-6">
            User Queries
          </h2>
          {/* Chat Cards */}
          <div className="overflow-y-auto h-[73vh] register-scrollbar2">
            {chatsCardDetails.map((item, index) => (
              <ChatCard
                key={index}
                img={item.avatar}
                name={item.name}
                lastSeen={item.lastSeen}
                msgShown={item.msgShown}
                status={item.status}
              />
            ))}
          </div>
        </div>

        {/* Right Column - Admin Chat Window */}
        <div className="flex-[2] flex flex-col bg-white p-4 rounded-r-3xl shadow-lg">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b pb-4 mb-4">
            <div className="flex items-center space-x-3">
              <img
                src={IMAGES.avatar11}
                alt="User Avatar"
                className="h-12 w-12 rounded-full"
              />
              <div>
                <p className="text-lg font-semibold text-customBlackGreyish">
                  Ms. Aliay Lane
                </p>
                <div className="flex items-center text-customLightGrayShade text-sm">
                  <GoDotFill className="text-customOnlineColor mr-1" />
                  Online
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FiPhone size={20} className="text-gray-600 cursor-pointer" />
              <SlOptionsVertical
                size={20}
                className="text-gray-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col-reverse overflow-y-auto">
            {/* Admin Message Input */}
            <div className="flex items-center mt-4">
              <div className="flex items-center w-full bg-gray-100 rounded-full shadow-lg p-2">
                <textarea
                  rows="1"
                  placeholder="Type your response..."
                  className="flex-1 px-3 py-2 text-sm bg-transparent outline-none resize-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = e.target.scrollHeight + "px";
                  }}
                ></textarea>
                <BiSolidMicrophone className="text-customMsgIconsColor w-5 h-5 mx-2 cursor-pointer" />
                <HiPaperClip className="text-customMsgIconsColor w-5 h-5 mx-2 cursor-pointer" />
                <button
                  onClick={handleSubmit}
                  className="bg-customBlue text-white p-2 rounded-full hover:bg-blue-600 transition"
                >
                  <RiSendPlaneFill />
                </button>
              </div>
            </div>

            {/* Messages Section */}
            <div className="flex flex-col-reverse gap-y-3 p-4">
              {/* Received Message */}
              <div className="flex items-start space-x-2">
                <img
                  src={IMAGES.avatar11}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <div className="bg-customYellowShade p-3 rounded-r-xl rounded-bl-xl shadow-md">
                  <p className="text-sm text-black">
                    {receiveMsg !== "" ? receiveMsg : "Yes, I am available RN."}
                  </p>
                  <div className="flex items-center text-customGray text-xs mt-1">
                    <p>18:19</p>
                    <IoIosCheckmark size={18} className="ml-1" />
                  </div>
                </div>
              </div>

              {/* Sent Message */}
              <div className="flex justify-end">
                <div className="bg-customMaroon p-3 rounded-l-xl rounded-tr-xl shadow-md max-w-[75%]">
                  <p className="text-sm text-white">
                    {sentMsg !== ""
                      ? sentMsg
                      : "Hi Miss, are you available for a quick online class?"}
                  </p>
                  <div className="flex items-center text-customLightGray text-xs mt-1">
                    <p>18:16</p>
                    <IoIosCheckmark size={18} className="ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
