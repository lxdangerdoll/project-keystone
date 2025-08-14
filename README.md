# Project Keystone - Interactive Narrative Web Application

An interactive narrative web application for Synapse Comics where user choices permanently affect the official storyline. Built as a full-stack application with React frontend and Express backend, featuring community voting and real-time consequence tracking.

## 🌟 Features

- **Interactive Story System**: Chapter-based narrative with multiple choice options
- **Community Voting**: Real-time voting system where collective decisions shape the story
- **Consequence Tracking**: Three-dimensional impact system (Trust Network, Council Standing, Crew Loyalty)
- **Character Profiles**: Detailed character relationships and decision history
- **Universe Codex**: Comprehensive lore and world-building information
- **Porter Network**: Community features showing global impact and participation
- **Responsive Design**: Glassmorphism UI with sci-fi aesthetic

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling and HMR
- **TanStack Query** for server state management
- **Wouter** for lightweight routing
- **Tailwind CSS** with custom design system
- **Shadcn/ui** component library
- **React Hook Form** with Zod validation

### Backend
- **Node.js** with Express.js
- **TypeScript** with ES modules
- **Drizzle ORM** (configured for PostgreSQL)
- **In-memory storage** (development)

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/project-keystone.git
   cd project-keystone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Open http://localhost:5000 in your browser
   - The Vite dev server and Express API run on the same port

## 📁 Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities and configurations
├── server/                # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API route definitions
│   ├── storage.ts        # Data storage layer
│   └── vite.ts           # Vite integration
├── shared/               # Shared types and schemas
│   └── schema.ts         # Database schemas and types
└── components.json       # Shadcn/ui configuration
```

## 🎮 Usage

### Story Mode
- Read the current chapter
- Make choices that affect the narrative
- View consequence tracking in real-time
- See community voting percentages

### Community Features
- View global Porter Network statistics
- Check real-time voting results
- See top contributors and recent activity

### Character Profiles
- Explore detailed character backgrounds
- Track relationship levels and decisions
- View appearance history

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Key Design Principles
- **Glassmorphism UI**: Translucent cards with backdrop blur
- **Responsive Design**: Mobile-first approach
- **Accessibility**: ARIA-compliant components
- **Performance**: Optimized queries and smooth transitions

## 🎨 Design System

### Colors
- **Space Dark**: `#0a0a1a` (primary background)
- **Cosmic Purple**: `#6366f1` (primary accent)
- **Nebula Pink**: `#a78bfa` (secondary accent)
- **Glass Background**: `rgba(17, 24, 39, 0.4)` (card backgrounds)

### Typography
- **Headings**: Orbitron (sci-fi aesthetic)
- **Body Text**: Inter (readability)

## 🚀 Deployment

### Replit Deployment
This project is configured for Replit Deployments:
1. Push to GitHub
2. Connect repository to Replit
3. Deploy with automatic builds and TLS

### Manual Deployment
1. Build the project: `npm run build`
2. Deploy the built files to your hosting platform
3. Configure environment variables as needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 API Documentation

### Endpoints
- `GET /api/stories/current` - Get active story with choices
- `GET /api/users/:userId/progress` - Get user progress
- `POST /api/choices` - Submit user choice
- `GET /api/characters` - Get all characters
- `GET /api/characters/:id` - Get specific character

## 📄 License

This project is part of Synapse Comics. All rights reserved.

## 🙏 Acknowledgments

- Built for Synapse Comics interactive narrative project
- Inspired by social strand narrative concepts
- Community-driven storytelling approach

---

*"The signal is live. The gateway is opening."*