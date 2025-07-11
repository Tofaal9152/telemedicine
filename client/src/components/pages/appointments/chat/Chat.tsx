"use client";

import {
  ChatContainer,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import { useFetchData } from "@/hooks/useFetchData";
import { useSocketStore } from "@/store/useSocketStore";
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

  // Init socket
  useEffect(() => {
    if (!socket) initSocket();
  }, [socket, initSocket]);

  // Join socket room
  useEffect(() => {
    if (!socket || !data?.doctorId || !data?.patientId) return;

    const room = `room-${data.doctorId}-${data.patientId}`;

    const join = () => {
      socket.emit("joinRoom", { room });
      console.log("Joined room:", room);
    };

    if (socket.connected) {
      join();
      // No cleanup needed if already connected
      return;
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

  // Send message
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

  return (
    <div style={{ height: "80vh", borderRadius: "12px", overflow: "hidden" }}>
      <MainContainer style={{ height: "100%" }}>
        <ChatContainer>
          <MessageList>
            {messages.map((msg, idx) => (
              <Message
                key={msg.id || idx}
                model={{
                  message: msg.content,
                  sentTime: msg.timestamp
                    ? new Date(msg.timestamp).toLocaleTimeString()
                    : "just now",
                  direction:
                    msg.userId === session.user.id ? "outgoing" : "incoming",
                  position: "single",
                }}
              />
            ))}
          </MessageList>

          <MessageInput
            placeholder="Type message..."
            value={message}
            onChange={(val) => setMessage(val)}
            onSend={handleSend}
            attachButton={false}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default Chat;
