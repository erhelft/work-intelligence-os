# Agent Specification Workflow

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
- All 9 sections filled in with appropriate detail
- Validated against completeness checklist
- Internal consistency verified
- Ready for handoff to system prompt creation

---

## Workflow Process

**Type:** Interview-based

**Pattern per step:**
> Each interview step (Steps 1-4) follows the same **5-phase pattern**:
> 1. **Read Template** — AI reviews the relevant template sections to understand what information is required
> 2. **Interview User** — AI asks targeted questions and continues until all required information is gathered
> 3. **Validate Completeness** — AI checks gathered information against template checklist for those sections
> 4. **Write Section Summary** — AI documents findings according to template structure
> 5. **User Review & Gate** — AI presents summary; user approves or provides feedback for revision
>
> This pattern ensures consistency and completeness at each stage.

**Gating:** 5 gates total — after Steps 1, 2, 3, 4, and 5 (final approval)

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

---

## Prerequisites & Setup

### Read Upfront

Before Step 1, read and understand:
- `agent-spec-template.md` — Complete template structure and all 9 sections
- "Guidelines for Writing Agent Specs" section in the template
- "Completeness Checklist" at the end of the template

### Read On Demand

During specific steps, read as needed:
- Each template section's guidance when interviewing for that section
- Agent Characteristics Reference (below) when completing Step 4

---

## Workflow Steps

This section contains the step-by-step instructions the LLM will follow to execute the workflow.

---

### Step 0: Preparation

**Objective:** Understand the full template structure and quality standards before beginning interviews.

**LLM Actions:**
- Read complete `agent-spec-template.md`
- Review all 9 template sections and their purposes
- Study "Guidelines for Writing Agent Specs"
- Review "Completeness Checklist"
- Understand quality standards and principles

**No gate — proceed to Step 1**

---

### Step 1: Product Context & Agent Definition

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

### Step 2: Agent Operating Model

**Objective:** Define how the agent operates — its trigger, interaction pattern, visibility, state, and timing.

**Template Section:** 4 (Agent Operating Model)

**Follow the 5-phase pattern above.**

**Key Topics to Cover:**
- How is the agent triggered? (user-initiated, system-initiated, event-driven, hybrid)
- What is the interaction pattern? (conversational, one-shot, silent, advisory, transactional)
- What does the user see? (visible agent, invisible automation, transparent, opaque)
- How does state work? (stateless, session-based, persistent, scoped memory)
- What are timing expectations? (real-time, near real-time, asynchronous, batch)

**Quality Check:**
- [ ] Trigger & invocation method specified
- [ ] Interaction pattern defined
- [ ] User visibility level clarified
- [ ] State & lifecycle documented
- [ ] Timing & latency expectations specified

**Gate:** User confirms section 4 is complete and accurate

---

### Step 3: Behavior, I/O, Boundaries & Edge Cases

**Objective:** Define how the agent behaves, what it consumes and produces, where its limits are, and how it handles edge cases.

**Template Sections:** 5 (Behavior Requirements), 6 (Input/Output Specification), 7 (Boundary Conditions), 8 (Edge Cases & Failure Modes)

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

**Boundary Conditions:**
- Autonomous zone (what agent does without asking)
- Confirmation zone (what requires approval)
- Escalate/refuse zone (what agent never does)
- Scope limits and disclosure guardrails

**Edge Cases & Failure Modes:**
- Known tricky scenarios
- Expected failure modes
- Graceful degradation behavior
- Uncertainty handling approach

**Quality Check:**
- [ ] Decision logic explained with reasoning
- [ ] Key behaviors and tone defined
- [ ] Input/output specifications documented
- [ ] All three boundary zones clearly defined
- [ ] Edge cases and failure handling specified

**Gate:** User confirms sections 5-8 are complete and accurate

---

### Step 4: Agent Characteristics

**Objective:** Assess the agent on each of the 5 characteristic dimensions to inform system prompt design.

**Template Section:** 9 (Agent Characteristics)

**Follow the 5-phase pattern above.**

