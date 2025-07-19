"use client";
import { getSocket } from "@/lib/socket";
import { createContext } from "react";
import { Socket } from "socket.io-client";

export const socket = getSocket();
export const WebSocketContext = createContext<Socket>(socket);

export const WebSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};
