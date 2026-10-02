import { defineAgent } from "eve";
import { contextWindow, model } from '../lib/model';


export default defineAgent({
  model: model,
  modelContextWindowTokens: contextWindow,
});
