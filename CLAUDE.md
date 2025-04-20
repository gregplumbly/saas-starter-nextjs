# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm db:setup` - Setup database
- `pnpm db:seed` - Seed database with test data
- `pnpm db:generate` - Generate Drizzle migrations
- `pnpm db:migrate` - Run database migrations
- `pnpm db:studio` - Open Drizzle Studio for database management

## Code Style Guidelines
- **Framework**: Next.js with App Router and React Server Components
- **Styling**: Tailwind CSS with shadcn/ui components
- **Types**: Use TypeScript with proper type definitions; Zod for validation
- **Imports**: Group imports by external libraries first, then internal modules
- **Error Handling**: Use try/catch blocks with specific error messages
- **Components**: Follow shadcn/ui patterns using class-variance-authority for variants
- **Naming**: Use camelCase for variables/functions, PascalCase for components/types
- **File Structure**: Follow Next.js App Router conventions for routes
- **Utilities**: Use cn() from utils.ts for class name merging
- **Authentication**: Use server actions with validatedAction middleware patterns