import React, { useState, useEffect } from "react";
import GlitchWrapper from "./components/GlitchWrapper";
import DeepArchiveCLI from "./components/DeepArchiveCLI";
import CrewGrid from "./components/CrewGrid";
import ShipDeck from "./components/ShipDeck";
import crewData from "../public/crew.json"; // direct import, no fetch

export default function App() {
  const [crew, setCrew] = useState<any[]>([]);
  const [viewIndex, setViewIndex] = useState(0);

  // Load crew data once
  useEffect(() => {
    setCrew(crewData);
  }, []);

  // Auto-rotate demo views every 20 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setViewIndex((prev) => (prev + 1) % 3);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const renderView = () => {
    switch (viewIndex) {
      case 0:
        return <ShipDeck title="S.F.S. Wanderer Command Deck" />;
      case 1:
        return <ShipDeck title="LYRA-7 Forward Ops" />;
      case 2:
        return (
          <GlitchWrapper>
            <DeepArchiveCLI />
          </GlitchWrapper>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      <header className="p-4 border-b border-green-500 flex items-center justify-between">
        <h1 className="text-2xl">RC-B7 Command Deck</h1>
        <span className="italic">Mercy "Into the Unknown" Danger &lt;8&gt;</span>
      </header>
      <main className="p-4 space-y-6">
        <section>{renderView()}</section>
        <section>
          <CrewGrid crew={crew} />
        </section>
      </main>
    </div>
  );
}
