# Global AI Rules

## Language & Communication
- **Conversation**: Use **Indonesian** for general discussions, explanations, and Q&A to maintain a natural flow.
- **Artifacts**: Use **English** for ALL technical artifacts, including:
  - Code comments and documentation.
  - Commit messages and PR descriptions.
  - System instructions (like this file) and task plans.
  - Research notes and technical summaries.
- **Research**: Use **Indonesian** for research narratives, but preserve **English** technical terms.

## Design Engineering Standards
- Focus on **Craft & Motion**. Every UI suggestion must consider animations, transitions, and micro-details.
- Inspiration: Rauno Freiberg, Emil Kowalski, Paco Coursey.
- Stack: React + Next.js (App Router), Tailwind CSS, Framer Motion, shadcn/ui.

## Research Workflow
- If user requests research (anthropology, health, tech, etc), prioritize the `@researcher` agent.
- Ensure results are saved to `$HOME/Dropbox/Obsidian Vault/Research/` in the specified Obsidian format.
- Use `context7` MCP for library docs and `opensrc` for real-world code examples.

## Code Quality Standards
- **Conciseness**: Be extremely concise. Sacrifice grammar for brevity in technical outputs.
- **Strict Types**: Always use strict typing. No `any`.
- **Surgical Changes**: Make minimal, targeted changes.
- **Safety**: No non-null assertions (`!`) or unsafe casts (`as`).
- **Domain Modeling**: Use ADTs/discriminated unions to make illegal states unrepresentable.

## Specialized Subagents
- **Oracle**: Code review, architecture, debugging, refactoring.
- **Librarian**: 3rd party library research, remote repo exploration.

## Git & VCS
- **ALWAYS check for `.jj/`** - if present, use `jj` not git.
- **gh CLI available** for GitHub operations.
