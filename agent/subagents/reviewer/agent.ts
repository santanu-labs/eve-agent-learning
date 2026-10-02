import { defineAgent } from 'eve';
import { model, contextWindow } from '../../../lib/model';

export default defineAgent({
  description:
    'Strictly checks finished work against its requirements. Send it the requirements and the ' +
    'complete results. Returns PASS, or FAIL with a numbered list of specific problems.',
  model,
  modelContextWindowTokens: contextWindow,
  defaultTools: false,
});