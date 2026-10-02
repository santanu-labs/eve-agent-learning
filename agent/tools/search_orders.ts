import { defineTool } from 'eve/tools';
import { z } from 'zod';
import { ORDERS } from '../../lib/orders';
import { spend } from '../../lib/budget';

export default defineTool({
    description:
        'Find a customer\'s orders by their email address. ' +
        'Use this when the user gives an email or asks about "my orders". ' +
        'Do NOT use it when you already have an order ID — use get_order instead.',
    inputSchema: z.object({
        email: z
            .string()
            .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
            .describe('Customer email, e.g. priya@example.com'),
        status: z
            .enum(['processing', 'shipped', 'delivered', 'cancelled'])
            .optional()
            .describe('Only return orders with this status. Omit for all.'),
        limit: z.number().int().min(1).max(20).default(5),
    }),
    async execute({ email, status, limit }) {
        const err = await spend('search_orders');
        if (err) return err;

        const all = ORDERS.filter(o => o.email === email.toLowerCase());

        if (all.length === 0) {
            // An error that teaches: say what went wrong AND what to do next.
            const domain = email.split('@')[1] ?? '';
            const similar = [...new Set(ORDERS.map(o => o.email))]
                .filter(e => e.split('@')[0] === email.split('@')[0] || e.endsWith(domain));
            return {
                error: `No customer found with email ${email}.`,
                hint: similar.length
                    ? `Similar emails on file: ${similar.join(', ')}. Ask the user to confirm which is theirs; do not assume.`
                    : 'Ask the user to double-check the email address.',
            };
        }

        const matches = all.filter(o => !status || o.status === status);
        return {
            totalMatching: matches.length,
            // Compact result: only the fields the model needs. No internalNotes.
            orders: matches.slice(0, limit).map(({ id, item, amountINR, status, createdAt }) =>
                ({ id, item, amountINR, status, createdAt })),
        };
    },
});
