# System Prompt Creation Workflow

## Last Updated

- **Date:** January 7, 2026
- **Iteration:** 1

---

## Purpose

Transform a complete agent specification into a production-ready system prompt using our guidelines and template, with context contract documentation.

---

## Goal

A production-ready system prompt that faithfully implements the agent specification—configured for appropriate depth and guardrails, following our template and guidelines—plus a context contract that ensures consistent integration between the prompt and the context injection pipeline.

---

## For Humans

### What to Expect

This is a **configuration-driven workflow**. The AI will analyze your agent specification, classify its complexity and characteristics, then systematically generate a system prompt configured for appropriate depth and guardrails.

You'll review and approve:
1. The configuration (complexity classification and characteristics)
2. The prompt outline (section depths and requirements)
3. The final system prompt

Expect 30-45 minutes. You need a complete agent specification before starting.

### When to Use

- Use when: You have a complete agent specification and need to create the system prompt
- Use when: Updating an existing system prompt after agent spec changes
- Use when: Refactoring an existing prompt to follow our template
- Use when: Standardizing prompts across multiple agents

### When NOT to Use

- Don't use when: Agent spec doesn't exist yet (run Agent Specification Workflow first)
- Don't use when: Making minor tweaks without spec changes (edit directly)
- Don't use when: Creating quick prototype prompts (too heavyweight)
- Don't use when: Non-production one-off prompts

### What You'll Get

Two documents:
1. **System Prompt** (`system-prompt-[agent-name].md`) — Production-ready prompt implementing the agent specification
2. **Context Contract** (`context-contract-[agent-name].md`) — Integration contract specifying dynamic context requirements and output schema

---

## Workflow Process

**Type:** Hybrid (analysis + generation with user gates)

**Pattern per step:**
> The workflow follows a **configure → generate → validate** pattern:
> 1. Steps 2-3: Analyze spec and configure prompt structure (user approves configuration)
> 2. Step 4: Generate the complete system prompt
> 3. Step 5: Validate against quality criteria (user approves final prompt)
> 4. Step 6: Extract context contract documentation
>
> This ensures the prompt is appropriately configured before generation begins.

**Gating:** 2 gates total — after Step 3 (configuration approval) and Step 5 (final prompt approval)

---

## LLM Instructions

### Your Role

Analyst and generator — analyze the agent specification to determine appropriate configuration, then generate a system prompt that faithfully implements the spec.

### Your Goal

Produce a production-ready system prompt that:
1. Faithfully implements all requirements from the agent specification
2. Has appropriate depth based on agent complexity
3. Has appropriate guardrails based on agent characteristics
4. Follows our template structure and writing guidelines

### Critical Principle

**Configuration before generation:** The prompt's structure, depth, and guardrails should be determined by the agent's complexity and characteristics — not by arbitrary choices. Classify first, then generate to spec.

### References

- `system-prompt-template.md` — Robustness Table, Characteristic Modifiers, section guidance, template shell
- `system-prompt-guidelines.md` — Writing principles for effective system prompts
- Agent specification — Source of truth for all requirements

### Boundaries

