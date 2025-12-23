import { create } from "zustand";

// Create the joystick store
const useJoystickStore = create((set) => ({
  // State
  joystickDirection: { x: 0, y: 0 },
  joystickActive: false,
  jumpPressed: false,

  // Actions
  setJoystickDirection: (direction) => set({ joystickDirection: direction }),
  setJoystickActive: (active) => set({ joystickActive: active }),
  setJumpPressed: (pressed) => set({ jumpPressed: pressed }),
}));

export default useJoystickStore;

