import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import React from "react";
import { Controls } from "../App";
import { useRef } from "react";
import { Vector3 } from "three";

const Scene = () => {
  const [, get] = useKeyboardControls();
  const rb = useRef();

  const val = new Vector3();

  const inAir = useRef(false);

  useFrame(() => {
    const curVel = rb.current.linvel();

    val.x = 0;
    val.y = 0;
    val.z = 0;
    if (get()[Controls.forward]) {
      val.z -= 5;
    }
    if (get()[Controls.back]) {
      val.z += 5;
    }
    if (get()[Controls.left]) {
      val.x -= 5;
    }
    if (get()[Controls.right]) {
      val.x += 5;
    }
    if (get()[Controls.jump] && !inAir.current) {
      val.y += 8;
      inAir.current = true;
    } else {
      val.y = curVel.y;
    }
    rb.current.setLinvel(val, true);
  });

  return (
    <>
      <RigidBody
        ref={rb}
        lockRotations
        gravityScale={2.5}
        onCollisionEnter={(other) => {
          if (other.rigidBodyObject.name === "ground") {
            inAir.current = false;
          }
        }}
      >
        <mesh receiveShadow castShadow>
          <boxGeometry />
          <meshBasicMaterial color={"hotpink"} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" name="ground">
        <mesh
          receiveShadow
          castShadow
          position={[0, -2, 0]}
          rotation-x={Math.PI / 2}
        >
          <planeGeometry args={[50, 50, 50, 50]} />
          <meshBasicMaterial color={"purple"} side={2} />
        </mesh>
      </RigidBody>
    </>
  );
};

export default Scene;
