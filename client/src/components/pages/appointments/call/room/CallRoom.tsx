"use client";

import { usePeerStore } from "@/context/Peer";
import { WebSocketContext } from "@/context/webSocketContext";
import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const CallRoom = ({ session }: { session: any }) => {
  const socket = useContext(WebSocketContext);
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const { createOffer, CreateAnswer, setRemoteDescription } = usePeerStore();
  // New User Joined
  const handleUserJoined = useCallback(
    async (data: { email: string }) => {
      console.log(`User ${data.email} joined the call.`);
      toast.success(`User ${data.email} joined the call.`, {
        duration: 2000,
        position: "top-right",
      });
      const offer = await createOffer();

      setTimeout(() => {
        socket.emit("call-user", {
          offer,
          email: data.email,
        });
      }, 1000);
    },
    [createOffer, socket]
  );
  // Handle incoming call
  const handleIncomingCall = useCallback(
    async (data: { from: string; offer: RTCSessionDescriptionInit }) => {
      const { from, offer } = data;
      console.log("Incoming call from:", from);
      console.log("Incoming call offer received:", offer);
      const answer = await CreateAnswer(offer);

      socket?.emit("call-accepted", {
        answer,
        email: session?.user?.email,
      });
    },
    [CreateAnswer, socket, session]
  );
  // Handle call accepted
  const handleCallAccepted = useCallback(
    async (data: { answer: RTCSessionDescriptionInit }) => {
      console.log("Call accepted:", data.answer);
      await setRemoteDescription(data.answer);
      console.log("Call accepted:", data.answer);
    },
    [setRemoteDescription]
  );
  // get user media stream
  const getUserMediaStream = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setMyStream(stream);
      console.log("User media stream acquired:", stream);
    } catch (error: any) {
      if (error.name === "NotFoundError") {
        console.error(
          "No media devices found. Please check camera/microphone access."
        );
      } else if (error.name === "NotAllowedError") {
        console.error("Access to camera/microphone was denied by the user.");
      } else {
        console.error("Unexpected error accessing media devices:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (!socket) return;
    console.log("Socket connected:", socket.id);
    socket.on("user-joined", handleUserJoined);
    socket.on("incoming-call", handleIncomingCall);
    socket.on("call-accepted", handleCallAccepted);
    return () => {
      socket.off("user-joined", handleUserJoined);
      socket.off("incoming-call", handleIncomingCall);
      socket.off("call-accepted", handleCallAccepted);
    };
  }, [socket, handleUserJoined, handleIncomingCall, handleCallAccepted]);

  // userMedia
  useEffect(() => {
    getUserMediaStream();
  }, []);

  return (
    <div>
      Enter
      {myStream && (
        <video
          id="myVideo"
          autoPlay
          className="w-full h-full object-cover"
          playsInline
          ref={(videoElement) => {
            if (videoElement) {
              videoElement.srcObject = myStream;
            }
          }}
        />
      )}
    </div>
  );
};

export default CallRoom;
