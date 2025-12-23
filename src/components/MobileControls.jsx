import React, { useState, useEffect } from "react";
import useMobileControlsStore from "../libs/JoystickStore";

const MobileControls = () => {
  const {
    setForward,
    setBack,
    setLeft,
    setRight,
    setJumpPressed,
  } = useMobileControlsStore();
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

  const buttonStyle = {
    width: "44px",
    height: "44px",
    borderRadius: "10px",
    backgroundColor: "rgba(26, 32, 44, 0.85)", // slate-800 with opacity
    border: "1px solid rgba(74, 85, 104, 0.9)", // slate-600
    color: "white",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
    userSelect: "none",
    touchAction: "none",
    boxShadow: "0 3px 6px rgba(0,0,0,0.35)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.1s, transform 0.08s, box-shadow 0.08s",
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: "rgba(45, 55, 72, 0.95)",
    transform: "scale(0.92)",
    boxShadow: "0 2px 4px rgba(0,0,0,0.45)",
  };

  const handleTouchStart = (setter) => (e) => {
    e.preventDefault();
    setter(true);
  };

  const handleTouchEnd = (setter) => (e) => {
    e.preventDefault();
    setter(false);
  };

  const handleMouseDown = (setter) => (e) => {
    e.preventDefault();
    setter(true);
  };

  const handleMouseUp = (setter) => (e) => {
    e.preventDefault();
    setter(false);
  };

  const handleMouseLeave = (setter) => (e) => {
    e.preventDefault();
    setter(false);
  };

  // Only show controls on mobile/tablet devices
  if (!isMobile) {
    return null;
  }

  return (
    <>
      {/* Directional Pad */}
      <div
        style={{
          position: "fixed",
          bottom: "18px",
          left: "16px",
          zIndex: 10000,
          pointerEvents: "auto",
          touchAction: "none",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
          gap: "3px",
          width: "140px",
          height: "140px",
        }}
      >
        {/* Empty top-left */}
        <div></div>
        {/* Up button */}
        <MobileButton
          onTouchStart={handleTouchStart(setForward)}
          onTouchEnd={handleTouchEnd(setForward)}
          onMouseDown={handleMouseDown(setForward)}
          onMouseUp={handleMouseUp(setForward)}
          onMouseLeave={handleMouseLeave(setForward)}
          style={buttonStyle}
          activeStyle={activeButtonStyle}
        >
          ↑
        </MobileButton>
        {/* Empty top-right */}
        <div></div>
        
        {/* Left button */}
        <MobileButton
          onTouchStart={handleTouchStart(setLeft)}
          onTouchEnd={handleTouchEnd(setLeft)}
          onMouseDown={handleMouseDown(setLeft)}
          onMouseUp={handleMouseUp(setLeft)}
          onMouseLeave={handleMouseLeave(setLeft)}
          style={buttonStyle}
          activeStyle={activeButtonStyle}
        >
          ←
        </MobileButton>
        {/* Center (empty) */}
        <div></div>
        {/* Right button */}
        <MobileButton
          onTouchStart={handleTouchStart(setRight)}
          onTouchEnd={handleTouchEnd(setRight)}
          onMouseDown={handleMouseDown(setRight)}
          onMouseUp={handleMouseUp(setRight)}
          onMouseLeave={handleMouseLeave(setRight)}
          style={buttonStyle}
          activeStyle={activeButtonStyle}
        >
          →
        </MobileButton>
        
        {/* Empty bottom-left */}
        <div></div>
        {/* Down button */}
        <MobileButton
          onTouchStart={handleTouchStart(setBack)}
          onTouchEnd={handleTouchEnd(setBack)}
          onMouseDown={handleMouseDown(setBack)}
          onMouseUp={handleMouseUp(setBack)}
          onMouseLeave={handleMouseLeave(setBack)}
          style={buttonStyle}
          activeStyle={activeButtonStyle}
        >
          ↓
        </MobileButton>
        {/* Empty bottom-right */}
        <div></div>
      </div>

      {/* Jump button */}
      <button
        onTouchStart={(e) => {
          e.preventDefault();
          setJumpPressed(true);
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          setJumpPressed(false);
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          setJumpPressed(true);
        }}
        onMouseUp={(e) => {
          e.preventDefault();
          setJumpPressed(false);
        }}
        style={{
          position: "fixed",
          bottom: "22px",
          right: "18px",
          zIndex: 10000,
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          backgroundColor: "rgba(56, 161, 105, 0.9)", // green-500
          border: "2px solid rgba(39, 103, 73, 0.95)",
          color: "white",
          fontSize: "16px",
          fontWeight: "700",
          cursor: "pointer",
          userSelect: "none",
          touchAction: "none",
          boxShadow: "0 4px 8px rgba(0,0,0,0.35)",
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

// Component to handle button press state
const MobileButton = ({ children, style, activeStyle, ...handlers }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleStart = (e) => {
    setIsPressed(true);
    if (handlers.onTouchStart) handlers.onTouchStart(e);
    if (handlers.onMouseDown) handlers.onMouseDown(e);
  };

  const handleEnd = (e) => {
    setIsPressed(false);
    if (handlers.onTouchEnd) handlers.onTouchEnd(e);
    if (handlers.onMouseUp) handlers.onMouseUp(e);
  };

  return (
    <button
      {...handlers}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onMouseLeave={(e) => {
        setIsPressed(false);
        if (handlers.onMouseLeave) handlers.onMouseLeave(e);
      }}
      style={isPressed ? activeStyle : style}
      onContextMenu={(e) => e.preventDefault()}
    >
      {children}
    </button>
  );
};

export default MobileControls;

