import { PerspectiveCamera, useKeyboardControls, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import {
  CuboidCollider,
  RigidBody,
  euler,
  quat,
  vec3,
} from "@react-three/rapier";
import React from "react";
import { Controls } from "../libs/Controls";
import { useRef } from "react";
import { Vector3 } from "three";
import { Playground } from "./Playground";
import useFinishedStore from "../libs/Zustand";
import useJoystickStore from "../libs/JoystickStore";

const Scene = () => {
  const [, get] = useKeyboardControls();
  const { joystickDirection, jumpPressed } = useJoystickStore();
  const rb = useRef();
  const PCamera = useRef();
  const cameraTarget = useRef(new Vector3(0, 0, 0));

  const val = new Vector3();

  const inAir = useRef(false);
  const punched = useRef(false);

  useFrame(() => {
    cameraTarget.current.lerp(vec3(rb.current.translation()), 0.5);
    PCamera.current.lookAt(cameraTarget.current);

    const curVel = rb.current.linvel();

    const rot = {
      x: 0,
      y: 0,
      z: 0,
    };

    val.x = 0;
    val.y = 0;
    val.z = 0;
    
    // Keyboard controls
    if (get()[Controls.forward]) {
      val.z -= 5;
    }
    if (get()[Controls.back]) {
      val.z += 5;
    }
    if (get()[Controls.left]) {
      rot.y += 2;
    }
    if (get()[Controls.right]) {
      rot.y -= 2;
    }
    
    // Joystick controls - check direction values directly
    // Joystick y-axis controls forward/back movement
    // Negative y means forward (stick pushed up), positive y means back (stick pushed down)
    if (Math.abs(joystickDirection.y) > 0.1) {
      // When y is negative (forward), we want val.z to decrease
      // When y is positive (back), we want val.z to increase
      val.z += 5 * joystickDirection.y;
    }
    
    // Joystick x-axis controls left/right rotation
    // Negative x means left, positive x means right
    if (Math.abs(joystickDirection.x) > 0.1) {
      // When x is negative (left), we want positive rotation
      // When x is positive (right), we want negative rotation
      rot.y -= 2 * joystickDirection.x;
    }
    
    rb.current.setAngvel(rot, true);
    const eularRot = euler().setFromQuaternion(quat(rb.current.rotation()));
    val.applyEuler(eularRot);
    
    // Jump controls (keyboard or joystick button)
    if ((get()[Controls.jump] || jumpPressed) && !inAir.current) {
      val.y += 8;
      inAir.current = true;
    } else {
      val.y = curVel.y;
    }
    if (!punched.current) {
      rb.current.setLinvel(val, true);
    }
  });

  const respawn = () => {
    rb.current.setTranslation({
      x: 0,
      y: 5,
      z: 0,
    });
  };

  const scene = useThree((state) => state.scene);
  const teleport = () => {
    const gate = scene.getObjectByName("gateLargeWide_teamYellow");
    // rb.current.setTranslation(gate.position)
    // Move the box to the gate's position but lift it up by 8 units on the y-axis
    rb.current.setTranslation({
      x: gate.position.x,
      y: gate.position.y + 1,
      z: gate.position.z,
    });
  };

  const { setFinished } = useFinishedStore();

  const texture = useTexture("/char.jpg")

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
          if (other.rigidBodyObject.name === "swiper") {
            punched.current = true;
            const timer = setTimeout(() => {
              punched.current = false;
            }, 300);
            return () => clearTimeout(timer);
          }
          if (other.rigidBodyObject.name === "finish") {
            setFinished(true);
          }
        }}
        onIntersectionEnter={(other) => {
          if (other.rigidBodyObject.name === "space") {
            respawn();
          }
          if (other.rigidBodyObject.name === "gateIn") {
            teleport();
          }
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 5, 8]} ref={PCamera} />
        <mesh castShadow>
          <boxGeometry />
          <meshBasicMaterial map={texture} />
        </mesh>
      </RigidBody>
      <Playground />
      <RigidBody
        position={[0, -10, 0]}
        sensor
        colliders={false}
        type="fixed"
        name="space"
      >
        <CuboidCollider args={[50, 0.5, 50]} />
      </RigidBody>
    </>
  );
};

export default Scene;
