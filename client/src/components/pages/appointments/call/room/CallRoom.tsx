"use client";

import { Button } from "@/components/ui/button";
import { usePeerStore } from "@/context/Peer";
import { WebSocketContext } from "@/context/webSocketContext";
import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const CallRoom = () => {
  const socket = useContext(WebSocketContext);
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [remoteEmail, setRemoteEmail] = useState<string | null>(null);

  const {
    createOffer,
    CreateAnswer,
    setRemoteDescription,
    sendStream,
    remoteStream,
    peer,
  } = usePeerStore();
  // New User Joined
  const handleUserJoined = useCallback(
    async (data: { recipientEmail: string }) => {
      console.log(`User ${data.recipientEmail} joined the call.`);
      toast.success(`User ${data.recipientEmail} joined the call.`, {
        duration: 2000,
        position: "top-right",
      });
      const offer = await createOffer();

      setTimeout(() => {
        socket.emit("call-user", {
          offer,
          recipientEmail: data.recipientEmail,
        });
      }, 1000);
      setRemoteEmail(data.recipientEmail);
    },
    [createOffer, socket]
  );
  // Handle incoming call
  const handleIncomingCall = useCallback(
    async (data: { senderEmail: string; offer: RTCSessionDescriptionInit }) => {
      const { senderEmail, offer } = data;

      console.log(`Incoming call from ${senderEmail}:`, offer);
      const answer = await CreateAnswer(offer);

      socket?.emit("call-accepted", {
        answer,
        senderEmail: senderEmail,
      });
      setRemoteEmail(senderEmail);
    },
    [CreateAnswer, socket]
  );
  // Handle call accepted
  const handleCallAccepted = useCallback(
    async (data: { answer: RTCSessionDescriptionInit }) => {
      console.log("Call accepted:", data.answer);
      await setRemoteDescription(data.answer);
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
  }, [getUserMediaStream]);

  // neghotiation needed
  const handleNegotiationNeeded = useCallback(async () => {
    if (!peer) return;
    const localOffer =await peer.createOffer();
    socket.emit("call-user", {
      offer: localOffer,
      recipientEmail: remoteEmail,
    });
  }, [peer, remoteEmail, socket]);

  useEffect(() => {
    if (!peer) return;
    peer.addEventListener("negotiationneeded", handleNegotiationNeeded);
    return () => {
      peer.removeEventListener("negotiationneeded", handleNegotiationNeeded);
    };
  }, [peer, handleNegotiationNeeded]);

  return (
    <div>
      <Button
        onClick={() => myStream && sendStream(myStream)}
        variant={"destructive"}
        size={"lg"}
      >
        Start Call
      </Button>
      <h4>You are connected to {remoteEmail}</h4>
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
      {remoteStream && (
        <video
          id="remoteVideo"
          autoPlay
          className="w-full h-full object-cover"
          playsInline
          ref={(videoElement) => {
            if (videoElement) {
              videoElement.srcObject = remoteStream;
            }
          }}
        />
      )}
    </div>
  );
};

export default CallRoom;
