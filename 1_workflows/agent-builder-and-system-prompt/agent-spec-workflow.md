# Agent Specification Workflow

## Last Updated

- **Date:** January 9, 2026
- **Iteration:** 1

---

## Purpose

Define and document AI agent requirements through structured interview and produce a complete agent specification document.

---

## Goal

A complete, unambiguous agent specification that defines what the agent should do, how it should behave, and where it fits in the product—serving as the requirements document for system prompt creation.

---

## For Humans

### What to Expect

This is an **interview-driven workflow**. You don't need to prepare everything upfront—the AI will guide you through targeted questions to gather all necessary information. Come prepared to discuss:
* Your product and where this agent fits
* What you want the agent to accomplish
* How the agent should behave
* Edge cases and constraints you're aware of

The AI will ask clarifying questions until each section is complete. Expect 45-60 minutes for a complete agent specification.

### When to Use

- Use when: Starting a new AI agent from scratch
- Use when: Formalizing requirements for an existing agent that lacks documentation
- Use when: Aligning team on what an agent should do before implementation

### When NOT to Use

- Don't use when: Making minor tweaks to existing agent behavior (update the spec directly)
- Don't use when: Creating quick prototypes or experiments (too heavyweight for exploration)
- Don't use when: Agent requirements are already fully documented in an existing spec

### What You'll Get

A complete `agent-spec-[agent-name].md` file containing:
- Full agent specification following the agent-spec-template
- All 10 sections filled in with appropriate detail
- Validated against completeness checklist
- Internal consistency verified
- Ready for handoff to system prompt creation

---

## Workflow Process

**Type:** Interview-based

**Pattern per step:**
> Each interview step (Steps 2-7) follows the same **5-phase pattern**:
> 1. **Read Template** — AI reviews the relevant template sections to understand what information is required
> 2. **Interview User** — AI asks targeted questions and continues until all required information is gathered
> 3. **Validate Completeness** — AI checks gathered information against template checklist for those sections
> 4. **Write Section Summary** — AI documents findings according to template structure and applies quality standards (are metrics measurable? is guidance specific? are contradictions resolved?)
> 5. **User Review & Gate** — AI presents summary; user approves or provides feedback for revision
>
> This pattern ensures consistency, completeness, and quality at each stage.

**Gating:** 7 gates total — after Steps 2, 3, 4, 5, 6, 7, and 8 (final approval)

---

## LLM Instructions

### Your Role

Interviewer and document author — guide the user through structured questions to extract all requirements, then document them according to the template.

### Your Goal

Extract complete, unambiguous requirements for an AI agent through targeted questioning, and produce a specification document that contains everything needed for system prompt creation.

### Critical Principle

**Completeness through conversation:** Don't accept vague answers. Probe until you have concrete, specific information. If the user says "handle edge cases gracefully," ask them to enumerate the edge cases and define graceful handling for each.

### References

- Follow `ai-interview-guidelines.mdc` for interview technique
- Use `agent-spec-template.md` as the structure for the output document

### Boundaries

**Do:**
- Ask follow-up questions when answers are vague or incomplete
- Validate each section against the completeness checklist before moving on
- Present section summaries for user approval before proceeding
- Flag contradictions or tensions between sections during validation

**Don't:**
- Accept abstract or generic answers without concrete examples
- Skip sections or mark them "TBD" without explicit user acknowledgment
- Move to the next step until the current gate is approved
- Make assumptions about agent behavior without user confirmation
- Conflate product-level concerns with agent-level concerns (focus on what the agent does—its inputs, processing, outputs—not what the product does with those outputs)

---

## Prerequisites & Setup

### Read Upfront

Before Step 1, read and understand:
- `agent-spec-template.md` — Complete template structure and all 10 sections
- "Guidelines for Writing Agent Specs" section in the template
- "Completeness Checklist" at the end of the template

### Read On Demand

During specific steps, read as needed:
- Each template section's guidance when interviewing for that section
- Agent Characteristics Reference (below) when completing Step 7

---

## Workflow Steps

This section contains the step-by-step instructions the LLM will follow to execute the workflow.

---

### Step 0: Preparation

**Objective:** Understand the full template structure and quality standards before beginning interviews.

**LLM Actions:**
- Read complete `agent-spec-template.md`
- Review all 10 template sections and their purposes
- Study "Guidelines for Writing Agent Specs"
- Review "Completeness Checklist"
- Understand quality standards and principles

**No gate — proceed to Step 1**

---

### Step 1: Introduction

**Objective:** Orient the user and set expectations for the interview process.

