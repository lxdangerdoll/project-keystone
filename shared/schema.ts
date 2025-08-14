import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const stories = pgTable("stories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  chapterNumber: integer("chapter_number").notNull(),
  location: text("location").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const choices = pgTable("choices", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  storyId: varchar("story_id").notNull().references(() => stories.id),
  optionLetter: text("option_letter").notNull(), // A, B, C
  title: text("title").notNull(),
  description: text("description").notNull(),
  riskLevel: text("risk_level").notNull(), // low, medium, high
  impact: text("impact").notNull(),
  unlocks: text("unlocks").notNull(),
  consequenceModifiers: jsonb("consequence_modifiers").$type<{
    trustNetwork?: number;
    councilStanding?: number;
    crewLoyalty?: number;
  }>(),
});

export const userChoices = pgTable("user_choices", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  choiceId: varchar("choice_id").notNull().references(() => choices.id),
  storyId: varchar("story_id").notNull().references(() => stories.id),
  timestamp: timestamp("timestamp").default(sql`CURRENT_TIMESTAMP`),
});

export const userProgress = pgTable("user_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  currentChapter: integer("current_chapter").default(1),
  totalChoices: integer("total_choices").default(0),
  trustNetwork: integer("trust_network").default(0),
  councilStanding: integer("council_standing").default(0),
  crewLoyalty: integer("crew_loyalty").default(0),
  completedStories: text("completed_stories").array().default([]),
});

export const characters = pgTable("characters", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  title: text("title").notNull(),
  imageUrl: text("image_url"),
  background: text("background").notNull(),
  trustLevel: integer("trust_level").default(50),
  appearanceCount: integer("appearance_count").default(0),
  keyDecisions: text("key_decisions").array().default([]),
});

export const communityVotes = pgTable("community_votes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  choiceId: varchar("choice_id").notNull().references(() => choices.id),
  voteCount: integer("vote_count").default(0),
  percentage: integer("percentage").default(0),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertStorySchema = createInsertSchema(stories).omit({
  id: true,
  createdAt: true,
});

export const insertChoiceSchema = createInsertSchema(choices).omit({
  id: true,
});

export const insertUserChoiceSchema = createInsertSchema(userChoices).omit({
  id: true,
  timestamp: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
});

export const insertCharacterSchema = createInsertSchema(characters).omit({
  id: true,
});

export const insertCommunityVoteSchema = createInsertSchema(communityVotes).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertStory = z.infer<typeof insertStorySchema>;
export type Story = typeof stories.$inferSelect;

export type InsertChoice = z.infer<typeof insertChoiceSchema>;
export type Choice = typeof choices.$inferSelect;

export type InsertUserChoice = z.infer<typeof insertUserChoiceSchema>;
export type UserChoice = typeof userChoices.$inferSelect;

export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type UserProgress = typeof userProgress.$inferSelect;

export type InsertCharacter = z.infer<typeof insertCharacterSchema>;
export type Character = typeof characters.$inferSelect;

export type InsertCommunityVote = z.infer<typeof insertCommunityVoteSchema>;
export type CommunityVote = typeof communityVotes.$inferSelect;
