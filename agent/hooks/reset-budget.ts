import { defineHook } from 'eve/hooks';
import { toolBudget } from '../../lib/budget';

export default defineHook({
  events: {
    async 'turn.started'() {
      await toolBudget.update(() => ({ calls: 0, cap: 15 }));
    },
  },
});