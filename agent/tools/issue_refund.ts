import { defineTool } from 'eve/tools';
import { always } from 'eve/tools/approval';
import { z } from 'zod';
import { ORDERS } from '../../lib/orders';
import { REFUNDED } from '../../lib/refunds';
import { spend } from '../../lib/budget';

export default defineTool({
  description:
    'Issue a refund for an order. Only call this after you have checked the order ' +
    'with get_order and the customer has asked for a refund. A person must approve it.',
  inputSchema: z.object({
    orderId: z.string().describe('Order ID like ORD-1001'),
    reason: z.string().min(5).describe('Short reason, shown to the approver'),
  }),
  approval: always(), // pause before EVERY call until a person approves

  label: {
    start: ({ orderId }) => `Refund ${orderId}`,
  },

  async execute({ orderId, reason }) {
    const err = await spend('issue_refund');
    if (err) return err;

    const id = orderId.trim().toUpperCase();
    const order = ORDERS.find(o => o.id === id);
    if (!order) return { error: `No order ${id}.`, hint: 'Check the ID with get_order.' };

    // Idempotency: never refund the same order twice.
    const existing = REFUNDED.get(id);
    if (existing) {
      return { alreadyRefunded: true, ...existing, note: 'No new refund was issued.' };
    }
    if (order.status === 'cancelled') {
      return { error: `${id} is cancelled; its refund was handled at cancellation.` };
    }

    const record = { amountINR: order.amountINR, at: new Date().toISOString() };
    REFUNDED.set(id, record);
    console.log(`💸 Refunded ${id}: ₹${order.amountINR} — ${reason}`);
    return { refunded: true, orderId: id, ...record };
  },
});
