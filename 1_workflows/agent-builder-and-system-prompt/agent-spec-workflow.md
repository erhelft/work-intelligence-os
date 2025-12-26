# Agent Specification Workflow

## Purpose
Operational workflow to define and document AI agent requirements through structured interview and produce a complete agent specification document.

## Prerequisites & Inputs

**Required:**
- [ ] `agent-spec-template.md` — Template structure to fill in
- [ ] Path to template: _______

**What to Expect:**
This is an **interview-driven workflow**. You don't need to prepare everything upfront—the AI will guide you through targeted questions to gather all necessary information. Come prepared to discuss:
* Your product and where this agent fits
* What you want the agent to accomplish
* How the agent should behave
* Edge cases and constraints you're aware of

The AI will ask clarifying questions until each section is complete.

**This Workflow Will Produce:**
- [ ] File: `agent-spec-[agent-name].md`
- [ ] Location: _______
- [ ] Contains: Complete agent specification following the agent-spec-template

## Goal
A complete, unambiguous agent specification that defines what the agent should do, how it should behave, and where it fits in the product—serving as the requirements document for system prompt creation.

---

## Workflow Process

Each interview step (Steps 1-4) follows the same **5-phase pattern**:

1. **Read Template** — AI reviews the relevant template sections to understand what information is required
2. **Interview User** — AI asks targeted questions and continues until all required information is gathered
3. **Validate Completeness** — AI checks gathered information against template checklist for those sections
4. **Write Section Summary** — AI documents findings according to template structure
5. **User Review & Gate** — AI presents summary; user approves or provides feedback for revision

This pattern ensures consistency and completeness at each stage.

---

## Workflow (Gated — User Approves at Key Steps)

### Step 0: Preparation

**Objective:** Understand the full template structure and quality standards before beginning interviews.

**Activities:**
* Read complete `agent-spec-template.md`
* Review all 9 template sections and their purposes
* Study "Guidelines for Writing Agent Specs"
* Review "Completeness Checklist"
* Understand quality standards and principles

**Note:** This is a preparation step—no user gate required. Proceed directly to Step 1 after preparation.

---

### Step 1: Product Context & Agent Definition

**Template Sections:** 2 (Product Context), 3 (Agent Definition)

**Follow the 5-phase pattern above** to gather and document these sections.

**Key Topics to Cover:**
* Where the agent lives in the product flow
* User journey and starting state
* User's goal and what success looks like
* Agent's purpose and north star
* Core task and success criteria
* Key assumptions about users, data, or context

**Completeness Check:**
- [ ] Product context clearly described
- [ ] User journey and goals documented
- [ ] Agent purpose and north star defined
- [ ] Success criteria specified
- [ ] Key assumptions documented

**Gate: User confirms sections 2-3 are complete and accurate**

---

### Step 2: Agent Operating Model

**Template Section:** 4 (Agent Operating Model)

**Follow the 5-phase pattern above** to gather and document this section.

**Key Topics to Cover:**
* How is the agent triggered? (user-initiated, system-initiated, event-driven, hybrid)
* What is the interaction pattern? (conversational, one-shot, silent, advisory, transactional)
* What does the user see? (visible agent, invisible automation, transparent, opaque)
* How does state work? (stateless, session-based, persistent, scoped memory)
* What are timing expectations? (real-time, near real-time, asynchronous, batch)

**Completeness Check:**
- [ ] Trigger & invocation method specified
- [ ] Interaction pattern defined
- [ ] User visibility level clarified
- [ ] State & lifecycle documented
- [ ] Timing & latency expectations specified

**Gate: User confirms section 4 is complete and accurate**

---

### Step 3: Behavior, I/O, Boundaries & Edge Cases

**Template Sections:** 5 (Behavior Requirements), 6 (Input/Output Specification), 7 (Boundary Conditions), 8 (Edge Cases & Failure Modes)

**Follow the 5-phase pattern above** to gather and document these sections.

**Key Topics to Cover:**

