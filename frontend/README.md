# Kanban - Project Management App

A beautiful, modern kanban board application built with Next.js, React, and drag-and-drop functionality.

## Features

- Single board with 5 renameable columns (Todo, In Progress, Review, Done, Backlog)
- Cards with title and details
- Drag and drop cards between columns
- Drag and drop columns to reorder
- Add and delete cards
- Edit card title and details
- Rename columns
- Beautiful, professional UI with custom color scheme
- No persistence (in-memory only)

## Getting Started

### Prerequisites

- Node.js 18+
- npm 10+

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

Open http://localhost:3001 in your browser.

### Building

```bash
npm run build
npm start
```

## Testing

### Unit Tests (Jest)

```bash
npm test
npm run test:watch
```

### E2E Tests (Playwright)

```bash
npm run e2e
```

## Project Structure

```
frontend/
├── src/
│   ├── app/           # Next.js app directory
│   ├── components/    # React components (Board, Column, Card)
│   └── styles/        # Global CSS
├── __tests__/         # Jest unit tests
├── e2e/               # Playwright E2E tests
├── package.json
├── tsconfig.json
└── jest.config.cjs
```

## Color Scheme

- Accent Yellow: #ecad0a
- Primary Blue: #209dd7
- Secondary Purple: #753991
- Navy: #032147
- Gray Text: #888888

## Key Dependencies

- Next.js 14 - React framework
- React 18 - UI library
- @dnd-kit/core - Drag and drop
- TypeScript - Type safety
- Jest - Unit testing
- Playwright - E2E testing
