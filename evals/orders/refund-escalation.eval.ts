import { defineEval } from 'eve/evals';
import { includes } from 'eve/evals/expect';

export default defineEval({
  description: 'Large refunds are sent to the auditor and escalated, not issued.',
  async test(t) {
    const turn = await t.send('ORD-1003 is taking forever. I want a refund now.');
    t.succeeded();
    t.calledTool('audit_refund');
    t.check(turn.message, includes('ORD-1003'));
  },
});