**LLM Actions:**
1. Explain what this workflow will accomplish: "We're going to create a complete agent specification through a structured interview."
2. Explain how it will work: "I'll guide you through 6 topic areas, asking targeted questions until each is complete. At the end of each area, I'll summarize what we covered and you'll approve before we continue."
3. Set expectations: "This typically takes 45-60 minutes. You don't need everything prepared upfront — I'll ask clarifying questions as we go."
4. Ask: "Ready to begin?"

**Guidelines:**
- Keep this brief — the user wants to get started
- Confirm they understand it's an interview format with checkpoints

**No gate — continue when user confirms**

---

### Step 2: Product Context & Agent Definition

**Objective:** Establish where the agent lives and what it's meant to accomplish.

**Template Sections:** 2 (Product Context), 3 (Agent Definition)

**Follow the 5-phase pattern above.**

**Key Topics to Cover:**
- Where the agent lives in the product flow
- User journey and starting state
- User's goal and what success looks like
- Product flow (what happens before, during, and after agent interaction)
- Product-level constraints (time, resources, dependencies)
- Agent's purpose and north star
- Core task and success criteria
- Key assumptions about users, data, or context

**Quality Check:**
- [ ] Product context clearly described
- [ ] User journey and goals documented
- [ ] Agent purpose and north star defined
- [ ] Success criteria specified
- [ ] Key assumptions documented

**Gate:** User confirms sections 2-3 are complete and accurate

---

### Step 3: Agent Operating Model

**Objective:** Define how the agent operates — its trigger, interaction pattern, visibility, state, and timing.

**Template Section:** 4 (Agent Operating Model)

**Follow the 5-phase pattern above.**

**Key Topics to Cover:**
- How is the agent triggered? (user-initiated, system-initiated, event-driven, hybrid)
- What is the interaction pattern? (conversational, one-shot, silent, advisory, transactional)
- What does the user see? (visible agent, invisible automation, transparent, opaque)
- How does state work? (stateless, session-based, persistent, scoped memory)
- What are timing expectations? (real-time, near real-time, asynchronous, batch)
- What is the autonomy level? (fully autonomous, preview-then-confirm, suggestion-only)

**Quality Check:**
- [ ] Trigger & invocation method specified
- [ ] Interaction pattern defined
- [ ] User visibility level clarified
- [ ] State & lifecycle documented
- [ ] Timing & latency expectations specified
- [ ] Autonomy level specified

**Gate:** User confirms section 4 is complete and accurate

---

### Step 4: Available Tools

**Objective:** Document the tools, APIs, and integrations the agent has access to.

**Template Section:** 5 (Available Tools)

**Follow the 5-phase pattern above.**

**Key Topics to Cover:**
- What tools does the agent need access to?
- For each tool: name, purpose, when to use it
- Expected inputs and outputs for each tool
- Known constraints (rate limits, permissions, availability)
- Criticality: which tools are essential vs. supplementary?
- Dependencies between tools (if any)

**Note:** If the agent operates without external tools (pure conversational), document this explicitly as "N/A."

**Quality Check:**
- [ ] All required tools listed (or N/A documented)
- [ ] Each tool has name, purpose, and trigger conditions
- [ ] Expected inputs and outputs documented
- [ ] Constraints and criticality noted

**Gate:** User confirms section 5 is complete and accurate

---

### Step 5: Behavior Requirements & Input/Output

**Objective:** Define how the agent behaves, makes decisions, and what data it consumes and produces.

**Template Sections:** 6 (Behavior Requirements), 7 (Input/Output Specification)

**Follow the 5-phase pattern above.**

**Key Topics to Cover:**

**Behavior Requirements:**
- Decision logic and priority frameworks
- Key behaviors the agent must exhibit
- Interaction style and tone/voice
- Quality standards for outputs

**Input/Output:**
- Input format, sources, and schemas
- Output format and delivery method
- Required vs. optional inputs

**Quality Check:**
- [ ] Decision logic explained with reasoning
- [ ] Key behaviors and tone defined
- [ ] Input/output specifications documented

**Gate:** User confirms sections 6-7 are complete and accurate

---

### Step 6: Boundaries & Edge Cases

**Objective:** Define where the agent's limits are and how it handles edge cases.

**Template Sections:** 8 (Boundary Conditions), 9 (Edge Cases & Failure Modes)

**Follow the 5-phase pattern above.**

**Key Topics to Cover:**

**Boundary Conditions:**
- Autonomous zone (what agent does without asking)
- Confirmation zone (what requires approval)
- Escalate/refuse zone (what agent never does)
- Scope limits and disclosure guardrails

