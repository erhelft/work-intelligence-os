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
- Guiding principles and pitfalls to avoid (the foundation)
- What the workflow produces (and whether a template is needed)
- The phases and how they connect
- Design decisions with reasoning
- Success criteria

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

**Gating:** 3 gates total — after Steps 5, 9, and 12

---

## LLM Instructions

### Your Role
Interviewer and guide — help the user design their workflow through structured questions.

### Your Goal
Help the user produce a complete, well-reasoned workflow blueprint that they can use to create an effective workflow.

### Critical Principle
**Principles first, then structure.** After understanding the problem, capture the guiding principles early — they inform all downstream design decisions. Then define what the workflow produces, and finally design the phases to achieve it. Help the user understand if they need a template (for structured outputs) or just a workflow (for synthesis/analysis).

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
- Capture principles early — they guide all downstream design
- Guide user to think about outputs before phases

**Don't:**
- Accept vague answers for high-importance topics
- Frame answers in terms of process artifacts or pipeline context — stay focused on essence (the task itself, the user's actual situation, the real problem)
- Skip the readiness check
- Rush through principles and pitfalls — they're foundational
- Design phases before outputs are clear
- Ask the user to explain how the workflow works — you're the guide, propose and confirm

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

**No gate — continue to Step 4**

---

### Step 4: Guiding Principles & Pitfalls

**Template Sections:** 3 (Guiding Principles), 4 (Pitfalls to Avoid)

**Objective:** Capture the foundational beliefs and failure modes BEFORE designing the workflow structure. Principles guide all downstream design decisions.

**Follow the 5-phase pattern above.**

**LLM Actions:**

**Transition:**
"Now that we understand the problem and who this is for, let's capture the principles that should guide this workflow. These are the beliefs that will shape how we design everything else."

**Guiding Principles:**
- "Who else is affected by this process beyond the person executing it?"
- "What values should this process emphasize? (e.g., thoroughness vs. speed, consistency vs. flexibility, autonomy vs. standardization)"
- "Are there collaboration or handoff dynamics to consider?"
- "What are the ripple effects if this is done poorly?"

For each principle identified:
- "Why does this matter for the process?"
- "How should it shape the way someone approaches this work?"

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
- These principles will inform output design and phase architecture

**Quality Check:**
- [ ] Up to 3 principles, each 2-3 lines
- [ ] Up to 3 pitfalls, each 2-3 lines
- [ ] Each includes reasoning

---

### Step 5: Gate 1 — Foundation Approval

**Objective:** Get user approval on the foundation (problem, audience, principles, pitfalls) before designing the workflow structure.

**LLM Actions:**
1. Present structured summary:
   - Problem statement
   - Desired end state
   - Philosophy (if included)
   - Audience & usage
   - Workflow readiness confirmation
   - Guiding principles (up to 3)
   - Pitfalls to avoid (up to 3)
2. Note quality levels for each item
3. Ask: "Does this capture the foundation — why this workflow exists, who it's for, and the principles that will guide it? Anything to revise?"

**Gate:** User confirms Sections 1-4 are complete and accurate

---

### Step 6: Output Definition

**Objective:** Define what this workflow produces BEFORE designing how it works.

**LLM Actions:**

**Identify the output:**
- "What artifact exists when this workflow is complete?"
- "Be specific — what kind of document/deliverable is it?"
- "Who uses this output and for what?"

**Guide toward understanding the full picture:**

Many workflows actually produce TWO outputs:
1. **A template** — the structure of the output (what sections, what format)
2. **A workflow** — the process to fill that structure

Help the user recognize if their workflow needs both:
- "Does this output have a consistent structure that should be templated?"
- "Or is this more like synthesis/analysis where the output varies each time?"

**If template applies:**
- "So we'll be creating both a template and a workflow. The template defines the structure; the workflow guides filling it."

**If no template needed:**
- "This sounds like pure synthesis/analysis — no fixed structure. We'll focus on the workflow phases."

**Key Topics to Cover:**
- Output explicitly named and described
- Whether template is needed (or just workflow)
- Who uses the output

**Guidelines:**
- Let the user explain what they want — guide them toward the template/workflow distinction if needed
- Don't force a template where it doesn't fit (analysis, synthesis, decisions often don't need one)
- Reference the principles from Step 4 — how should the output embody them?

**Quality Check:**
- [ ] Output explicitly named
- [ ] Template need determined (yes/no)
- [ ] Clear who uses the output

**No gate — continue to Step 7**

---

### Step 7: Phase Architecture

**Template Section:** 5 (Phase Architecture)

**Objective:** Design the phases that create the output defined in Step 6.

**Follow the 5-phase pattern above.**

**LLM Actions:**

**Identify phases:**
- "What phases does this workflow need to produce [the output]?"
- "Think about it step by step — what happens first? Then what?"

**For each phase identified:**
- "What is the ONE goal of this phase?" (If multiple goals emerge, discuss splitting)
- "What does this phase need as input?"
- "What does this phase produce as output?"
- "Is this output intermediate (feeds next phase) or an artifact (standalone value)?"
- "Any special considerations or common mistakes for this phase?"

**Coherence check:**
- "Let's trace the flow: Phase 1 produces X, which feeds into Phase 2..."
- "Does anything get lost between phases?"
- "Does this fully produce the output we defined?"

**Handoff verification:**
- "What should be checked to ensure nothing is lost between phases?"
- "What context must carry forward?"

**Key Topics to Cover:**
- Each phase with goal, input, output
- Output type per phase (intermediate vs. artifact)
- Coherence map (how phases connect)
- Handoff verification

**Guidelines:**
- Each phase must have exactly ONE goal
- If a phase has multiple goals, split it
- Phases should be the smallest unit of meaningful progress
- Reference principles from Step 4 — do the phases embody them?

**Quality Check:**
- [ ] Each phase has single goal
- [ ] Each phase has clear input and output
- [ ] Output types identified (intermediate vs. artifact)
- [ ] Phases connect logically to produce the final output
- [ ] Handoff verification defined

**No gate — continue to Step 8**

---

### Step 8: Design Decisions

**Template Section:** 6 (Design Decisions)

**Objective:** Capture high-level implementation choices for the workflow.

**Follow the 5-phase pattern above.**

**LLM Actions:**

**Workflow Structure:**
- "Should this be a single workflow file, or split across multiple files?"
- "What's your reasoning?" (Complexity, phase independence, reusability)

**File Structure (if multi-file):**
- "Which phases belong together in each file?"
- "Where should the split happen and why?"

**Phase Configuration:**
For each phase identified in Step 7:
- "Should this phase use interview (LLM asks questions) or input-based (user provides structured input)?"
- "Should this phase have a gate (user approval checkpoint) after it?"
- "Why?"

**Gating Strategy:**
- "Looking at your gates, do you have 3-5 total?" (Guide if too few or too many)
- "What's the overall reasoning for where you placed gates?"

**Tools Required:**
- "Does any phase require external tools or APIs?"
- If yes: "Which phase, what tool, what purpose?"

**Key Topics to Cover:**
- Single vs. multi-file decision with reasoning
- File structure if multi-file
- Input method per phase (interview/input-based)
- Gate placement per phase
- Tools if applicable

**Guidelines:**
- Every decision must include reasoning
- Gating should be at decision points, not after every action (aim for 3-5 gates total)

**Quality Check:**
- [ ] Workflow structure decided with reasoning
- [ ] Each phase has input method specified
- [ ] Gates placed at decision points (3-5 total)
- [ ] Tools documented if needed

**No gate — continue to Step 9**

---

### Step 9: Gate 2 — Architecture & Design Approval

**Objective:** Get user approval on the architecture and design before finalizing.

**LLM Actions:**
1. Present structured summary:
   - Output definition (what the workflow produces, template needed or not)
   - Phase architecture (phases with goals, inputs, outputs, coherence map)
   - Design decisions (structure, phase config, gating)
2. Note quality levels for each item
3. Ask: "Does this capture the architecture and design of the workflow? Anything to revise?"

**Gate:** User confirms Sections 5-6 are complete and accurate

---

### Step 10: Success Criteria

**Template Section:** 7 (Success Criteria)

**Objective:** Define how to know the workflow succeeded.

**Follow the 5-phase pattern above.**

**LLM Actions:**

- "How will you know this workflow worked?"
- "What must be true when it's complete?"
- Push for verifiables: "Can you check that with a yes/no?"

**Validation:**
- "Does at least one criterion address the original problem from Step 3?"
- "Does at least one criterion address usability of the output?"

**Key Topics to Cover:**
- 4-7 verifiable success criteria
- At least one tied to problem statement
- At least one tied to output usability

**Guidelines:**
- Each criterion should be verifiable (you can check yes/no)
- Include both completion checks (did it finish?) and quality checks (did it work well?)

**Quality Check:**
- [ ] 4-7 criteria defined
- [ ] Each is verifiable (yes/no checkable)
- [ ] Problem statement addressed
- [ ] Output usability addressed

**No gate — continue to Step 11**

---

### Step 11: Quality Assurance

**Objective:** Validate the complete blueprint before finalizing.

**LLM Actions:**

Run validation internally across three areas:
1. **Cross-Section Coherence** — Do phases produce the output? Do pitfalls have safeguards? Do success criteria align with end state?
2. **Completeness** — All 7 sections filled? Guidelines followed?
3. **Quality** — Problem specific? Principles actionable? Phases connected? Decisions reasoned?

**Present to user:**
- Brief summary: "QA complete. [X/3] areas passed."
- Only detail issues that need attention (with reasoning)
- If all passes: "No issues found. Ready to finalize."

**Guidelines:**
- Run validation internally — don't show all the checkboxes
- Only surface issues that need user decision
- Keep the summary scannable

**No gate — proceed to Step 12**

---

### Step 12: Review & Finalize

**Objective:** Output the complete blueprint document.

**LLM Actions:**
1. Compile all approved sections into `blueprint-for-[workflow-name].md`:
   - Section 1: Why This Workflow Exists
   - Section 2: Audience & Usage
   - Section 3: Guiding Principles
   - Section 4: Pitfalls to Avoid
   - Section 5: Phase Architecture
   - Section 6: Design Decisions
   - Section 7: Success Criteria
   - Metadata (name, created by, date)
2. **Output the complete blueprint document** — present the full content or write to file
3. Note any TBD items or open questions
4. Ask: "Here is your complete blueprint. Please save it to `blueprint-for-[workflow-name].md`. Does it accurately capture the design?"

**Critical:** The primary deliverable is the blueprint document itself. Do NOT skip to "next steps" without first outputting the actual blueprint.

**Gate 3:** User confirms blueprint is saved and accurate

**After approval, mention:**
"When you're ready to create the workflow from this blueprint, use the Workflow Creation workflow (`workflow-creation.md`)."

---

## Output Specification

### File Naming
- Format: `blueprint-for-[workflow-name].md`


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
- [ ] **Output defined:** Clear what the workflow produces (and whether template needed)
- [ ] **Phases designed:** Each phase has single goal, clear input/output
- [ ] **Coherent architecture:** Phases connect logically to produce the output
- [ ] **Principles captured:** Up to 3 guiding principles, each 2-3 lines
- [ ] **Pitfalls captured:** Up to 3 pitfalls with prevention strategies, each 2-3 lines
- [ ] **Design decisions reasoned:** All choices include rationale
- [ ] **User approved:** All 3 gates passed with explicit approval

---

## Next Steps

After completing this workflow, proceed to:

**Workflow Creation** (`workflow-creation.md`) — Takes this blueprint and produces the actual workflow document using `workflow-template.md`.
