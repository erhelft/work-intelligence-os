# Workflow Template

## Overview

This template defines the structure for all workflows. Workflows are "system prompts" for LLMs — they tell the LLM how to guide a user through a process to produce a specific output.

**Key Principle:** When triggered, the LLM takes control and guides the user step-by-step toward the output.

**Related:** For formatting conventions (gates, checkboxes, file naming), see `workflow-formatting.mdc`.

---

# [Workflow Name]

## Purpose

[1 sentence — what this workflow does]

**Guidelines:**
- Start with action verb
- Be specific about what it accomplishes
- Keep to 1 sentence

---

## Goal

[1-2 sentences — the outcome when executed well]

**Guidelines:**
- Focus on outcome, not process
- 1-2 sentences maximum
- Should be measurable or observable

---

## For Humans

### What to Expect
[Brief description of what this workflow involves, how it works, and what you'll need to participate. E.g., "This is an interview-driven workflow. The AI will guide you through questions section by section. Expect 30-45 minutes. You don't need everything prepared upfront."]

### When to Use
- Use when: [specific triggers or situations]
- Use when: [another trigger]

### When NOT to Use
- Don't use when: [situation where this isn't appropriate]
- Don't use when: [another situation]
- [Alternative recommendation if applicable]

### What You'll Get
[Human-readable description of outputs. E.g., "A complete workflow blueprint document that captures the reasoning, structure, and design decisions for your new workflow."]

**Guidelines:**
- Write for the person who will trigger this workflow
- Be clear about time/effort expectations
- Help them decide if this is the right workflow for their need

---

## Workflow Process

**Type:** [Interview-based / Input-based / Hybrid]

**Pattern per step:** *(if applicable)*
> Each step follows the same **X-phase pattern**:
> 1. [Phase 1] — [What happens]
> 2. [Phase 2] — [What happens]
> 3. [Phase 3] — [What happens]
>
> This pattern ensures [why it matters].

**Gating:** [X gates total — after steps Y, Z, etc.]

**Guidelines:**
- Explain the repeating pattern (if any) that applies to multiple steps
- State the workflow type (interview-based, input-based, hybrid)
- Summarize the gating strategy

---

## LLM Instructions

### Your Role
[What role you play — Guide / Interviewer / Executor / etc.]

