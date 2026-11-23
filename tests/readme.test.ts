import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('README.md', () => {
  let content: string;

  beforeAll(() => {
    const readmePath = path.resolve(__dirname, '../README.md');
    content = fs.readFileSync(readmePath, 'utf-8');
  });

  it('should exist and have content', () => {
    expect(content.length).toBeGreaterThan(0);
  });

  it('should include project name or description', () => {
    expect(content).toContain('# ');
  });

  it('should include a Features section', () => {
    expect(content).toContain('## Features');
  });

  it('should include Getting Started or Installation instructions', () => {
    expect(content.toLowerCase()).toContain('installation');
  });

  it('should include graph notation (mermaid)', () => {
    // Check for common mermaid graph start patterns
    expect(content).toMatch(/graph\s+(TD|LR|RL|BT)/i);
  });

  it('should include Tech Stack section', () => {
    expect(content).toContain('## Tech Stack');
  });
});