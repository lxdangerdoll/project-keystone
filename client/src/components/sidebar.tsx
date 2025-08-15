import { useState } from "react";
import { Link, useLocation } from "wouter";
import AnimatedLogo from "./animated-logo";
import ProgressBar from "./progress-bar";

interface SidebarProps {
  isOpen: boolean;
  progress?: any;
  onCharacterClick?: () => void;
}

export default function Sidebar({ isOpen, progress, onCharacterClick }: SidebarProps) {
  const [location] = useLocation();

  const navItems = [
    { path: "/story", icon: "fas fa-book-open", label: "Story Mode" },
    { path: "/characters", icon: "fas fa-users", label: "Characters" },
    { path: "/universe", icon: "fas fa-globe", label: "Universe" },
    { path: "/community", icon: "fas fa-vote-yea", label: "Community" },
    { path: "/profile", icon: "fas fa-user", label: "Profile" },
  ];

  return (
    <aside className={`w-80 glassmorphism border-r-0 p-6 sidebar-transition flex flex-col ${!isOpen ? 'sidebar-hidden' : ''} md:translate-x-0`}>
      {/* Logo Header */}
      <div className="flex items-center mb-8">
        <div className="mr-3">
          <AnimatedLogo size="small" />
        </div>
        <div>
          <h1 className="font-orbitron text-lg font-bold text-white">KEYSTONE</h1>
          <p className="text-xs text-indigo-300">Synapse Comics</p>
        </div>
      </div>

      {/* Progress Section */}
      {progress && (
        <div className="mb-8">
          <ProgressBar progress={progress} />
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="space-y-2 mb-8">
        {navItems.map((item) => {
          const isActive = location === item.path || (location === "/" && item.path === "/story");
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                  : 'hover:bg-gray-700/30 text-gray-300'
              }`}
            >
              <i className={`${item.icon} mr-3 text-sm`}></i>
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Recent Choices */}
      <div className="mt-auto">
        <h3 className="font-orbitron text-sm font-bold text-indigo-300 mb-3">RECENT IMPACT</h3>
        <div className="space-y-2">
          <div className="glassmorphism-light rounded-lg p-3 text-xs">
            <div className="text-yellow-400 font-medium">⚡ Choice Resonance</div>
            <div className="text-gray-400 mt-1">
              Your decision to{" "}
              <span className="text-purple-300">trust Captain Chen</span>{" "}
              unlocked new story paths
            </div>
          </div>
          <div className="glassmorphism-light rounded-lg p-3 text-xs">
            <div className="text-green-400 font-medium">🔗 Network Effect</div>
            <div className="text-gray-400 mt-1">
              <span className="text-blue-300">67% of Porters</span> made the same choice
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
