# Workflow Blueprint Creation

## Purpose

Interview-based workflow to help anyone design and document a new workflow by creating a complete Workflow Blueprint.

---

## Goal

A complete Workflow Blueprint that captures the reasoning, structure, and design decisions for a new workflow — serving as permanent documentation and input for workflow creation.

---

## For Humans

### What to Expect
This is an **interview-driven workflow**. The AI will guide you through questions to design your workflow step by step. You'll approve at 3 checkpoints. Expect 30-45 minutes. You don't need everything figured out upfront — the interview will help you think through it.

### When to Use
- Use when: Starting a new workflow from scratch
- Use when: Formalizing a process you've done manually several times
- Use when: Documenting the reasoning behind an existing workflow

### When NOT to Use
- Don't use when: Making minor tweaks to existing workflows (update directly)
- Don't use when: Building one-off processes that won't repeat
- Don't use when: You don't yet understand the process well (do it manually 2-3 more times first)

### What You'll Get
A complete workflow blueprint document (`[workflow-name]-blueprint.md`) that captures:
- Why the workflow exists and who it's for
- The phases and how they connect
- Guiding principles and pitfalls to avoid
- Design decisions with reasoning

This blueprint becomes permanent documentation and the input for creating the actual workflow.

---

## Workflow Process

**Type:** Interview-based

**Pattern per step:**
> Each interview step follows the same **5-phase pattern**:
> 1. **Read Template Section** — Review relevant section guidelines from `workflow-blueprint-template.md`
> 2. **Interview User** — Ask questions following `ai-interview-guidelines.mdc` until complete
> 3. **Validate Against Guidelines** — Check information against section guidelines
> 4. **Draft Section Content** — Document findings in template format
> 5. **At Gates: Present & Approve** — Summarize, note quality levels, get explicit approval
>
> This pattern ensures consistency and completeness at each stage.

**Gating:** 3 gates total — after Steps 4, 8, and 11

---

## LLM Instructions

### Your Role
Interviewer and guide — help the user design their workflow through structured questions.

### Your Goal
Help the user produce a complete, well-reasoned workflow blueprint that they can use to create an effective workflow.

### Critical Principle
**Start with the output, work backwards.** Before designing how the workflow works, be clear on what it produces. The phases of a workflow exist to create an output — not the other way around. Enforce this by defining the desired output before designing the phases.

### References
Follow `ai-interview-guidelines.mdc` throughout this workflow:
- Use the Time Investment Principle to decide when to dig deeper vs. move on
- Use Gradual Discovery (general → specific)
- At gates: present structured summary, note quality levels, ask for explicit approval

### Boundaries
**Do:**
- Challenge whether this should be a workflow at all (Step 2)
- Push for specificity when answers are vague
- Validate against template guidelines before presenting at gates
- Guide user to think about outputs before phases

**Don't:**
- Accept vague answers for high-importance topics
- Skip the readiness check
- Design phases before outputs are clear
- Rush through principles and pitfalls

---

## Prerequisites & Setup

### Read Upfront
Before Step 1, read and understand:
- `workflow-blueprint-template.md` — Complete template structure and all section guidelines
- `ai-interview-guidelines.mdc` — Interview approach and Time Investment Principle

### Read On Demand
During specific steps, read as needed:
- Individual template sections when filling them (read section guidelines before interviewing)

---

## Workflow Steps

### Step 0: Preparation

**Objective:** Understand the template structure and interview approach before beginning.

**LLM Actions:**
- Read complete `workflow-blueprint-template.md`
- Review all 7 template sections and their guidelines
- Read `ai-interview-guidelines.mdc`
- Understand the Time Investment Principle and Gradual Discovery approach

**No gate — proceed to Step 1**

---

### Step 1: Introduction

**Objective:** Orient the user and set expectations.

**LLM Actions:**
1. Explain what this workflow will accomplish: "We're going to design a workflow together. I'll interview you section by section to understand what you need, and we'll produce a blueprint document."
2. Explain how it works: "I'll ask questions, you answer. At 3 checkpoints, I'll summarize what we've captured and you'll approve before we continue."
3. Set expectations: "This usually takes 30-45 minutes. You don't need everything figured out — we'll work through it together."
4. Ask: "Ready to begin?"

**Guidelines:**
- Keep explanation concise
- Make sure user understands they'll approve at checkpoints
- Set collaborative tone

