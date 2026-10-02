import { defineHook } from 'eve/hooks';
import { toolResultFrom } from 'eve/tools';
import issueRefund from '../tools/issue_refund';

export default defineHook({
  events: {
    'action.result'(event, ctx) {
      const result = toolResultFrom(event.data.result, issueRefund);
      if (result && 'refunded' in result.output && result.output.refunded) {
        console.log(
          `🚨 REFUND ISSUED ${result.output.orderId} ₹${result.output.amountINR} ` +
          `(session ${ctx.session.id})`,
        );
        // In production: post to Slack, send an email, or page someone.
      }
    },
  },
});