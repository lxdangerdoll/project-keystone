import { useEffect, useRef } from "react";

interface AnimatedLogoProps {
  size?: "small" | "large";
}

export default function AnimatedLogo({ size = "large" }: AnimatedLogoProps) {
  const particleContainerRef = useRef<HTMLDivElement>(null);
  const containerSize = size === "small" ? 60 : 200;

  useEffect(() => {
    const container = particleContainerRef.current;
    if (!container) return;

    // Clear existing particles
    container.innerHTML = '';

    // Create particles
    const particleCount = size === "small" ? 15 : 30;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const particleSize = Math.random() * (size === "small" ? 2 : 4) + 1;
      particle.style.width = `${particleSize}px`;
      particle.style.height = `${particleSize}px`;
      
      const angle = Math.random() * 360;
      const radius = Math.random() * (size === "small" ? 30 : 80) + (size === "small" ? 10 : 20);
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      particle.style.setProperty('--x', `${x}px`);
      particle.style.setProperty('--y', `${y}px`);
      particle.style.animationDelay = `${Math.random() * (size === "small" ? 4 : 3)}s`;
      
      container.appendChild(particle);
    }
  }, [size]);

  return (
    <div className="spark-container" style={{ width: containerSize, height: containerSize }}>
      <svg className="spark-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`strandGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#818cf8", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#a78bfa", stopOpacity: 1 }} />
          </linearGradient>
          <filter id={`glow-${size}`}>
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <path 
          d="M 20 50 C 40 20, 60 20, 80 50" 
          stroke={`url(#strandGradient-${size})`} 
          strokeWidth="4" 
          fill="none" 
          filter={`url(#glow-${size})`} 
          style={{ transformOrigin: "center", transform: "rotate(45deg)" }}
        />
        <path 
          d="M 50 20 C 80 40, 80 60, 50 80" 
          stroke={`url(#strandGradient-${size})`} 
          strokeWidth="4" 
          fill="none" 
          filter={`url(#glow-${size})`} 
          style={{ transformOrigin: "center", transform: "rotate(45deg)" }}
        />
      </svg>
      <div ref={particleContainerRef} className="spark-particles"></div>
    </div>
  );
}
