"use client";

import { usePeerStore } from "@/store/peerStore";
import { useSocketStore } from "@/store/useSocketStore";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";

const Call = ({ data, session }: { data: any; session: any }) => {
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
    if (socket?.connected) {
      handleJoinedRoom();
    }
  }, [socket, handleJoinedRoom]);

  // Listen for user joining the call and handle offer creation
  useEffect(() => {
    if (!socket) return;
    socket.on("userJoined", handleCallOffer);
    return () => {
      socket.off("userJoined", handleCallOffer);
    };
  }, [socket, offer, createOffer, handleCallOffer]);

  return (
    <div
      style={{ height: "80vh", borderRadius: "12px", overflow: "hidden" }}
    ></div>
  );
};

export default Call;
