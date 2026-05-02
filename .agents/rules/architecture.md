# Architecture Rules

**Tech Stack**: 
To build the modern and interactive web application, the tech stack should leverage Next.js and Tailwind CSS for rapid development and high-performance rendering, paired with Framer Motion to create fluid, interactive transitions essential for maintaining a "Flow" state. The "intelligent suggestions" for time allocation and task ordering can be implemented using the Gemini API for NLP-driven task analysis and Supabase for real-time data persistence and user authentication.

**Design Aesthetic**: 
The UI design should adopt a "Zen-Minimalist" aesthetic utilizing Glassmorphism and a dynamic color engine that shifts the workspace atmosphere—transitioning from a high-contrast, distraction-free "Obsidian" mode for focus sessions to a warm, soft "Amber" for breaks—ensuring the interface effectively supports the behavioral patterns and productivity evaluation. This layout should prioritize a clean, card-based task list and a central, elegant SVG-based circular timer that provides a clear visual representation of progress, directly addressing the challenge of helping users plan and optimize their work effectively.

**Surgical Editing**: 
Agents must only modify the specific lines requested. Never rewrite a whole file to add a small feature.

**Naming Convention**: 
Use `camelCase` for variables and `PascalCase` for components.

**Integration Law**: 
Before writing any frontend fetch or backend route, the agent MUST read `@shared/schema.ts`.
