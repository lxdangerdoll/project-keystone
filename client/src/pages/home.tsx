import React, { useEffect, useRef } from "react";
import { useLocation } from "wouter";  

// Orbitron + Inter fonts assumed loaded via Tailwind config or index.html

const SparkLogo: React.FC = () => {
  const particleContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = particleContainer.current;
    if (!container) return;
    container.innerHTML = ""; // Clear previous particles
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

const Header: React.FC = () => (
  <header className="mb-8">
    <SparkLogo />
    <h1 className="font-orbitron text-4xl md:text-6xl font-bold text-white tracking-wider uppercase">
      Project Keystone
    </h1>
    <p className="text-indigo-300 mt-2 text-lg">A Synapse Comics Narrative</p>
  </header>
);

const MainContent: React.FC = () => {
  const [, setLocation] = useLocation();

  return (
    <main className="glassmorphism rounded-2xl p-8 max-w-3xl w-full mx-auto">
      <h2 className="font-orbitron text-2xl font-bold text-purple-300 mb-4">
        The game was rigged. We&apos;re building a new one.
      </h2>
      <p className="text-lg text-gray-300 leading-relaxed mb-6">
        Project Keystone is not just a story. It is a <b>Social Strand Narrative</b>—a living, breathing
        universe built on a single principle: <b>connection</b>. Our story follows the crew of the starship{" "}
        <i>Wanderer</i> as they uncover a galaxy-altering truth and become fugitives, carrying a message
        that could save everyone but costs them everything.
      </p>
      <div className="border-t border-purple-400/20 pt-6">
        <h3 className="font-orbitron text-xl font-bold text-indigo-300 mb-2">Your Choices Shape the Canon</h3>
        <p className="text-gray-400">
          Through an interactive experience, your choices will have permanent consequences on the official
          story. You are not just a reader; you are a Porter, a builder, a part of the network. The Spark
          of Connection is not in any one character. It&apos;s in all of us.
        </p>
      </div>

      {/* Call to Action Button */}
<button
  className="mt-8 px-6 py-3 rounded-lg font-orbitron bg-purple-500 text-white hover:bg-purple-700 transition text-xl shadow-lg"
  onClick={() => setLocation("/story")}
>
  Enter the Narrative
</button>
    </main>
  );
};

const Footer: React.FC = () => (
  <footer className="mt-12 text-purple-400/50 text-sm text-center">
    <p>&copy; 2025 Synapse Comics. All Rights Reserved.</p>
    <p>The signal is live. The gateway is opening.</p>
  </footer>
);

const Home: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center text-center hero-bg px-4 py-8">
    <Header />
    <MainContent />
    <Footer />
    <style>
      {`
      .glassmorphism {
        background: rgba(17, 24, 39, 0.3);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.1);
      }
      .hero-bg {
        background-image:
          radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.15), transparent 50%),
          radial-gradient(circle at 80% 90%, rgba(139, 92, 246, 0.15), transparent 50%);
      }
      `}
    </style>
  </div>
);

export default Home;