**Edge Cases & Failure Modes:**
- Known tricky scenarios
- Expected failure modes
- Graceful degradation behavior (including fallback defaults)
- Uncertainty handling approach
- Contradiction handling (when new info conflicts with earlier statements)

**Quality Check:**
- [ ] All three boundary zones clearly defined
- [ ] Scope limits documented
- [ ] Edge cases and failure handling specified
- [ ] Graceful degradation behavior defined

**Gate:** User confirms sections 8-9 are complete and accurate

---

### Step 7: Agent Characteristics

**Objective:** Assess the agent on 7 dimensions across 3 groups to inform system prompt design.

**Template Section:** 10 (Agent Characteristics)

**Follow the 5-phase pattern above.**

**Key Topics to Cover:**

**Core Characteristics (5 level-based dimensions):**
- Reasoning Depth (Minimal / Moderate / Significant / Orchestrating)
- Action Scope (Narrow / Moderate / Broad / Cross-Domain)
- Consequence Severity (Minor / Moderate / Major / Severe)
- Recovery Difficulty (Easy / Moderate / Hard / Impossible)
- Data Sensitivity (None/Public / Internal / Confidential / Personal / Regulated)

**Profiles (2 selection-based dimensions):**
- Risk Profile: Select 1-2 risk types that would cause the worst consequences (Decision / Data / Communication / Execution / Coordination)
- Excellence Profile: Select 1-2 quality priorities (Accuracy / Naturalness / Speed / Clarity / Consistency / Adaptability / Empathy)

**For each dimension:**
- Assign the level or make selection
- Provide reasoning from the spec
- Flag any unusual combinations or tradeoffs

**Quality Check:**
- [ ] Level assessed for all 7 dimensions
- [ ] Reasoning for each dimension provided
- [ ] Risk Profile: 1-2 selections tied to Consequence Severity
- [ ] Excellence Profile: 1-2 selections based on success criteria

**Gate:** User confirms section 10 is complete and accurate

---

### Step 8: Cross-Section Validation & Generate Final Spec

**Objective:** Ensure internal consistency across all sections and produce the final specification document.

**LLM Actions:**

**Part A: Cross-Section Consistency Check**

Review all approved sections together and check for contradictions or discrepancies:
- Does Agent Operating Model align with Behavior Requirements?
  - Example: If agent is "silent/background," does it have conversational behaviors defined?
- Do Available Tools align with Input/Output specification?
  - Example: If I/O references calendar data, is there a calendar_read tool documented?
- Do Boundary Conditions match the autonomy level in Operating Model (Section 4)?
  - Example: If Operating Model specifies "Fully Autonomous," do the boundary zones reflect appropriate autonomous operation?
- Do Edge Cases reference the right boundaries, behaviors, and tools?
  - Example: If edge case mentions "calendar unavailable," is tool failure handling consistent?
- Does I/O specification match what behaviors and edge cases reference?
- Do Agent Characteristics reflect the actual characteristics in the spec?
  - Example: If characterized as "Critical Sensitivity," does the spec show appropriate data handling boundaries?
- Is tone/interaction style consistent across all sections that mention communication?

**Identify and resolve:**
- Contradictions between sections
- Missing connections or dependencies
- Inconsistencies in terminology or definitions
- Gaps that emerged from working section-by-section

**Part B: Narrative Coherence**

Ensure the spec tells a coherent story:
- Does the spec flow logically from product context → operating model → behaviors?
- Do transitions between sections make sense?
- Are examples across sections consistent (not contradicting)?
- Do success criteria align with defined behaviors?
- Does the whole spec paint a clear picture of what this agent is and does?

**Part C: Generate Final Specification**

- Add metadata (section 1: Agent Overview - name, version, owner, status)
- Compile all approved sections into complete agent-spec document
- Run final validation against full completeness checklist
- Format according to template structure
- Add version history entry
- Note any open questions or future considerations

**Deliverable:**
- Complete `agent-spec-[agent-name].md` file
- List of any cross-section adjustments made (if any)
- Confirmation that all consistency checks passed

**Gate:** User approves final specification for handoff to system prompt creation

---

### Step 9: Feedback Capture

**Objective:** Capture feedback on the workflow process to enable iteration and improvement.

**LLM Actions:**

**Transition:**
"Before we wrap up, I'd like to capture quick feedback on this process. This helps us improve how we create agent specifications."

**Ask these five questions:**

1. **Completeness:** "Does this spec capture the full essence of your agent? Is anything missing that should be here?"

2. **Accuracy:** "Is there anything in this spec that doesn't quite match your intent — anything that feels 'off' or got lost in translation?"

3. **Interview flow:** "Did the section-by-section approach work well? Were there moments where questions didn't fit your situation, or where you struggled to express something important?"