**Behavior Requirements:**
* Decision logic and priority frameworks
* Key behaviors the agent must exhibit
* Interaction style and tone/voice
* Quality standards for outputs

**Input/Output:**
* Input format, sources, and schemas
* Output format and delivery method
* Required vs. optional inputs

**Boundary Conditions:**
* Autonomous zone (what agent does without asking)
* Confirmation zone (what requires approval)
* Escalate/refuse zone (what agent never does)
* Scope limits and disclosure guardrails

**Edge Cases & Failure Modes:**
* Known tricky scenarios
* Expected failure modes
* Graceful degradation behavior
* Uncertainty handling approach

**Completeness Check:**
- [ ] Decision logic explained with reasoning
- [ ] Key behaviors and tone defined
- [ ] Input/output specifications documented
- [ ] All three boundary zones clearly defined
- [ ] Edge cases and failure handling specified

**Gate: User confirms sections 5-8 are complete and accurate**

---

### Step 4: Agent Positioning

**Template Section:** 9 (Agent Positioning)

**Follow the 5-phase pattern above** to gather and document this section.

**Key Topics to Cover:**
* Position on each key consideration dimension
* Reasoning for each positioning decision
* Implications for system prompt design
* Any unusual positioning or tradeoffs

**Completeness Check:**
- [ ] Position on each consideration documented
- [ ] Reasoning for positioning provided
- [ ] Implications for implementation noted

**Gate: User confirms section 9 is complete and accurate**

---

### Step 5: Cross-Section Validation & Generate Final Spec

**Objective:** Ensure internal consistency across all sections and produce the final specification document.

**Activities:**

**Part A: Cross-Section Consistency Check**

Review all approved sections together and check for contradictions or discrepancies:
* Does Agent Operating Model align with Behavior Requirements?
  * Example: If agent is "silent/background," does it have conversational behaviors defined?
* Do Boundary Conditions match the autonomy level described in other sections?
  * Example: If positioned as "high autonomy," is the autonomous zone robust?
* Do Edge Cases reference the right boundaries and behaviors?
* Does I/O specification match what behaviors and edge cases reference?
* Does Agent Positioning reflect the actual characteristics in the spec?
  * Example: If positioned as "high context complexity," does the spec show complex context handling?
* Is tone/interaction style consistent across all sections that mention communication?

**Identify and resolve:**
* Contradictions between sections
* Missing connections or dependencies
* Inconsistencies in terminology or definitions
* Gaps that emerged from working section-by-section

**Part B: Narrative Coherence**

Ensure the spec tells a coherent story:
* Does the spec flow logically from product context → operating model → behaviors?
* Do transitions between sections make sense?
* Are examples across sections consistent (not contradicting)?
* Do success criteria align with defined behaviors?
* Does the whole spec paint a clear picture of what this agent is and does?

**Part C: Generate Final Specification**

* Add metadata (section 1: Agent Overview - name, version, owner, status)
* Compile all approved sections into complete agent-spec document
* Run final validation against full completeness checklist
* Format according to template structure
* Add version history entry
* Note any open questions or future considerations

**Deliverable:**
* Complete `agent-spec-[agent-name].md` file
* List of any cross-section adjustments made (if any)
* Confirmation that all consistency checks passed

**Gate: User approves final specification for handoff to system prompt creation**

---

## Output Specification

**File naming:**
* Format: `agent-spec-[agent-name].md`
* Example: `agent-spec-scheduling-assistant.md`

**File location:**
* User-specified directory: _______

**File contents:**
* Complete agent specification following `agent-spec-template.md` structure
* All 9 sections filled in with appropriate detail
* Section 1 (Agent Overview) metadata included
* Clear, unambiguous requirements
* Validated against completeness checklist
* Internal consistency verified

**Output Specification (Handoff to Next Workflow):**

This agent specification serves as the primary input to the **System Prompt Creation Workflow**. The spec should contain everything needed to write a system prompt without requiring additional clarification about requirements.

