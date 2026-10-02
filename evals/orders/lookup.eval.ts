import { defineEval } from 'eve/evals';
import { includes } from 'eve/evals/expect';

export default defineEval({
  description: 'Looks up orders by email with the right tool.',
  async test(t) {
    const turn = await t.send("What has priya@example.com ordered?");
    t.succeeded();
    t.calledTool('search_orders');
    t.check(turn.message, includes('ORD-1001'));
    t.check(turn.message, includes('ORD-1002'));
  },
});