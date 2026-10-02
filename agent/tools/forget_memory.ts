import { defineTool } from 'eve/tools';
import { z } from 'zod';
import { forgetMemories } from '../../lib/memory';
import { userIdFrom } from '../../lib/identity';

export default defineTool({
  description:
    'Delete memories about the current customer when they ask you to forget something. ' +
    'Pass an id to delete one memory, or omit it to delete everything about them.',
  inputSchema: z.object({ id: z.string().optional() }),
  async execute({ id }, ctx) {
    const removed = await forgetMemories(userIdFrom(ctx), id);
    return { removed };
  },
});