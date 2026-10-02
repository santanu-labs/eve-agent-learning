import { defineTool } from 'eve/tools';
import { z } from 'zod';
import { readNotes, writeNotes } from '../../lib/jobs';

export default defineTool({
  description:
    'Read or overwrite the progress notes for a long job. These notes are the source of truth ' +
    'and survive restarts and new sessions. Always read them before starting or continuing a job; ' +
    'write them after every completed item.',
  inputSchema: z.object({
    jobId: z.string().regex(/^[a-z0-9-]+$/).describe("e.g. 'ticket-triage-01'"),
    action: z.enum(['read', 'write']),
    markdown: z.string().optional().describe('Full new notes (required for write)'),
  }),
  async execute({ jobId, action, markdown }) {
    if (action === 'read') {
      const notes = await readNotes(jobId);
      return notes ? { exists: true, notes } : { exists: false, hint: 'New job: create notes after planning.' };
    }
    if (!markdown) return { error: 'markdown is required for write.' };
    await writeNotes(jobId, markdown);
    return { saved: true, chars: markdown.length };
  },
});