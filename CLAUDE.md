# CLAUDE.md

Project conventions for Claude Code live in `@AGENTS.md` (shared with all agents).
Read it before making changes.

## Claude-specific notes

- Chat with the maintainer in Korean; keep code comments and docs in English.
- This repo pins Node 24. If a Bash command runs on the wrong version, wrap it as
  `fnm exec --using=24 -- <cmd>`.
- Keep this file and `AGENTS.md` updated when project conventions change. They are
  committed so future sessions stay in sync; `npm run cleanse:agents` removes them when
  the starter is reused for a new extension.