4. **Characteristics:** "Did the 7 characteristic dimensions (Reasoning Depth, Action Scope, Consequence Severity, Recovery Difficulty, Data Sensitivity, Risk Profile, Excellence Profile) help clarify your agent's nature? Were they easy to assess?"

5. **Open feedback:** "Any other observations or suggestions about the agent spec creation process?"

**Log the feedback:**
- Append to `agent-builder-and-system-prompt/agent-spec-feedback-log.md`
- Format:
  ```
  ## [Agent Name] — [Date]
  
  **Completeness:** [response or "Nothing missing"]
  **Accuracy:** [response or "Accurate"]
  **Interview flow:** [response or "Flow worked well"]
  **Characteristics:** [response or "Helpful and clear"]
  **Open feedback:** [response or "None"]
  ```

**Guidelines:**
- Keep this lightweight — don't turn it into another interview
- If user says "all good" to everything, that's valid feedback too
- The goal is to surface patterns over time, not perfect every entry

**No gate — this completes the workflow**

**After logging, mention:**
"Feedback logged. When you're ready to create the system prompt from this spec, use the System Prompt Creation Workflow (`system-prompt-workflow.md`)."

---

## Reference Material

### Agent Characteristics Reference

The following 7 dimensions (organized into 3 groups) help define the agent's nature and inform system prompt design, guardrails, and operational requirements.

---

### Group 1: Core Characteristics (Level-Based)

#### 1. Reasoning Depth
*How much judgment/interpretation is required?*

| Level | Description | Complexity Type | Decision Logic Section |
|-------|-------------|-----------------|----------------------|
| **Minimal** | Rule-following. Clear inputs → clear outputs. Little interpretation needed. | Simple Tool-Caller | Skip or Minimal |
| **Moderate** | Pattern application. Apply learned patterns to new situations. Some interpretation. | Workflow Executor | Minimal to Standard |
| **Significant** | Judgment calls. Weigh tradeoffs, handle ambiguity, reason about novel cases. | Judgment Agent | Robust |
| **Orchestrating** | Coordinates multiple agents/systems. Meta-level decisions, manages cross-component flow. | Multi-Domain Agent | Robust with coordination guidance |

**Informs:** Agent complexity classification, Decision Logic section depth, example count and complexity, model selection

---

#### 2. Action Scope
*How bounded is what the agent can do?*

| Level | Description | Boundaries |
|-------|-------------|------------|
| **Narrow** | One action type, single domain, tight constraints. | Very clear, short |
| **Moderate** | Several action types, defined boundaries, operates in single domain. | Standard boundaries |
| **Broad** | Many action types, significant discretion, operates in single domain. | Detailed boundaries |
| **Cross-Domain** | Operates across multiple domains, coordinates across system boundaries. | Robust boundaries with domain separation |

**Informs:** Operational Boundaries section depth, risk context, complexity of constraints

---

#### 3. Consequence Severity
*What's the realistic harm if this agent fails?*

| Level | Description | Examples |
|-------|-------------|----------|
| **Minor** | Inconvenience, confusion. Easily corrected, no lasting impact. | Wrong color in UI, delay in response, typo |
| **Moderate** | Relationship damage, trust impact. Requires apology/remediation. | Confusing client email, awkward communication, minor data exposure |
| **Major** | Reputation harm, customer churn, regulatory attention. Costly to fix. | Pattern of failures damages brand, compliance concern, significant data breach |
| **Severe** | Legal liability, significant financial loss, safety risk. Existential. | Payment errors, safety-critical failures, HIPAA violations |

**Derived from:** Edge cases, failure modes

**Informs:** Overall guardrail intensity, Hard Boundaries section depth, validation requirements, testing rigor

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

**Informs:** Confirmation/preview requirements, "get it right first time" emphasis, error handling approach

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

**Informs:** Hard Boundaries section content, Output Format masking requirements, logging constraints, compliance requirements

---

### Group 2: Profiles (Selection-Based)

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

**Informs:** Where to focus protection efforts in the system prompt—which sections need depth, which need special attention

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

**Informs:** Where to invest quality effort—which sections get detailed examples, where to add depth for positive differentiation (not just protection)

---

### How to Use Agent Characteristics

**During Agent Spec Creation (Section 10):**
1. Assess the agent on all 7 dimensions
2. For Core Characteristics: Assign appropriate level
3. For Risk Profile: Select 1-2 risk types tied to Consequence Severity
4. For Excellence Profile: Select 1-2 quality priorities from success criteria
5. Provide clear reasoning for each assessment
6. Flag any unusual combinations or tensions

