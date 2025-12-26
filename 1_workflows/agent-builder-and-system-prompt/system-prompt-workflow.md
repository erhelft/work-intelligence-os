# System Prompt Creation Workflow

## Purpose
Operational workflow to transform a complete agent specification into a production-ready system prompt using our guidelines and template, with context contract documentation.

## Prerequisites & Inputs

**Required:**
- [ ] `agent-spec-[agent-name].md` — Complete agent specification (includes agent characteristics)
- [ ] `system-prompt-template.md` — Template with configuration tables, section guidance, and shell
- [ ] `system-prompt-guidelines.md` — Writing principles for effective system prompts
- [ ] Path to agent spec: _______

**This Workflow Will Produce:**
- [ ] File: `system-prompt-[agent-name].md`
- [ ] File: `context-contract-[agent-name].md`
- [ ] Location: _______

## Goal
A production-ready system prompt that faithfully implements the agent specification—configured for appropriate depth and guardrails, following our template and guidelines—plus a context contract that ensures consistent integration between the prompt and the context injection pipeline.

---

## Workflow (Gated at Key Milestones)

### Step 1: Discovery & Configuration

**Objective:** Analyze the agent specification and determine prompt configuration.

**Activities:**

**1. Read Reference Documents**
* Review `system-prompt-template.md`:
  * Understand the Robustness Table (complexity → section depth)
  * Understand the Characteristic Modifiers (characteristics → content requirements)
  * Familiarize with section guidance and template shell
* Review `system-prompt-guidelines.md`:
  * Understand writing principles that apply throughout

**2. Analyze Agent Specification**
Read and analyze the complete agent specification. Extract:
* Agent purpose and success metric (the "north star")
* Operating model (trigger, interaction pattern, visibility)
* Decision logic and behavior requirements
* Boundary conditions (autonomous/confirmation/escalate zones)
* Input/output specifications
* Available tools and integrations
* Edge cases and failure modes

**3. Classify Agent Complexity**
Based on the agent spec, determine which type best fits:

| Type | Description |
|------|-------------|
| **Simple Tool-Caller** | Executes defined actions, minimal judgment |
| **Workflow Executor** | Follows multi-step processes, some branching logic |
| **Judgment Agent** | Makes contextual decisions, handles ambiguity |
| **Multi-Domain Agent** | Operates across multiple areas, complex reasoning |

This determines section depth via the Robustness Table.

**4. Extract Agent Characteristics**
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

*(No gate - proceeds to Step 2)*

---

### Step 2: Create System Prompt Outline

**Objective:** Apply configuration to template and propose prompt structure for approval.

**Activities:**

**1. Determine Section Depths**
Using the Robustness Table in `system-prompt-template.md`:
* Map complexity classification to section depths (Skip/Minimal/Standard/Robust)
* Note the target token range for this complexity level

**2. Identify Characteristic Requirements**
Using the Characteristic Modifiers in `system-prompt-template.md`:
* For each characteristic level, identify content requirements
* Map requirements to the sections they affect
* Note where multiple characteristics compound (same section affected by multiple characteristics)

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

## H. Token Budget Estimate

