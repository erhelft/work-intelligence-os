# Workflow Creation Blueprint

## 1. Why This Workflow Exists

**Problem Statement:**
Without a clear process for creating workflows:
- Time is wasted re-inventing the wheel when design is already known
- Critical areas get missed because you're working from memory each time
- Inconsistent workflows create learning curves and slow everyone down

**Desired End State:**
Deep thinking happens in the blueprint. Workflow creation is mechanical translation that works out of the box with an optimal output. No re-thinking required.

**Philosophy:**
- **Speed:** Infrastructure investment that compounds — first workflow took hours and was mediocre. Not again.
- **Culture:** Workflows shape how the company operates. This is a critical control point for values.

---

## 2. Audience & Usage

**Who Should Use This Workflow:**
Anyone in the company who works on a repeatable task and wants to standardize it via workflow.

**When to Use This Workflow:**
- Use when: You want to create a workflow to standardize a repeatable, valuable process
- Use when: The design decisions are already made

**When NOT to Use:**
- Don't use when: The task is a one-off
- Don't use when: You haven't figured out the design yet
- Don't use when: The process isn't stable enough to standardize

**Workflow Readiness Check:** ✓ Passed

---

## 3. Guiding Principles

**Consistency:** Workflows should be consistent so learning one = learning the system. Template structure is constant; room for variations/modularity at the end.

**Balancing simplicity and comprehensiveness:** This is meta-work affecting many people. When in doubt, lean simple.

**Testable:** Good outputs come through iterations, testing, and learning. Workflows must support that cycle.

---

## 4. Pitfalls to Avoid

**Creating workflows that shouldn't exist:** Not understood well enough, or not frequent/valuable enough to justify. The readiness check guards against this.

**Overly complicated:** Split where needed, focus on essence only. The simplicity principle guides design decisions.

**Not inclusive:** If inputs from others are required, bring them in. LLMs don't replace human collaboration and judgment. Gates ensure human review.

---

## 5. Phase Architecture

**Overview:** 7 phases that progressively build the workflow document from blueprint input.

---

### Phase 1: Goal, Success & Output

**Goal:** Establish what this workflow achieves and how we'll know it worked

**Input:** Blueprint §1-2 (Why This Workflow Exists, Audience & Usage)

**Output:** Filled Purpose, Goal, Success Criteria, Output Specification sections

**Output Type:** Intermediate

---

### Phase 2: Prerequisites

**Goal:** Identify required docs, templates, support materials

**Input:** Blueprint §6 (Design Decisions — Prerequisites)

**Output:** Prerequisites & Setup section

**Output Type:** Intermediate

---

### Phase 3: Workflow Process

**Goal:** Define how workflow operates

**Input:** Blueprint §6 (Design Decisions)

**Output:** Workflow Process, For Humans sections

**Output Type:** Intermediate

---

### Phase 4: LLM Instructions

**Goal:** Define LLM role, boundaries

**Input:** Blueprint §3-4 (Guiding Principles, Pitfalls to Avoid)

**Output:** LLM Instructions section

**Output Type:** Intermediate

---

### Phase 5: Step Structure

**Goal:** High-level step outline

**Input:** Blueprint §5 (Phase Architecture)

**Output:** Step titles, objectives

**Output Type:** Intermediate

---

### Phase 6: Step Details

**Goal:** Flesh out each step with topics, guidelines, gates

**Input:** Step Structure + Blueprint

**Output:** Complete Workflow Steps

**Output Type:** Intermediate

---

### Phase 7: Quality Check

**Goal:** Validate against quality criteria

**Input:** Complete draft

**Output:** Final validated workflow

**Output Type:** Artifact

---

### Coherence Map

```
Blueprint → Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 → Phase 6 → Phase 7 → Final Workflow
```

**Handoff Verification:** Each phase builds on previous outputs. Blueprint is referenced throughout. Final output is a complete workflow document.

---

## 6. Design Decisions

**Workflow Structure:** Single-file
- Reasoning: 7 phases build sequentially toward one output; no natural split point.

**Phase Configuration:**

| Phase | Input Method | Gated? | Rationale |
|-------|-------------|--------|-----------|
| 1. Goal, Success & Output | Draft and check | **Yes** | Foundation — confirm before building |
| 2. Prerequisites | Draft directly | No | Straightforward extraction |
| 3. Workflow Process | Draft and check | No | Gated with Phase 4 |
| 4. LLM Instructions | Draft and check | **Yes** | Process + Instructions as a unit |
| 5. Step Structure | Draft and check | **Yes** | High-level structure before details |
| 6. Step Details | Draft directly | No | Expansion of approved structure |
| 7. Quality Check | N/A | **Yes** | Final approval |

**Gating Summary:**
- Total gates: 4
- Gate 1: After Phase 1 (Foundation)
- Gate 2: After Phase 4 (Process + Instructions)
- Gate 3: After Phase 5 (Step Structure)
- Gate 4: After Phase 7 (Final)

**Prerequisites:**

| Prerequisite | Why Needed |
|--------------|------------|
| Completed blueprint | Contains all design decisions to translate |
| `workflow-template.md` | Structure for the output |

**Tools Required:** None

---

## 7. Success Criteria

This workflow succeeds when:
1. **Delivers results** — When someone executes the resulting workflow, it achieves the intended outcome
2. **Minimal iterations** — The workflow doesn't need significant rework after first use
3. **Blueprint fidelity** — All blueprint design decisions are reflected in the workflow
4. **Immediately usable** — The resulting workflow can be executed without additional editing before first use

---

## Blueprint Metadata

**Blueprint Name:** blueprint-for-workflow-creation.md

**Workflow Name:** workflow-creation.md *(to be created)*

**Created By:** Eran Helft

**Created Date:** December 28, 2025

---

## Next Steps

After completing this blueprint:
1. Review all sections for coherence ✓
2. Verify the Coherence Map ✓
3. Proceed to workflow creation using this blueprint as input

