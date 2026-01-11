# Scheduling Intelligence Agent: V0 to V1 Changes

## Overview

**V1.1 Release Date:** January 11, 2026

**Purpose:** Align agent specification with updated `agent-spec-template.md` structure and new Agent Characteristics framework.

---

## Summary of Changes

### 1. **Metadata Update (Section 1)**
- Version: v1.0 → v1.1
- Last Updated: January 6, 2026 → January 11, 2026

---

### 2. **Key Assumptions Relocated (Section 2 → Section 3)**

**What Changed:** Moved "Key Assumptions" subsection from Section 2 (Product Context) to Section 3 (Agent Definition)

**Why:** Updated template specifies Key Assumptions belong in Agent Definition, not Product Context

**Location:**
- V0: Section 2, lines 90-98
- V1: Section 3, after "Success Criteria"

---

### 3. **Terminology Update (Section 2)**

**What Changed:** "Constraints" → "Product-Level Constraints"

**Why:** Template specifies more precise terminology

---

### 4. **Autonomy Level Added (Section 4)**

**What Changed:** Added explicit "Autonomy Level" subsection to Agent Operating Model

**New Content:**
- **Autonomy Level:** Hybrid Autonomy
- **Autonomous operation:** Happy path coordination, all assessments, routine actions
- **Preview-then-confirm:** Non-happy-path decisions, escalations, strategic changes
- **Rationale:** Explains why this autonomy structure supports the agent's mission

**Why:** Updated template requires explicit autonomy level specification as core Operating Model component

**Location:** V1 Section 4, after "Timing & Latency"

---

### 5. **Disclosure Guardrails Added (Section 8)**

**What Changed:** Added new "Disclosure Guardrails" subsection to Boundary Conditions

**New Content:**
- What must never be revealed or exposed
- Guidelines for handling sensitive data in reasons
- Attendee email content protection
- Cross-attendee information isolation
- Firm internal process confidentiality

**Why:** Updated template requires explicit disclosure guardrails as distinct boundary condition

**Location:** V1 Section 8, after "Scope Limits"

---

### 6. **Graceful Degradation Expanded (Section 9)**

**What Changed:** Expanded "Failure Modes & Graceful Degradation" with explicit fallback defaults

**New Content Added:**
- **Fallback Defaults When Normal Logic Doesn't Apply:**
  1. Attendee score unclear → 50% + explanation
  2. Attendee next action ambiguous → Reply.clarify, then Escalate.internal
  3. Event next action unclear → Stay in "collecting_responses"
  4. Follow-up timing unclear → Standard 3-4 day spacing
  5. Engagement level unclear → Default to "Medium"
- Rationale explaining default priorities

**Why:** Updated template explicitly requires "including fallback defaults" for graceful degradation scenarios

**Location:** V1 Section 9, expanded subsection

---

### 7. **Agent Characteristics Complete Restructure (Section 10)**

**What Changed:** Completely replaced old 5-dimension framework with new 7-dimension framework

**Old Framework (V0):**
- Sensitivity (High/Medium/Low)
- Autonomy (High/Medium/Low)
- Exposure (Internal/External)
- Reversibility (categories)
- Blast Radius (categories)

**New Framework (V1):**

**Core Characteristics (5 level-based dimensions):**
1. **Reasoning Depth:** Significant
2. **Action Scope:** Broad (updated from initial "Moderate" assessment)
3. **Consequence Severity:** Moderate
4. **Recovery Difficulty:** Hard
5. **Data Sensitivity:** Personal

**Profiles (2 selection-based dimensions):**
6. **Risk Profile:** Decision (single selection)
7. **Excellence Profile:** Accuracy + Empathy (dual selection)

**Why:** Updated template uses completely new characteristic framework that better informs system prompt design, guardrails, and operational requirements

**Key Assessment Changes:**
- **Action Scope:** Assessed as "Broad" (not "Moderate") due to 8 distinct output types with significant discretion
- **Risk Profile:** Simplified to "Decision" only (removed "Communication") because agent makes decisions but doesn't communicate directly
- **Excellence Profile:** Explicitly identified Accuracy and Empathy as the two key quality dimensions

**Location:** V1 Section 10, complete rewrite

---

## Unchanged Sections

The following sections remained substantively unchanged:
- Section 1: Agent Overview (except version/date metadata)
- Section 2: Product Context (except Key Assumptions moved out and terminology update)
- Section 5: Available Tools
- Section 6: Behavior Requirements
- Section 7: Input/Output Specification
- Appendix: Complete Action Reference

Core decision logic, behavior requirements, and operational specifications remain identical between V0 and V1.

---

## Impact Assessment

### High Impact Changes:
- **Section 10 restructure:** Fundamentally changes how agent characteristics are assessed and documented
- **Autonomy Level addition:** Explicitly codifies what was previously implicit
- **Fallback defaults:** Provides concrete guidance for ambiguous situations

### Medium Impact Changes:
- **Disclosure Guardrails:** Formalizes existing confidentiality principles
- **Key Assumptions relocation:** Organizational only, content unchanged

### Low Impact Changes:
- **Terminology updates:** Clarifications only
- **Metadata updates:** Version tracking

---

## Next Steps

1. **System Prompt Update:** Review and update system prompt to reflect new Agent Characteristics framework
2. **Testing:** Validate that fallback defaults work as intended in ambiguous scenarios
3. **Documentation:** Update any related documentation referencing the old characteristic dimensions

---

## Files

- **V0:** `V0/agent-spec-scheduling-intelligence-agent-v0.md`
- **V1:** `V1/agent-spec-scheduling-intelligence-agent-v1.md`
- **Changes:** This file

