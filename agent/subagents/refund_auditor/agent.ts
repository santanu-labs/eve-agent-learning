import { defineAgent } from 'eve';
import { model, contextWindow } from '../../../lib/model';

export default defineAgent({
    description:
        'Check whether a refund request is allowed under company policy. ' +
        'Send it the order ID and the customer\'s complaint. ' +
        'Returns APPROVE, ESCALATE or REJECT with a reason. It never issues refunds itself.',
    model,
    modelContextWindowTokens: contextWindow,
    defaultTools: false, // no bash, file or web tools: only the tools in its own folder
});