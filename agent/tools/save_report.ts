import { defineTool } from 'eve/tools';
import { z } from 'zod';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

export default defineTool({
  description:
    'Save a finished report as a Markdown file for people to read later. ' +
    'Use this to deliver the result of any scheduled or unattended task. ' +
    'Saving the same name on the same day overwrites the earlier version.',
  inputSchema: z.object({
    name: z.string().regex(/^[a-z0-9-]+$/).describe("Short kebab-case name, e.g. 'daily-sales'"),
    markdown: z.string().min(20).describe('The full report in Markdown'),
  }),
  async execute({ name, markdown }) {
    // Date in India time, formatted YYYY-MM-DD
    const day = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
    const dir = path.join(process.cwd(), 'reports');
    await mkdir(dir, { recursive: true });
    const file = path.join(dir, `${day}-${name}.md`);
    await writeFile(file, markdown, 'utf8');
    return { saved: true, file: path.relative(process.cwd(), file), bytes: markdown.length };
  },
});