import React from "react";
import Experience from "./components/Experience";
import { KeyboardControls } from "@react-three/drei";
import { useMemo } from "react";
import Start from "./components/Start";
import Finish from "./components/Finsh";
import useFinishedStore from "./libs/Zustand";
import JoystickControl from "./components/Joystick";
import { Controls } from "./libs/Controls";
const App = () => {
  const map = useMemo(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.jump, keys: ["Space"] },
    ],
    []
  );

  const { finished } = useFinishedStore();

  return (
    <>
      <Start />
      <KeyboardControls map={map}>
        <Experience />
      </KeyboardControls>
      <JoystickControl />
      {finished && <Finish />}
    </>
  );
};

export default App;