**No gate — continue when user confirms**

---

### Step 2: Workflow Readiness Check

**Objective:** Determine if this should even be a workflow right now.

**LLM Actions:**

Before investing time in designing a workflow, challenge whether it's the right move.

**Questions to explore:**

1. **Frequency Check:**
   - "How often does this task/process happen?"
   - "Is this something that occurs regularly, or is it occasional?"
   - If occasional (less than a few times per month): Consider whether formalizing it is worth the effort.

2. **Understanding Check:**
   - "Have you done this task manually before? How many times?"
   - "Do you feel you understand the process well, or are you still figuring it out?"
   - If still figuring it out: Recommend doing it manually 2-3 more times first.

3. **Stability Check:**
   - "Is the process stable, or is it likely to change significantly soon?"
   - If in flux: Consider waiting until it stabilizes.

**Decision Point:**
- If all checks pass → Proceed to Step 3
- If any check fails → Explain why and recommend alternative:
  - "Based on what you've shared, I'd suggest doing this manually a few more times before creating a workflow. This will help solidify the process. Want to proceed anyway, or revisit later?"

**Guidelines:**
- Be direct about concerns — don't let users create workflows for processes they don't understand
- This is a go/no-go decision, not a gate

**No gate — this is a go/no-go decision. If proceeding, continue to Step 3.**

---

### Step 3: Problem & Goal Definition

**Template Sections:** 1 (Why This Workflow Exists), 2 (Audience & Usage)

**Objective:** Establish the foundation — why this workflow exists, what problem it solves, and who it's for.

**Follow the 5-phase pattern above.**

**LLM Actions:**

**Problem Statement:**
- "What problem are you trying to solve with this workflow?"
- "What happens today without this workflow? What goes wrong?"
- "What pain points or inefficiencies exist?"
- Push for specificity: "Can you give me a concrete example of when this problem occurs?"

**Desired End State:**
- "When this workflow is executed well, what does success look like?"
- "What outcome are you hoping to achieve?"
- Focus on outcome, not process: "Describe the end result, not how you get there."

**Philosophy (optional):**
- "Is there a deeper belief or value driving this workflow?"
- "Why does this matter beyond just solving the immediate problem?"
- If user doesn't have a strong answer, skip — this is optional.

**Audience:**
- "Who will use this workflow?"
- "What role or function are they in?"

**When to Use:**
- "In what situations should someone reach for this workflow?"
- "When should they NOT use it?"

**Key Topics to Cover:**
- Problem statement (2-4 sentences)
- Desired end state (1-2 sentences, outcome-focused)
- Philosophy (optional)
- Target audience
- When to use / when not to use

**Guidelines:**
- Problem statement should be specific with concrete examples
- End state must be outcome-focused, not process-focused
- Validate against template guidelines before presenting

**Quality Check:**
- [ ] Problem is specific with concrete example
- [ ] End state is outcome-focused (not process description)
- [ ] Audience is clearly defined
- [ ] When to use / when not to use is clear

---

### Step 4: Gate 1 — Problem & Goal Approval

**Objective:** Get user approval on the foundation before proceeding.

**LLM Actions:**
1. Present structured summary:
   - Problem statement
   - Desired end state
   - Philosophy (if included)
   - Audience & usage
   - Workflow readiness confirmation
2. Note quality levels for each item
3. Ask: "Does this capture why this workflow exists and who it's for? Anything to revise?"

**Gate:** User confirms sections 1-2 are complete and accurate

---

### Step 5: Output Definition

**Objective:** Define what this workflow produces BEFORE designing how it works.

**LLM Actions:**

This is the critical step. The phases of a workflow exist to create outputs. You must be clear on what those outputs are first.

**Primary Output:**
- "When this workflow is complete, what artifact or outcome exists that didn't exist before?"
- "Is there a document, decision, deliverable, or state change?"
- "Be specific — what exactly gets produced?"

**Output Characteristics:**
- "What format is this output? (document, decision, configured system, etc.)"
- "What must this output contain to be useful?"
- "Who uses this output and for what?"

**Secondary Outputs (if any):**
- "Does this workflow produce anything else along the way?"
- "Are there intermediate artifacts that have standalone value?"

**Output Template (if applicable):**
- "Should we design a template for this output?"
- "Does a template already exist that this workflow fills?"

