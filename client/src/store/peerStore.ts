import { create } from "zustand";

type PeerStore = {
  peer: RTCPeerConnection | null;
  offer: RTCSessionDescriptionInit | null;
  createPeer: () => void;
  createOffer: () => Promise<void>;
};

export const usePeerStore = create<PeerStore>((set, get) => ({
  peer: null,
  offer: null,

  createPeer: () => {
    if (typeof window === "undefined") return;

    const peer = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:global.stun.twilio.com:3478" },
      ],
    });

    set({ peer });
  },

  createOffer: async () => {
    const { peer } = get();
    if (!peer) return;

    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    set({ offer });
  },
}));
