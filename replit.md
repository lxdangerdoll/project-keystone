# replit.md

## Overview

Project Keystone is an interactive narrative web application for Synapse Comics where user choices permanently affect the official storyline. Built as a full-stack application with React frontend and Express backend, it allows readers to participate in a shared storytelling experience where community decisions shape the comic universe. The application features chapter-based story progression, character tracking, community voting, and consequence systems that track how user choices influence the narrative.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Components**: Shadcn/ui component library with Radix UI primitives and Tailwind CSS for styling
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod for validation
- **Styling**: Tailwind CSS with custom design tokens, Orbitron and Inter fonts

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints following /api/* pattern
- **Storage**: In-memory storage implementation (MemStorage) with interface for future database integration
- **Development**: Hot module replacement with Vite middleware integration

### Data Storage Architecture
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Database**: PostgreSQL (Neon Database) with connection pooling
- **Schema**: Comprehensive schema including users, stories, choices, user_choices, user_progress, characters, and community_votes
- **Migrations**: Drizzle Kit for schema migrations and database management

### Authentication & Authorization
- **User System**: Username/password based authentication
- **Session Management**: Currently using mock user ID for demo purposes
- **Progress Tracking**: Individual user progress stored separately from choices

### Core Business Logic
- **Story System**: Chapter-based narrative with active story management
- **Choice System**: Multiple choice options (A, B, C) with risk levels and consequence tracking
- **Community Features**: Vote aggregation and percentage tracking for collective decision making
- **Consequence Tracking**: Three-dimensional impact system (Trust Network, Council Standing, Crew Loyalty)
- **Character System**: Character profiles with relationship tracking and appearance counts

## External Dependencies

### Core Framework Dependencies
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Client-side routing
- **react-hook-form**: Form state management
- **zod**: Runtime type validation

### UI Component Libraries
- **@radix-ui/***: Headless UI primitives for accessibility
- **class-variance-authority**: Component variant management
- **clsx**: Conditional CSS class utilities
- **cmdk**: Command palette functionality

### Database & ORM
- **drizzle-orm**: Type-safe ORM for PostgreSQL
- **drizzle-kit**: Database migration management
- **@neondatabase/serverless**: PostgreSQL database driver for Neon

### Development Tools
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **tailwindcss**: Utility-first CSS framework
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **@replit/vite-plugin-cartographer**: Replit integration

### Styling & Fonts
- **Google Fonts**: Orbitron and Inter font families
- **Font Awesome**: Icon library for UI elements
- **Tailwind CSS**: Utility-first styling with custom design tokens

### Date & Utility Libraries
- **date-fns**: Date manipulation and formatting
- **nanoid**: Unique ID generation
- **embla-carousel-react**: Carousel component functionality