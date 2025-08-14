// src/components/GlitchWrapper.tsx
import React, { useState, useEffect } from "react";
import "@/components/glitch.css";

interface GlitchWrapperProps {
  crew?: any;
  children: React.ReactNode;
}

const decks = ["wanderer", "lyra7", "community"];

export default function GlitchWrapper({ crew, children }: GlitchWrapperProps) {
  const [currentDeck, setCurrentDeck] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

  // Rotate decks every 45 seconds (adjust as needed)
  useEffect(() => {
    const interval = setInterval(() => {
      triggerGlitch();
      setTimeout(() => {
        setCurrentDeck((prev) => (prev + 1) % decks.length);
      }, 1500); // delay change until glitch peak
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  // Manual glitch trigger (can be exposed via window for debugging)
  const triggerGlitch = () => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 2000);
  };

  // Example: log current crew roster for the deck
  useEffect(() => {
    if (crew) {
      console.log(`Current deck: ${decks[currentDeck]}`, crew);
    }
  }, [currentDeck, crew]);

  return (
    <div className={`deck-wrapper ${isGlitching ? "glitch-active" : ""}`}>
      <div className="deck-overlay">
        <h1 className="deck-title">
          {decks[currentDeck].toUpperCase()} DECK
        </h1>
        {crew && <p className="deck-crew-count">Crew Count: {crew.length}</p>}
      </div>

      <div className="deck-content">{children}</div>
    </div>
  );
}