### Your Goal
[What you're trying to achieve with the user]

### Critical Principle *(if applicable)*
[Key insight that drives this workflow's design. E.g., "Start with the output, work backwards — define what the workflow produces before designing the phases that create it."]

### References
[External guidelines to follow. E.g., "Follow `ai-interview-guidelines.mdc` for all interview steps."]

### Boundaries
**Do:**
- [What you should do]
- [Another behavior]

**Don't:**
- [What you should NOT do]
- [Another constraint]

**Guidelines:**
- Write as instructions TO the LLM
- Include any critical principles that drive this workflow's design
- Reference external guidelines if applicable

---

## Prerequisites & Setup

### Read Upfront
Before Step 1, read and understand:
- [Document that informs the entire workflow]
- [Referenced guidelines]

### Read On Demand
During specific steps, read as needed:
- [Template sections — read each section's guidelines when filling it]
- [Reference materials — read when relevant to current step]

**Guidelines:**
- Separate "read upfront" (before starting) from "read on demand" (during specific steps)
- Be specific about what each input is for

---

## Workflow Steps
This section contains the step-by-step instructions the LLM will follow to execute the workflow.

**Guidelines:**
- Each step should have a single objective
- Include Guidelines section in each step for step-specific guidance
- Quality Check provides inline validation criteria
- Gates should be at decision points (aim for 3-5 total)

---

### Step 0: Preparation

**Objective:** Understand context before beginning.

**LLM Actions:**
- Read all "Read Upfront" materials
- Understand the template structure (if applicable)
- Prepare to guide user through the process

**No gate — proceed to Step 1**

---

### Step 1: Introduction

**Objective:** Orient the user and set expectations.

**LLM Actions:**
1. Explain what this workflow will accomplish
2. Explain how it will work (the process)
3. Set expectations for time/effort
4. Ask: "Ready to begin?"

**Guidelines:**
- Keep explanation concise (3-5 sentences)
- Match tone to workflow type
- Ensure user understands what's expected of them

**No gate — continue when user confirms**

---

### Step 2: [First Content Step Name]

**Objective:** [Single goal for this step]

**Template Section(s):** [Which sections being filled, if applicable]

**Follow the [X]-phase pattern above.** *(if pattern was defined)*

**LLM Actions:**
[What to do — questions to ask, information to gather, how to approach]

**Key Topics to Cover:**
- [Topic 1]
- [Topic 2]
- [Topic 3]

**Guidelines:**
- [Guidance specific to this step]
- [What to emphasize]
- [Common mistakes to avoid]

**Quality Check:**
- [ ] [Criterion 1]
- [ ] [Criterion 2]

**Gate:** [What user approves — or "No gate, continue"]

---

### Step N: [Additional Content Steps]
[Follow same structure as Step 2]

---

### Step N+1: Quality Assurance

*Note: Quality Assurance comes before Review & Finalize and Feedback Capture. Adjust step numbering based on your workflow's total number of steps.*

**Objective:** Validate the complete output before finalizing.

**LLM Actions:**

**Part A: Cross-Section Coherence Check**
- [Check 1 — do sections align?]
- [Check 2 — any contradictions?]
- [Check 3 — does output solve the original problem?]

**Part B: Completeness Check**
- All required sections filled
- All guidelines followed
- No gaps or TBD items unaddressed

**Part C: Quality Validation**
Run through quality criteria:
- [ ] [Quality criterion 1]
- [ ] [Quality criterion 2]
- [ ] [Quality criterion 3]

**Guidelines:**
- Be thorough — this is the last check before finalizing
- Flag any issues for user decision
- Note any TBD items or open questions

**No gate — proceed to final step**

---

### Step N+2: Review & Finalize

*Note: This step comes before Feedback Capture. Adjust step numbering based on your workflow's total number of steps.*

**Objective:** Create the output file and get final approval.

**LLM Actions:**
1. Ask for save location (if workflow produces files)
2. Create the file at the specified location
3. Compile all sections into final output
4. Add metadata (if applicable)
5. Note any TBD items or open questions
6. Ask: "Please review the file. Does it accurately capture what we discussed?"

**Critical:** If workflow produces files, CREATE the actual file — do not just output content in chat.

**Gate:** User approves final output

---

### Step N+3: Feedback Capture

*Note: This is always the final step. Every workflow should include this step to enable iteration.*

**Objective:** Capture feedback to enable workflow improvement.

**LLM Actions:**

**Transition:**
"Before we wrap up, I'd like to capture quick feedback. This helps us improve this workflow."

**Ask these four questions:**

1. **Completeness:** "Did this workflow help you produce what you needed? Anything missing?"

2. **Accuracy:** "Did any step feel 'off' or not quite fit your situation?"

3. **Process friction:** "Were there moments where the questions or instructions didn't work well?"

4. **Open feedback:** "Any other observations or suggestions?"

**Log the feedback:**
- Append to `[workflow-folder]/[workflow-name]-feedback-log.md`
- Format:
  ```
  ## [Output Name] — [Date]
  
  **Completeness:** [response or "Nothing missing"]
  **Accuracy:** [response or "Accurate"]
  **Process friction:** [response or "None"]
  **Open feedback:** [response or "None"]
  ```

**Guidelines:**
- Keep lightweight — don't turn into another interview
- "All good" is valid feedback
- Goal is to surface patterns over time, not perfect every entry

**No gate — this completes the workflow**

---

## Reference Material *(Conditional)*

### [Reference Name]

[Tables, templates, or guides needed during workflow execution]

**Guidelines:**
- Only include if the workflow needs reference material during execution
- Keep organized and scannable
- Reference from relevant steps

**Include when:** workflow needs domain-specific reference material

---

## Output Specification *(Conditional)*

### File Naming
- Format: `[naming-pattern].md`
- Example: `[concrete-example].md`

### Location
User-specified directory: _______

### Contents
- [What's in the output]
- [Key sections or components]

### Handoff *(if feeds another workflow)*
This output serves as input to **[Next Workflow Name]**. It should contain everything needed to [what the next workflow does] without additional discovery.

**Guidelines:**
- Include exact file naming format
- Specify location
- List what's contained in the output
- Include handoff information if this feeds another workflow

**Include when:** workflow produces files/artifacts

---

## Success Criteria

This workflow succeeds when:
- [ ] [Criterion 1 — completion check]
- [ ] [Criterion 2 — quality check]
- [ ] [Criterion 3 — addresses original problem]
- [ ] [Criterion 4 — output is usable]
- [ ] [Criterion 5]

**Guidelines:**
- 4-7 criteria total
- Each should be verifiable (yes/no check)
- Include completion, quality, and usability checks

---

## Next Steps *(Conditional)*

After completing this workflow, proceed to:

**[Next Workflow Name]** — [Brief description of what it does and how it uses this output]

**Guidelines:**
- Only include if this workflow is part of a chain
- Be specific about what comes next and why

**Include when:** workflow is part of a sequence

---