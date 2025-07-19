"use client";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";

interface PeerContextType {
  peer: RTCPeerConnection | null;
  createOffer: () => Promise<RTCSessionDescriptionInit>;
  CreateAnswer: (
    offer: RTCSessionDescriptionInit
  ) => Promise<RTCSessionDescriptionInit>;
  setRemoteDescription: (answer: RTCSessionDescriptionInit) => Promise<void>;
}

const peerContext = createContext<PeerContextType | null>(null);

export const usePeerStore = () => {
  const context = useContext(peerContext);
  if (!context) {
    throw new Error("usePeerStore must be used within a PeerProvider");
  }
  return context;
};

export const PeerProvider = ({ children }: { children: React.ReactNode }) => {
  const [peer, setPeer] = useState<RTCPeerConnection | null>(null);

  useEffect(() => {
    const pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:global.stun.twilio.com:3478",
          ],
        },
      ],
    });
    setPeer(pc);
  }, []);

  const createOffer = useCallback(async () => {
    if (!peer) throw new Error("Peer connection not ready yet");
    try {
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);
      return offer;
    } catch (error) {
      console.error("Error creating offer:", error);
      throw error;
    }
  }, [peer]);
  const CreateAnswer = useCallback(
    async (offer: RTCSessionDescriptionInit) => {
      if (!peer) throw new Error("Peer connection not ready yet");
      try {
        await peer.setRemoteDescription(offer);
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        return answer;
      } catch (error) {
        console.error("Error answering call:", error);
        throw error;
      }
    },
    [peer]
  );

  const setRemoteDescription = useCallback(
    async (answer: RTCSessionDescriptionInit) => {
      if (!peer) throw new Error("Peer connection not ready yet");

      // Prevent double-setting remote description
      const currentState = peer.signalingState;
      if (
        currentState !== "have-local-offer" &&
        currentState !== "have-remote-offer"
      ) {
        console.warn("Skipped setRemoteDescription, state:", currentState);
        return;
      }

      try {
        await peer.setRemoteDescription(answer);
      } catch (error) {
        console.error("Error setting remote description:", error);
        throw error;
      }
    },
    [peer]
  );
const sendStream = useCallback(
    (stream: MediaStream) => {
      if (!peer) throw new Error("Peer connection not ready yet");
      stream.getTracks().forEach((track) => {
        peer.addTrack(track, stream);
      });
    },
    [peer]
  );

  const contextValue = useMemo(
    () => ({ peer, createOffer, CreateAnswer, setRemoteDescription, sendStream }),
    [peer, createOffer, CreateAnswer, setRemoteDescription, sendStream]
  );

  return (
    <peerContext.Provider value={contextValue}>{children}</peerContext.Provider>
  );
};
