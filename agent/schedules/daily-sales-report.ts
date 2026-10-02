import { defineSchedule } from 'eve/schedules';

export default defineSchedule({
  // Cron is evaluated in UTC on Vercel: 03:30 UTC = 09:00 IST
  cron: '30 3 * * *',
  markdown: `This is an automated daily run. No person is watching and nobody can answer questions.
Do only this task:
1. Use the sales-report skill to analyse /workspace/data/sales.csv.
2. Save the finished report with save_report, using the name "daily-sales".
3. If anything fails, still call save_report with the name "daily-sales-error",
   explaining what went wrong and what you tried.
Do not issue refunds or take any other action.`,
});