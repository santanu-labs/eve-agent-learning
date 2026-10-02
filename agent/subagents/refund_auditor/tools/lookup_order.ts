import { defineTool } from 'eve/tools';
import { z } from 'zod';
import { ORDERS } from '../../../../lib/orders';

export default defineTool({
    description: 'Look up one order by ID (format ORD-1234). Read-only.',
    inputSchema: z.object({ orderId: z.string() }),
    async execute({ orderId }) {
        const order = ORDERS.find(o => o.id === orderId.trim().toUpperCase());
        if (!order) return { error: `No order ${orderId}.` };
        const { internalNotes, ...visible } = order;
        return visible;
    },
});