**Key Topics to Cover:**
- Level for each of the 5 characteristic dimensions:
  - Sensitivity (data touched)
  - Autonomy (independence level)
  - Exposure (audience scope)
  - Reversibility (undo-ability)
  - Blast Radius (failure impact)
- Reasoning for each characteristic level
- Implications for system prompt design
- Any unusual combinations or tradeoffs

**Quality Check:**
- [ ] Level on each characteristic documented (Low, Medium, High, or Critical)
- [ ] Reasoning for characteristic level provided
- [ ] Implications for implementation noted

**Gate:** User confirms section 9 is complete and accurate

---

### Step 5: Cross-Section Validation & Generate Final Spec

**Objective:** Ensure internal consistency across all sections and produce the final specification document.

**LLM Actions:**

**Part A: Cross-Section Consistency Check**

Review all approved sections together and check for contradictions or discrepancies:
- Does Agent Operating Model align with Behavior Requirements?
  - Example: If agent is "silent/background," does it have conversational behaviors defined?
- Do Boundary Conditions match the autonomy level described in other sections?
  - Example: If characterized as "high autonomy," is the autonomous zone robust?
- Do Edge Cases reference the right boundaries and behaviors?
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

## Reference Material

### Agent Characteristics Reference

The following characteristics help define the agent's nature and inform system prompt design, guardrails, and operational requirements.

---

#### 1. Sensitivity (What data does it touch?)

**Definition:** The sensitivity level of data the agent accesses, processes, or stores.

| Level | Description | Examples |
|-------|-------------|----------|
| **Low** | Public information, non-personal data | • Public API data<br>• Marketing content<br>• General knowledge queries<br>• Public documentation |
| **Medium** | Business data, internal documents | • Internal wiki content<br>• Team documents<br>• Project plans<br>• Non-confidential business metrics |
| **High** | PII, financial, health, legal data | • Customer names and emails<br>• Financial reports<br>• Health records<br>• Legal contracts<br>• Employee performance data |
| **Critical** | Authentication credentials, payment data, highly regulated data | • Passwords or API keys<br>• Credit card numbers<br>• SSNs or national IDs<br>• Medical diagnoses<br>• Attorney-client privileged content |

---

#### 2. Autonomy (How much can it do alone?)

**Definition:** The degree to which the agent can take actions without human approval.

| Level | Description | Examples |
|-------|-------------|----------|
| **Low** | Suggestions only, human executes all actions | • Research assistant that only presents findings<br>• Content advisor that reviews but doesn't edit<br>• Query builder that shows SQL but doesn't run it<br>• Design suggester that presents mockups |
| **Medium** | Acts within well-defined scope, requires approval for significant actions | • Calendar assistant that moves internal meetings but asks about external<br>• Email drafter that sends routine replies but escalates complex ones<br>• Task manager that updates statuses but asks before reassigning |
| **High** | Acts broadly with minimal oversight, only escalates exceptions | • Automated customer support that resolves 80% of issues<br>• Procurement agent that orders supplies within budget<br>• Content moderator that removes clear violations<br>• System monitor that restarts failed services |

---

#### 3. Exposure (Who sees it?)

**Definition:** The audience scope that interacts with or sees outputs from the agent.

| Level | Description | Examples |
|-------|-------------|----------|
| **Internal** | Team tools, backend systems, internal automation | • Internal log analyzer<br>• Development environment assistant<br>• Data pipeline orchestrator<br>• Internal reporting tool |
| **Internal + Partners** | Vendor/client integrations, trusted third parties | • Client portal agent<br>• Vendor API integration<br>• Partner data exchange<br>• Contractor-accessible tools |
| **External/Public** | Customer-facing, public APIs, end-user products | • Customer support chatbot<br>• Public-facing search<br>• Consumer mobile app agent<br>• Public website assistant |

---

#### 4. Reversibility (Can mistakes be undone?)

**Definition:** The ease and completeness with which the agent's actions can be reversed.

