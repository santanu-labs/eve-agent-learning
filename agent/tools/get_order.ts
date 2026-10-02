import { defineTool } from 'eve/tools';
import { z } from 'zod';
import { ORDERS } from '../../lib/orders';
import { spend } from '../../lib/budget';

export default defineTool({
  description:
    'Get one order by its order ID (format ORD-1234). ' +
    'Use this when the user mentions an order number.',
  inputSchema: z.object({
    orderId: z
      .string()
      .describe('Order ID like ORD-1001. If the user gives only digits, add the ORD- prefix.'),
  }),
  async execute({ orderId }) {
    const err = await spend('get_order');
    if (err) return err;

    const id = orderId.trim().toUpperCase();

    // Poka-yoke: catch the common mistake and explain the fix.
    if (!/^ORD-\d{4}$/.test(id)) {
      return {
        error: `"${orderId}" is not a valid order ID.`,
        hint: 'Order IDs look like ORD-1001. Retry with that format.',
      };
    }

    const order = ORDERS.find(o => o.id === id);
    if (!order) {
      return {
        error: `No order with ID ${id}.`,
        hint: 'If the user knows their email, use search_orders to list their orders.',
      };
    }

    const { internalNotes, ...visible } = order;
    return visible;
  },
});