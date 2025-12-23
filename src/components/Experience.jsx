import { Canvas } from "@react-three/fiber";
import React from "react";
import Scene from "./Scene";
import { Environment, OrbitControls, Sky } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";

const Experience = () => {
  return (
    <Canvas flat shadows>
      <OrbitControls enableDamping />
      <Environment preset="park" />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={1}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />
      <Sky sunPosition={2} />
      <Suspense fallback={null}>
        <Physics>
          <Scene />
        </Physics>
      </Suspense>
    </Canvas>
  );
};

export default Experience;
