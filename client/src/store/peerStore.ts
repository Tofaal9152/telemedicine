import { create } from "zustand";

type PeerStore = {
  peer: RTCPeerConnection | null;
  offer: RTCSessionDescriptionInit | null;
  answer: RTCSessionDescriptionInit | null;
  createPeer: () => void;
  createOffer: () => Promise<void>;
  createAnswer: (offer: RTCSessionDescriptionInit) => Promise<void>;
  setRemoteAnswer: (answer: RTCSessionDescriptionInit) => void;
};

export const usePeerStore = create<PeerStore>((set) => ({
  offer: null,
  peer: null,
  answer: null,

  createPeer: () => {
    const peer = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:global.stun.twilio.com:3478" },
      ],
    });
    set({ peer });
  },
  createOffer: async () => {
    const { peer } = usePeerStore.getState();
    if (!peer) {
      console.error("Peer connection not initialized");
      return;
    }

    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    console.log("Offer created:", offer);
    set({ offer });
  },
  createAnswer: async (offer: RTCSessionDescriptionInit) => {
    const { peer } = usePeerStore.getState();
    if (!peer) {
      console.error("Peer connection not initialized in createAnswer");
      return;
    }
    await peer.setRemoteDescription(offer);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    if (!answer) {
      console.error("Failed to create answer");
      return;
    }
    console.log("Answer created:", answer);
    set({ answer });
  },
  setRemoteAnswer: async (answer: RTCSessionDescriptionInit) => {
    const { peer } = usePeerStore.getState();
    if (!peer) {
      console.error("Peer connection not initialized in setRemoteAnswer");
      return;
    }
    await peer.setRemoteDescription(answer);
  },
}));