**Target Range:** [X-Y tokens] (based on [Complexity Type])
**Estimated Actual:** [estimate, e.g., "Upper end (~2300 tokens)"]
**Rationale:** [Why. E.g., "3 Robust sections (Hard Boundaries, Decision Logic, Examples) plus moderate characteristic requirements will push toward upper end."]
```

**Gate: User confirms configuration and outline before generation**

---

### Step 3: Write System Prompt

**Objective:** Create the complete system prompt implementing the agent specification.

**Activities:**

Using:
* Agent specification as source of truth
* Approved configuration and outline from Steps 1-2
* Section guidance in `system-prompt-template.md`
* Writing principles in `system-prompt-guidelines.md`

Write the full system prompt:
* Follow the template shell structure exactly
* Apply section depths from outline (Skip/Minimal/Standard/Robust)
* Weave characteristic-driven content naturally into each section (don't append)
* Organize context by decision-relevance, not by data type
* Include reasoning in decision logic ("because" explanations)
* Include examples with reasoning traces (for Standard/Robust sections)
* Specify output format and structure
* Define dynamic context sections using consistent tag names
* Ensure static instructions reference the exact tag names used in dynamic context

**Deliverable: Draft System Prompt**
* Complete system prompt implementing the agent specification
* All sections at approved depth
* Characteristic requirements woven throughout
* Dynamic context structure defined
* Output format specified

*(No gate - proceeds to Step 4 for quality check)*

---

### Step 4: Quality Check & Validation

**Objective:** Validate the system prompt against quality criteria and ensure consistency.

**Activities:**

**Part A: Configuration Alignment Check**
* Verify section depths match approved outline
* Verify token count within target range for complexity level
* Verify characteristic content is woven in, not appended as separate blocks

**Part B: Characteristic Validation**
Run through characteristic validation criteria (see Quality Checklist):
* Sensitivity requirements met?
* Autonomy requirements met?
* Exposure requirements met?
* Reversibility requirements met?
* Blast Radius requirements met?

**Part C: Section Quality Check**
For each included section, verify against section-specific criteria in Quality Checklist.

**Part D: Writing Quality Check**
Verify adherence to `system-prompt-guidelines.md` principles:
* Instructions are specific, not abstract
* Positive framing used (do X, not don't do Y)
* Reasoning included with rules
* Context organized by decision-relevance
* Examples show thinking process
* Graceful degradation specified

**Part E: Variable Consistency Check**
* Extract all dynamic context sections from the prompt:
  * XML-style tags used for context structure (e.g., `<user_preferences>`, `<current_state>`, `<request>`)
  * Note the injection placeholders within each section (e.g., `{{USER_PREFERENCES}}`)
  * Verify static instructions reference the tag names (e.g., "check `<user_preferences>` for..."), not the placeholders
* Verify naming consistency:
  * No context section referenced by multiple names (e.g., protected_time_blocks vs focus_blocks)
  * Static instruction references match dynamic context tag names exactly
  * Tags are unambiguous and follow XML naming conventions
* Check context availability:
  * If prompt checks a score/field, that field is defined in dynamic context
  * No conditional logic expecting undefined data
  * Graceful handling specified for optional data

**Part F: Final Revision**
* Address any issues found
* Re-validate against checklist
* Confirm all quality standards met

**Deliverable: Production-Ready System Prompt**
* Complete system prompt with all quality checks passed
* Configuration alignment confirmed
* Characteristic validation confirmed
* Writing quality confirmed
* Variable consistency verified
* Summary of key design decisions

**Gate: User approves final system prompt for production**

---

### Step 5: Extract Context Contract & Output Schema

**Objective:** Document the integration contract between the system prompt and the context injection pipeline.

**Activities:**

**Part A: Extract Dynamic Context Sections**
* Identify all dynamic context sections used in the prompt (XML-style tags)
* For each context section, document:
  * Tag name (exact as used in prompt)
  * Injection placeholder
  * Type (object, array, string, etc.)
  * Required vs. optional
  * Format specification (structure, fields, schema)
  * Example value
  * Where static instructions reference this section
  * Validation rules

**Part B: Create Context Mapping Table**
* List all static instruction references to dynamic context
* Map each reference to its corresponding tag and placeholder
* Verify 1:1 mapping
* Flag any inconsistencies

**Part C: Document Output Schema**
* Extract expected output format from the prompt
* Specify:
  * Response type (JSON, text, structured)
  * Required fields
  * Optional fields
  * Data types
  * Validation rules
  * Example outputs
  * Conditional requirements

**Part D: Add Integration Notes**
* Guidelines for backend engineers building injection pipeline
* QA testing recommendations
* Notes for future prompt editors about dependencies

**Deliverable: Context Contract Document**
* Complete `context-contract-[agent-name].md` file
* All dynamic context sections documented
* Output schema fully specified
* Integration guidelines included

*(No gate - post-approval documentation)*

---

## Quality Checklist

### Configuration Alignment
- [ ] Complexity level identified; section depths match Robustness Table
- [ ] All five characteristics extracted from spec
- [ ] Characteristic content woven throughout (not appended)
- [ ] Token count within target range for complexity

### Characteristic Validation

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

### Section Quality

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

### Writing Quality (per `system-prompt-guidelines.md`)
- [ ] **Specificity:** No abstract qualifiers without definition; specific thresholds stated; concrete examples anchor concepts
- [ ] **Positive Framing:** Core instructions framed as "do X"; constraints have alternative actions; negative framing reserved for anti-examples
- [ ] **Purpose Before Behavior:** Opens with mission; purpose framed as user outcomes; key assumptions documented
- [ ] **Decision Logic Over Rules:** Rules include "because" reasoning; tradeoffs exposed; principles for novel situations
- [ ] **Boundary Conditions:** Three zones clear (autonomous/confirm/escalate); scope limits specified; disclosure guardrails included
- [ ] **Context Hierarchy:** Organized by decision-relevance; related context grouped; irrelevant context omitted
- [ ] **Examples with Reasoning:** Show thinking process; include anti-example; tone demonstrated through contrast
- [ ] **Graceful Degradation:** Missing info behavior specified; low confidence behavior specified; uncertainty language provided

### Variable Consistency
- [ ] All dynamic context tags extracted and listed
- [ ] Static instructions reference tag names (not placeholders)
- [ ] No context section referenced by multiple names
- [ ] 1:1 mapping between instructions and context sections
- [ ] Instructions never reference data that won't be provided
- [ ] Graceful handling specified for optional data

---

## Context Contract Template

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

**File naming:**
* System Prompt: `system-prompt-[agent-name].md`
* Context Contract: `context-contract-[agent-name].md`

**File location:**
* User-specified directory: _______
* Recommended: Same directory as the agent spec

**Relationship to Agent Spec:**
* Agent spec defines *what* the agent should do (includes characteristics)
* System prompt defines *how* the AI should execute those requirements
* Context contract defines *what dynamic data* the prompt expects and *what format* it outputs
* All three documents should be versioned together

---

## Success Criteria

The workflow succeeds when:

* **Configuration-driven:** Complexity classified; characteristics extracted from spec and applied
* **Faithful implementation:** System prompt accurately implements agent specification
* **Appropriate structure:** Section depths match robustness table; characteristic requirements integrated
* **Quality validated:** Prompt passes full quality checklist (characteristics, sections, writing, variables)
* **Guidelines followed:** Writing adheres to `system-prompt-guidelines.md` principles
* **Variable consistency:** All dynamic context uses consistent naming; no orphaned references
* **Context contract complete:** Contract fully specifies all context sections and output schema
* **No hallucination traps:** Instructions never reference data that won't be provided
* **Production-ready:** Final prompt can be deployed immediately
* **User approved:** User confirms prompt is ready for production

---

## Usage Notes

**When to use this workflow:**
* You have a complete agent specification and need to create the system prompt
* Updating an existing system prompt after agent spec changes
* Refactoring an existing prompt to follow our template
* Standardizing prompts across multiple agents

**When NOT to use this workflow:**
* Agent spec doesn't exist yet (run Agent Specification Workflow first)
* Making minor tweaks without spec changes (edit directly)
* Creating quick prototype prompts (too heavyweight)
* Non-production one-off prompts

**Prerequisites:**
* Complete agent specification must exist (including characteristics)
* Agent spec should be approved and stable before creating system prompt

**Document Relationships:**
* Agent spec → source of truth for requirements and characteristics
* System prompt → implementation of spec
* Context contract → integration interface
* All three versioned and maintained together