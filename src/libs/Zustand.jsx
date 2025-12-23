import { create } from "zustand";

// Create the store
const useFinishedStore = create((set) => ({
  // State
  finished: false,

  // Actions
  setFinished: (value) => set({ finished: value }),
}));

export default useFinishedStore;