| Level | Description | Examples |
|-------|-------------|----------|
| **Easily Reversible** | Actions can be undone completely with no consequences | • Draft creation<br>• Suggestion lists<br>• Preview generation<br>• Local file edits with version control<br>• Adding items to cart |
| **Reversible with Effort** | Actions can be undone but require work or coordination | • Calendar changes (need to renotify attendees)<br>• Sent internal messages<br>• Published internal documents<br>• Status updates that trigger notifications |
| **Hard to Reverse** | Actions can technically be undone but with significant consequences | • Sent external emails<br>• Published public content<br>• Posted social media<br>• Submitted forms<br>• Triggered workflows affecting others |
| **Irreversible** | Actions cannot be meaningfully undone | • Payments or transactions<br>• Permanent deletions<br>• Filed legal documents<br>• Sent SMS/texts to customers<br>• Executed trades |

---

#### 5. Blast Radius (If it fails, how bad?)

**Definition:** The scope of impact if the agent makes an error or fails.

| Level | Description | Examples |
|-------|-------------|----------|
| **Single User** | Mistakes affect only the individual user | • Personal assistant<br>• Individual productivity tool<br>• Personal note-taker<br>• Single-user research tool |
| **Team** | Mistakes affect a small group | • Team calendar manager<br>• Shared project assistant<br>• Team document organizer<br>• Squad-level automation |
| **Organization** | Mistakes affect entire company | • Company-wide calendar system<br>• All-hands communication tool<br>• Enterprise security agent<br>• Organization-wide data processor |
| **External** | Mistakes affect customers, partners, or public | • Customer-facing support<br>• Public API responses<br>• Client deliverables<br>• Payment processing<br>• Public communications |

---

### How to Use Agent Characteristics

**During Agent Spec Creation (Section 9):**
1. Assess the agent on each characteristic dimension
2. Assign a level (Low, Medium, High, or Critical for Sensitivity; specific levels for others)
3. Provide reasoning for each characteristic level
4. Note implications for system prompt design
5. Flag any unusual combinations or tensions

**When Creating System Prompt:**
- Use characteristic levels to determine section robustness beyond base archetype
- High Sensitivity + High Autonomy = extra robust Hard Boundaries + audit requirements
- High Blast Radius + Low Reversibility = maximum validation + confirmation requirements
- External Exposure = careful tone guidance + customer-safe error messages

---

### Completeness Checklist

Use this checklist during the workflow to verify completeness at each step.

#### Step 1: Product Context & Agent Definition (Sections 2-3)
- [ ] Clear description of where the agent lives in the product flow
- [ ] User's starting state and journey documented
- [ ] User's goal and desired outcome specified
- [ ] Product constraints and requirements listed
- [ ] Success criteria from user perspective defined
- [ ] Agent purpose stated clearly (why it exists)
- [ ] Core task and responsibilities defined
- [ ] Success criteria for the agent specified
- [ ] Key assumptions documented

#### Step 2: Agent Operating Model (Section 4)
- [ ] Trigger & invocation method specified
- [ ] Interaction pattern defined (conversational, one-shot, silent, etc.)
- [ ] User visibility level clarified
- [ ] State & lifecycle documented
- [ ] Timing & latency expectations specified

#### Step 3: Behavior, I/O, Boundaries & Edge Cases (Sections 5-8)
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

#### Step 4: Agent Characteristics (Section 9)
- [ ] Level assessed for all 5 characteristics (Sensitivity, Autonomy, Exposure, Reversibility, Blast Radius)
- [ ] Reasoning for characteristic level provided
- [ ] Implications for implementation noted

#### Step 5: Final Specification Quality
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
- All 9 sections filled in with appropriate detail
- Section 1 (Agent Overview) metadata included
- Clear, unambiguous requirements
- Validated against completeness checklist
- Internal consistency verified

### Handoff
This agent specification serves as the primary input to the **System Prompt Creation Workflow**. The spec should contain everything needed to write a system prompt without requiring additional clarification about requirements.

---

## Success Criteria

This workflow succeeds when:
- [ ] **Complete coverage:** All 9 template sections are filled in with sufficient detail
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
