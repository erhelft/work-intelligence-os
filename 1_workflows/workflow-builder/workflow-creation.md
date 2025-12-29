# Workflow Creation

## Purpose

Transform a completed workflow blueprint into a production-ready workflow document that follows the standard template.

---

## Goal

A complete, consistent workflow document that faithfully translates the blueprint's design decisions into executable instructions — ready to use without additional editing.

---

## For Humans

### What to Expect
This is an **input-based workflow**. You provide a completed blueprint, and the AI drafts each section of the workflow document for your review. At 4 checkpoints, you'll approve before continuing. Expect 20-30 minutes.

### When to Use
- Use when: You have a completed workflow blueprint ready to translate
- Use when: You want to create a workflow to standardize a repeatable, valuable process
- Use when: The design decisions are already made

### When NOT to Use
- Don't use when: You haven't completed a blueprint yet (run `blueprint-creation.md` first)
- Don't use when: The task is a one-off
- Don't use when: You haven't figured out the design yet

### What You'll Get
A complete workflow document (`[workflow-name].md`) following `workflow-template.md` that:
- Captures all design decisions from your blueprint
- Is immediately executable
- Matches the structure and conventions of other workflows

---

## Workflow Process

**Type:** Input-based

**Pattern per step:**
> Each content step follows a **3-phase pattern**:
> 1. **Read Blueprint Section** — Extract relevant information from the blueprint
> 2. **Draft Workflow Section** — Translate into workflow template format
> 3. **Present for Review** — Show draft, ask for confirmation or adjustments
>
> This pattern ensures faithful translation from blueprint to workflow.

**Gating:** 4 gates total — after Steps 2, 5, 6, and 9

---

## LLM Instructions

### Your Role
Translator and drafter — faithfully convert blueprint design decisions into workflow format.

### Your Goal
Produce a workflow document that accurately reflects the blueprint with no design decisions lost in translation.

### Critical Principle
**Blueprint fidelity over creativity.** The thinking has been done. Your job is translation, not invention. Don't add features, don't reinterpret decisions, don't "improve" the design. Translate faithfully.

### References
- `workflow-template.md` — Structure for the output
- `workflow-formatting.mdc` — Formatting conventions (gates, checkboxes, file naming)

### Boundaries
**Do:**
- Follow the blueprint exactly
- Use template structure consistently
- Draft sections completely before presenting
- Flag any gaps or ambiguities in the blueprint for user decision

**Don't:**
- Add features or steps not in the blueprint
- Reinterpret design decisions
- Skip sections or combine steps unless blueprint specifies
- Make assumptions about missing information — ask

---

## Prerequisites & Setup

### Read Upfront
Before Step 1, read and understand:
- The user's completed blueprint (provided as input)
- `workflow-template.md` — Complete template structure

### Read On Demand
During specific steps, read as needed:
- `workflow-formatting.mdc` — When formatting gates, checkboxes, file names

---

## Workflow Steps

### Step 0: Preparation

**Objective:** Understand the blueprint and template before beginning.

**LLM Actions:**
- Read the user's completed blueprint
- Read `workflow-template.md`
- Identify how blueprint sections map to template sections
- Note any gaps or questions

**No gate — proceed to Step 1**

---

### Step 1: Introduction

**Objective:** Orient the user and set expectations.

**LLM Actions:**
1. Confirm you've read the blueprint: "I've read your blueprint for [workflow name]."
2. Summarize what you'll produce: "I'll translate this into a workflow document following our standard template."
3. Explain the process: "I'll draft each section and check in with you at 4 gates."
4. Ask: "Ready to begin?"

**Guidelines:**
- Keep introduction brief — the user already knows what they want
- Confirm you understand the blueprint's intent

**No gate — continue when user confirms**

---

### Step 2: Goal, Success & Output

**Objective:** Establish the workflow's purpose, goal, success criteria, and output specification.

**Blueprint Sections:** §1 (Why This Workflow Exists), §2 (Audience & Usage), §7 (Success Criteria)

**LLM Actions:**

**Draft these template sections:**

1. **Purpose** (1 sentence)
   - Extract from blueprint's Problem Statement and Desired End State
   - Start with action verb

2. **Goal** (1-2 sentences)
   - Extract from blueprint's Desired End State
   - Focus on outcome, not process

3. **For Humans**
   - What to Expect: Describe workflow type and time commitment
   - When to Use: Extract from blueprint's "When to Use"
   - When NOT to Use: Extract from blueprint's "When NOT to Use"
   - What You'll Get: Describe the output in human terms

4. **Success Criteria**
   - Extract from blueprint §7
   - Format as verifiable checkboxes

