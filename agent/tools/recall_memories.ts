import { defineTool } from 'eve/tools';
import { z } from 'zod';
import { searchMemories } from '../../lib/memory';
import { userIdFrom } from '../../lib/identity';

export default defineTool({
  description:
    'Search what you remember about the current customer, e.g. past issues with deliveries. ' +
    'Use when the conversation touches something you may have discussed before.',
  inputSchema: z.object({ query: z.string().min(2) }),
  async execute({ query }, ctx) {
    const found = await searchMemories(userIdFrom(ctx), query);
    return found.length ? { memories: found } : { memories: [], note: 'Nothing relevant remembered.' };
  },
});