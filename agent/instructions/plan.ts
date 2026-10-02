import { defineDynamic, defineInstructions } from 'eve/instructions';
import { plan } from '../tools/update_todos';

export default defineDynamic({
  events: {
    async 'turn.started'() {
      // Read the current state (update with no change, returning it as-is).
      let items: { task: string; status: string }[] = [];
      await plan.update(s => { items = s.items; return s; });
      if (items.length === 0) return null;

      const open = items.filter(i => i.status !== 'done');
      if (open.length === 0) return null;
      return defineInstructions({
        content: 'Current plan (from update_todos):\n' +
          items.map(i => `- [${i.status}] ${i.task}`).join('\n'),
      });
    },
  },
});