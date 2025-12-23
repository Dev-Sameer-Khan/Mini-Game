import React, { useState, useEffect } from "react";
import { Joystick } from "react-joystick-component";
import useJoystickStore from "../libs/JoystickStore";

const JoystickControl = () => {
  const { setJoystickDirection, setJoystickActive, setJumpPressed } = useJoystickStore();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile or tablet
    const checkDevice = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isMobileSize = window.innerWidth <= 1024; // Tablet and mobile breakpoint
      setIsMobile(isTouchDevice && isMobileSize);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const handleMove = (event) => {
    // Event object has x and y properties (can be null)
    const x = event?.x ?? 0;
    const y = event?.y ?? 0;
    
    // Normalize joystick input (-1 to 1)
    // Joystick returns -50 to 50, clamp to ensure values stay in range
    const normalizedX = Math.max(-1, Math.min(1, x / 50));
    const normalizedY = Math.max(-1, Math.min(1, y / 50));
    
    setJoystickDirection({
      x: normalizedX,
      y: normalizedY,
    });
  };

  const handleStart = () => {
    setJoystickActive(true);
  };

  const handleStop = () => {
    setJoystickActive(false);
    setJoystickDirection({ x: 0, y: 0 });
  };

  const handleJumpPress = () => {
    setJumpPressed(true);
  };

  const handleJumpRelease = () => {
    setJumpPressed(false);
  };

  // Only show joystick on mobile/tablet devices
  if (!isMobile) {
    return null;
  }

  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          zIndex: 1000,
          pointerEvents: "auto",
        }}
      >
        <Joystick
          size={100}
          baseColor="#666666"
          stickColor="#333333"
          move={handleMove}
          start={handleStart}
          stop={handleStop}
          minDistance={10}
        />
      </div>
      <button
        onTouchStart={handleJumpPress}
        onTouchEnd={handleJumpRelease}
        onMouseDown={handleJumpPress}
        onMouseUp={handleJumpRelease}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          backgroundColor: "#4CAF50",
          border: "3px solid #333",
          color: "white",
          fontSize: "20px",
          fontWeight: "bold",
          cursor: "pointer",
          userSelect: "none",
          touchAction: "none",
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onContextMenu={(e) => e.preventDefault()}
      >
        JUMP
      </button>
    </>
  );
};

export default JoystickControl;

