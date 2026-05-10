import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isSocketEnabled, setIsSocketEnabled] = useState(false);

  useEffect(() => {
    if (isSocketEnabled) {
      const newSocket = io("http://localhost:3000");
      if (newSocket) {
        newSocket.on("connect", () => {
          console.log("inside context");
        });
        setSocket(newSocket);
      }
      return () => newSocket.close();
    }
  }, [isSocketEnabled]);

  return (
    <SocketContext.Provider
      value={{ socket, isSocketEnabled, setIsSocketEnabled }}
    >
      {children}
    </SocketContext.Provider>
  );
};
