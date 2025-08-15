# API Overview

Local dev uses Express with in-memory storage. Production (GitHub Pages) uses static JSON with a client-side resolver.

## Local (Express)
- GET /api/stories/current → Story { id, title, chapterNumber, location, content, imageUrl?, choices[] with { id, optionLetter, title, description, riskLevel, impact, unlocks, voteCount, percentage } }
- GET /api/users/:userId/progress → UserProgress { id, userId, currentChapter, totalChoices, trustNetwork, councilStanding, crewLoyalty, completedStories[] }
- POST /api/users/:userId/progress → Upsert progress (zod-validated)
- POST /api/choices → Record a user choice; increments totalChoices
- GET /api/characters → Character[] { id, name, title, imageUrl?, background, trustLevel?, appearanceCount?, keyDecisions? }
- GET /api/characters/:id → Character

## Production (Pages)
- GET /api/* requests are rewritten to `/project-keystone/api/*.json` under `client/public`.
- POST /api/choices is mocked on the client and merges deltas into localStorage for the demo.
- Progress GET merges base JSON with localStorage for a live-feel update.

## Static JSON files
- `client/public/api/stories/current.json`
- `client/public/api/users/demo-user-1/progress.json`
- `client/public/api/characters.json`
- `client/public/api/characters/{char-id}.json`
- `client/public/api/characters/images/*` (PNG assets)
