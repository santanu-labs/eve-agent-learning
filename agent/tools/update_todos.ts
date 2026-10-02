import { defineTool } from 'eve/tools';
import { defineState } from 'eve/context';
import { z } from 'zod';

type Item = { task: string; status: 'pending' | 'in_progress' | 'done' };

// Durable per-session state: survives pauses, restarts and approvals.
export const plan = defineState('pears.plan', () => ({ items: [] as Item[] }));

export default defineTool({
  description:
    'Track the plan for the current job. Create it before any task with more than 3 steps. ' +
    'Always send the FULL list. Keep exactly one item in_progress, and update after each item.',
  inputSchema: z.object({
    todos: z.array(z.object({
      task: z.string(),
      status: z.enum(['pending', 'in_progress', 'done']),
    })).min(1),
  }),
  async execute({ todos }) {
    const active = todos.filter(t => t.status === 'in_progress').length;
    if (active > 1) {
      return {
        error: `${active} items are in_progress; only one is allowed.`,
        hint: 'Mark the others pending and send the full list again.',
      };
    }
    await plan.update(() => ({ items: todos }));

    const icons = { pending: '⬜', in_progress: '🔄', done: '✅' };
    const done = todos.filter(t => t.status === 'done').length;
    return {
      saved: true,
      progress: `${done}/${todos.length} done`,
      board: todos.map(t => `${icons[t.status]} ${t.task}`).join('\n'),
    };
  },
});