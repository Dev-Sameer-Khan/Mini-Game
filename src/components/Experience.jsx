import { Canvas } from "@react-three/fiber";
import React from "react";
import Scene from "./Scene";
import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";

const Experience = () => {
  return (
    <Canvas shadows>
      <OrbitControls enableDamping />
      <ambientLight intensity={2} castShadow />
      <Physics>
        <Scene />
      </Physics>
    </Canvas>
  );
};

export default Experience;
