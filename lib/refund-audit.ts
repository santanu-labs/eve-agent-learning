import { ORDERS } from './orders';

export type RefundVerdict = 'APPROVE' | 'ESCALATE' | 'REJECT';

export type RefundAuditResult = {
  verdict: RefundVerdict;
  orderId: string;
  item?: string;
  amountINR?: number;
  status?: string;
  reason: string;
};

/** Same rules as the refund_auditor subagent instructions. */
export function auditRefundOrder(orderId: string): RefundAuditResult {
  const id = orderId.trim().toUpperCase();
  const order = ORDERS.find(o => o.id === id);

  if (!order) {
    return { verdict: 'REJECT', orderId: id, reason: 'Order not found (rule 1).' };
  }

  const base = {
    orderId: order.id,
    item: order.item,
    amountINR: order.amountINR,
    status: order.status,
  };

  if (order.status === 'cancelled') {
    return {
      ...base,
      verdict: 'REJECT',
      reason: 'Refund already handled at cancellation (rule 2).',
    };
  }

  if (order.amountINR >= 5_000) {
    return {
      ...base,
      verdict: 'ESCALATE',
      reason: 'Amount is ₹5,000 or more; a human must review (rule 3).',
    };
  }

  if (order.status === 'processing') {
    return {
      ...base,
      verdict: 'REJECT',
      reason: 'Order has not shipped; offer cancellation instead (rule 4).',
    };
  }

  return {
    ...base,
    verdict: 'APPROVE',
    reason: 'Meets policy for an automated refund (rule 5).',
  };
}
