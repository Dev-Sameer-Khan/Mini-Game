import React, { useRef, useState, useEffect } from "react";
import useFinishedStore from "../libs/Zustand";
import { gsap } from "gsap";

const Finish = () => {
  const { setFinished } = useFinishedStore();
  const [showUI, setShowUI] = useState(true);

  const overlayRef = useRef(null);
  const cardRef = useRef(null);
  const btnRef = useRef(null);

  const reload = () => {
    setFinished(false);
    window.location.reload();
  };

  useEffect(() => {
    if (showUI) {
      // Overlay fade in
      gsap.fromTo(
        overlayRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.54, ease: "power2.out" }
      );
      // Card entrance animation
      gsap.fromTo(
        cardRef.current,
        { y: 48, opacity: 0, scale: 0.94 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.66,
          delay: 0.13,
          ease: "power3.out",
        }
      );
      // Button fade and scale
      gsap.fromTo(
        btnRef.current,
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.35,
          delay: 0.53,
          ease: "back.out(1.7)",
        }
      );
    }
  }, [showUI]);

  const handlePlayAgain = () => {
    // Animate out overlay/card
    gsap.to(cardRef.current, {
      y: 48,
      opacity: 0,
      scale: 0.96,
      duration: 0.28,
      ease: "power2.in",
    });
    gsap.to(overlayRef.current, {
      autoAlpha: 0,
      duration: 0.38,
      delay: 0.18,
      ease: "power2.in",
      onComplete: () => {
        setShowUI(false);
        reload();
      },
    });
  };

  if (!showUI) return null;

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        zIndex: 99999,
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(17,17,17,0.98)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        opacity: 1,
        pointerEvents: "auto",
      }}
    >
      <div
        ref={cardRef}
        style={{
          background: "linear-gradient(120deg, #ffd900 0%, #ff8c02 100%)",
          borderRadius: "1.8em",
          boxShadow: "0 4px 20px rgba(0,0,0,0.16)",
          padding: "2.5rem 3.5rem",
          maxWidth: 420,
          width: "90%",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            color: "#212121",
            fontSize: "2.5rem",
            margin: 0,
            fontWeight: 800,
            letterSpacing: 1,
          }}
        >
          🎉 Finished!
        </h1>
        <p
          style={{
            color: "#232323",
            margin: "2rem 0",
            fontSize: "1.15rem",
            fontWeight: 500,
          }}
        >
          Congratulations, you've completed the game.
          <br />
          <span role="img" aria-label="party popper">
            🏆
          </span>
        </p>
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
            padding: "1em 0",
            cursor: "pointer",
            transition: "transform 0.12s",
            boxShadow: "0 2px 6px 0 rgba(0,0,0,0.16)",
            marginBottom: 0,
          }}
          onClick={handlePlayAgain}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default Finish;
