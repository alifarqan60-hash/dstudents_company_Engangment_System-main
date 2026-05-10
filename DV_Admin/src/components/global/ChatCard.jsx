import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";

export default function ChatCard({ img, name, lastSeen, msgShown, status }) {
  const [msgReceived, setMsgReceived] = useState(false);

  useEffect(() => {
    if (msgShown.includes("You:")) {
      setMsgReceived(true);
    } else {
      setMsgReceived(false);
    }
  }, [msgShown]);

  return (
    <div className="flex p-2 items-center relative">
      {status === "online" && (
        <GoDotFill
          className="absolute bottom-1 left-1 text-customOnlineColor"
          size={20}
        />
      )}
      <img src={img} alt="Avatar" className="w-[38px] h-[38px]" />

      <div className="flex w-full flex-col ml-2">
        <div className="flex justify-between text-customBlackGreyish font-medium ">
          <p className="text-sm">{name}</p>
          <p className="text-xxs text-customLightGrayShade hidden lg:flex">
            {lastSeen}
          </p>
        </div>
        <p
          className={`${
            msgReceived ? "text-customLightGray" : "text-customYellow"
          } text-xs font-medium hidden smMd:flex md:hidden lg:flex`}
        >
          {msgShown}
        </p>
      </div>
    </div>
  );
}
