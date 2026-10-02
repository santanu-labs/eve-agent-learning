export type Order = {
    id: string;            // format: ORD-1001
    email: string;
    item: string;
    amountINR: number;
    status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
    createdAt: string;
    internalNotes: string; // the model should never need this
  };
  
  export const ORDERS: Order[] = [
    { id: 'ORD-1001', email: 'priya@example.com', item: 'Mechanical keyboard', amountINR: 6499, status: 'delivered', createdAt: '2026-08-02', internalNotes: 'warehouse B, rack 12' },
    { id: 'ORD-1002', email: 'priya@example.com', item: 'USB-C hub',           amountINR: 2199, status: 'shipped',   createdAt: '2026-09-18', internalNotes: 'courier: BlueDart' },
    { id: 'ORD-1003', email: 'rahul@example.com', item: '27" monitor',          amountINR: 18999, status: 'processing', createdAt: '2026-09-22', internalNotes: 'awaiting stock' },
    { id: 'ORD-1004', email: 'rahul@example.com', item: 'Laptop stand',         amountINR: 1499, status: 'cancelled', createdAt: '2026-07-11', internalNotes: 'refund issued' },
  ];