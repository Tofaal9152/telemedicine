"use client";

import { useSocketStore } from "@/store/useSocketStore";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { usePeerStore } from "@/store/peerStore";
import { Button } from "@/components/ui/button";

const CallSection = ({ data, session }: { data: any; session: any }) => {
  // usestate
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [userJoinedMessage, setUserJoinedMessage] = useState("");
  // zustand stores
  const socket = useSocketStore((s) => s.socket);
  const offer = usePeerStore((s) => s.offer);
  const createOffer = usePeerStore((s) => s.createOffer);
  const initSocket = useSocketStore((s) => s.initSocket);

  // join room for and send who is joining
  const handleJoinedRoom = useCallback(async () => {
    if (!socket || !data?.doctorId || !data?.patientId) {
      toast.error("Invalid data for joining call room.");
      return;
    }
    const room = `room-call-${data.doctorId}-${data.patientId}`;
    socket.emit("joinRoomCall", {
      room,
      name: session?.user?.name || "Anonymous",
      role: session?.user?.role || "guest",
    });
  }, [socket, data, session]);

  // toast the joined user name ,make call offer and send it to the room
  const handleCallOffer = useCallback(
    async (data: any) => {
      console.log(data);
      setUserJoinedMessage(data.message);
      toast.success(data.message, {
        duration: 2000,
        position: "top-right",
      });
      if (!offer) {
        await createOffer();
      }
      console.log("Creating offer:", offer);
      if (offer && socket) {
        socket.emit("call-offer", {
          offer,
          room: `room-call-${data.doctorId}-${data.patientId}`,
        });
      }
    },
    [offer, createOffer, socket]
  );

  // handle call user
  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setLocalStream(stream);
  }, []);

  //  handle incoming call offer
  // const handleIncomingCall = useCallback((offer: unknown) => {
  //   toast.success(`Incoming call...`, {
  //     duration: 2000,
  //     position: "top-right",
  //   });
  //   console.log("Incoming call offer:", offer);
  // }, []);

  // Init socket
  useEffect(() => {
    if (!socket) initSocket();
  }, [socket, initSocket]);

  // Join room when component mounts
  useEffect(() => {
    if (!socket) return;
    handleJoinedRoom();
  }, [socket, handleJoinedRoom]);

  // Listen for user joining the call and handle offer creation
  useEffect(() => {
    if (!socket) return;
    socket.on("userJoined", handleCallOffer);
    return () => {
      socket.off("userJoined", handleCallOffer);
    };
  }, [socket, offer, createOffer, handleCallOffer]);
  // // Listen for incoming call offers
  // useEffect(() => {
  //   if (!socket) return;
  //   socket.on("incoming-call", handleIncomingCall);

  //   return () => {
  //     socket.off("incoming-call", handleIncomingCall);
  //   };
  // }, [socket, handleIncomingCall]);
console.log("localStream", localStream);
  return (
    <div style={{ height: "80vh", borderRadius: "12px", overflow: "hidden" }}>
      {userJoinedMessage && (
        <div className="p-4 bg-green-100 text-green-800">
          {userJoinedMessage}
          <Button onClick={handleCallUser}>call</Button>
        </div>
      )}
      {localStream && (
        <video
          className="w-full h-full object-cover"
          autoPlay
          playsInline
          ref={(video) => {
            if (video) {
              video.srcObject = localStream;
            }
          }}
        />
      )}
    </div>
  );
};

export default CallSection;
