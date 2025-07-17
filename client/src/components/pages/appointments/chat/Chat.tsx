"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFetchData } from "@/hooks/useFetchData";
import { useSocketStore } from "@/store/useSocketStore";
import { SendHorizonal } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const Chat = ({ data, session }: { data: any; session: any }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const socket = useSocketStore((s) => s.socket);
  const initSocket = useSocketStore((s) => s.initSocket);

  const PrevChat = useFetchData<any>(
    `/chats?doctorId=${data.doctorId}&patientId=${data.patientId}`,
    ["chat", data.doctorId, data.patientId]
  );

  // Init socket
  useEffect(() => {
    if (!socket) initSocket();
  }, [socket, initSocket]);

  // Join room
  useEffect(() => {
    if (!socket || !data?.doctorId || !data?.patientId) return;

    const room = `room-${data.doctorId}-${data.patientId}`;

    const join = () => {
      socket.emit("joinRoom", { room });
      console.log("Joined room:", room);
    };

    if (socket.connected) {
      join();
    } else {
      socket.on("connect", join);
      return () => {
        socket.off("connect", join);
      };
    }
  }, [socket, data]);

  // Load previous messages
  useEffect(() => {
    if (PrevChat.data) {
      setMessages(PrevChat.data);
    }
  }, [PrevChat.data]);

  // Handle incoming messages
  useEffect(() => {
    if (!socket) return;

    const handleIncomingMessage = (msg: any) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("onMessage", handleIncomingMessage);

    return () => {
      socket.off("onMessage", handleIncomingMessage);
    };
  }, [socket]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!message.trim() || !socket) return;

    const newMessage = {
      content: message,
      doctorId: data.doctorId,
      patientId: data.patientId,
      userId: session.user.id,
    };

    socket.emit("createMessage", newMessage);
    setMessage("");
  };

  if (PrevChat.isLoading) {
    return (
      <div className="flex items-center justify-center h-full">Loading...</div>
    );
  }

  const convertTimestamp = (timestamp: string) => {
    return (
      new Date(timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }) || "just now"
    );
  };

  return (
    <div className="h-[80vh] rounded-xl overflow-hidden flex flex-col border border-gray-200 shadow-sm">
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((msg, idx) => {
          const isOutgoing = msg.userId === session.user.id;

          return (
            <div
              key={msg.id || idx}
              className={`flex ${isOutgoing ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg text-sm shadow ${
                  isOutgoing
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-900"
                }`}
              >
                <div>{msg.content}</div>
                <div className="text-[10px] mt-1 opacity-60 text-right">
                  {convertTimestamp(msg.timestamp)}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t flex items-center gap-2 bg-white">
        <Input
          type="text"
          placeholder="Type a message..."
          className="flex-1 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-black  "
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button
          onClick={handleSend}
          size={"icon"}
          className="px-4 py-2 text-sm rounded-full bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          <SendHorizonal className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default Chat;
