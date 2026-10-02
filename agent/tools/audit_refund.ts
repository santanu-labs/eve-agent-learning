import { defineTool } from 'eve/tools';
import { z } from 'zod';
import { auditRefundOrder } from '../../lib/refund-audit';

export default defineTool({
  description:
    'Check whether a refund is allowed under company policy for an order ID. ' +
    'Returns VERDICT (APPROVE, ESCALATE, or REJECT), order facts, and REASON. ' +
    'Call this before issue_refund; it does not issue refunds.',
  inputSchema: z.object({
    orderId: z.string().describe('Order ID like ORD-1001'),
  }),
  async execute({ orderId }) {
    const result = auditRefundOrder(orderId);
    return {
      VERDICT: result.verdict,
      ORDER: result.item
        ? `${result.orderId}, ${result.item}, ₹${result.amountINR}, ${result.status}`
        : result.orderId,
      REASON: result.reason,
    };
  },
});
