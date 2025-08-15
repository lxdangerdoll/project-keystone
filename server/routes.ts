import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserChoiceSchema, insertUserProgressSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get current story
  app.get("/api/stories/current", async (req, res) => {
    try {
      const stories = await storage.getAllStories();
      const currentStory = stories.find(s => s.isActive) || stories[0];
      
      if (!currentStory) {
        return res.status(404).json({ message: "No active story found" });
      }

      const choices = await storage.getChoicesByStory(currentStory.id);
      
      // Get community votes for each choice
      const choicesWithVotes = await Promise.all(
        choices.map(async (choice) => {
          const votes = await storage.getCommunityVotes(choice.id);
          return {
            ...choice,
            voteCount: votes?.voteCount || 0,
            percentage: votes?.percentage || 0
          };
        })
      );

      res.json({
        ...currentStory,
        choices: choicesWithVotes
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch current story" });
    }
  });

  // Get user progress
  app.get("/api/users/:userId/progress", async (req, res) => {
    try {
      const { userId } = req.params;
      const progress = await storage.getUserProgress(userId);
      
      if (!progress) {
        return res.status(404).json({ message: "User progress not found" });
      }

      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user progress" });
    }
  });

  // Create or update user progress
  app.post("/api/users/:userId/progress", async (req, res) => {
    try {
      const { userId } = req.params;
      const progressData = insertUserProgressSchema.parse({ ...req.body, userId });
      
      const existingProgress = await storage.getUserProgress(userId);
      let progress;
      
      if (existingProgress) {
        progress = await storage.updateUserProgress(userId, progressData);
      } else {
        progress = await storage.createUserProgress(progressData);
      }

      res.json(progress);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid progress data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update user progress" });
    }
  });

  // Submit user choice
  app.post("/api/choices", async (req, res) => {
    try {
      const choiceData = insertUserChoiceSchema.parse(req.body);
      const userChoice = await storage.createUserChoice(choiceData);
      
      // Update user progress
      const progress = await storage.getUserProgress(choiceData.userId);
      if (progress) {
        const currentTotal = progress.totalChoices ?? 0;
        await storage.updateUserProgress(choiceData.userId, {
          totalChoices: currentTotal + 1,
        });
      }

      res.status(201).json(userChoice);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid choice data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to submit choice" });
    }
  });

  // Get all characters
  app.get("/api/characters", async (req, res) => {
    try {
  const characters = await storage.getAllCharacters();
  res.set("Cache-Control", "no-store");
  res.json(characters);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch characters" });
    }
  });

  // Get specific character
  app.get("/api/characters/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const character = await storage.getCharacter(id);
      
      if (!character) {
        return res.status(404).json({ message: "Character not found" });
      }

  res.set("Cache-Control", "no-store");
  res.json(character);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch character" });
    }
  });

  // Get user choices for a story
  app.get("/api/users/:userId/choices/:storyId", async (req, res) => {
    try {
      const { userId, storyId } = req.params;
      const choices = await storage.getUserChoicesByStory(userId, storyId);
      res.json(choices);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user choices" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
