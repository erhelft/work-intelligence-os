# Workflow Blueprint Template

## Overview

This template captures the design and reasoning behind a workflow before it's written. The blueprint serves as permanent documentation alongside the workflow itself — the "why" to the workflow's "how."

**Key Principle:** Workflows create culture. They tell people how to work and what to emphasize. The blueprint captures the thinking that shapes that culture.

---

## Template Usage

Each section below contains:
- **What to Include** — describes what goes in this section
- **Guidelines** — rules for how to fill it well
- **Content** — where the actual blueprint content goes

When filling this template, work through sections in order. The workflow that creates this blueprint will guide you through each section with interview questions and validation.

---

## 1. Why This Workflow Exists

### What to Include
The core reasoning behind this workflow — the problem it solves, the outcome it enables, and optionally the deeper philosophy that informs it.

### Guidelines
- Problem Statement: 2-4 sentences describing what goes wrong without this workflow
- Desired End State: 1-2 sentences describing success (outcome-focused, not process-focused)
- Philosophy: Optional. Only include if there's a meaningful belief or value driving this workflow beyond the immediate problem

### Content

**Problem Statement:**
[What problem does this workflow solve? What happens without it?]

**Desired End State:**
[What does success look like when this workflow is executed well?]

**Philosophy:** *(optional)*
[Why does this matter beyond the immediate problem? What beliefs inform this approach?]

---

## 2. Audience & Usage

### What to Include
Who should use this workflow, when it's appropriate, and whether it should even be a workflow right now.

### Guidelines
- Be specific about roles/functions, not generic ("product managers" not "anyone who needs it")
- "When to use" should describe triggers or situations, not just restate the problem
- "When NOT to use" is equally important — prevents misapplication
- Workflow Readiness Check must be honestly assessed before proceeding

### Content

**Who Should Use This Workflow:**
[Role/function of intended users]

**When to Use This Workflow:**
- Use when: [specific triggers or situations]
- Don't use when: [situations where this isn't appropriate]

**Workflow Readiness Check:**
Before creating this workflow, confirm:
- [ ] This task happens frequently enough to formalize (more than occasional)
- [ ] We understand this area well enough (done manually at least 2-3 times)
- [ ] The process is stable enough to standardize (not still in flux)

---

## 3. Guiding Principles

### What to Include
The principles this workflow must uphold — what we believe and how it shows up in execution.

### Guidelines
- 2-3 lines maximum per principle
- Format: What the principle is → Why it matters → How it manifests in the workflow
- Up to 3 principles total (focus on what truly matters)
- Write as narrative prose, not bullet fragments

### Content

[Write each principle as a short paragraph. Example format:]

> **[Principle Name]:** [What this principle means and why it matters]. In practice, this means [how it shows up in the workflow execution].

**Principles:**

[Principle 1]

[Principle 2]

[Principle 3]

---

## 4. Pitfalls to Avoid

### What to Include
What this workflow must guard against — the failure modes, bad patterns, and common mistakes.

### Guidelines
- 2-3 lines maximum per pitfall
- Format: What the pitfall is → Why it's dangerous → How the workflow prevents it
- Up to 3 pitfalls total (focus on the most dangerous failure modes)
- Write as narrative prose, not bullet fragments
- These should inform specific design choices in the workflow

### Content

[Write each pitfall as a short paragraph. Example format:]

