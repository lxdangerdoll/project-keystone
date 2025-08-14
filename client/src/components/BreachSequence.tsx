// src/components/BreachSequence.tsx
import React, { useState, useEffect } from 'react';
import ShipDeck from './ShipDeck';
import GlitchTransition from './GlitchTransition';
import DeepArchiveCLI from './DeepArchiveCLI';

interface ShipConfig {
  id: string;
  crewFile: string;
  theme: string;
  missionLogs: string;
}

interface BreachSequenceProps {
  ships: ShipConfig[];
  glitchTrigger?: 'auto' | 'manual';
  glitchDuration?: number; // in ms
}

const BreachSequence: React.FC<BreachSequenceProps> = ({
  ships,
  glitchTrigger = 'auto',
  glitchDuration = 3000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (glitchTrigger === 'auto') {
      const interval = setInterval(() => {
        triggerGlitch();
      }, 15000); // rotate every 15 seconds
      return () => clearInterval(interval);
    }
  }, [glitchTrigger]);

  const triggerGlitch = () => {
    setIsGlitching(true);
    setTimeout(() => {
      setIsGlitching(false);
      setCurrentIndex((prev) => (prev + 1) % ships.length);
    }, glitchDuration);
  };

  const currentShip = ships[currentIndex];

  return (
    <div className="breach-sequence-container">
      {!isGlitching ? (
        <>
          {currentShip.id === 'communityMod' ? (
            <DeepArchiveCLI />
          ) : (
            <ShipDeck
              shipId={currentShip.id}
              crewFile={currentShip.crewFile}
              theme={currentShip.theme}
              missionLogs={currentShip.missionLogs}
            />
          )}
        </>
      ) : (
        <GlitchTransition />
      )}
    </div>
  );
};

export default BreachSequence;
