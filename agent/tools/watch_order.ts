import { defineWorkflowTool } from 'eve/tools';
import { sleep } from 'workflow';
import { z } from 'zod';
import { ORDERS } from '../../lib/orders';

// A step: real I/O (a database or API call) belongs in steps, so results are recorded and replayed.
async function fetchStatus(orderId: string) {
  'use step';
  return ORDERS.find(o => o.id === orderId)?.status ?? 'unknown';
}

export default defineWorkflowTool({
  description:
    'Watch an order in the background and report when its status changes, or give up after ' +
    'a number of checks. Use when a customer asks to be told when their order ships.',
  inputSchema: z.object({
    orderId: z.string(),
    checkEvery: z.string().default('1m').describe("How often to check, e.g. '1m', '1h'"),
    maxChecks: z.number().int().min(1).max(20).default(5),
  }),
  execution: 'background',
  async *execute({ orderId, checkEvery, maxChecks }) {
    'use workflow';
    const id = orderId.trim().toUpperCase();
    const initial = await fetchStatus(id);
    yield { status: `Watching ${id} (currently ${initial})` };

    for (let i = 1; i <= maxChecks; i++) {
      await sleep(checkEvery); // durable: survives restarts, uses no compute while waiting
      const now = await fetchStatus(id);
      if (now !== initial) return { orderId: id, changed: true, from: initial, to: now, checks: i };
      yield { status: `Check ${i}/${maxChecks}: still ${now}` };
    }
    return { orderId: id, changed: false, status: initial, checks: maxChecks };
  },
});