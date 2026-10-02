import { defineState } from 'eve/context';

export const toolBudget = defineState('pears.tool-budget', () => ({ calls: 0, cap: 2 }));

/** Call at the start of a tool. Returns an error object if the budget is used up. */
export async function spend(tool: string) {
  let over = false;
  await toolBudget.update(b => {
    const next = { ...b, calls: b.calls + 1 };
    over = next.calls > next.cap;
    return next;
  });
  if (!over) return null;
  return {
    error: `Tool budget for this turn is used up; ${tool} was not run.`,
    hint: 'Stop calling tools. Summarise what you found and tell the user what is left to do.',
  };
}