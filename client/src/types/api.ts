// Shared API types for client pages/components

export interface Choice {
  id: string;
  optionLetter: string;
  title: string;
  description: string;
  riskLevel: string;
  impact: string;
  unlocks: string;
  voteCount: number;
  percentage: number;
}

export interface Story {
  id: string;
  title: string;
  location?: string;
  imageUrl?: string;
  content: string;
  chapterNumber?: number;
  choices: Choice[];
}

export interface UserProgress {
  trustNetwork: number;
  councilStanding: number;
  crewLoyalty: number;
  // Optional fields if provided by the API for sidebar progress
  currentChapter?: number;
  totalChoices?: number;
}

export interface Character {
  id: string;
  name: string;
  imageUrl: string;
  title: string;
  appearanceCount: number;
  background: string;
  trustLevel: number;
  keyDecisions: string[];
}
