#!/usr/bin/env node
// Remove AI-agent instruction files so the starter can seed a fresh extension.
// Run with: npm run cleanse:agents
import { rm } from 'node:fs/promises';

const targets = ['CLAUDE.md', '.claude', '.cursor', '.github/copilot-instructions.md'];

for (const target of targets) {
  await rm(target, { recursive: true, force: true });
  console.log(`removed ${target}`);
}

await rm('scripts/cleanse-agents.mjs', { force: true });
console.log('\nAgent files removed. Drop the "cleanse:agents" script from package.json too.');
