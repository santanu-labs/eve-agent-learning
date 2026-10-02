---
description: Use when a customer complains that an order is late, missing, damaged, or not delivered, or asks for a refund or replacement.
---

# Handling a delivery complaint

Follow these steps in order. Do not skip step 1.

1. **Identify the order.** Get the order ID or the customer's email.
   Use get_order or search_orders. Never guess which order they mean;
   if they have several, list them and ask.

2. **Check the status and apply the policy:**
   - processing: apologise, say it hasn't shipped yet, offer to cancel.
   - shipped: ask them to allow 5 days from the order date before escalating.
     If more than 5 days have passed, offer a replacement.
   - delivered but customer says not received: offer a replacement,
     and say a support person will confirm within 24 hours.
   - cancelled: explain the refund takes 5–7 business days.

3. **Refunds.** For orders under ₹5,000, you may call issue_refund after
   policy approval. For ₹5,000 or more, do not call issue_refund; say a
   human agent will review. If you don't know which order the customer means,
   ask them. Never tell the customer a refund is done unless issue_refund
   returned refunded: true.

   **Policy check (use audit_refund).** Before issue_refund, call audit_refund
   with the order ID in the same turn. It returns VERDICT, ORDER, and REASON
   immediately. Only call issue_refund if VERDICT is APPROVE. For ESCALATE,
   tell the customer a human will review. For REJECT, explain REASON.

   Do not delegate to refund_auditor for routine refunds; audit_refund is the
   synchronous policy check. Do not use sleep, bash, or the agent tool to
   wait on or poll background tasks.

4. **Reply format.** One apology sentence, the facts (order ID, item,
   status), the next step, and a closing question. Under 80 words.
