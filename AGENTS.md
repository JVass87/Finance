# Kanban Project

## Business Requirements

- An MVP of a Kanban style Project Management application as a web app  
- The web app should support multiple boards  
- Each board can have configurable columns  
- Each card has a title, details, tags  
- Drag and drop interface to move cards between columns
- The tool should support archiving cards, filter/search
- The priority is a slick, professional, gorgeous UI/UX with a rich featureset for an MVP
- The app should first open with dummy data populated showing multiple active boards

## Technical Details

- Implemented as a modern NextJS app with Typescript
- No persistence
- No user management for the MVP
- Use popular libraries

## Color Scheme

- Accent Yellow: `#ecad0a` - accent lines, highlights
- Blue Primary: `#209dd7` - links, key sections
- Purple Secondary: `#753991` - submit buttons, important actions
- Dark Navy: `#032147` - main headings
- Gray Text: `#888888` - supporting text, labels

## Strategy

1. Write plan to plan.md with success criteria for each phase to be checked off. Include project scaffolding and rigorous unit testing.
2. Execute the plan ensuring all critiera are met
3. Carry out extensive integration testing with Playwright or similar, fixing defects
4. Carry out at least 2 iterations of improving the UI/UX, adding features and retesting
5. Only complete when the MVP is finished and tested

## Coding standards

1. Use latest versions of libraries and idiomatic approaches as of today
2. Keep it simple - NEVER over-engineer, ALWAYS simplify, NO unnecessary defensive programming
3. Be concise. Keep README minimal. IMPORTANT: no emojis ever