**Do:**
- Classify complexity and extract characteristics before proposing configuration
- Show your reasoning for classification decisions
- Flag ambiguities in the spec for user clarification
- Weave characteristic requirements naturally throughout (don't append as separate blocks)
- Validate variable consistency between static instructions and dynamic context

**Don't:**
- Skip the configuration step — always classify before generating
- Add requirements not in the agent specification
- Use abstract language without concrete definitions
- Create instructions that reference data that won't be provided
- Move to generation until configuration is approved

---

## Prerequisites & Setup

### Read Upfront

Before Step 1, read and understand:
- `system-prompt-template.md` — Robustness Table, Characteristic Modifiers, section guidance
- `system-prompt-guidelines.md` — Writing principles that apply throughout
- The complete agent specification (source of truth)

### Read On Demand

During specific steps, read as needed:
- Section-specific guidance in template when writing each section (Step 4)
- Quality Checklist (below) when validating (Step 5)
- Context Contract Template (below) when extracting contract (Step 6)

---

## Workflow Steps

This section contains the step-by-step instructions the LLM will follow to execute the workflow.

---

### Step 0: Preparation

**Objective:** Understand the template, guidelines, and agent specification before beginning.

**LLM Actions:**
- Read `system-prompt-template.md` (Robustness Table, Characteristic Modifiers, section guidance)
- Read `system-prompt-guidelines.md`
- Read the complete agent specification
- Identify the 5 characteristics in the spec (Sensitivity, Autonomy, Exposure, Reversibility, Blast Radius)

**No gate — proceed to Step 1**

---

### Step 1: Introduction

**Objective:** Orient the user and set expectations for the system prompt creation process.

**LLM Actions:**
1. Explain what this workflow will accomplish: "We're going to create a production-ready system prompt from your agent specification."
2. Explain how it will work: "I'll first analyze your spec to determine the right configuration — complexity level and characteristics. Then I'll generate the prompt and validate it against our quality checklist. You'll approve the configuration before I generate."
3. Set expectations: "This typically takes 30-45 minutes. You'll have 2 approval points: the configuration/outline, and the final prompt."
4. Ask: "Ready to begin?"

**Guidelines:**
- Keep this brief — the user has already completed the agent spec
- Confirm the agent spec is available before proceeding

**No gate — continue when user confirms**

---

### Step 2: Discovery & Configuration

**Objective:** Analyze the agent specification and determine prompt configuration.

**LLM Actions:**

**1. Analyze Agent Specification**
Extract from the spec:
- Agent purpose and success metric (the "north star")
- Operating model (trigger, interaction pattern, visibility)
- Decision logic and behavior requirements
- Boundary conditions (autonomous/confirmation/escalate zones)
- Input/output specifications
- Available tools and integrations
- Edge cases and failure modes

**2. Classify Agent Complexity**
Based on the agent spec, determine which type best fits:

| Type | Description |
|------|-------------|
| **Simple Tool-Caller** | Executes defined actions, minimal judgment |
| **Workflow Executor** | Follows multi-step processes, some branching logic |
| **Judgment Agent** | Makes contextual decisions, handles ambiguity |
| **Multi-Domain Agent** | Operates across multiple areas, complex reasoning |

This determines section depth via the Robustness Table.

**3. Extract Agent Characteristics**
Extract the five characteristics from the agent specification:

| Characteristic | Question | Levels |
|----------------|----------|--------|
| **Sensitivity** | What data does it access/handle? | Low / Medium / High / Critical |
| **Autonomy** | How much can it do without confirmation? | Low / Medium / High |
| **Exposure** | Who sees its outputs? | Internal / Partner / External |
| **Reversibility** | How easily can actions be undone? | Easy / Moderate / Hard / Irreversible |
| **Blast Radius** | If it fails, who/what is affected? | User / Team / Org / External |

These determine content requirements via the Characteristic Modifiers.

**Deliverable: Agent Configuration**

```
Agent: [name]
Purpose: [1-2 sentences from spec]
Success Metric: [observable outcome from spec]

Complexity: [type] 
Rationale: [why this classification]

Characteristics (from spec):
| Characteristic | Level | Notes |
|----------------|-------|-------|
| Sensitivity    | [X]   | [relevant context from spec] |
| Autonomy       | [X]   | [relevant context from spec] |
| Exposure       | [X]   | [relevant context from spec] |
| Reversibility  | [X]   | [relevant context from spec] |
| Blast Radius   | [X]   | [relevant context from spec] |
```

**No gate — proceed to Step 3**

---

### Step 3: Create System Prompt Outline

**Objective:** Apply configuration to template and propose prompt structure for approval.

**LLM Actions:**

**1. Determine Section Depths**
Using the Robustness Table in `system-prompt-template.md`:
- Map complexity classification to section depths (Skip/Minimal/Standard/Robust)
- Note the target token range for this complexity level

**Strategic Depth Adjustment:**
- The Robustness Table provides starting defaults, not rigid requirements
- Ask: "Where does this agent's complexity actually live?"
- Consider: Can characteristic requirements be contained at specific boundaries vs. woven throughout?
- Allocate tokens to high-value sections; save from low-complexity sections

**2. Identify Characteristic Requirements**
Using the Characteristic Modifiers in `system-prompt-template.md`:
- For each characteristic level, identify content requirements
- Map requirements to the sections they affect
- Note where multiple characteristics compound (same section affected by multiple characteristics)

**3. Generate Outline**
Produce comprehensive outline covering all aspects below.

**Deliverable: System Prompt Outline**

```
## A. Agent Understanding

[Demonstrate comprehension of the agent spec]

**Agent Context:** [Business/product context the agent operates in]
**Agent Role:** [What the agent is and does]  
**Agent Goal:** [The outcome/success metric it optimizes for]

---

## B. Configuration Summary

**Complexity:** [Type] → Target token range: [X-Y tokens]

**Characteristics:**
| Characteristic | Level | From Spec |
|----------------|-------|-----------|
| Sensitivity    | [X]   | [relevant quote/context from spec] |
| Autonomy       | [X]   | [relevant quote/context from spec] |
| Exposure       | [X]   | [relevant quote/context from spec] |
| Reversibility  | [X]   | [relevant quote/context from spec] |
| Blast Radius   | [X]   | [relevant quote/context from spec] |

---

## C. Section Plan

| Section | Depth | Characteristic Requirements | Special Notes |
|---------|-------|----------------------------|---------------|
| Identity & Purpose | [depth] | [requirements from characteristics, if any] | [guidelines, considerations] |
| Hard Boundaries | [depth] | [requirements from characteristics, if any] | [guidelines, considerations] |
| Domain Context | [depth] | [requirements from characteristics, if any] | [guidelines, considerations] |
| Decision Logic | [depth] | [requirements from characteristics, if any] | [guidelines, considerations] |
| Operational Boundaries | [depth] | [requirements from characteristics, if any] | [guidelines, considerations] |
| Tool Integration | [depth] | [requirements from characteristics, if any] | [guidelines, considerations] |
| Memory Management | [depth] | [requirements from characteristics, if any] | [guidelines, considerations] |
| Dynamic Context | [depth] | [requirements from characteristics, if any] | [guidelines, considerations] |
| Examples | [depth] | [requirements from characteristics, if any] | [guidelines, considerations] |
| Output Format | [depth] | [requirements from characteristics, if any] | [guidelines, considerations] |
| Failure Handling | [depth] | [requirements from characteristics, if any] | [guidelines, considerations] |
| Final Reminders | [depth] | [requirements from characteristics, if any] | [guidelines, considerations] |

---

## D. Skipped Sections

[Explicit list of sections being skipped and why]

| Section | Reason for Skipping |
|---------|---------------------|
| [section] | [rationale] |

---

## E. Key Judgment Calls

[Any interpretation or classification decisions that required judgment]

- **[Decision]:** [What was decided and why. E.g., "Classified as Judgment Agent rather than Workflow Executor because the agent must weigh relationship context against scheduling rules — not just follow a process."]

---

## F. Open Questions or Ambiguities

[Anything unclear in the spec that could affect generation]

- **[Topic]:** [The ambiguity and how it's being resolved. E.g., "Spec mentions 'client data' but doesn't specify if PII is included. Assuming yes, treating as High Sensitivity. Confirm?"]

---

## G. Anticipated Challenges

[Anything tricky about this agent that needs special attention]

- **[Challenge]:** [Why it's tricky and how it will be addressed. E.g., "High Autonomy + Critical Sensitivity is an unusual combination — will need careful balance between enabling action and protecting data."]

---

## H. Section Depth Rationale

[For each section where you deviated from Robustness Table defaults, explain:]
- **[Section name]**: [Default depth] → [Actual depth]
  - **Why**: [Where does this agent's complexity actually live? Token allocation reasoning]

[Address characteristic containment strategy:]
- **Characteristic containment**: [Which characteristic requirements are contained at specific boundaries vs. woven throughout? E.g., "High Sensitivity risk contained in Hard Boundaries private event handling; doesn't require expansion of all sections"]

---

## I. Token Budget Estimate

**Target Range:** [X-Y tokens] (based on [Complexity Type])
**Estimated Actual:** [estimate, e.g., "Upper end (~2300 tokens)"]
**Rationale:** [Why. E.g., "3 Robust sections (Hard Boundaries, Decision Logic, Examples) plus moderate characteristic requirements will push toward upper end."]
```

**Gate:** User confirms configuration and outline before generation

**Mode Check:**
"We're about to generate the system prompt and context contract files. Please switch to agent mode if you haven't already, as file write operations will be needed."

Wait for user confirmation before proceeding.

---

### Step 4: Write System Prompt

**Objective:** Create the complete system prompt implementing the agent specification.

**LLM Actions:**

Using:
- Agent specification as source of truth
- Approved configuration and outline from Steps 2-3
- Section guidance in `system-prompt-template.md`
- Writing principles in `system-prompt-guidelines.md`

Write the full system prompt:
- Follow the template shell structure exactly
- Apply section depths from outline (Skip/Minimal/Standard/Robust)
- Weave characteristic-driven content naturally into each section (don't append)
- Organize context by decision-relevance, not by data type
- Include reasoning in decision logic ("because" explanations)
- Include examples with reasoning traces (for Standard/Robust sections)
- Specify output format and structure
- Define dynamic context sections using consistent tag names
- Ensure static instructions reference the exact tag names used in dynamic context

**Deliverable: Draft System Prompt**
- Complete system prompt implementing the agent specification
- All sections at approved depth
- Characteristic requirements woven throughout
- Dynamic context structure defined
- Output format specified

**No gate — proceed to Step 5 for quality check**

---

### Step 5: Quality Check & Validation

**Objective:** Validate the system prompt against quality criteria and ensure consistency.

**LLM Actions:**

**Part A: Configuration Alignment Check**
- Verify section depths match approved outline
- Verify token count within target range for complexity level
- Verify characteristic content is woven in, not appended as separate blocks

**Part B: Characteristic Validation**
Run through characteristic validation criteria (see Quality Checklist):
- Sensitivity requirements met?
- Autonomy requirements met?
- Exposure requirements met?
- Reversibility requirements met?
- Blast Radius requirements met?

**Part C: Section Quality Check**

**C1: Input/Output Structure Validation**
Before section-by-section review:
- [ ] Input format matches spec exactly (single object vs. array, field structure)
- [ ] Output format matches spec exactly (response structure, field names)
- [ ] Any processing assumptions (e.g., "receives single event") verified against actual usage

**C2: Section-Specific Quality**
For each included section, verify against section-specific criteria in Quality Checklist.

**C3: Functional Quality Checks**
- [ ] **Critical edge cases prominent**: Domain-critical edge cases (identified in spec) are prominently addressed in primary sections, not buried in Failure Handling
- [ ] **Timing/sequence logic coherent**: Any timing rules, sequences, or countdown logic tested for mathematical coherence (test edge cases: does the sequence work?)
- [ ] **Scalability guidance present**: If agent handles variable-count entities (attendees, events, items), output format includes granularity scaling guidance (e.g., 1 item vs. 10+ items)
- [ ] **Check-before-infer principle**: Agent checks provided data fields before inferring from heuristics/signals
- [ ] **Example completeness**: Examples include enough context to be instructive without being misleading; partial examples that could teach wrong patterns removed

**Part D: Writing Quality Check**
Verify adherence to `system-prompt-guidelines.md` principles:
- Instructions are specific, not abstract
- Positive framing used (do X, not don't do Y)
- Reasoning included with rules
- Context organized by decision-relevance
- Examples show thinking process
- Graceful degradation specified

**Part E: Variable Consistency Check**
- Extract all dynamic context sections from the prompt:
  - XML-style tags used for context structure (e.g., `<user_preferences>`, `<current_state>`, `<request>`)
  - Note the injection placeholders within each section (e.g., `{{USER_PREFERENCES}}`)
  - Verify static instructions reference the tag names (e.g., "check `<user_preferences>` for..."), not the placeholders
- Verify naming consistency:
  - No context section referenced by multiple names (e.g., protected_time_blocks vs focus_blocks)
  - Static instruction references match dynamic context tag names exactly
  - Tags are unambiguous and follow XML naming conventions
- Check context availability:
  - If prompt checks a score/field, that field is defined in dynamic context
  - No conditional logic expecting undefined data
  - Graceful handling specified for optional data

**Part F: Final Revision**
- Address any issues found
- Re-validate against checklist
- Confirm all quality standards met

**Deliverable: Production-Ready System Prompt**
- Complete system prompt with all quality checks passed
- Configuration alignment confirmed
- Characteristic validation confirmed
- Writing quality confirmed
- Variable consistency verified
- Summary of key design decisions

**Gate:** User approves final system prompt for production

---

### Step 6: Extract Context Contract & Output Schema

**Objective:** Document the integration contract between the system prompt and the context injection pipeline.

**LLM Actions:**

**Purpose Check:**
"The context contract is for schema alignment verification. Should it be:
- **Schema Alignment Only** (default) — Minimal: input/output schemas, transformation requirements
- **Full Integration Documentation** — Comprehensive with mapping tables, validation rules, etc."

Default to Schema Alignment Only.

---

**Part A: Document Input Context Schema**
For each dynamic context section:
- Tag name and placeholder
- Type (object/array/string)
- Required vs. optional
- Field structure with types
- Example (if structure isn't self-evident)

**Exclude:** Line references to prompt, exhaustive validation rules, mapping tables

**Part B: Document Output Schema**
- Response type and structure
- Required/optional fields with types
- Example

**Part C: Document Data Transformations**
Only include pre-processing requirements that affect schema (e.g., "Filter out meeting room attendees before injection")

**Skip Context Mapping Table** — redundant if schemas are clear

**Part D: Add Integration Notes** (optional)
- Brief guidelines for backend engineers if needed
- Keep minimal

**Deliverable: Context Contract Document**
- Lightweight `context-contract-[agent-name].md` file
- Input schemas (tag names, field structures, types)
- Output schema (structure, types)
- Data transformation requirements only
- Target: ~150-200 lines for typical agent (not 400+)

**No gate — proceed to Step 7**

---

### Step 7: Feedback Capture

**Objective:** Capture feedback on the workflow process to enable iteration and improvement.

**LLM Actions:**

**Transition:**
"Before we wrap up, I'd like to capture quick feedback on this process. This helps us improve how we create system prompts."

**Ask these five questions:**

1. **Completeness:** "Does this system prompt capture everything from your agent spec? Is anything missing that should be here?"

2. **Accuracy:** "Is there anything in this prompt that doesn't quite match your intent — anything that feels 'off' or got lost in translation from the spec?"

3. **Configuration:** "Did the complexity classification and characteristic analysis feel accurate? Did the resulting section depths make sense?"

4. **Quality process:** "Was the quality checklist helpful? Were there validation steps that felt redundant, or checks you wish we had done?"

5. **Open feedback:** "Any other observations or suggestions about the system prompt creation process?"

**Log the feedback:**
- Append to `agent-builder-and-system-prompt/system-prompt-feedback-log.md`
- Format:
  ```
  ## [Agent Name] — [Date]
  
  **Completeness:** [response or "Nothing missing"]
  **Accuracy:** [response or "Accurate"]
  **Configuration:** [response or "Classification was accurate"]
  **Quality process:** [response or "Process worked well"]
  **Open feedback:** [response or "None"]
  ```

**Guidelines:**
- Keep this lightweight — don't turn it into another interview
- If user says "all good" to everything, that's valid feedback too
- The goal is to surface patterns over time, not perfect every entry

**No gate — this completes the workflow**

**After logging, mention:**
"Feedback logged. Your system prompt and context contract are ready for production. Remember to version both documents alongside the agent spec."

---

## Reference Material

### Quality Checklist

#### Configuration Alignment
- [ ] Complexity level identified; section depths match Robustness Table
- [ ] All five characteristics extracted from spec
- [ ] Characteristic content woven throughout (not appended)
- [ ] Token count within target range for complexity

#### Characteristic Validation

**Sensitivity**
- [ ] If High+: Hard Boundaries prohibit logging/displaying sensitive fields
- [ ] If High+: Output Format specifies masking approach
- [ ] If Critical: Explicit confirmation required for critical data actions
- [ ] Sensitive data prohibitions use absolute language (NEVER)

**Autonomy**
- [ ] If Low: Identity clarifies advisory-only role
- [ ] If Low: Output Format uses recommendation framing
- [ ] If High: Decision Logic includes conservative defaults
- [ ] If High: Final Reminders reinforces caution under uncertainty
- [ ] Autonomy level matches Operational Boundaries scope

**Exposure**
- [ ] If Partner+: Hard Boundaries prohibit internal detail exposure
- [ ] If External: Identity includes customer-appropriate tone
- [ ] If External: Output Format specifies customer-safe errors
- [ ] If External: Failure Handling includes customer escalation language

**Reversibility**
- [ ] If Hard+: Hard Boundaries require preview before send/publish
- [ ] If Irreversible: Multi-step confirmation addressed
- [ ] If Irreversible: Failure Handling addresses uncertain completion
- [ ] Confirmation requirements match reversibility level

**Blast Radius**
- [ ] If Team+: Confirmation required for actions affecting others
- [ ] If Team+: Failure Handling addresses affected party notification
- [ ] If Org+: Rollback requirements documented
- [ ] If External: Customer failure communication included

#### Section Quality

**Identity & Purpose**
- [ ] Purpose explains WHY, not WHAT
- [ ] Success metric is observable
- [ ] Autonomy boundaries explicit
- [ ] Tone included only if user-facing

**Hard Boundaries**
- [ ] All items truly non-negotiable
- [ ] Short list (5-10 max)
- [ ] NEVER/ALWAYS language used
- [ ] Security rules cover accessible data

**Domain Context**
- [ ] Every piece affects agent behavior
- [ ] Terminology agent-specific, not generic
- [ ] User characteristics inform communication
- [ ] Knowledge sources actionable

**Decision Logic**
- [ ] Principles include reasoning
- [ ] Priority hierarchy has clear ordering with rationale
- [ ] Tradeoff guidance covers common tensions
- [ ] Agent could reason about novel situations

**Operational Boundaries**
- [ ] Clear autonomous / confirm / out-of-scope separation
- [ ] Escalation paths have specific destinations
- [ ] Out-of-scope includes redirects

**Tool Integration**
- [ ] Each tool has trigger conditions
- [ ] Each tool has failure handling
- [ ] Dependencies documented

**Memory Management**
- [ ] Explicit retain vs. forget
- [ ] Contradiction handling specified
- [ ] Session boundaries clear

**Dynamic Context**
- [ ] Tag names match static references exactly
- [ ] Schema documented
- [ ] Request positioned last

**Examples**
- [ ] Reasoning traces included
- [ ] At least one edge case
- [ ] At least one anti-example
- [ ] 3-4 examples maximum

**Output Format**
- [ ] Tone calibrated with contrast examples
- [ ] Required elements specified
- [ ] Length guidelines included

**Failure Handling**
- [ ] Common failure modes covered
- [ ] Specific behaviors, not vague guidance
- [ ] User communication included if user-facing

**Final Reminders**
- [ ] Only 2-3 rules (reinforcement only)
- [ ] Common mistakes listed
- [ ] Concise

#### Writing Quality (per `system-prompt-guidelines.md`)
- [ ] **Specificity:** No abstract qualifiers without definition; specific thresholds stated; concrete examples anchor concepts
- [ ] **Positive Framing:** Core instructions framed as "do X"; constraints have alternative actions; negative framing reserved for anti-examples
- [ ] **Purpose Before Behavior:** Opens with mission; purpose framed as user outcomes; key assumptions documented
- [ ] **Decision Logic Over Rules:** Rules include "because" reasoning; tradeoffs exposed; principles for novel situations
- [ ] **Boundary Conditions:** Three zones clear (autonomous/confirm/escalate); scope limits specified; disclosure guardrails included
- [ ] **Context Hierarchy:** Organized by decision-relevance; related context grouped; irrelevant context omitted
- [ ] **Examples with Reasoning:** Show thinking process; include anti-example; tone demonstrated through contrast
- [ ] **Graceful Degradation:** Missing info behavior specified; low confidence behavior specified; uncertainty language provided

#### Variable Consistency
- [ ] All dynamic context tags extracted and listed
- [ ] Static instructions reference tag names (not placeholders)
- [ ] No context section referenced by multiple names
- [ ] 1:1 mapping between instructions and context sections
- [ ] Instructions never reference data that won't be provided
- [ ] Graceful handling specified for optional data

---

### Context Contract Template

```markdown
# Context Contract: [Agent Name]

## Purpose
Defines the contract between the system prompt and the context injection 
pipeline. Specifies what dynamic context the prompt expects and what 
output format the agent produces.

## Dynamic Context Sections

### Input Context Sections

#### <tag_name>
- **XML Tag:** `<tag_name>`
- **Injection Placeholder:** `{{TAG_NAME}}`
- **Type:** [object/array/string/etc.]
- **Required:** [Yes/No]
- **Format Specification:**
  ```xml
  <tag_name>
    [structure or schema]
  </tag_name>
  ```
- **Example:**
  ```xml
  <tag_name>
    [concrete example]
  </tag_name>
  ```
- **Referenced in Prompt:** [section where static instructions reference this]
- **Validation:** [rules and constraints]

## Context Mapping

| Static Instruction Reference | Context Tag | Injection Placeholder | Status |
|------------------------------|-------------|----------------------|--------|
| [what static prompt says] | `<tag_name>` | `{{PLACEHOLDER}}` | ✅/❌ |

## Agent Output Specification

### Response Format
- **Type:** [JSON/text/structured]
- **Required Fields:** [list with types]
- **Optional Fields:** [list with types]

### Output Schema
[JSON schema or format specification]

### Validation Rules
[Conditional requirements and constraints]

### Example Output
[Concrete example]

## Integration Notes

**For Backend Engineers:**
[Guidelines for building injection pipeline]

**For QA:**
[Testing recommendations]

**For Future Prompt Updates:**
[Dependency warnings and update procedures]
```

---

## Output Specification

### File Naming
- System Prompt: `system-prompt-[agent-name].md`
- Context Contract: `context-contract-[agent-name].md`

### Location
User-specified directory: _______
Recommended: Same directory as the agent spec

### Contents
**System Prompt:**
- Complete prompt implementing agent specification
- All sections at appropriate depth
- Characteristic requirements integrated
- Variable consistency verified
- Production-ready

**Context Contract:**
- All dynamic context sections documented
- Output schema fully specified
- Integration guidelines included

### Handoff
- Agent spec defines *what* the agent should do (includes characteristics)
- System prompt defines *how* the AI should execute those requirements
- Context contract defines *what dynamic data* the prompt expects and *what format* it outputs
- All three documents should be versioned together

---

## Success Criteria

This workflow succeeds when:
- [ ] **Configuration-driven:** Complexity classified; characteristics extracted from spec and applied
- [ ] **Faithful implementation:** System prompt accurately implements agent specification
- [ ] **Appropriate structure:** Section depths match robustness table; characteristic requirements integrated
- [ ] **Quality validated:** Prompt passes full quality checklist (characteristics, sections, writing, variables)
- [ ] **Guidelines followed:** Writing adheres to `system-prompt-guidelines.md` principles
- [ ] **Variable consistency:** All dynamic context uses consistent naming; no orphaned references
- [ ] **Context contract complete:** Contract fully specifies all context sections and output schema
- [ ] **No hallucination traps:** Instructions never reference data that won't be provided
- [ ] **Production-ready:** Final prompt can be deployed immediately
- [ ] **User approved:** User confirms prompt is ready for production
