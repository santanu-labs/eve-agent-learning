---
description: Use for any job with an ID, any batch of many items, or when asked to continue or resume a job.
---

# Long task protocol

1. **Resume first.** Call job_notes read. If notes exist, continue from "Next", do not start over.
2. **Plan.** If new, write a todo list, then create the notes using the template below.
3. **Work in small chunks.** Finish one item at a time. After each item:
   update the notes (move it to Done, record the result), then update the todo.
4. **Never keep results only in the conversation.** If it's not in the notes, it doesn't exist.
5. **Review before finishing.** Send the full results to the reviewer subagent.
   Fix everything it flags, then review again. Maximum 2 review rounds.
6. **Deliver** with save_report, then mark the job COMPLETE in the notes.

## Notes template

    # Job: <id>
    Status: IN PROGRESS | COMPLETE
    ## Goal
    ## Done (item: result)
    ## Next
    ## Decisions and assumptions
    ## Problems