> **[Pitfall Name]:** [What this pitfall is and why it's dangerous]. This workflow guards against this by [specific safeguard or design choice].

**Pitfalls:**

[Pitfall 1]

[Pitfall 2]

[Pitfall 3]

---

## 5. Phase Architecture

### What to Include
The logical structure of the workflow — how many phases, what each accomplishes, and how they connect.

### Guidelines
- Start by defining the final output, then work backwards to determine phases
- Each phase must have exactly ONE goal — if you have multiple goals, split into separate phases
- Consider carefully when splitting is required: a phase should be the smallest unit that produces meaningful progress
- Outputs should be specific and concrete, not vague ("draft document" not "progress")
- Clarify output type: **Intermediate** (feeds into next phase) vs. **Artifact** (standalone value, could be used independently)
- Emphasis/Notes capture what's special about this phase — common mistakes, things to pay attention to
- Coherence Map verifies that phases actually connect (Phase N output → Phase N+1 input)

### Content

**Overview:**
[Brief description: how many phases, what's the journey from start to finish]

---

### Phase 1: [Name]

**Goal:** 
[Why does this phase exist? What must be true when it's complete? ONE goal only.]

**Input:** 
[What does this phase need to start?]

**Output:** 
[What does this phase produce? Be specific — artifact name, format if applicable]

**Output Type:** 
- [ ] Intermediate (feeds into next phase)
- [ ] Artifact (standalone value, usable independently)

**Emphasis / Notes:**
[Special considerations, common mistakes, things to pay extra attention to in this phase]

---

### Phase 2: [Name]

**Goal:** 
[ONE goal only]

**Input:** 
[What does this phase need to start?]

**Output:** 
[What does this phase produce?]

**Output Type:** 
- [ ] Intermediate
- [ ] Artifact

**Emphasis / Notes:**
[Special considerations for this phase]

---

### Phase 3: [Name]
[Add more phases as needed, following the same structure]

---

### Coherence Map

**How phases connect:**

```
Phase 1 output: [specific output]
    ↓ feeds into
Phase 2 input: [what Phase 2 needs from Phase 1]
    ↓ produces
Phase 2 output: [specific output]
    ↓ feeds into
Phase 3 input: [what Phase 3 needs from Phase 2]
    ...
```

**Handoff Verification:**
[What should be checked to ensure nothing is lost between phases? What context must carry forward?]

---

## 6. Design Decisions

### What to Include
Implementation choices for the workflow — structure, input methods, gating, and tools.

### Guidelines
- Every decision must include reasoning (not just the choice)
- Single vs. multi-file depends on phase complexity and whether phases can stand alone
- If multi-file: clearly define which phases live in each file and where the cutoff is
- Input method (interview vs. input-based) depends on what each phase needs
- Gating should be at decision points, not after every action (aim for 3-5 gates total)
- Tools section only needed if workflow requires external tools/APIs

### Content

**Workflow Structure:**
- [ ] Single-file / [ ] Multi-file
- Reasoning: [Why this choice?]

**File Structure:** *(only if multi-file)*
| File | Phases Included | Cutoff Rationale |
|------|-----------------|------------------|
| [file-1.md] | Phases 1-2 | [Why these phases together?] |
| [file-2.md] | Phases 3-4 | [Why the split here?] |

**Phase Configuration:**

| Phase | Input Method | Gated? | Rationale |
|-------|--------------|--------|-----------|
| Phase 1 | Interview / Input-based | Yes / No | [Why this method? Why gate or not?] |
| Phase 2 | Interview / Input-based | Yes / No | [Why?] |
| Phase 3 | Interview / Input-based | Yes / No | [Why?] |

**Gating Summary:**
- Total gates: [X] (aim for 3-5)
- Overall reasoning: [Why this gating strategy?]

**Tools Required:** *(if applicable)*

| Phase | Tool | Purpose |
|-------|------|---------|
| | | |

---

## 7. Success Criteria

### What to Include
How to know the workflow worked — measurable outcomes that indicate success.

### Guidelines
- 4-7 criteria total
- Each criterion should be verifiable (you can check yes/no)
- Include both completion checks (did it finish?) and quality checks (did it work well?)
- At least one criterion should address the original problem statement
- At least one criterion should address usability of the output

### Content

**This workflow succeeds when:**

- [ ] [Criterion 1 — completion/output exists]
- [ ] [Criterion 2 — quality standard met]
- [ ] [Criterion 3 — addresses original problem]
- [ ] [Criterion 4 — output is usable for intended purpose]
- [ ] [Criterion 5]

---

## Blueprint Metadata

**Blueprint Name:** [workflow-name]-blueprint.md

**Workflow Name:** [workflow-name]-workflow.md *(to be created)*

**Created By:** [Name]

**Created Date:** [Date]

**Last Updated:** [Date]

---

## Next Steps

After completing this blueprint:
1. Review all sections for coherence
2. Verify the Coherence Map — do phases actually connect?
3. Proceed to workflow creation using this blueprint as input

