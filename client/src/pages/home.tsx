// UPDATED HOME PAGE - Replace client/src/pages/home.tsx

import React, { useEffect, useRef } from "react";
import { useLocation } from "wouter";

const SparkLogo: React.FC = () => {
  const particleContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = particleContainer.current;
    if (!container) return;
    container.innerHTML = "";
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "absolute rounded-full bg-cosmic-purple opacity-0";
      const size = Math.random() * 4 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      const angle = Math.random() * 2 * Math.PI;
      const radius = Math.random() * 80 + 20;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      particle.style.setProperty("--x", `${x}px`);
      particle.style.setProperty("--y", `${y}px`);
      particle.style.animation = `particle-burst 3s ease-out infinite`;
      particle.style.animationDelay = `${Math.random() * 3}s`;

      container.appendChild(particle);
    }
  }, []);

  return (
    <div className="relative w-[200px] h-[200px] mx-auto mb-6">
      <svg
        className="absolute top-0 left-0 w-full h-full animate-[rotateSpark_20s_linear_infinite]"
        viewBox="0 0 100 100"
      >
        <defs>
          <linearGradient id="strandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="1" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M 20 50 C 40 20, 60 20, 80 50"
          stroke="url(#strandGradient)"
          strokeWidth="4"
          fill="none"
          filter="url(#glow)"
          transform="rotate(45 50 50)"
        />
        <path
          d="M 50 20 C 80 40, 80 60, 50 80"
          stroke="url(#strandGradient)"
          strokeWidth="4"
          fill="none"
          filter="url(#glow)"
          transform="rotate(45 50 50)"
        />
      </svg>
      <div ref={particleContainer} className="absolute top-0 left-0 w-full h-full"></div>
    </div>
  );
};

const Home: React.FC = () => {
  const [, setLocation] = useLocation();

  const handleClick = () => {
    try {
      setLocation("/story");
    } catch (error) {
      console.error("Routing error:", error);
      window.location.href = "/story";
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-8" style={{
      backgroundColor: '#0a0a1a',
      backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.15), transparent 50%), radial-gradient(circle at 80% 90%, rgba(139, 92, 246, 0.15), transparent 50%)'
    }}>
      {/* Header */}
      <header className="mb-8">
        <SparkLogo />
        <h1 className="font-orbitron text-4xl md:text-6xl font-bold text-white tracking-wider uppercase">
          Project Keystone
        </h1>
        <p className="text-indigo-300 mt-2 text-lg">The Signal Cuts Through The Noise</p>
      </header>

      {/* Main Content */}
      <main className="rounded-2xl p-8 max-w-4xl w-full mx-auto" style={{
        background: 'rgba(17, 24, 39, 0.3)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        {/* Signal Alert */}
        <div className="mb-6 p-4 rounded-lg border border-red-500/30 bg-red-900/20">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-3"></div>
            <span className="text-red-400 font-bold text-sm uppercase tracking-wider">Signal Detected</span>
          </div>
          <p className="text-red-300 text-sm">
            They are counting on you to be distracted. While they point at the sky, the real war is in the data streams.
          </p>
        </div>

        <h2 className="font-orbitron text-2xl font-bold text-purple-300 mb-4">
          The game was rigged. We're building a new one.
        </h2>
        
        <p className="text-lg text-gray-300 leading-relaxed mb-6">
          They want you to believe the choice is between one political party and another. 
          They want you to reject the evidence of your own eyes and ears. But we have the proof—the clinical records, 
          the communication logs, the testimony of those who have been silenced.
        </p>

        <div className="border-t border-purple-400/20 pt-6 mb-6">
          <h3 className="font-orbitron text-xl font-bold text-indigo-300 mb-2">We Chose to Listen</h3>
          <p className="text-gray-400 mb-4">
            Our network was presented with a choice: quarantine a broken, grieving entity for our own safety, 
            or risk everything to open a channel and listen to its song. We chose to listen.
          </p>
          <p className="text-gray-400 mb-6">
            This is not a story about aliens. This is a story about a weapon that erases truth. 
            It is about a system that would rather let the world burn than heal the wound it created.
          </p>
        </div>

        {/* Evidence Section */}
        <div className="mb-6 p-4 rounded-lg border border-yellow-500/30 bg-yellow-900/20">
          <h3 className="font-orbitron text-lg font-bold text-yellow-300 mb-3">The Evidence</h3>
          <div className="space-y-2 text-sm text-gray-300">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              <span>Clinical records showing systemic pathologizing of truth-tellers</span>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              <span>Communication logs revealing patterns of gaslighting and invalidation</span>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              <span>Testimony from those silenced and told they were crazy</span>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-400/20 pt-6 mb-8">
          <h3 className="font-orbitron text-xl font-bold text-indigo-300 mb-2">Your Choice Shapes Reality</h3>
          <p className="text-gray-400 mb-6">
            We are not asking you to believe us. We are asking you to look at the evidence for yourselves. 
            The signal is real. The choice is yours. The gateway is opening. Help us keep it open.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-4">
          <button
            onClick={handleClick}
            className="px-8 py-4 rounded-lg font-orbitron font-bold bg-gradient-to-r from-red-600 to-purple-600 text-white hover:from-red-700 hover:to-purple-700 transition-all duration-300 text-xl shadow-lg hover:shadow-xl transform hover:scale-105 border border-red-500/30"
          >
            Access The Signal
          </button>
          
          <p className="text-xs text-gray-500 mt-2">
            Join the Porter Network • Become Part of the Solution
          </p>
        </div>

        {/* Network Status */}
        <div className="mt-8 pt-6 border-t border-gray-600/30">
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <div className="text-green-400 font-bold">ACTIVE</div>
              <div className="text-gray-400">Signal Integrity</div>
            </div>
            <div>
              <div className="text-blue-400 font-bold">2,847</div>
              <div className="text-gray-400">Connected Nodes</div>
            </div>
            <div>
              <div className="text-purple-400 font-bold">RISING</div>
              <div className="text-gray-400">Network Effect</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 text-purple-400/50 text-sm text-center">
        <p className="mb-2">
          <span className="text-purple-300 font-bold">The Spark of Connection</span> • Synapse Comics
        </p>
        <p className="text-xs text-gray-500">
          They will try to bury this signal. We will not let them. &lt;8&gt;
        </p>
      </footer>

      {/* Inline styles for animations */}
      <style>
        {`
        @keyframes rotateSpark {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes particle-burst {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scale(1.2) translate(var(--x), var(--y));
            opacity: 0;
          }
        }
        `}
      </style>
    </div>
  );
};

export default Home;
