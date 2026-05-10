// src/pages/StudentChatsPage.js
import React, { useEffect, useRef, useState } from "react";
import { IMAGES } from "../../assets";
import ChatCard from "../../components/Profile/ChatCard";
import { IoIosCheckmark } from "react-icons/io";
import { FiPhone } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import { SlOptionsVertical } from "react-icons/sl";
import { BiSolidMicrophone } from "react-icons/bi";
import { HiPaperClip } from "react-icons/hi";
import { RiSendPlaneFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux"; 
import socket from "../../config/socket";
import axiosInstance from "../../config/api";
import { fetchMessageUsers } from "../../redux/message/messageSlice";
import Loader from "../../components/Loader/Loader";

export default function StudentChatsPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  
  const messageUsers = useSelector((state) => state.message.users);
  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!currentUser) return;

    const fetchUsers = async () => {
      try {
        await dispatch(fetchMessageUsers());
      } catch (err) {
        console.log(err);
      }
    }

    fetchUsers();
  }, [dispatch, currentUser]);

  useEffect(() => {
    if (messageUsers && messageUsers.length > 0 && !selectedUser) {
      setSelectedUser(messageUsers[0]);
    }
  }, [messageUsers, selectedUser]);

  useEffect(() => {
    if (!currentUser || !selectedUser) return;

    const fetchMessages = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/messages/get-prev-msg/${selectedUser._id}`);
        setMessages(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setLoading(false);
      }
    };

    fetchMessages();

    socket.emit("registerUser", currentUser._id);

    const handleMessageReceived = (msg) => {
      if (
        (msg.senderId === selectedUser._id && msg.receiverId === currentUser._id) ||
        (msg.senderId === currentUser._id && msg.receiverId === selectedUser._id)
      ) {
        setMessages((prevMessages) => [...prevMessages, msg]);
      }
    };

    socket.on("messageReceived", handleMessageReceived);

    return () => {
      socket.off("messageReceived", handleMessageReceived);
    };
  }, [currentUser, selectedUser]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === "" || !selectedUser) return;

    const newMessage = {
      senderId: currentUser._id,
      receiverId: selectedUser._id,
      content: message.trim(),
    };

    socket.emit("privateMessage", newMessage);
    setMessages((prevMessages) => [...prevMessages, { ...newMessage, createdAt: new Date() }]);
    setMessage("");
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const filteredUsers = messageUsers?.filter(user=> user._id!==currentUser._id)
  

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-row flex-1 font-sans">
        
        {/* Left Div - Conversations */}
        <div className="w-72 fixed bg-blue-50 pl-2 pr-4 py-5 rounded-tr-3xl rounded-bl-3xl h-full">
          <div className="text-customDarkBlue flex justify-center font-medium text-base mb-6">
            Conversations
          </div>

          <div className="overflow-y-auto h-full register-scrollbar2">
            {messageUsers == undefined ? (
              <Loader />
            ) : messageUsers?.length === 0 ? (
              <p className="text-center text-gray-500">No conversations available.</p>
            ) : (
              filteredUsers.map((item) => (
                <ChatCard
                  key={item._id}
                  img={item.imgUrl || IMAGES.defaultAvatar}
                  name={item.username}
                  lastSeen={item.lastSeen || "today"}
                  msgShown={item.lastMessage || "No messages yet"}
                  status={item.status || "offline"}
                  onClick={() => handleSelectUser(item)}
                  isSelected={selectedUser && selectedUser._id === item._id}
                />
              ))
            )}
          </div>
        </div>

        {/* Right Div - Chat Area */}
        <div className="flex flex-col ml-72 w-full">
          {selectedUser ? (
            <div className="flex fixed flex-row space-x-3 items-center ml-4 pl-3 pr-6 py-2 border-b border-b-gray-200 bg-gray-100 z-10 w-[950px] rounded">
              <div className="flex-shrink-0">

                {selectedUser?.imgUrl==null?
                  <div className="w-[38px] h-[38px] border-[1px]  rounded-full flex items-center justify-center bg-white">
                    <p className="font-bold text-2xl">{selectedUser.username.at(0).toUpperCase()}</p>
                  </div>
                  :
                    <img src={selectedUser.imgUrl} alt="Avatar" className="w-[38px] h-[38px] rounded-full" />
                  }
              </div>
              <div className="flex justify-between w-full">
                <div className="flex flex-col">
                  <p className="text-sm text-customBlackGreyish font-semibold">
                    {selectedUser.username}
                  </p>
                  <div className="flex flex-row items-center -ml-1">
                    <GoDotFill className="text-customOnlineColor" />
                    <p className="text-customLightGrayShade text-xxs font-normal text-start">
                      {selectedUser.status === "online" ? "Online" : "Online"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row space-x-3 items-center">
                  {/* <FiPhone size={18} />
                  <SlOptionsVertical size={16} /> */}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500">Select a conversation to start chatting.</p>
            </div>
          )}

          {selectedUser && (
            <div className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto pt-16 pl-4 pb-12"> {/* Padding to avoid overlap with header */}
                {loading ? (
                  <Loader />
                ) : messages.length === 0 ? (
                  <p className="text-center text-gray-500">No messages yet.</p>
                ) : (
                  messages.map((msg) => {
                    const isSentByCurrentUser = msg.senderId === currentUser._id;
                    return isSentByCurrentUser ? (
                      <div key={msg._id} className="flex justify-end mb-2">
                        <div className="flex flex-col items-end max-w-[80%]">
                          <div className="flex px-4 p-3 rounded-l-3xl rounded-tr-3xl md:rounded-l-full md:rounded-tr-full bg-theme">
                            <p className="text-white text-sm font-normal">
                              {msg.content}
                            </p>
                            <div className="flex flex-row ml-7 mt-[2px] text-white text-xxs font-medium">
                              <p className="mt-[2px]">
                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                              <IoIosCheckmark size={18} />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div key={msg._id} className="flex space-x-2 mb-2">
                        <div className="flex p-3 max-w-[80%] rounded-r-xl rounded-bl-xl sm:rounded-r-3xl sm:rounded-bl-3xl md:rounded-r-full md:rounded-bl-full bg-customLightBlueShade">
                          <p className="text-black text-sm font-normal">
                            {msg.content}
                          </p>
                          <div className="flex flex-row ml-7 mt-[2px] text-customGray text-xxs font-medium">
                            <p className="mt-[2px]">
                              {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef}></div>
              </div>

              <div className="flex fixed flex-row ml-4 items-center bottom-0 w-[950px] p-2">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-row w-full items-center space-x-2"
                >
                  <textarea
                    rows="1"
                    placeholder="Type your message..."
                    className="w-full px-3 py-2 text-sm outline-none resize-none overflow-hidden rounded-lg border border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onInput={(e) => {
                      e.target.style.height = "auto";
                      e.target.style.height = e.target.scrollHeight + "px";
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                  ></textarea>
                  {/* <BiSolidMicrophone className="text-customMsgIconsColor w-5 h-5" />
                  <HiPaperClip className="text-customMsgIconsColor w-5 h-5" /> */}
                  <button type="submit" className="hidden"></button>
                </form>
                <div
                  onClick={handleSubmit}
                  className="rounded-full p-2 ml-2 bg-theme flex items-center justify-center cursor-pointer"
                >
                  <RiSendPlaneFill className="text-white" />
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