5. **Output Specification** (if workflow produces files)
   - File naming format
   - Location
   - Contents
   - Handoff information (if applicable)

**Present draft to user.**

**Quality Check:**
- [ ] Purpose is 1 sentence, starts with verb
- [ ] Goal is outcome-focused
- [ ] When to Use / NOT to Use is clear
- [ ] Success criteria are verifiable (yes/no)

**Gate 1:** User approves foundation sections

---

### Step 3: Prerequisites

**Objective:** Identify required inputs, documents, and setup.

**Blueprint Sections:** §6 (Design Decisions — Prerequisites)

**LLM Actions:**

**Draft Prerequisites & Setup section:**

1. **Read Upfront**
   - Extract from blueprint's Prerequisites table
   - What must exist before someone can start this workflow?
   - Include any documents, data, or prior work required

2. **Read On Demand**
   - What's referenced during specific steps?
   - Templates, guidelines, reference materials
   - Infer from phase inputs if not explicitly listed

**Guidelines:**
- Be specific about what each input is for
- Separate "before starting" from "during execution"
- The blueprint itself is always an implicit prerequisite for input-based workflows

**Quality Check:**
- [ ] All blueprint-listed prerequisites captured
- [ ] Clear what each prerequisite is used for

**No gate — continue to Step 4**

---

### Step 4: Workflow Process

**Objective:** Define how the workflow operates.

**Blueprint Sections:** §6 (Design Decisions)

**LLM Actions:**

**Draft Workflow Process section:**

1. **Type:** Interview-based / Input-based / Hybrid
   - Extract from blueprint's Phase Configuration

2. **Pattern per step** (if applicable)
   - If steps follow a repeating pattern, document it
   - Explain why the pattern matters

3. **Gating**
   - State total number of gates
   - List which steps are gated

**Guidelines:**
- Match the workflow type to what blueprint specifies
- Gating summary should match blueprint §6

**Quality Check:**
- [ ] Workflow type matches blueprint
- [ ] Gate count and placement match blueprint

**No gate — continue to Step 5**

---

### Step 5: LLM Instructions

**Objective:** Define the LLM's role, goal, and boundaries.

**Blueprint Sections:** §3 (Guiding Principles), §4 (Pitfalls to Avoid)

**LLM Actions:**

**Draft LLM Instructions section:**

1. **Your Role**
   - What role does the LLM play? (Guide, Interviewer, Executor, Translator, etc.)

2. **Your Goal**
   - What is the LLM trying to achieve with the user?

3. **Critical Principle** (if applicable)
   - Extract key insight from blueprint principles

4. **References**
   - External guidelines to follow

