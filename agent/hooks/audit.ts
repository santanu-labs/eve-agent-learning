import { defineHook } from 'eve/hooks';
import { appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { redact } from '../../lib/redact';

const LOG_DIR = path.join(process.cwd(), 'logs');

export default defineHook({
  events: {
    async '*'(event, ctx) {
      if (event.type === 'message.appended') return; // skip streaming text pieces
      if (event.type === 'turn.completed') { // log usage
        console.log(`💰 session ${ctx.session.id} turn usage:`, JSON.stringify((event as any).data?.usage ?? {}));
      }
      const record = {
        id: event.meta.id,
        at: new Date().toISOString(),
        session: ctx.session.id,
        type: event.type,
        data: 'data' in event ? event.data : null,
      };
      try {
        await mkdir(LOG_DIR, { recursive: true });
        await appendFile(path.join(LOG_DIR, 'audit.jsonl'), redact(JSON.stringify(record)) + '\n');
      } catch (err) {
        console.error('[audit] could not write log:', err);
      }
    },
  },
});