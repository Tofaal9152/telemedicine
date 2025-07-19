"use client";

import { Button } from "@/components/ui/button";
import { WebSocketContext } from "@/context/webSocketContext";
import { Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect } from "react";
import { toast } from "sonner";

const Call = ({ data, session }: { data: any; session: any }) => {
  const router = useRouter();
  const socket = useContext(WebSocketContext);
  const room = `room-call-${data?.doctorId}-${data?.patientId}`;

  const handleJoinRoom = useCallback(() => {
    if (!socket || !data?.doctorId || !data?.patientId) {
      console.log("Invalid data for joining call room.");
      toast.error("Invalid data for joining call room.");
      return;
    }

    socket.emit("join-room", {
      room,
      name: session?.user?.name ?? "Anonymous",
      role: session?.user?.role ?? "guest",
      email: session?.user?.email ?? "unknown@example.com",
    });
  }, [socket, room, data, session]);

  const handleJoinedRoom = useCallback(
    (data: { message: string }) => {
      console.log(data?.message);
      router.push(`/appointments/call/${room}`);
    },
    [router, room]
  );

  useEffect(() => {
    socket.on("joined-room", handleJoinedRoom);
    return () => {
      socket.off("joined-room", handleJoinedRoom);
    };
  }, [socket, handleJoinedRoom]);
  return (
    <div
      style={{ height: "80vh", borderRadius: "12px", overflow: "hidden" }}
      className="flex items-center justify-center    border-4 border-dashed border-gray-300"
    >
      <Button onClick={handleJoinRoom} variant={"destructive"} size={"lg"}>
        <Video /> Join Video Call
      </Button>
    </div>
  );
};

export default Call;
// "use client";

// import { usePeerStore } from "@/store/peerStore";
// import { useSocketStore } from "@/store/useSocketStore";
// import { useCallback, useEffect } from "react";
// import { toast } from "sonner";

// interface CallProps {
//   data: {
//     doctorId: string;
//     patientId: string;
//   };
//   session: {
//     user: {
//       name: string;
//       role: string;
//     };
//   };
// }

// const Call = ({ data, session }: CallProps) => {
//   const { socket, initSocket } = useSocketStore();
//   const { peer, offer, createOffer, answer, createPeer } = usePeerStore();

//   const room = `room-call-${data?.doctorId}-${data?.patientId}`;

//   const handleJoinedRoom = useCallback(() => {
//     if (!socket || !data?.doctorId || !data?.patientId) {
//       toast.error("Invalid data for joining call room.");
//       return;
//     }

//     socket.emit("joinRoomCall", {
//       room,
//       name: session?.user?.name ?? "Anonymous",
//       role: session?.user?.role ?? "guest",
//     });
//   }, [socket, room, data, session]);

//   const handleCallOffer = useCallback(async () => {
//     toast.success("User joined. Starting call...", {
//       duration: 2000,
//       position: "top-right",
//     });
//     if (!peer) {
//       await createPeer();
//     }
//     if (!offer) await createOffer();

//     const updatedOffer = usePeerStore.getState().offer; // ensure latest

//     if (updatedOffer && socket) {
//       socket.emit("call-user", {
//         offer: updatedOffer,
//         room,
//       });
//     }
//   }, [offer, socket, room, createOffer, createPeer, peer]);

//   const handleIncomingCall = useCallback(
//     (offer: RTCSessionDescriptionInit) => {
//        if (!peer) {
//         createPeer();
//       }
//       const { createAnswer } = usePeerStore.getState();
//       if (createAnswer) {
//         createAnswer(offer);
//       }
//       socket?.emit("call-accepted", {
//         room,
//         answer,
//       });
//     },
//     [socket, room, answer, createPeer, peer]
//   );
//   const handleCallAccepted = useCallback(
//     async (data: { room: string; answer: RTCSessionDescriptionInit }) => {
//       if (!peer) {
//         createPeer();
//       }
//       await usePeerStore.getState().setRemoteAnswer(data.answer);
//       console.log(`Call accepted in room: ${data.room}`);
//     },
//     []
//   );

//   // Init socket on mount
//   useEffect(() => {
//     if (!socket) initSocket();
//   }, [socket, initSocket]);
//   console.log("socket", socket);
//   // Join the call room once socket is connected
//   useEffect(() => {
//     if (socket?.connected) handleJoinedRoom();
//   }, [socket?.connected, handleJoinedRoom]);

//   // Socket listeners
//   useEffect(() => {
//     if (!socket) return;

//     socket.on("userJoined", handleCallOffer);
//     socket.on("incoming-call", handleIncomingCall);

//     return () => {
//       socket.off("userJoined", handleCallOffer);
//       socket.off("incoming-call", handleIncomingCall);
//       socket.off("call-accepted", handleCallAccepted);
//     };
//   }, [socket, handleCallOffer, handleIncomingCall, handleCallAccepted]);

//   return (
//     <div style={{ height: "80vh", borderRadius: "12px", overflow: "hidden" }}>
//       Video/Call UI goes here.
//     </div>
//   );
// };

// export default Call;
