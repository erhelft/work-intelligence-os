# Agent Characteristics Framework: Learning and Changes

## Document Purpose

This document captures our evolving understanding of how to characterize agents and build system prompts. It serves as a living reference for framework improvements based on real agent-building experience.

**Last Updated:** January 8, 2026

**Use this document to:**
- Understand the rationale behind framework changes
- Guide workflow updates when the framework evolves
- Reference when the framework feels unclear or insufficient
- Capture future insights about agent characterization

---

## Table of Contents

1. [Overview](#overview)
2. [Problems with Original Framework](#problems-with-original-framework)
3. [Key Insights and Principles](#key-insights-and-principles)
4. [The New Framework](#the-new-framework)
5. [Application Example: Communication Agent](#application-example-communication-agent)
6. [Implications for Workflows](#implications-for-workflows)
7. [Open Questions](#open-questions)

---

## Overview

### The Challenge

When building AI agents, we need a systematic way to:
1. Characterize the agent's nature (complexity, risks, requirements)
2. Decide how to structure the system prompt (section depths, emphasis areas)
3. Determine where to invest quality effort (guardrails vs. excellence)

The **agent characteristics framework** sits between the agent spec and the system prompt workflow. It provides a standardized classification that informs prompt construction decisions.

### What Changed

We evolved from a **5-characteristic, downside-focused framework** that tended to rate everything as "high" to a **7-dimension framework** that:
- Distinguishes between different types of risk
- Captures upside (excellence) alongside downside (protection)
- Provides actionable guidance for each part of the system prompt
- Uses nuanced levels that actually differentiate agents

---

## Problems with Original Framework

### The Original Five Characteristics

1. **Sensitivity** — What data does it access/handle? (Low / Medium / High / Critical)
2. **Autonomy** — How much can it do without confirmation? (Low / Medium / High)
3. **Exposure** — Who sees its outputs? (Internal / Partner / External)
4. **Reversibility** — How easily can actions be undone? (Easy / Moderate / Hard / Irreversible)
5. **Blast Radius** — If it fails, who/what is affected? (User / Team / Org / External)

### What Went Wrong

#### Problem 1: Everything Landed at "High"

**Real example: Communication Agent**

Initial assessment using old framework:
- **Sensitivity: High** — "Accesses client email addresses and names"
- **Autonomy: High** — "Generates emails without human review"
- **Exposure: External** — "External clients see output"
- **Reversibility: Hard** — "Sent emails can't be unsent"
- **Blast Radius: External** — "Mistakes affect external clients"

**Result:** 5 out of 5 characteristics at maximum or near-maximum levels.

**The problem:** This agent writes emails based on explicit instructions, in a narrow domain, with moderate consequences if it fails. But the framework made it look like a critical, high-risk agent requiring maximum guardrails everywhere.

**Why it happened:** The definitions focused on categories (Has PII? → High Sensitivity) rather than realistic impact (What's the actual harm if mishandled?).

#### Problem 2: Same Thing Measured Multiple Times

Three characteristics all measured variations of "what goes wrong":
- **Sensitivity** → Harm from data mishandling
- **Blast Radius** → Who's affected if it fails
- **Reversibility** → Can you fix mistakes

**Example overlap:** 
- Exposure: External (clients see output)
- Blast Radius: External (clients affected by failures)

For most customer-facing agents, these were always the same. The distinction didn't provide actionable differentiation.

#### Problem 3: Conflated Different Risk Types

**Example:** Two agents both rated "High Sensitivity" for completely different reasons:

| Agent | Why High Sensitivity | What Actually Needs Protection |
|-------|---------------------|-------------------------------|
| Payment Processor | Handles credit card numbers | Hard boundaries on data storage, encryption, logging |
| Communication Agent | Has email addresses | One rule: don't leak cross-attendee data |

**Same characteristic level → Wildly different protection strategies.**

The framework didn't distinguish between:
- **Decision risk** (could make wrong judgment) → needs better reasoning guidance
- **Data risk** (could expose sensitive data) → needs hard boundaries
- **Communication risk** (could say wrong thing) → needs tone guidance

#### Problem 4: No Upside Capture

The framework only asked: **"What could go wrong?"**

It never asked: **"What should this agent be great at?"**

**Impact:** We knew where to protect but not where to invest for excellence. The Communication Agent needs to be great at naturalness and professionalism—but the old framework had no way to capture or prioritize this.

#### Problem 5: Not Connected to Prompt Decisions

**Characteristic:** "Sensitivity: High"

**Now what?** Does this mean:
- Robust Hard Boundaries section?
- Heavy Data Handling guidance?
- Minimal logging?
- Masking in outputs?
- All of the above?

The characteristic didn't point to specific prompt sections or protection strategies.

#### Problem 6: Nested, Fuzzy Definitions

Some proposed fixes involved nested structures:

```
Risk Profile:
  - Decision Risk: High
    - Consequence: Major
    - Type: Wrong judgment
  - Data Risk: Medium
    - Consequence: Moderate
    - Type: Exposure
```

**Problem:** Hierarchical structure made it unclear what we were actually measuring and how to apply it.

---

## Key Insights and Principles

### Insight 1: Characteristics Should Be Derived, Not Descriptive

**Old thinking:** Characteristics describe the agent.
- "This agent has access to PII" → Sensitivity: High

**New thinking:** Characteristics are derived classifications that inform prompt construction.
- "This agent could damage relationships through poor communication" → Risk Profile: Communication

**The difference:** Derived characteristics point to **where to protect and invest**, not just **what the agent touches**.

### Insight 2: Distinguish Risk Type, Not Just Risk Level

**Key realization:** Two agents can have "Major" consequences for different reasons:

| Agent | Why Major | Protection Strategy |
|-------|-----------|-------------------|
| Scheduling Agent | Wrong priority decision | Better Decision Logic, reasoning examples |
| Email Agent | Says something inappropriate | Tone guidance, communication examples |
| Data Agent | Leaks sensitive info | Hard Boundaries, data isolation |

**Principle:** The characteristic should tell us **what type of risk** so we know **which part of the prompt** needs strengthening.

### Insight 3: Capture Upside, Not Just Downside

**Old:** What could go wrong? (protection focus)

**New:** What could go wrong? + What should be great? (protection + excellence)

**Principle:** Every agent needs:
1. **Risk Profile** → Where to protect (downside)
2. **Excellence Profile** → Where to invest (upside)

The Communication Agent needs heavy tone investment not because it's risky, but because naturalness is its key differentiator.

### Insight 4: Flat is Better Than Nested

**Nested structures get fuzzy:**
```
Task Profile:
  - Complexity: High
  - Scope: Broad
  - Performance: Normal
```

**Flat is clear:**
- Reasoning Depth: Significant
- Action Scope: Broad

**Principle:** Each characteristic should measure one clear thing with distinct levels. No sub-components.

### Insight 5: Context ≠ Characteristic

**Not everything is a characteristic.** Some things are context from the spec that the system prompt workflow reads directly.

| Type | Example | Where it Lives |
|------|---------|----------------|
| **Characteristic** | Reasoning Depth: Moderate | Derived during analysis, guides prompt structure |
| **Context** | Audience: External clients | Already in spec (User Visibility), affects tone directly |
| **Decision** | Token budget: 1600 tokens | Decided based on characteristics, not a characteristic itself |

**Principle:** Characteristics are derived classifications that sit between spec and prompt. Don't duplicate what's already in the spec.

### Insight 6: Framework Serves Decisions

**The framework should be organized around decisions we need to make:**

| Decision | What We Need to Know |
|----------|---------------------|
| Model selection | Task complexity, performance requirements |
| Prompt structure | Where does complexity live? |
| Section depths | What needs protection? What needs investment? |
| Guardrails | What's the primary risk type? |
| Quality focus | What should agent be great at? |
| Tone/disclosure | Who's the audience? (from spec) |

**Principle:** Every characteristic should lead to specific, actionable prompt construction decisions.

---

## The New Framework

### Overview

**7 dimensions organized into 3 groups:**

1. **Core Characteristics** (5 level-based dimensions)
2. **Profiles** (2 selection-based dimensions)
3. **Context** (read from spec, not a characteristic)

### Group 1: Core Characteristics (Level-Based)

These are assessed on defined scales and inform structural decisions.

---

#### 1. Reasoning Depth
*How much judgment/interpretation is required?*

| Level | Description | Complexity Type | Decision Logic Section |
|-------|-------------|-----------------|----------------------|
| **Minimal** | Rule-following. Clear inputs → clear outputs. Little interpretation needed. | Simple Tool-Caller | Skip or Minimal |
| **Moderate** | Pattern application. Apply learned patterns to new situations. Some interpretation. | Workflow Executor | Minimal to Standard |
| **Significant** | Judgment calls. Weigh tradeoffs, handle ambiguity, reason about novel cases. | Judgment Agent | Robust |
| **Orchestrating** | Coordinates multiple agents/systems. Meta-level decisions, manages cross-component flow. | Multi-Domain Agent | Robust with coordination guidance |

**Informs:**
- Agent complexity classification
- Decision Logic section depth
- Example count and complexity
- Model selection (significant/orchestrating needs stronger reasoning)

---

#### 2. Action Scope
*How bounded is what the agent can do?*

| Level | Description | Boundaries |
|-------|-------------|------------|
| **Narrow** | One action type, single domain, tight constraints. | Very clear, short |
| **Moderate** | Several action types, defined boundaries, operates in single domain. | Standard boundaries |
| **Broad** | Many action types, significant discretion, operates in single domain. | Detailed boundaries |
| **Cross-Domain** | Operates across multiple domains, coordinates across system boundaries. | Robust boundaries with domain separation |

**Informs:**
- Operational Boundaries section depth
- Risk context (narrow scope = lower risk, can operate with less oversight)
- Complexity of constraints
- Where boundaries need to be drawn

---

#### 3. Consequence Severity
*What's the realistic harm if this agent fails?*

| Level | Description | Examples |
|-------|-------------|----------|
| **Minor** | Inconvenience, confusion. Easily corrected, no lasting impact. | Wrong color in UI, delay in response, typo |
| **Moderate** | Relationship damage, trust impact. Requires apology/remediation. | Confusing client email, awkward communication, minor data exposure |
| **Major** | Reputation harm, customer churn, regulatory attention. Costly to fix. | Pattern of failures damages brand, compliance concern, significant data breach |
| **Severe** | Legal liability, significant financial loss, safety risk. Existential. | Payment errors, safety-critical failures, HIPAA violations |

**Derived from:** Edge cases, failure modes, blast radius from spec

**Informs:**
- Overall guardrail intensity
- Hard Boundaries section depth
- Validation requirements
- Testing rigor

---

#### 4. Recovery Difficulty
*How hard is it to fix mistakes?*

| Level | Description | Examples |
|-------|-------------|----------|
| **Easy** | Undo/retry. No one noticed or minimal impact. | Draft saved, suggestion given, preview shown |
| **Moderate** | Requires follow-up, apology, visible effort. Embarrassing but recoverable. | Send follow-up email, re-send notification, apologize for confusion |
| **Hard** | Damage done. Can only mitigate, not reverse. Significant consequences. | Published content, sent external communication, triggered workflow |
| **Impossible** | Cannot undo. Action is permanent. | Payment processed, file deleted permanently, legal filing submitted |

**Derived from:** Action reversibility, what happens after execution

**Informs:**
- Confirmation/preview requirements
- "Get it right first time" emphasis
- Error handling approach
- Output Format validation needs

---

#### 5. Data Sensitivity
*What data does the agent touch and how careful must we be?*

| Level | Description | Examples | Protection |
|-------|-------------|----------|------------|
| **None/Public** | Public information only. No harm from exposure. | Public API data, marketing content, documentation | No special handling |
| **Internal** | General business data. Leak is embarrassing but not damaging. | Internal wiki, team updates, process docs | Basic disclosure limits |
| **Confidential** | Business-sensitive, competitive, strategic. Leak causes business harm. | Product roadmaps, pricing strategy, M&A plans, trade secrets | Hard Boundaries on disclosure, need-to-know principle |
| **Personal** | PII, customer info, contact details. Leak causes harm to individuals. | Email addresses, names, phone numbers, calendar data | Hard Boundaries on data handling, isolation rules |
| **Regulated** | Legal, financial, health, compliance-bound. Leak has legal consequences. | Medical records, financial accounts, payment info, legal documents | Strict Hard Boundaries, audit logging, confirmation for data actions |

**Derived from:** Input/output specs, what data is accessed

**Informs:**
- Hard Boundaries section content (data handling rules)
- Output Format (masking requirements)
- Logging constraints
- Compliance requirements

---

### Group 2: Profiles (Selection-Based)

These identify the primary focus areas by selecting from options, not levels.

---

#### 6. Risk Profile
*What risk type(s) would cause your assessed Consequence Severity?*

**Select 1-2 that would lead to the worst outcomes:**

| Risk Type | Description | When to Choose | Protection Focus |
|-----------|-------------|----------------|------------------|
| **Decision** | Could make wrong judgment, choice, or prioritization | Agent makes strategic or tactical decisions with significant impact | Decision Logic depth, reasoning examples, tradeoff guidance |
| **Data** | Could mishandle, expose, or leak sensitive data | Agent processes sensitive data with exposure risk | Hard Boundaries on data handling, isolation rules, masking |
| **Communication** | Could say wrong thing to wrong audience or in wrong tone | Agent generates customer-facing or sensitive communications | Tone guidance, examples, disclosure limits, Output Format depth |
| **Execution** | Could take wrong action or execute incorrectly | Agent performs actions with direct consequences | Confirmation flows, validation, preview requirements |
| **Coordination** | Components could misalign, state could be inconsistent | Agent coordinates multiple systems or maintains state | Clear contracts, state management, sequencing rules |

**How to choose:**
1. Look at your Consequence Severity assessment
2. Ask: "What failure mode would cause that consequence?"
3. Pick the risk type(s) that represent that failure path
4. If multiple risks exist but lead to Minor consequences, note them but don't select

**Derived from:** What failure mode is most likely and consequential (from edge cases, behavior requirements)

**Informs:** Where to focus protection efforts in the system prompt—which sections need depth, which need special attention.

**Example:**
- Communication Agent → **Communication Risk** → Invest heavily in Examples, Tone guidance, Output Format
- Scheduling Agent → **Decision Risk** → Invest heavily in Decision Logic, reasoning examples
- Data Pipeline Agent → **Data Risk** → Invest heavily in Hard Boundaries, data handling rules

---

#### 7. Excellence Profile
*What should this agent be great at? What's the key quality dimension?*

**Select one or two priorities:**

| Excellence Area | Description | When to Choose | Investment Focus |
|-----------------|-------------|----------------|------------------|
| **Accuracy** | Must be correct, no errors tolerated | Precision is critical (data, calculations, facts) | Validation, verification examples, edge case coverage |
| **Naturalness** | Must feel human, not robotic or templated | Customer-facing communication, relationship-building | Tone examples, variation guidance, natural language patterns |
| **Speed** | Must be fast, low latency, responsive | Real-time interactions, high-volume processing | Lean prompt, minimal reasoning, efficient patterns |
| **Clarity** | Must be immediately understandable, actionable | Instructions, explanations, coordination | Clear structure, explicit examples, unambiguous language |
| **Consistency** | Must be reliable, predictable, repeatable | Users depend on consistent behavior | Patterns, templates, explicit rules |
| **Adaptability** | Must handle varied contexts and edge cases well | Diverse scenarios, unpredictable inputs | Extensive edge cases, flexible guidance, graceful degradation |
| **Empathy** | Must read emotional/social context appropriately | Human interaction, relationship-sensitive communication | Social signal examples, relationship context guidance |

**Derived from:** Success criteria, what "great" looks like (from spec), key differentiators

**Informs:** Where to invest quality effort—which sections get detailed examples, where to add depth for positive differentiation (not just protection).

**Example:**
- Communication Agent → **Naturalness + Clarity** → Heavy tone examples, natural vs. robotic contrasts, clear call-to-action patterns
- Event Scoring Agent → **Accuracy + Consistency** → Comprehensive dimension examples, explicit rules, validation patterns
- Support Agent → **Empathy + Clarity** → Social context reading, tone adaptation, clear helpful responses

---

### Group 3: Context (From Spec, Not a Characteristic)

#### Audience/Interaction Level

**Read directly from spec's "User Visibility" or "Operating Model" sections.**

| Audience | Description | Implications |
|----------|-------------|--------------|
| **Internal (our team)** | Development team, technical stakeholders | Technical tone OK, debug info acceptable, errors tolerated |
| **Internal (user's team)** | Business users within customer organization | Professional tone, internal jargon OK, errors embarrassing |
| **External** | Customers, clients, public | Customer-appropriate tone, no internal details, errors damage relationships |

**This is NOT a characteristic** because it's already captured in the spec. The system prompt workflow reads this directly and applies appropriate tone, disclosure, and error handling guidance.

---

### Design Decisions (Informed by Characteristics)

These are **not characteristics** but **decisions made based on characteristics**:

#### Token Budget

Decided based on:
- Reasoning Depth (higher = more tokens for Decision Logic)
- Risk Profile (determines which sections need depth)
- Excellence Profile (determines where to invest for quality)
- Consequence Severity (higher = more guardrail depth)

#### Section Depths

Each section's depth is determined by specific characteristics:

| Section | Primary Drivers |
|---------|----------------|
| Decision Logic | Reasoning Depth, Risk Profile (if Decision) |
| Hard Boundaries | Consequence Severity, Data Sensitivity, Risk Profile |
| Examples | Reasoning Depth, Excellence Profile, Risk Profile |
| Output Format | Excellence Profile, Audience (from spec) |
| Failure Handling | Consequence Severity, Recovery Difficulty |
| Domain Context | Reasoning Depth, specific context needs from spec |
| Operational Boundaries | Action Scope, Consequence Severity |

---

## Application Example: Communication Agent

### Agent Summary

Translates Intelligence Agent's coordination decisions into professional, human, context-appropriate email messages for external attendees in law firm meeting coordination.

### Characteristics Assessment

#### Core Characteristics

| Characteristic | Level | Rationale |
|----------------|-------|-----------|
| **Reasoning Depth** | **Moderate** | Applies message patterns (Initiate, Reply.*, Follow_up, etc.) to context. Adapts tone and content based on conversation history. Doesn't make novel strategic decisions—Intelligence Agent does that—but exercises contextual judgment in execution. |
| **Action Scope** | **Narrow** | Receives action type, writes email content (subject + body). Cannot change meeting details, coordination flow, or make strategic decisions. Single action type (content generation) in tightly bounded domain. |
| **Consequence Severity** | **Moderate** | Bad emails damage relationships, require apology/remediation. Can hurt firm reputation if pattern of failures. But single failures are recoverable and not catastrophic. Not "Major" because doesn't cause customer churn or regulatory issues. |
| **Recovery Difficulty** | **Moderate** | Can send follow-up email to clarify or correct, but original message was seen and read. Embarrassing but recoverable. Not "Hard" because damage can be mitigated with good follow-up. |
| **Data Sensitivity** | **Personal** | Has access to client email addresses, names, message content. Main risk is cross-attendee data leakage (showing Attendee A's info to Attendee B). Not "Regulated" because doesn't handle legal content, credentials, or compliance-bound data. |

#### Profiles

| Profile | Selection | Rationale |
|---------|-----------|-----------|
| **Risk Profile** | **Communication** | Primary risk is saying wrong thing (unprofessional tone, confusing message, awkward phrasing) or to wrong audience (leaking details about other attendees). Not Decision risk (doesn't make strategic choices), not Execution risk (doesn't take actions beyond content), not Data risk primary concern (has data but main issue is communication quality). |
| **Excellence Profile** | **Naturalness + Clarity** | Must feel like a human wrote it, not robotic or templated (Naturalness). Must be immediately understandable with high response rate (Clarity). Professional tone is table stakes; natural human feeling is the differentiator. |

#### Context (From Spec)

| Context | Value |
|---------|-------|
| **Audience** | External (law firm clients and prospects) |
| **Formality** | High professional (law firm standards) |
| **Brand Stakes** | High (every message represents firm) |

### What This Tells Us

#### Protection Focus (from Risk Profile: Communication)

**Invest heavily in:**
1. **Examples section** — Show multiple message types with reasoning
   - Initiate (first outreach with full context)
   - Reply.persist (delicate steering without pressure)
   - Follow_up (consistent tone, not increasingly urgent)
   - Good vs. bad examples for each type

2. **Output Format section** — Extensive tone calibration
   - "Say X, not Y" contrasts
   - Professional but warm examples
   - Avoid robotic patterns
   - Subject line + body structure

3. **Domain Context section** — Communication principles
   - Law firm professional standards
   - EA-coordinating-for-partner dynamic
   - Context awareness (initial vs. follow-up)

**Light on:**
- Decision Logic (moderate reasoning, patterns not novel decisions)
- Hard Boundaries (just one key rule: don't leak cross-attendee data)
- Operational Boundaries (fully autonomous, no escalation)

#### Quality Focus (from Excellence Profile: Naturalness + Clarity)

**Invest in showing:**
- How to vary language (not repeat same phrases)
- When to provide context vs. assume thread knowledge
- How to be warm yet professional
- Clear call-to-action patterns
- Natural transitions

**Examples should demonstrate:**
- Natural human voice (contractions, varied phrasing)
- Professional warmth (accommodating, respectful)
- Context-appropriate detail level
- Anti-patterns (robotic, overly formal, confusing)

#### Data Protection (from Data Sensitivity: Personal)

**One critical Hard Boundary:**
- NEVER include details about other attendees (who else invited, who confirmed, other's status)

**That's it.** Don't need extensive data handling rules because:
- Agent doesn't store data (stateless)
- Agent doesn't log data (backend concern)
- Main risk is operational (leaking in content), not systemic

#### Structure Decisions

| Decision | Determination |
|----------|--------------|
| **Complexity Type** | Workflow Executor (moderate reasoning, applies patterns) |
| **Token Budget** | ~1400-1600 (lower end of Workflow Executor range) |
| **Decision Logic** | Standard (message type patterns, context adaptation) |
| **Hard Boundaries** | Minimal (one data isolation rule + professional standards) |
| **Examples** | Robust (communication risk = need to show how) |
| **Output Format** | Robust (excellence in naturalness + clarity) |
| **Domain Context** | Standard to Robust (professional standards, communication principles) |
| **Failure Handling** | Standard (missing data, undefined actions, contradictions) |

### Old vs. New Framework Comparison

#### Old Framework Assessment

- Sensitivity: **High** (has PII)
- Autonomy: **High** (no human review)
- Exposure: **External** (clients see output)
- Reversibility: **Hard** (emails can't be unsent)
- Blast Radius: **External** (affects clients)

**Result:** 5/5 at maximum → felt like critical high-risk agent → would drive Robust everything

#### New Framework Assessment

- Reasoning Depth: **Moderate**
- Action Scope: **Narrow**
- Consequence Severity: **Moderate**
- Recovery Difficulty: **Moderate**
- Data Sensitivity: **Personal**
- Risk Profile: **Communication**
- Excellence Profile: **Naturalness + Clarity**

**Result:** Moderate-risk, narrow-scope agent with communication focus → invest heavily in tone/examples, light on boundaries/logic

#### Practical Difference

| Section | Old Framework | New Framework |
|---------|--------------|---------------|
| Hard Boundaries | Robust (paranoid about data, actions, everything) | Minimal (one key rule) |
| Decision Logic | Robust (high autonomy = needs guardrails) | Standard (applies patterns) |
| Examples | Standard | **Robust** (communication risk) |
| Output Format | Standard | **Robust** (excellence focus) |
| Domain Context | Standard | **Robust** (professional standards) |
| Operational Boundaries | Robust (high autonomy) | Minimal (narrow scope) |

**Token reallocation:** From defensive (boundaries, logic) to offensive (quality, tone, examples).

---

## Implications for Workflows

### For Agent Spec Workflow

**Section 10: Agent Characteristics** needs to change from:

```markdown
### Current (Old Framework)

Assess your agent on five characteristics:

1. **Sensitivity:** Low / Medium / High / Critical
2. **Autonomy:** Low / Medium / High
3. **Exposure:** Internal / Partner / External
4. **Reversibility:** Easy / Moderate / Hard / Irreversible
5. **Blast Radius:** User / Team / Org / External
```

**To (New Framework):**

```markdown
### Section 10: Agent Characteristics

Assess your agent on seven dimensions:

#### Core Characteristics (Level-Based)

1. **Reasoning Depth:** Minimal / Moderate / Significant / Orchestrating
   - [Description and examples]

2. **Action Scope:** Narrow / Moderate / Broad / Cross-Domain
   - [Description and examples]

3. **Consequence Severity:** Minor / Moderate / Major / Severe
   - [Description and examples]

4. **Recovery Difficulty:** Easy / Moderate / Hard / Impossible
   - [Description and examples]

5. **Data Sensitivity:** None / Internal / Personal / Regulated
   - [Description and examples]

#### Profiles (Selection-Based)

6. **Risk Profile:** Decision / Data / Communication / Execution / Coordination
   - Select 1-2 most relevant
   - [Descriptions of each]

7. **Excellence Profile:** Accuracy / Naturalness / Speed / Clarity / Consistency / Adaptability / Empathy
   - Select 1-2 priorities
   - [Descriptions of each]

For each characteristic:
- Assign the level or make selection
- Provide reasoning from the spec
- Note implications for system prompt
```

### For System Prompt Workflow

**Step 2: Discovery & Configuration** needs to change:

**Old approach:**
1. Classify complexity (tool-caller / workflow / judgment / multi-domain)
2. Extract 5 characteristics from spec
3. Apply Robustness Table + Characteristic Modifiers uniformly

**New approach:**
1. Classify complexity via **Reasoning Depth** + **Action Scope**
2. Assess all 7 dimensions from spec
3. Use **Risk Profile** to determine protection focus (which sections need depth)
4. Use **Excellence Profile** to determine quality investment (where to add examples)
5. Let other characteristics tune specific sections:
   - Data Sensitivity → Hard Boundaries content
   - Consequence Severity → overall guardrail intensity
   - Recovery Difficulty → confirmation requirements
   - Audience (from spec) → tone and disclosure

**Step 3: Create System Prompt Outline** needs to explicitly map:

```markdown
## Section Depth Rationale

Based on characteristics:

**Heavy investment due to Risk Profile ([type]):**
- [Section]: [Why this section protects against this risk]
- [Section]: [Why this section protects against this risk]

**Heavy investment due to Excellence Profile ([type]):**
- [Section]: [Why this section develops this excellence]
- [Section]: [Why this section develops this excellence]

**Light sections due to:**
- [Characteristic]: [Section] can be minimal because [reason]
- [Characteristic]: [Section] can be minimal because [reason]

**Characteristic-specific content:**
- Data Sensitivity ([level]) → [specific content in Hard Boundaries]
- Recovery Difficulty ([level]) → [specific confirmation requirements]
- Consequence Severity ([level]) → [overall guardrail tone]
```

### For System Prompt Template

**Section 2b: Agent Characteristics & Modifiers** needs complete rewrite:

- Remove old 5 characteristics
- Add new 7 dimensions with descriptions
- Update modifier tables to map:
  - Risk Profile → which sections need depth
  - Excellence Profile → where to invest quality
  - Data Sensitivity → Hard Boundaries content
  - Consequence Severity → guardrail intensity
  - Recovery Difficulty → confirmation patterns
  - Reasoning Depth → Decision Logic depth
  - Action Scope → Operational Boundaries depth

### For Both Workflows

**Add explicit guidance:**

1. **Risk Profile determines protection strategy:**
   - Decision risk → Decision Logic, reasoning examples
   - Data risk → Hard Boundaries, isolation rules
   - Communication risk → Examples, Tone, Output Format
   - Execution risk → Confirmation flows, validation
   - Coordination risk → State management, contracts

2. **Excellence Profile determines investment strategy:**
   - What to emphasize in examples
   - Where to add extra depth beyond protection needs
   - What quality dimensions to demonstrate

3. **Don't duplicate spec context:**
   - Audience comes from spec's User Visibility section
   - Don't create "Exposure" characteristic that restates it
   - System prompt workflow reads it directly

4. **Characteristics inform decisions, they aren't the decisions:**
   - Token budget is decided from Reasoning + Risk Profile + Excellence Profile
   - Section depths are decided from multiple characteristics
   - Specific prompt choices (tone, validation, examples) come from characteristic combinations

---

## Open Questions

### Questions for Future Exploration

1. **Is 7 dimensions the right number?**
   - Are we still conflating things that should be separate?
   - Are we separating things that should be combined?
   - Test with 5-10 more agents to validate

2. **Should Risk Profile allow multiple selections?**
   - Current: Pick 1-2 most relevant
   - Alternative: Rate all 5 risk types (Low/Medium/High each)
   - Tradeoff: Nuance vs. simplicity

3. **How do we handle agents that transform over time?**
   - Agent starts as Narrow scope, evolves to Moderate or Broad
   - Do characteristics change or do we version the agent?

4. **What about multi-agent systems?**
   - How do we characterize an orchestrator agent?
   - Do characteristics apply at system level or per agent?

5. **Excellence Profile: Can you pick more than 2?**
   - If you pick 3-4 excellence areas, are you diffusing focus?
   - Is there a "must pick at least 1, max 2" forcing function that helps prioritization?

6. **Data Sensitivity: Is 4 levels enough?**
   - Current: None / Internal / Personal / Regulated
   - Should we distinguish between:
     - Personal (PII, identifiable)
     - Confidential (business secrets, competitive)
     - Regulated (legal, compliance, special category)

7. **How do characteristics map to testing strategy?**
   - High Consequence Severity → test rigor level?
   - Excellence Profile → what to measure in evals?
   - Risk Profile → what failure modes to test?

8. **Should we capture performance requirements explicitly?**
   - Current: Implicit in context or derived from use case
   - Alternative: Add "Performance Requirement" characteristic (Real-time / Interactive / Batch)
   - Would this inform prompt length, model selection, reasoning depth?

### Patterns to Watch

As we build more agents, watch for:

1. **Do certain combinations always appear together?**
   - E.g., Narrow Scope + Moderate Consequence → always safe to be autonomous?
   - Could we create "profiles" or "archetypes"?

2. **Are there characteristics we keep wishing we had?**
   - If we keep noting "this agent also has [X] which matters," add it

3. **Are there dimensions we never use meaningfully?**
   - If a characteristic doesn't affect decisions, remove it

4. **Do certain risk/excellence combinations have known patterns?**
   - Communication Risk + Naturalness Excellence → heavy Examples + Output Format
   - Decision Risk + Accuracy Excellence → heavy Decision Logic + validation
   - Could we encode these patterns?

---

## Document History

| Date | Change | Reason |
|------|--------|--------|
| 2026-01-08 | Initial version | Captured framework evolution from Communication Agent system prompt work |

---

## How to Use This Document

**When building a new agent:**
1. Read this document to understand current framework
2. Apply framework to characterize the agent
3. Note any friction or gaps in the framework
4. Update this document if you discover new insights

**When the framework feels insufficient:**
1. Document the specific case where it breaks down
2. Propose refinement with examples
3. Test refinement on 2-3 existing agents
4. Update this document with learning

**When updating workflows:**
1. Use "Implications for Workflows" section as guide
2. Ensure changes are consistent with principles
3. Update examples in workflows to match new framework
4. Cross-reference this document in workflow changes

This is a living document. The framework will evolve as we build more agents and discover what works.

