import { create } from "zustand";

// Create the mobile controls store
const useMobileControlsStore = create((set) => ({
  // State
  forward: false,
  back: false,
  left: false,
  right: false,
  jumpPressed: false,

  // Actions
  setForward: (pressed) => set({ forward: pressed }),
  setBack: (pressed) => set({ back: pressed }),
  setLeft: (pressed) => set({ left: pressed }),
  setRight: (pressed) => set({ right: pressed }),
  setJumpPressed: (pressed) => set({ jumpPressed: pressed }),
}));

export default useMobileControlsStore;