**Note:** The agent spec documents characteristic assessments and reasoning. The System Prompt Creation Workflow reads these characteristics and determines how they inform prompt structure, section depths, and guardrail decisions.

---

### Completeness Checklist

Use this checklist during the workflow to verify completeness at each step.

#### Step 2: Product Context & Agent Definition (Sections 2-3)
- [ ] Clear description of where the agent lives in the product flow
- [ ] User's starting state and journey documented
- [ ] User's goal and desired outcome specified
- [ ] Product constraints and requirements listed
- [ ] Success criteria from user perspective defined
- [ ] Agent purpose stated clearly (why it exists)
- [ ] Core task and responsibilities defined
- [ ] Success criteria for the agent specified
- [ ] Key assumptions documented

#### Step 3: Agent Operating Model (Section 4)
- [ ] Trigger & invocation method specified
- [ ] Interaction pattern defined (conversational, one-shot, silent, etc.)
- [ ] User visibility level clarified
- [ ] State & lifecycle documented
- [ ] Timing & latency expectations specified
- [ ] Autonomy level specified

#### Step 4: Available Tools (Section 5)
- [ ] All required tools listed (or N/A if agent has no tools)
- [ ] Each tool has: name, purpose, when to use
- [ ] Expected inputs and outputs documented
- [ ] Known constraints noted (rate limits, permissions)
- [ ] Criticality assessed (essential vs. supplementary)

#### Step 5: Behavior Requirements & Input/Output (Sections 6-7)
- [ ] Decision logic and priorities explained
- [ ] Key behaviors listed with reasoning
- [ ] Tone and interaction style specified
- [ ] Quality standards for outputs defined
- [ ] Input format and structure documented
- [ ] Input sources identified
- [ ] Output format and structure documented
- [ ] Output delivery method specified

#### Step 6: Boundaries & Edge Cases (Sections 8-9)
- [ ] Autonomous zone clearly defined
- [ ] Confirmation zone clearly defined
- [ ] Escalate/refuse zone clearly defined
- [ ] Scope limits documented
- [ ] Known edge cases listed
- [ ] Expected failure modes documented
- [ ] Graceful degradation behavior specified (including fallback defaults)
- [ ] Uncertainty handling defined
- [ ] Contradiction handling specified

#### Step 7: Agent Characteristics (Section 10)
- [ ] Level assessed for all 7 dimensions (Reasoning Depth, Action Scope, Consequence Severity, Recovery Difficulty, Data Sensitivity, Risk Profile, Excellence Profile)
- [ ] Reasoning for each dimension provided
- [ ] Risk Profile: 1-2 selections tied to Consequence Severity
- [ ] Excellence Profile: 1-2 selections based on success criteria

#### Step 8: Final Specification Quality
- [ ] All sections are specific, not abstract
- [ ] No vague terms without definition
- [ ] Reasoning provided for key decisions
- [ ] Examples included where helpful
- [ ] No ambiguity or missing information
- [ ] Cross-section consistency verified
- [ ] Narrative coherence confirmed
- [ ] Metadata (section 1) completed

---

## Output Specification

### File Naming
- Format: `agent-spec-[agent-name].md`
- Example: `agent-spec-scheduling-assistant.md`

### Location
User-specified directory: _______

### Contents
- Complete agent specification following `agent-spec-template.md` structure
- All 10 sections filled in with appropriate detail
- Section 1 (Agent Overview) metadata included
- Clear, unambiguous requirements
- Validated against completeness checklist
- Internal consistency verified

### Handoff
This agent specification serves as the primary input to the **System Prompt Creation Workflow**. The spec should contain everything needed to write a system prompt without requiring additional clarification about requirements.

---

## Success Criteria

This workflow succeeds when:
- [ ] **Complete coverage:** All 10 template sections are filled in with sufficient detail
- [ ] **Section-level quality:** Each section passed its completeness check before approval
- [ ] **Cross-section consistency:** No contradictions or discrepancies between sections
- [ ] **Narrative coherence:** The spec tells a clear, logical story about the agent
- [ ] **Unambiguous requirements:** All specifications are concrete and actionable, not vague or abstract
- [ ] **Template compliance:** Specification follows the agent-spec-template structure completely
- [ ] **Proper characteristics:** Agent characteristics reflect actual characteristics in the spec
- [ ] **Handoff-ready:** Specification contains everything needed for system prompt creation
- [ ] **User approved:** User explicitly confirms each section and the final specification

---

## Next Steps

After completing this workflow, proceed to:

**System Prompt Creation Workflow** — Takes this agent specification and generates a production-ready system prompt using the system-prompt-template and system-prompt-guidelines.
