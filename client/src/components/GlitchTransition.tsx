// src/components/GlitchTransition.tsx
import React from 'react';
import './GlitchTransition.css';

const GlitchTransition: React.FC = () => {
  return (
    <div className="glitch-transition">
      <div className="scanline" />
      <div className="glitch-text">SIGNAL BREACH DETECTED</div>
    </div>
  );
};

export default GlitchTransition;
