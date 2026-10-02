import { defineAgent } from 'eve';
import { model, contextWindow } from '../../../lib/model';

export default defineAgent({
  description:
    'Classifies ONE support ticket: category, priority and a short draft reply. ' +
    'Send it the ticket ID and text.',
  model,
  modelContextWindowTokens: contextWindow,
  defaultTools: false,
});