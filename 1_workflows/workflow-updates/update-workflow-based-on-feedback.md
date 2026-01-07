# Workflow Update Workflow

## Purpose

Improve workflows based on accumulated feedback by analyzing patterns and applying changes systematically.

---

## Last Updated

- **Date:** —
- **Iteration:** 0

---

## Goal

An improved workflow (and template, if applicable) that addresses patterns from feedback, with processed feedback marked to avoid re-processing.

---

## For Humans

### What to Expect

Quick workflow (~15 min). You'll provide the files, I'll analyze and suggest changes, you approve, I apply.

### When to Use

- When feedback has accumulated in a workflow's feedback log
- After completing several executions of a workflow
- When you notice recurring issues

### What You'll Get

- Updated workflow and/or template with improvements
- Feedback log entries marked as processed

---

## Prerequisites

**Required:**
- Workflow file: _______
- Feedback log: _______

**Optional:**
- Template file: _______ (if workflow has a companion template)

---

## Workflow Steps

### Step 1: Read & Understand

**Objective:** Load context and identify unprocessed feedback.

**LLM Actions:**
1. Read the workflow file (and template if provided)
2. Read the feedback log
3. Identify entries NOT marked `[Processed]`
4. Report: "Found X unprocessed feedback entries. Ready to analyze."

**No gate — proceed to Step 2**

---

### Step 2: Analyze & Propose

**Objective:** Identify patterns and propose specific changes.

**LLM Actions:**

**Pattern Analysis:**
- Group related feedback items
- Identify recurring themes vs. one-off issues
- Note which issues affect workflow vs. template

**For each pattern, determine:**
1. **Can we reframe existing content?** — Prefer modifying existing rules/guidelines over adding new ones
2. **Is it generic enough?** — Must apply to multiple cases, not be a specific patch
3. **Is it worth implementing?** — Skip if too specific/nuanced for broad applicability

**Deliverable: Change Proposal**

```
## Proposed Changes

### Change 1: [Brief title]
**What we're trying to achieve:** [The goal/improvement this change addresses]
**Pattern:** [What feedback items this addresses]
**Current:** [What the workflow/template currently says or does]
**New:** [The specific change to implement]
**Location:** [Workflow / Template / Both] — Section: [which section]

### Change 2: ...

---

## Feedback NOT Implemented

| Feedback | Reason Skipped |
|----------|----------------|
| [brief description] | [too specific / one-off / unclear pattern] |
```

**Gate:** User approves proposed changes (can modify, reject individual changes)

---

### Step 3: Apply Changes

**Objective:** Implement approved changes and update tracking.

**LLM Actions:**

1. **Update workflow/template:**
   - Apply each approved change
   - Maintain document structure and formatting
   - Keep changes minimal — don't refactor surrounding content

2. **Update workflow header:**
   - Set "Last Updated" date to today
   - Increment iteration number by 1

3. **Mark feedback as processed:**
   - Add to end of each processed entry: `[Processed: {date}, Iteration #{n}]`
   - Use same iteration number as workflow update

**No gate — workflow complete**

---

## Key Principles

### What Makes a Good Change

✅ **Generic** — Applies to multiple scenarios, framed as a rule or guideline
✅ **Reuses existing** — Modifies/extends current terminology when possible
✅ **Concise** — Adds minimal tokens; removes if it creates bloat
✅ **Clear** — Unambiguous guidance the LLM can follow

### What to Avoid

❌ **Specific patches** — Inline fixes for specific edge cases
❌ **Duplicate guidance** — Saying the same thing in different words
❌ **Hypothetical coverage** — Adding guidance for things that haven't happened
❌ **Length creep** — Every addition should justify its token cost

---

## Success Criteria

- [ ] All unprocessed feedback reviewed
- [ ] Changes are generic rules, not specific patches
- [ ] Existing content reused/modified where possible
- [ ] Workflow/template updated with approved changes
- [ ] "Last Updated" and iteration incremented
- [ ] Processed feedback entries marked

