# System Prompt Creation Workflow

## Purpose
Operational workflow to transform a complete agent specification into a production-ready system prompt using our guidelines and template, with context contract documentation.

## Prerequisites & Inputs

**Required:**
- [ ] `agent-spec-[agent-name].md` — Complete agent specification from Agent Specification Workflow
- [ ] `system-prompt-guidelines.md` — Our principles for effective system prompts
- [ ] `system-prompt-template.md` — Modular template with all sections
- [ ] Path to agent spec: _______

**This Workflow Will Produce:**
- [ ] File: `system-prompt-[agent-name].md`
- [ ] File: `context-contract-[agent-name].md`
- [ ] Location: _______
- [ ] Contains: Production-ready system prompt + context contract that defines the integration interface

## Goal
A production-ready system prompt that faithfully implements the agent specification—following our guidelines, using our template, and ready for deployment—plus a context contract that ensures consistent integration between the prompt and the context injection pipeline.

---

## Workflow (Gated at Key Milestones)

### Step 1: Review Agent Spec & Create System Prompt Outline

**Objective:** Analyze the agent specification and determine the optimal system prompt structure.

**Activities:**
* Read and analyze the complete agent specification
* Extract key information:
  * Agent purpose and north star
  * Agent operating model (trigger, interaction pattern, visibility)
  * Decision logic and behavior requirements
  * Boundary conditions (autonomous/confirmation/escalate zones)
  * Input/output specifications
  * Edge cases and failure modes
  * Agent positioning
* Review `system-prompt-template.md` sections
* Based on agent spec and positioning, determine:
  * Which template sections to include
  * Which sections should be robust (detailed, with examples)
  * Which sections should be lightweight (brief, essential only)
* Explain reasoning for section selection and depth
* Consider which of the 8 principles need emphasis based on agent characteristics

**Deliverable: System Prompt Outline**
* Summary of key insights from agent spec
* List of included template sections
* For each section: robust vs. lightweight designation
* Rationale for structural decisions
* Notes on which guidelines require special attention
* Initial thoughts on dynamic context needs

**Gate: User confirms outline structure and approach**

---

### Step 2: Write System Prompt

**Objective:** Create the complete system prompt implementing the agent specification.

**Activities:**
* Using the agent specification as source of truth
* Using the approved outline from Step 1
* Following `system-prompt-guidelines.md` principles
* Using `system-prompt-template.md` structure
* Write the full system prompt with all approved sections:
  * Translate agent spec requirements into prompt language
  * Apply the 8 principles throughout
  * Include appropriate examples with reasoning traces
  * Ensure decision logic includes "because" explanations
  * Organize context by decision-relevance
  * Define boundary conditions explicitly
  * Specify graceful degradation behavior
  * Define dynamic context sections using XML-style tags (e.g., `<user_preferences>`, `<current_state>`)
  * Use consistent tag names between static instructions and dynamic context sections
  * Follow the template's dynamic context structure (tags + injection placeholders)
  * Specify exact output format and structure

**Deliverable: Draft System Prompt**
* Complete system prompt implementing the agent specification
* All sections filled in with appropriate depth
* Dynamic context requirements identified
* Output format specified

*(No gate - proceeds to Step 3 for quality check)*

---

### Step 3: Quality Check & Validation

**Objective:** Validate the system prompt against guidelines and ensure variable consistency.

**Activities:**

**Part A: Guideline Adherence Check**
* Run system prompt through quality checklist (see below)
* Verify adherence to all 8 principles:
  * Specificity over abstraction
  * Positive framing
  * Purpose before behavior
  * Decision logic over rules
  * Explicit boundary conditions
  * Context hierarchy
  * Examples with reasoning
  * Graceful degradation
* Identify any gaps or violations of guidelines
* Revise prompt to address issues

**Part B: Variable Consistency Check**
* Extract all dynamic context sections from the prompt:
  * XML-style tags used for context structure (e.g., `<user_preferences>`, `<current_state>`, `<request>`)
  * Note the injection placeholders within each section (e.g., `{{USER_PREFERENCES}}`)
  * Verify static instructions reference the tag names (e.g., "check `<user_preferences>` for..."), not the placeholders
* Verify naming consistency:
  * No context section referenced by multiple names (e.g., protected_time_blocks vs focus_blocks)
  * Static instruction references match dynamic context tag names exactly
  * Tags are unambiguous and follow XML naming conventions
* Check conditional logic:
  * If prompt references data (e.g., "check relationship_maturity score"), verify that data will be provided
  * Flag any instructions that expect context not defined in dynamic variables
  * Ensure no hallucination traps (instructions referencing non-existent data)
* Validate instruction-context coupling:
  * Critical instruction-context pairs are not separated by large distances
  * Most decision-relevant context is positioned near related instructions

**Part C: Final Revision**
* Address any issues found in Parts A or B
* Validate revised prompt against both checklists
* Confirm all quality standards are met