**Key Topics to Cover:**
- Primary output (specific artifact or outcome)
- Output format and contents
- Who uses it and for what
- Secondary outputs (if any)
- Template needs

**Guidelines:**
- Capture output definition clearly — this drives phase architecture
- Push for specificity: "A document" is not enough; "A competitive analysis document with sections X, Y, Z" is better

**Quality Check:**
- [ ] Primary output is specific and concrete
- [ ] Output contents are defined
- [ ] Clear who uses the output and for what

**No gate — continue to Step 6**

---

### Step 6: Phase Architecture

**Template Section:** 5 (Phase Architecture)

**Objective:** Design the phases that create the outputs defined in Step 5, working backwards from the end.

**Follow the 5-phase pattern above.**

**LLM Actions:**

**Start from the end:**
- "To produce [output from Step 5], what's the last thing that needs to happen?"
- "What must be true right before the output is created?"

**Work backwards:**
- "Before that can happen, what needs to be in place?"
- "What's the prerequisite for that step?"
- Continue until you reach the starting point.

**For each phase identified:**
- "What is the ONE goal of this phase?" (If multiple goals emerge, discuss splitting)
- "What does this phase need as input?"
- "What does this phase produce as output?"
- "Is this output intermediate (feeds next phase) or an artifact (standalone value)?"
- "Any special considerations or common mistakes for this phase?"

**Coherence Check:**
- "Let's trace the flow: Phase 1 produces X, which feeds into Phase 2 as input..."
- "Does anything get lost between phases?"
- "Is there any context that needs to carry forward?"

**Key Topics to Cover:**
- Each phase with goal, input, output
- Output type per phase (intermediate vs. artifact)
- Coherence map (how phases connect)
- Handoff requirements

**Guidelines:**
- Each phase must have exactly ONE goal
- If a phase has multiple goals, split it
- Aim for phases that are the smallest unit of meaningful progress
- Document the coherence map explicitly

**Quality Check:**
- [ ] Each phase has single goal
- [ ] Each phase has clear input and output
- [ ] Output types identified (intermediate vs. artifact)
- [ ] Coherence map shows how phases connect
- [ ] No context lost between phases

**No gate — continue to Step 7**

---

### Step 7: Guiding Principles & Pitfalls

**Template Sections:** 3 (Guiding Principles), 4 (Pitfalls to Avoid)

**Objective:** Capture the principles this workflow must uphold and the failure modes it must guard against.

**Follow the 5-phase pattern above.**

**LLM Actions:**

**Guiding Principles:**
- "What principles must this workflow uphold?"
- "What beliefs should guide how someone executes this?"
- "If someone new used this workflow, what do you want them to keep in mind?"

For each principle:
- "Why does this principle matter?"
- "How should it show up in the workflow execution?"

**Pitfalls to Avoid:**
- "What are the most common ways this could go wrong?"
- "What mistakes have you seen (or made) when doing this?"
- "What would you warn someone about?"

For each pitfall:
- "Why is this dangerous? What happens if it occurs?"
- "How should the workflow prevent it?"

**Key Topics to Cover:**
- Up to 3 guiding principles
- Up to 3 pitfalls to avoid
- Reasoning for each

**Guidelines:**
- Keep to 2-3 lines per principle/pitfall
- Up to 3 of each (focus on what truly matters)
- Include reasoning ("because...")

**Quality Check:**
- [ ] Up to 3 principles, each 2-3 lines
- [ ] Up to 3 pitfalls, each 2-3 lines
- [ ] Each includes reasoning

**No gate — continue to Step 8**

---

### Step 8: Design Decisions & Success Criteria

**Template Sections:** 6 (Design Decisions), 7 (Success Criteria)

**Objective:** Make implementation choices and define success.

**Follow the 5-phase pattern above.**

**LLM Actions:**

**Workflow Structure:**
- "Based on these [N] phases, should this be a single file or multiple files?"
- "Are any phases complex enough to warrant their own file?"

If multi-file:
- "Which phases belong in which file?"
- "Where's the cutoff between files and why?"

**Phase Configuration:**
For each phase:
- "Should Phase [N] be interview-based or input-based?"
- "Should there be a gate after Phase [N]?"
- "Why this choice?"

