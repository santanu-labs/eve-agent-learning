import { createOpenAI } from '@ai-sdk/openai';

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

// Use openai.chat(...) instead if your endpoint only supports Chat Completions.
export const model = openai(process.env.OPENAI_MODEL as any);
export const contextWindow = 128_000;