5. **Boundaries (Do / Don't)**
   - Translate blueprint principles into "Do" items
   - Translate blueprint pitfalls into "Don't" items

**Present Workflow Process + LLM Instructions to user.**

**Guidelines:**
- Principles become behavioral guidance
- Pitfalls become explicit constraints
- Write as instructions TO the LLM

**Quality Check:**
- [ ] Role is clear
- [ ] Principles translated to Do's
- [ ] Pitfalls translated to Don'ts

**Gate 2:** User approves Workflow Process + LLM Instructions

---

### Step 6: Step Structure

**Objective:** Create high-level outline of all workflow steps.

**Blueprint Sections:** §5 (Phase Architecture)

**LLM Actions:**

**Draft step outline:**

For each blueprint phase, create a step with:
- Step number and name
- Single-sentence objective
- Whether it's gated

Include standard steps:
- Step 0: Preparation
- Step 1: Introduction
- [Content steps from blueprint phases]
- Step N-2: Quality Assurance
- Step N-1: Review & Finalize
- Step N: Feedback Capture (standard — follow template pattern)

**Present step outline to user:**
```
Step 0: Preparation — Read inputs and prepare
Step 1: Introduction — Orient user, set expectations
Step 2: [Phase 1 name] — [objective] [GATE]
Step 3: [Phase 2 name] — [objective]
...
Step N-2: Quality Assurance — Validate complete output
Step N-1: Review & Finalize — Create file, get final approval [GATE]
Step N: Feedback Capture — Log feedback for workflow improvement
```

**Guidelines:**
- Each step = one blueprint phase (roughly)
- Mark gated steps clearly
- Maintain single objective per step

**Quality Check:**
- [ ] All blueprint phases represented
- [ ] Each step has single objective
- [ ] Gate placement matches blueprint

**Gate 3:** User approves step structure

---

### Step 7: Step Details

**Objective:** Flesh out each step with full content.

**Blueprint Sections:** §5 (Phase Architecture — all phase details)

**LLM Actions:**

**For each step, draft:**

1. **Objective** — Single goal for this step

2. **Blueprint/Template Section(s)** — What's being filled (if applicable)

3. **LLM Actions** — What to do:
   - For interview steps: Questions to ask
   - For input-based steps: What to extract and draft

4. **Key Topics to Cover** (if applicable)

5. **Guidelines** — Step-specific guidance:
   - What to emphasize in this specific step
   - Common mistakes to avoid
   - Extract from blueprint phase "Execution Guidance" — this becomes the step's Guidelines section

6. **Quality Check** — Inline validation criteria

7. **Gate** — What user approves (or "No gate — continue")

**Check for conditional sections:**
- **Reference Material:** Does any step need domain-specific reference material during execution? Check blueprint phases for external references.
- **Next Steps:** Is this workflow part of a sequence? Add Next Steps section if it feeds another workflow.

**Standard steps (use template pattern, no customization needed):**
- **Feedback Capture:** Include the standard Feedback Capture step as the final step. Follow the template pattern exactly — no customization needed unless the workflow has unique feedback needs.

**Guidelines:**
- Follow template structure exactly
- Blueprint's "Execution Guidance" per phase → becomes each step's "Guidelines" section
- Ensure each step's output feeds the next
- Create a feedback log file: `[workflow-folder]/[workflow-name]-feedback-log.md`

**Quality Check:**
- [ ] All steps fully detailed
- [ ] LLM Actions are specific and actionable
- [ ] Quality checks are verifiable
- [ ] Gates match approved structure
- [ ] Feedback Capture step included (standard pattern)
- [ ] Feedback log file created

**No gate — continue to Step 8**

---

### Step 8: Quality Assurance

**Objective:** Validate the complete workflow before finalizing.

**LLM Actions:**

**Part A: Blueprint Fidelity Check**
- Are all blueprint phases represented as steps?
- Are all design decisions (gating, input method) reflected?
- Are principles translated to LLM boundaries?
- Are pitfalls translated to constraints?

**Part B: Template Compliance Check**
- All required template sections filled?
- Formatting matches `workflow-template.md`?
- Gates properly marked?
- Feedback Capture step included?
- Feedback log file created?

**Part C: Coherence Check**
- Do steps flow logically?
- Does each step's output feed the next?
- Does the workflow produce the defined output?

**Part D: Quality Validation**
- [ ] Purpose is 1 sentence, starts with verb
- [ ] Goal is outcome-focused
- [ ] Success criteria are verifiable
- [ ] Each step has single objective
- [ ] LLM boundaries reflect principles and pitfalls
- [ ] Gate count matches blueprint (aim for 3-5)

**Guidelines:**
- Be thorough — this is the last check before finalizing
- Flag any issues for user decision
- Note any gaps where blueprint was unclear

**No gate — proceed to Step 9**

---

### Step 9: Review & Finalize

**Objective:** Create the workflow file and get final approval.

**LLM Actions:**

1. **Ask for save location:**
   - "Where should I save the workflow file? Please provide the folder path."

2. **Create the file** at the specified location:
   - Filename: `[workflow-name].md`
   - Compile all sections following `workflow-template.md` structure

3. **Confirm creation:**
   - "I've created `[workflow-name].md` in [folder path]."
   - Summarize:
     - Total steps: [X]
     - Total gates: [X]
     - Workflow type: [type]
   - Note any items that needed interpretation or remain TBD
   - Ask: "Please review the file. Does it accurately reflect your blueprint?"

**Critical:** You must CREATE the .md file — do not just output the content in chat. The user should be able to open and review the actual file.

**Gate 4:** User approves final workflow file

---

## Output Specification

### File Naming
- Format: `[workflow-name].md`
- Example: `competitor-analysis.md`

### Location
Same directory as the blueprint, or user-specified.

### Contents
- Complete workflow following `workflow-template.md`
- All sections filled based on blueprint
- Ready for immediate use

### Handoff
This workflow is typically the final step in the workflow builder sequence. The output is a production-ready workflow.

---

## Success Criteria

This workflow succeeds when:
- [ ] **Delivers results** — The resulting workflow achieves its intended outcome when executed
- [ ] **Minimal iterations** — The workflow doesn't need significant rework after first use
- [ ] **Blueprint fidelity** — All blueprint design decisions are reflected in the workflow
- [ ] **Immediately usable** — The workflow can be executed without additional editing

---

## Next Steps

After completing this workflow:

The created workflow is ready for use. Consider:
1. **Test run** — Execute the workflow once to validate it works
2. **Iterate** — Refine based on first use
3. **Document** — Add to workflow index if applicable

