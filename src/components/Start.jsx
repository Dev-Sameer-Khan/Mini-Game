import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

const Start = ({ onStart }) => {
  const [showUI, setShowUI] = useState(true);

  const overlayRef = useRef(null);
  const cardRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    if (showUI) {
      // Fade in the overlay
      gsap.fromTo(
        overlayRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.55, ease: "power2.out" }
      );
      // Card entrance (pop and float up)
      gsap.fromTo(
        cardRef.current,
        { y: 40, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.62,
          delay: 0.1,
          ease: "power3.out"
        }
      );
      // Button fade & scale
      gsap.fromTo(
        btnRef.current,
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.38,
          delay: 0.45,
          ease: "back.out(1.7)"
        }
      );
    }
  }, [showUI]);

  const handleStart = () => {
    // Animate out the overlay and card for a smooth transition
    gsap.to(cardRef.current, {
      y: 40,
      opacity: 0,
      scale: 0.94,
      duration: 0.28,
      ease: "power2.in"
    });
    gsap.to(overlayRef.current, {
      autoAlpha: 0,
      duration: 0.38,
      delay: 0.18,
      ease: "power2.in",
      onComplete: () => {
        setShowUI(false);
        if (onStart) onStart();
      }
    });
  };

  if (!showUI) return null;

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        minHeight: "100dvh",
        minWidth: "100vw",
        zIndex: 9999,
        background: "rgba(0,0,0,0.9)",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "5vw",
        boxSizing: "border-box",
        opacity: 1,           // needed for GSAP to work correctly
        pointerEvents: "auto", // in case gsap sets it to none when faded
        willChange: "opacity"
      }}
    >
      <div
        ref={cardRef}
        style={{
          maxWidth: 400,
          width: "100%",
          background: "rgba(20,20,20,0.95)",
          borderRadius: 18,
          padding: "2rem 1.5rem",
          boxShadow: "0 4px 16px 0 rgba(0,0,0,0.8)",
          textAlign: "center",
          opacity: 1,
          willChange: "transform, opacity"
        }}
      >
        <h1 style={{ fontSize: "2rem", margin: "0 0 1rem" }}>Welcome!</h1>
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: 400,
            margin: "0 0 1.7rem",
            color: "#ffd900",
            letterSpacing: "0.03em",
          }}
        >
          How to Play:
        </h2>
        <ul
          style={{
            textAlign: "left",
            fontSize: "1.1rem",
            lineHeight: 1.7,
            marginBottom: "2rem",
            paddingLeft: "1.1em",
          }}
        >
          <li>
            <strong>W/A/S/D</strong>: Move Forward/Left/Backward/Right
          </li>
          <li>
            <strong>Space</strong>: Jump
          </li>
          <li>
            Reach the <span style={{ color: "#ffd900" }}>yellow gate</span> to
            teleport!
          </li>
          <li>
            Avoid the <span style={{ color: "#ff5a58" }}>spinning sweeper</span>
            .
          </li>
          <li>If you fall, you'll respawn automatically.</li>
        </ul>
        <button
          ref={btnRef}
          style={{
            width: "100%",
            background: "linear-gradient(90deg, #ffd900 0%, #ff8c02 100%)",
            color: "#212121",
            border: "none",
            borderRadius: 8,
            fontSize: "1.15rem",
            fontWeight: 700,
            padding: "0.85em 0",
            cursor: "pointer",
            transition: "transform 0.12s",
            boxShadow: "0 2px 6px 0 rgba(0,0,0,0.22)",
            marginBottom: 0,
            opacity: 1,
            willChange: "transform, opacity"
          }}
          onClick={handleStart}
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default Start;
