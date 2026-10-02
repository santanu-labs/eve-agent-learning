import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const DIR = path.join(process.cwd(), 'data', 'jobs');
const fileFor = (jobId: string) =>
  path.join(DIR, `${jobId.toLowerCase().replace(/[^a-z0-9-]/g, '-')}.md`);

export async function readNotes(jobId: string): Promise<string | null> {
  try { return await readFile(fileFor(jobId), 'utf8'); }
  catch { return null; }
}

export async function writeNotes(jobId: string, markdown: string) {
  await mkdir(DIR, { recursive: true });
  await writeFile(fileFor(jobId), markdown, 'utf8');
}