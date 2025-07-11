"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFetchData } from "@/hooks/useFetchData";
import { useSocketStore } from "@/store/useSocketStore";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

const Chat = ({ data, session }: { data: any; session: any }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const socket = useSocketStore((s) => s.socket);
  const initSocket = useSocketStore((s) => s.initSocket);

  const PrevChat = useFetchData<any>(
    `/chats?doctorId=${data.doctorId}&patientId=${data.patientId}`,
    ["chat", data.doctorId, data.patientId]
  );

  // Init socket once
  useEffect(() => {
    if (!socket) initSocket();
  }, [socket, initSocket]);

  // Join room when socket is ready
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

  // Set previous messages
  useEffect(() => {
    if (PrevChat.data) {
      setMessages(PrevChat.data);
    }
  }, [PrevChat.data]);

  // Listen to incoming messages
  useEffect(() => {
    if (!socket) return;

    const handleIncomingMessage = (msg: any) => {
      console.log("test", msg);
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("onMessage", handleIncomingMessage);

    return () => {
      socket.off("onMessage", handleIncomingMessage);
    };
  }, [socket]);

  // Send message via socket
  console.log(data);
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
  console.log(messages);
  return (
    <div className="flex flex-col flex-1 h-full overflow-hidden p-4 bg-white/10 backdrop-blur rounded-2xl border border-white/20 text-white">
      {/* Messages */}
      <div className="flex-1 mb-4 pr-1">
       <div className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-full">
          {PrevChat.isPending && (
            <div className="text-center">
              <Loader className="mx-auto animate-spin" />
            </div>
          )}
          {PrevChat.error && (
            <div className="text-center text-red-500">
              Error loading messages.
            </div>
          )}
          {!PrevChat.isPending && !PrevChat.error && messages.length === 0 && (
            <div className="text-center">No messages yet.</div>
          )}

          {messages.map((msg: any) => (
            <div
              key={msg.id || Math.random()}
              className={`flex flex-col ${
                msg.userId === session.user.id ? "items-end" : "items-start"
              } w-full`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-md text-sm shadow transition-colors ${
                  msg.userId === session.user.id
                    ? "bg-green-500 text-white self-end"
                    : "bg-gray-200 text-gray-900 self-start"
                }`}
              >
                {msg?.content}
              </div>
              <span
                className={`text-xs mt-1 ${
                  msg.userId === session.user.id
                    ? "text-green-300 text-right"
                    : "text-white text-left"
                }`}
                style={{ maxWidth: "70%" }}
              >
                {msg?.timestamp
                  ? new Date(msg.timestamp).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })
                  : ""}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="flex items-center gap-2">
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message..."
          className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none placeholder:text-white/50"
        />
        <Button onClick={handleSend} variant="outline">
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chat;
