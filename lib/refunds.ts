// In-memory "database" of refunds already issued.
// In a real app this would be your database or payment provider.
export const REFUNDED = new Map<string, { amountINR: number; at: string }>();