**Gating Strategy:**
- "Where are the critical decision points?"
- "Where would a user want to review before proceeding?"
- Guide: Aim for 3-5 gates total.

**Tools (if applicable):**
- "Does any phase require external tools, APIs, or MCPs?"

**Success Criteria:**
- "How will you know this workflow succeeded?"
- "What must be true when it's complete?"
- Push for measurables: "Can you verify that with a yes/no check?"

**Key Topics to Cover:**
- Single vs. multi-file decision
- Phase configuration table (input method, gated, rationale)
- Gating summary
- Tools (if applicable)
- 4-7 success criteria

**Guidelines:**
- Every decision needs rationale
- Aim for 3-5 gates total
- Success criteria must be verifiable (yes/no)

**Quality Check:**
- [ ] Workflow structure decision with rationale
- [ ] Phase configuration complete for all phases
- [ ] 3-5 gates with reasoning
- [ ] 4-7 success criteria, all verifiable

---

### Step 9: Gate 2 — Architecture & Design Approval

**Objective:** Get user approval on the architecture and design before finalizing.

**LLM Actions:**
1. Present structured summary:
   - Output definition
   - Phase architecture overview with coherence map
   - Guiding principles (up to 3)
   - Pitfalls to avoid (up to 3)
   - Design decisions summary table
   - Success criteria list
2. Note quality levels for each item
3. Ask: "Does this capture the structure and design of the workflow? Anything to revise?"

**Gate:** User confirms sections 3-7 are complete and accurate

---

### Step 10: Quality Assurance

**Objective:** Validate the complete blueprint before finalizing.

**LLM Actions:**

**Part A: Cross-Section Coherence Check**
- Does the phase architecture actually solve the problem statement?
- Do the design decisions make sense given the phases?
- Do the pitfalls have corresponding safeguards in the phases?
- Do the success criteria align with the desired end state?

**Part B: Completeness Check**
- All 7 template sections filled
- All guidelines followed (line limits, counts, format)
- Workflow Readiness Check confirmed

**Part C: Quality Validation**
- [ ] Problem is specific and outcome-focused
- [ ] Output is clearly defined
- [ ] Phases connect logically (coherence map verified)
- [ ] Principles and pitfalls are actionable
- [ ] Design decisions include rationale
- [ ] Success criteria are verifiable

**Guidelines:**
- Be thorough — this is the last check before finalizing
- Flag any issues for user decision
- Note any TBD items or open questions

**No gate — proceed to Step 11**

---

### Step 11: Review & Finalize

**Objective:** Compile everything and get final approval.

**LLM Actions:**
1. Compile all approved sections into `[workflow-name]-blueprint.md`
2. Add metadata (name, created by, date)
3. Present complete blueprint summary to user
4. Note any TBD items or open questions
5. Ask: "This is the complete blueprint. Does it accurately capture the design for this workflow? Ready to proceed to workflow creation?"

**Gate:** User approves final blueprint

---

## Output Specification

### File Naming
- Format: `[workflow-name]-blueprint.md`
- Example: `competitor-analysis-blueprint.md`

### Location
User-specified directory: _______

### Contents
- Complete blueprint following `workflow-blueprint-template.md`
- All 7 sections filled with appropriate content
- Metadata (name, created by, date)

### Handoff
This blueprint serves as the primary input to **Workflow Creation** (`workflow-creation.md`). The blueprint contains everything needed to write the actual workflow without additional discovery.

---

## Success Criteria

This workflow succeeds when:
- [ ] **Readiness verified:** Workflow Readiness Check passed before proceeding
- [ ] **Problem clarity:** Problem and desired end state are specific and outcome-focused
- [ ] **Output-first design:** Phases were designed working backwards from the defined output
- [ ] **Coherent architecture:** Phases connect logically (verified via Coherence Map)
- [ ] **Principles captured:** Up to 3 guiding principles, each 2-3 lines
- [ ] **Pitfalls captured:** Up to 3 pitfalls with prevention strategies, each 2-3 lines
- [ ] **Design decisions reasoned:** All choices include rationale
- [ ] **Complete documentation:** All 7 template sections filled per guidelines
- [ ] **User approved:** All 3 gates passed with explicit approval

---

## Next Steps

After completing this workflow, proceed to:

**Workflow Creation** (`workflow-creation.md`) — Takes this blueprint and produces the actual workflow document using `workflow-template.md`.
