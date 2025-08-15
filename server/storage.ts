import { 
  type User, type InsertUser,
  type Story, type InsertStory,
  type Choice, type InsertChoice,
  type UserChoice, type InsertUserChoice,
  type UserProgress, type InsertUserProgress,
  type Character, type InsertCharacter,
  type CommunityVote, type InsertCommunityVote
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Story methods
  getStory(id: string): Promise<Story | undefined>;
  getStoriesByChapter(chapter: number): Promise<Story[]>;
  getAllStories(): Promise<Story[]>;
  createStory(story: InsertStory): Promise<Story>;

  // Choice methods
  getChoice(id: string): Promise<Choice | undefined>;
  getChoicesByStory(storyId: string): Promise<Choice[]>;
  createChoice(choice: InsertChoice): Promise<Choice>;

  // User choice methods
  getUserChoices(userId: string): Promise<UserChoice[]>;
  getUserChoicesByStory(userId: string, storyId: string): Promise<UserChoice[]>;
  createUserChoice(userChoice: InsertUserChoice): Promise<UserChoice>;

  // User progress methods
  getUserProgress(userId: string): Promise<UserProgress | undefined>;
  createUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  updateUserProgress(userId: string, progress: Partial<UserProgress>): Promise<UserProgress>;

  // Character methods
  getCharacter(id: string): Promise<Character | undefined>;
  getAllCharacters(): Promise<Character[]>;
  createCharacter(character: InsertCharacter): Promise<Character>;

  // Community vote methods
  getCommunityVotes(choiceId: string): Promise<CommunityVote | undefined>;
  updateCommunityVotes(choiceId: string, votes: InsertCommunityVote): Promise<CommunityVote>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private stories: Map<string, Story> = new Map();
  private choices: Map<string, Choice> = new Map();
  private userChoices: Map<string, UserChoice> = new Map();
  private userProgress: Map<string, UserProgress> = new Map();
  private characters: Map<string, Character> = new Map();
  private communityVotes: Map<string, CommunityVote> = new Map();

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize with sample story data
    const story1: Story = {
      id: "story-1",
      title: "Chapter 3: The Signal",
      chapterNumber: 3,
      location: "Aboard the Wanderer - Bridge",
      content: `The bridge of the *Wanderer* hummed with tension as Captain Chen studied the decoded transmission. The holographic display cast an eerie blue glow across her weathered features, highlighting the concern etched in her eyes.

"This changes everything," she whispered, her voice barely audible over the ship's ambient systems. The data streams flowing across the screen told a story of conspiracy that reached the highest levels of the Galactic Council.

Navigator Torres approached cautiously. "Captain, if this intelligence is accurate, we're not just carrying cargo anymore. We're carrying the evidence that could expose the entire Keystone Project."`,
      imageUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
      isActive: true,
      createdAt: new Date(),
    };

    const choices: Choice[] = [
      {
        id: "choice-1",
        storyId: "story-1",
        optionLetter: "A",
        title: "Broadcast the Evidence Immediately",
        description: "Take immediate action. Transmit the Keystone files to every major news network and resistance cell simultaneously. The truth needs to be heard, regardless of the personal cost to your crew.",
        riskLevel: "high",
        impact: "Max Impact",
        unlocks: "Fugitive Path",
        consequenceModifiers: {
          trustNetwork: 50,
          councilStanding: -75,
          crewLoyalty: 25
        }
      },
      {
        id: "choice-2",
        storyId: "story-1",
        optionLetter: "B",
        title: "Find a Trusted Ally First",
        description: "Seek out Admiral Reeves, an old friend who might still be trustworthy within the Council. This evidence needs to reach someone with the power and integrity to act on it properly.",
        riskLevel: "medium",
        impact: "Diplomatic",
        unlocks: "Alliance Path",
        consequenceModifiers: {
          trustNetwork: 25,
          councilStanding: 10,
          crewLoyalty: 15
        }
      },
      {
        id: "choice-3",
        storyId: "story-1",
        optionLetter: "C",
        title: "Destroy the Evidence",
        description: "Some secrets are too dangerous to reveal. Delete the files and continue your original mission. Sometimes ignorance truly is bliss, and your crew's safety comes first.",
        riskLevel: "low",
        impact: "Maintain Cover",
        unlocks: "Shadow Path",
        consequenceModifiers: {
          trustNetwork: -20,
          councilStanding: 0,
          crewLoyalty: 35
        }
      }
    ];

    const character1: Character = {
      id: "char-1",
      name: "Captain Elena Chen",
      title: "Commander, Starship Wanderer",
      imageUrl: "/api/characters/images/captain-chen.png",
      background: "A veteran of the Titan Conflict, Captain Chen earned her command through exceptional service and an unwavering moral compass. Her decision to take on the mysterious cargo that started this journey was driven by both financial necessity and a growing suspicion about Council activities.",
      trustLevel: 87,
      appearanceCount: 8,
      keyDecisions: [
        "Supported your plan to investigate the cargo",
        "Currently considering your alliance proposal"
      ]
    };

    const character2: Character = {
      id: "char-2",
      name: "Navigator Marisol Torres",
      title: "Chief Navigator, Starship Wanderer",
      imageUrl: "/api/characters/images/torres.png",
      background:
        "Brilliant and unflappable, Torres can thread a gravity slingshot blindfolded. She keeps a close eye on shifting political currents—and on the ship’s moral compass.",
      trustLevel: 72,
      appearanceCount: 6,
      keyDecisions: [
        "Devised the stealth approach to scan the Keystone relay",
        "Warned against transmitting without a secure ally"
      ]
    };

    const character3: Character = {
      id: "char-3",
      name: "Admiral Janus Reeves",
      title: "Senior Liaison, Galactic Council Fleet",
      imageUrl: "/api/characters/images/reeves.png",
      background:
        "A storied commander and former mentor to Chen. Reeves claims neutrality, but old loyalties and new revelations pull him toward a fateful choice.",
      trustLevel: 41,
      appearanceCount: 3,
      keyDecisions: [
        "Provided backchannel access to a secure Council node",
        "Refused to authorize a full disclosure without verification"
      ]
    };

    const character4: Character = {
      id: "char-4",
      name: "DROID-7K \"Seven\"",
      title: "Logistics and Tactical Analysis Unit",
      imageUrl: "/api/characters/images/droid-seven.png",
      background:
        "An adaptive-heuristic droid retrofitted for field operations. Seven excels at probability mapping, systems patching, and dry one-liners when morale dips.",
      trustLevel: 64,
      appearanceCount: 5,
      keyDecisions: [
        "Projected a safe window for the relay infiltration",
        "Overrode a lockdown to extract critical data"
      ]
    };

    // Initialize community votes
    const votes: CommunityVote[] = [
      { id: "vote-1", choiceId: "choice-1", voteCount: 967, percentage: 34 },
      { id: "vote-2", choiceId: "choice-2", voteCount: 1281, percentage: 45 },
      { id: "vote-3", choiceId: "choice-3", voteCount: 599, percentage: 21 }
    ];

    this.stories.set(story1.id, story1);
    choices.forEach(choice => this.choices.set(choice.id, choice));
  this.characters.set(character1.id, character1);
  this.characters.set(character2.id, character2);
  this.characters.set(character3.id, character3);
  this.characters.set(character4.id, character4);
    votes.forEach(vote => this.communityVotes.set(vote.choiceId, vote));

    // Initialize demo user progress
    const demoProgress: UserProgress = {
      id: "demo-progress-1",
      userId: "demo-user-1",
      currentChapter: 3,
      totalChoices: 0,
      trustNetwork: 0,
      councilStanding: 0,
      crewLoyalty: 0,
      completedStories: []
    };
    this.userProgress.set("demo-progress-1", demoProgress);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    
    // Create initial progress for new user
    await this.createUserProgress({
      userId: id,
      currentChapter: 1,
      totalChoices: 0,
      trustNetwork: 0,
      councilStanding: 0,
      crewLoyalty: 0,
      completedStories: []
    });
    
    return user;
  }

  async getStory(id: string): Promise<Story | undefined> {
    return this.stories.get(id);
  }

  async getStoriesByChapter(chapter: number): Promise<Story[]> {
    return Array.from(this.stories.values()).filter(story => story.chapterNumber === chapter);
  }

  async getAllStories(): Promise<Story[]> {
    return Array.from(this.stories.values()).sort((a, b) => a.chapterNumber - b.chapterNumber);
  }

  async createStory(insertStory: InsertStory): Promise<Story> {
    const id = randomUUID();
    const story: Story = {
      id,
      title: insertStory.title,
      content: insertStory.content,
      location: insertStory.location,
      chapterNumber: insertStory.chapterNumber,
      isActive: insertStory.isActive ?? null,
      imageUrl: insertStory.imageUrl ?? null,
      createdAt: new Date(),
    };
    this.stories.set(id, story);
    return story;
  }

  async getChoice(id: string): Promise<Choice | undefined> {
    return this.choices.get(id);
  }

  async getChoicesByStory(storyId: string): Promise<Choice[]> {
    return Array.from(this.choices.values()).filter(choice => choice.storyId === storyId);
  }

  async createChoice(insertChoice: InsertChoice): Promise<Choice> {
    const id = randomUUID();
    const choice: Choice = {
      id,
      storyId: insertChoice.storyId,
      optionLetter: insertChoice.optionLetter,
      title: insertChoice.title,
      description: insertChoice.description,
      riskLevel: insertChoice.riskLevel,
      impact: insertChoice.impact,
      unlocks: insertChoice.unlocks,
  consequenceModifiers: (insertChoice.consequenceModifiers ?? null) as Choice["consequenceModifiers"],
    };
    this.choices.set(id, choice);
    return choice;
  }

  async getUserChoices(userId: string): Promise<UserChoice[]> {
    return Array.from(this.userChoices.values()).filter(choice => choice.userId === userId);
  }

  async getUserChoicesByStory(userId: string, storyId: string): Promise<UserChoice[]> {
    return Array.from(this.userChoices.values()).filter(
      choice => choice.userId === userId && choice.storyId === storyId
    );
  }

  async createUserChoice(insertUserChoice: InsertUserChoice): Promise<UserChoice> {
    const id = randomUUID();
    const userChoice: UserChoice = { ...insertUserChoice, id, timestamp: new Date() };
    this.userChoices.set(id, userChoice);
    return userChoice;
  }

  async getUserProgress(userId: string): Promise<UserProgress | undefined> {
    const progress = Array.from(this.userProgress.values()).find(progress => progress.userId === userId);
    
    // If demo user has no progress, create it automatically
    if (!progress && userId === "demo-user-1") {
      return await this.createUserProgress({
        userId: "demo-user-1",
        currentChapter: 3,
        totalChoices: 0,
        trustNetwork: 0,
        councilStanding: 0,
        crewLoyalty: 0,
        completedStories: []
      });
    }
    
    return progress;
  }

  async createUserProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    const id = randomUUID();
    const progress: UserProgress = {
      id,
      userId: insertProgress.userId,
      currentChapter: insertProgress.currentChapter ?? 1,
      totalChoices: insertProgress.totalChoices ?? 0,
      trustNetwork: insertProgress.trustNetwork ?? 0,
      councilStanding: insertProgress.councilStanding ?? 0,
      crewLoyalty: insertProgress.crewLoyalty ?? 0,
      completedStories: insertProgress.completedStories ?? [],
    };
    this.userProgress.set(id, progress);
    return progress;
  }

  async updateUserProgress(userId: string, updateData: Partial<UserProgress>): Promise<UserProgress> {
    const existing = await this.getUserProgress(userId);
    if (!existing) {
      throw new Error("User progress not found");
    }
    
    const updated: UserProgress = { ...existing, ...updateData };
    this.userProgress.set(existing.id, updated);
    return updated;
  }

  async getCharacter(id: string): Promise<Character | undefined> {
    return this.characters.get(id);
  }

  async getAllCharacters(): Promise<Character[]> {
    return Array.from(this.characters.values());
  }

  async createCharacter(insertCharacter: InsertCharacter): Promise<Character> {
    const id = randomUUID();
    const character: Character = {
      id,
      name: insertCharacter.name,
      title: insertCharacter.title,
      background: insertCharacter.background,
      imageUrl: insertCharacter.imageUrl ?? null,
      trustLevel: insertCharacter.trustLevel ?? null,
      appearanceCount: insertCharacter.appearanceCount ?? null,
      keyDecisions: insertCharacter.keyDecisions ?? null,
    };
    this.characters.set(id, character);
    return character;
  }

  async getCommunityVotes(choiceId: string): Promise<CommunityVote | undefined> {
    return this.communityVotes.get(choiceId);
  }

  async updateCommunityVotes(choiceId: string, insertVote: InsertCommunityVote): Promise<CommunityVote> {
    const id = randomUUID();
    const vote: CommunityVote = {
      id,
      choiceId: insertVote.choiceId,
      voteCount: insertVote.voteCount ?? 0,
      percentage: insertVote.percentage ?? 0,
    };
    this.communityVotes.set(choiceId, vote);
    return vote;
  }
}

export const storage = new MemStorage();