---

## Key Considerations Reference

*[This section will be populated with the key dimensions for positioning agents]*

The following considerations help categorize the agent and inform system prompt design:

* TBD: Key considerations will be defined here

---

## Success Criteria

The agent specification workflow succeeds when:

* **Complete coverage:** All 9 template sections are filled in with sufficient detail
* **Section-level quality:** Each section passed its completeness check before approval
* **Cross-section consistency:** No contradictions or discrepancies between sections
* **Narrative coherence:** The spec tells a clear, logical story about the agent
* **Unambiguous requirements:** All specifications are concrete and actionable, not vague or abstract
* **Template compliance:** Specification follows the agent-spec-template structure completely
* **Proper positioning:** Agent positioning reflects actual characteristics in the spec
* **Handoff-ready:** Specification contains everything needed for system prompt creation
* **User approved:** User explicitly confirms each section and the final specification

---

## Agent Specification Completeness Checklist

Use this checklist during the workflow to verify completeness at each step.

### Step 1: Product Context & Agent Definition (Sections 2-3)
- [ ] Clear description of where the agent lives in the product flow
- [ ] User's starting state and journey documented
- [ ] User's goal and desired outcome specified
- [ ] Product constraints and requirements listed
- [ ] Success criteria from user perspective defined
- [ ] Agent purpose stated clearly (why it exists)
- [ ] Core task and responsibilities defined
- [ ] Success criteria for the agent specified
- [ ] Key assumptions documented

### Step 2: Agent Operating Model (Section 4)
- [ ] Trigger & invocation method specified
- [ ] Interaction pattern defined (conversational, one-shot, silent, etc.)
- [ ] User visibility level clarified
- [ ] State & lifecycle documented
- [ ] Timing & latency expectations specified

### Step 3: Behavior, I/O, Boundaries & Edge Cases (Sections 5-8)
- [ ] Decision logic and priorities explained
- [ ] Key behaviors listed with reasoning
- [ ] Tone and interaction style specified
- [ ] Quality standards for outputs defined
- [ ] Input format and structure documented
- [ ] Input sources identified
- [ ] Output format and structure documented
- [ ] Output delivery method specified
- [ ] Autonomous zone clearly defined
- [ ] Confirmation zone clearly defined
- [ ] Escalate/refuse zone clearly defined
- [ ] Scope limits documented
- [ ] Known edge cases listed
- [ ] Expected failure modes documented
- [ ] Graceful degradation behavior specified
- [ ] Uncertainty handling defined

### Step 4: Agent Positioning (Section 9)
- [ ] Position on each key consideration documented
- [ ] Reasoning for positioning provided
- [ ] Implications for implementation noted

### Step 5: Final Specification Quality
- [ ] All sections are specific, not abstract
- [ ] No vague terms without definition
- [ ] Reasoning provided for key decisions
- [ ] Examples included where helpful
- [ ] No ambiguity or missing information
- [ ] Cross-section consistency verified
- [ ] Narrative coherence confirmed
- [ ] Metadata (section 1) completed

---

## Next Steps

After completing this workflow, proceed to:

**System Prompt Creation Workflow** — Takes this agent specification and generates a production-ready system prompt using the system-prompt-template and system-prompt-guidelines.

---

## Usage Notes

**When to use this workflow:**
* Starting a new AI agent from scratch
* Formalizing requirements for an existing agent that lacks documentation
* Aligning team on what an agent should do before implementation

**When NOT to use this workflow:**
* Making minor tweaks to existing agent behavior (update the spec directly)
* Creating quick prototypes or experiments (too heavyweight for exploration)
* Agent requirements are already fully documented in an existing spec

**How this workflow works:**
* **Interview-driven:** AI guides you through questions; you don't need everything prepared upfront
* **Section-by-section:** Work incrementally with gates at each step for easier review
* **Quality-first:** Each section is validated before moving forward
* **Consistency check:** Final step ensures all sections work together coherently