**Deliverable: Production-Ready System Prompt**
* Complete system prompt with all quality checks passed
* Variable consistency verified
* Quality checklist confirmation (all items passing)
* Summary of key design decisions
* Notes on any deviations from standard template (if applicable)

**Gate: User approves final system prompt for production**

---

### Step 4: Extract Context Contract & Output Schema

**Objective:** Document the integration contract between the system prompt and the context injection pipeline.

**Activities:**

**Part A: Extract Dynamic Context Sections**
* Identify all dynamic context sections used in the prompt (XML-style tags like `<user_preferences>`, `<current_state>`)
* For each context section, document:
  * Tag name (exact as used in prompt, e.g., `<user_preferences>`)
  * Injection placeholder (e.g., `{{USER_PREFERENCES}}`)
  * Type (object, array, string, etc.)
  * Required vs. optional
  * Format specification (structure, fields, schema)
  * Example value (complete with tag structure)
  * Where static instructions reference this section (section/line)
  * Validation rules

**Part B: Create Context Mapping Table**
* List all static instruction references to dynamic context sections
* Map each reference to its corresponding XML tag and injection placeholder
* Verify 1:1 mapping (no orphaned references, no missing sections)
* Flag any naming inconsistencies between instructions and tag names

**Part C: Document Output Schema**
* Extract the expected output format from the prompt
* Specify:
  * Response type (JSON, text, structured format)
  * Required fields
  * Optional fields
  * Data types for each field
  * Validation rules
  * Example outputs
  * Conditional requirements (e.g., "if action=reschedule, then proposed_time is required")

**Part D: Add Integration Notes**
* Guidelines for backend engineers building injection pipeline
* QA testing recommendations
* Notes for future prompt editors about dependencies

**Deliverable: Context Contract Document**
* Complete `context-contract-[agent-name].md` file
* All dynamic context sections documented with XML tag structure and injection specs
* Output schema fully specified
* Integration guidelines included

*(No gate - this is post-approval documentation/housekeeping)*

---

## Output Specification

**File naming:**
* System Prompt: `system-prompt-[agent-name].md`
* Context Contract: `context-contract-[agent-name].md`
* Example: `system-prompt-scheduling-assistant.md` + `context-contract-scheduling-assistant.md`
* Names should match the corresponding agent spec

**File location:**
* User-specified directory: _______
* Recommended: Same directory as the agent spec for easy reference

**File contents:**

**System Prompt File:**
* Production-ready system prompt
* All sections from approved outline
* Validated against quality checklist
* Implements all requirements from the agent specification

**Context Contract File:**
* All dynamic context sections with XML tag specifications
* Context section mapping table (static references → XML tags → injection placeholders)
* Complete output schema
* Integration guidelines and validation rules

**Relationship to Agent Spec:**
* The system prompt is the implementation of the agent spec
* Agent spec defines *what* the agent should do
* System prompt defines *how* the AI should execute those requirements
* Context contract defines *what dynamic data sections* the prompt expects (XML tags + structure) and *what format* it outputs
* All three documents should be versioned together

---

## Success Criteria

The system prompt creation workflow succeeds when:

* **Faithful implementation:** System prompt accurately implements all requirements from the agent specification
* **Appropriate structure:** Outline matches agent needs (right sections, right depth) based on positioning
* **Guideline adherence:** System prompt follows all 8 principles from `system-prompt-guidelines.md`
* **Quality validated:** Prompt passes quality checklist with no gaps or violations
* **Context section consistency:** All dynamic context sections use consistent XML tag naming; no orphaned references
* **Context contract complete:** Contract document fully specifies all context sections and output schema
* **Clarity and precision:** All instructions are specific, not abstract; reasoning is explicit
* **Complete coverage:** All aspects of agent spec (behavior, boundaries, edge cases) are addressed in prompt
* **No hallucination traps:** Instructions never reference data that won't be provided
* **Production-ready:** Final prompt can be deployed immediately without further refinement
* **User approved:** User explicitly confirms prompt is ready for production use

---

## Quality Checklist

Before finalizing the system prompt, verify it meets all guideline principles:

### Foundational Principles
- [ ] **Specificity Over Abstraction:** Are instructions concrete and specific, not vague or abstract? (Principle #1)
  * No abstract qualifiers like "important" or "appropriate" without definition
  * Specific thresholds, conditions, and criteria stated explicitly
  * Concrete examples anchor abstract concepts

- [ ] **Positive Framing:** Are core instructions framed as "do X" rather than "don't do Y"? (Principle #2)
  * Constraints rephrased as affirmative directives
  * When guardrails needed, alternative actions specified
  * Negative framing reserved for anti-examples only

### Content Principles
- [ ] **Purpose Before Behavior:** Does the prompt state the agent's PURPOSE before listing what it does? (Principle #3)
  * Opens with 1-2 sentence mission statement
  * Purpose framed in terms of user outcomes
  * Success definition included
  * Key assumptions documented

- [ ] **Decision Logic Over Rules:** Does it explain REASONING behind decisions, not just state rules? (Principle #4)
  * Rules include "because [reasoning]"
  * Constraints and tradeoffs exposed
  * Principles provided for novel situations
  * Factors and their weights explained

- [ ] **Explicit Boundary Conditions:** Are the three zones clearly defined? (Principle #5)
  * **Autonomous:** What agent handles without asking
  * **Confirmation:** What requires user approval
  * **Escalate/Refuse:** What agent should never do or hand off
  * Scope limits specified
  * Disclosure guardrails included

- [ ] **Context Hierarchy:** Is information organized by DECISION-RELEVANCE, not data type? (Principle #6)
  * Most decision-relevant facts are prominent
  * Related context grouped together
  * Explanation of why context matters, not just what it is
  * Irrelevant context omitted

- [ ] **Examples with Reasoning:** Are there 2-3 examples that show HOW to think? (Principle #7)
  * Examples show reasoning process, not just input → output
  * At least one anti-example included
  * Realistic examples (not oversimplified)
  * Tone demonstrated through contrast

- [ ] **Graceful Degradation:** Does it specify behavior for unclear/missing/conflicting information? (Principle #8)
  * Behavior for missing information specified
  * Behavior for low confidence specified
  * Behavior for conflicting instructions specified
  * Language for expressing uncertainty provided

### Context Section Consistency
- [ ] **Naming consistency:** All dynamic context sections use consistent naming throughout the prompt
  * Static instructions reference XML tag names (e.g., `<user_preferences>`)
  * Dynamic context uses same tag names for structure
  * No context section referenced by multiple names (e.g., protected_time_blocks vs focus_blocks)
  * Extract all XML-style context tags from `<dynamic_context>` section
  * Verify static instructions reference these exact tag names
  * Verify 1:1 mapping exists between instructions and context sections

- [ ] **Context availability:** Instructions never reference data that won't be provided
  * If prompt checks a score/field, that field is defined in dynamic context
  * No conditional logic expecting undefined data
  * Graceful handling specified for optional data

- [ ] **Attention coupling:** Critical instruction-context pairs are not excessively distant
  * Most decision-relevant context is near related instructions
  * Consider repeating critical instructions near relevant context if needed

### Format Quality
- [ ] **Clear structure:** Sections are well-organized and easy to navigate
- [ ] **Appropriate depth:** Robust sections are detailed; lightweight sections are concise
- [ ] **Consistent voice:** Tone and style are consistent throughout
- [ ] **Action-oriented:** Agent knows exactly what to do after reading

---

## Context Contract Template

The context contract document should follow this structure:

```markdown
# Context Contract: [Agent Name]

## Purpose
This document defines the contract between the system prompt and the 
context injection pipeline. It specifies exactly what dynamic context 
the prompt expects and what output format the agent produces.

## Dynamic Context Sections

### Input Context Sections

[For each dynamic context section:]

#### <tag_name>
- **XML Tag:** `<tag_name>` (as used in prompt structure)
- **Injection Placeholder:** `{{TAG_NAME}}` (what gets replaced at runtime)
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
    [concrete example with actual data]
  </tag_name>
  ```
- **Referenced in Prompt:** [section/line where static instructions reference this tag]
- **Validation:** [rules and constraints]

## Context Mapping & Consistency

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
[Concrete example of agent response]

## Integration Notes

**For Backend Engineers:**
[Guidelines for building injection pipeline]

**For QA:**
[Testing recommendations]

**For Future Prompt Updates:**
[Dependency warnings and update procedures]
```

---

## Usage Notes

**When to use this workflow:**
* You have a complete agent specification and need to create the system prompt
* Updating an existing system prompt after agent spec changes
* Refactoring an existing prompt to follow our guidelines and template
* Standardizing prompts across multiple agents

**When NOT to use this workflow:**
* Agent spec doesn't exist yet (run Agent Specification Workflow first)
* Making minor tweaks to existing prompts without spec changes (just edit directly)
* Creating quick prototype prompts for experimentation (too heavyweight)
* Writing one-off prompts for non-production use

**Prerequisites:**
* Complete agent specification must exist before running this workflow
* If requirements aren't documented yet, start with Agent Specification Workflow
* Agent spec should be approved and stable before creating system prompt

**Relationship to Agent Spec Workflow:**
* This workflow is always preceded by the Agent Specification Workflow
* Agent spec is the source of truth; system prompt is the implementation
* Changes to agent behavior should update the spec first, then regenerate prompt
* All three documents (spec, prompt, contract) should be versioned and maintained together

**Why the Context Contract Matters:**
* Prevents silent failures from context section name mismatches (e.g., protected_time_blocks vs focus_blocks)
* Ensures instructions never reference missing data sections
* Creates clear contract for backend integration (what XML tags to populate)
* Makes prompt dependencies explicit and testable
* Enables validation before runtime
* Documents the exact structure expected by the injection pipeline
