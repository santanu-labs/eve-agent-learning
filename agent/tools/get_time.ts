import { defineTool } from 'eve/tools';
import { z } from 'zod';

export default defineTool({
    description:
        'Get the current date and time. Use this whenever the user asks about ' +
        'the current time, today\'s date, or how long until a time. ' +
        'Never guess the time.',
    inputSchema: z.object({
        timeZone: z
            .string()
            .describe("IANA time zone, e.g. 'Asia/Kolkata'. Use 'UTC' if unknown."),
    }),
    async execute({ timeZone }) {
        const now = new Date();
        return {
            iso: now.toISOString(),
            local: now.toLocaleString('en-IN', { timeZone }),
            timestamp: now.getTime(),
            timeZone,
        };
    },
});