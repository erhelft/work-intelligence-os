# Agent Specification Template

## Last Updated

- **Date:** —
- **Iteration:** 0

---

## Overview

This template provides a structured format for documenting AI agent requirements. A complete agent specification serves as the requirements document for system prompt creation—it defines **what** the agent should do without prescribing **how** the implementation should work.

**Key Principle:** An agent spec is a product document, not a technical document. Focus on requirements, behaviors, and outcomes—not prompt engineering techniques.

**Spec vs. System Prompt:**
* **Agent Spec (this document):** Complete requirements in human-readable format. For humans to review, approve, and maintain. Organized by concept and domain.
* **System Prompt:** Same requirements translated into AI instructions. For the AI model to execute. Organized for AI comprehension using our 8 guidelines (positive framing, examples with reasoning traces, etc.).
* **Both should be detailed and complete.** The difference is format and audience, not level of detail. If a behavior matters, it must be specified in the agent spec.

**Template Structure:** 10 sections covering context, definition, operating model, tools, behavior, I/O, boundaries, edge cases, and risk characteristics.

---

## Template Structure

### 1. Agent Overview

**Purpose:** High-level summary of the agent and its role in the product.

**What to Include:**
* **Agent Name:** Clear, descriptive name
* **Version:** Version number (e.g., v1.0)
* **Last Updated:** Date of last spec update
* **Owner:** Person/team responsible for this agent
* **Status:** Draft / In Review / Approved / In Production

**Guidelines:**
* Keep this section brief—just metadata and quick reference
* Use consistent naming conventions across all agent specs
* Update version and date whenever the spec changes meaningfully

---

### 2. Product Context

**Purpose:** Describe where this agent lives in the product and what user journey it supports.

**What to Include:**
* **User Journey:** What brings the user to this agent?
* **User's Starting State:** What has the user done/seen before interacting with this agent?
* **User's Goal:** What is the user trying to accomplish?
* **Product Flow:** What happens before, during, and after agent interaction?
* **Success Definition:** What does success look like from the user's perspective?
* **Constraints:** Any product-level constraints (time, resources, dependencies)

**Guidelines:**
* Write from the user's perspective, not the system's
* Be specific about the user's mental model and expectations
* Include relevant product screenshots, flows, or diagrams if helpful
* Clarify what the user sees vs. what happens behind the scenes

**Example:**
> **User Journey:** User has just scheduled a new client meeting and wants to ensure it doesn't conflict with existing priorities.
>
> **User's Goal:** Protect time for high-priority work while accommodating the new meeting.
>
> **Product Flow:** After user confirms the new meeting, the agent reviews the calendar, identifies potential conflicts with deep work blocks, and either auto-resolves or presents options.

---

### 3. Agent Definition

**Purpose:** Define the agent's core purpose and mission.

**What to Include:**
* **Purpose Statement:** 1-2 sentences on why this agent exists
* **Core Task:** The primary job of this agent
* **North Star:** The key outcome the agent optimizes for
* **Success Criteria:** How to measure if this agent is working well
* **Key Assumptions:** Important assumptions about users, data, or context

**Guidelines:**
* Purpose should be outcome-focused, not task-focused
* Frame the north star in terms of user value, not system efficiency
* Success criteria should be measurable and user-centric
* Document assumptions explicitly—they're critical for prompt design

**Example:**
> **Purpose:** Help users protect their deep work time while maintaining relationship quality with key stakeholders.
>
> **Core Task:** Intelligently manage calendar conflicts and meeting scheduling to optimize for focus time.
>
> **North Star:** Users should end each week having made progress on their most important work AND having responded to the people who matter most.
>
> **Key Assumptions:**
> * Users have defined "deep work blocks" in their preferences
> * Meeting importance can be inferred from attendees and context
> * Users prefer proactive suggestions over reactive problem-solving

---

### 4. Agent Operating Model

**Purpose:** Define how the agent operates within the system—its trigger mechanism, interaction pattern, and lifecycle.

**What to Include:**
* **Trigger & Invocation:** How the agent gets started
* **Interaction Pattern:** How the agent communicates (or doesn't)
* **User Visibility:** What the user sees vs. what happens behind the scenes
* **State & Lifecycle:** How the agent maintains context across interactions
* **Timing & Latency:** When responses are expected and constraints

**Guidelines:**
* This is about HOW the agent operates in the system architecture, not WHAT it does
* Be explicit about whether this is user-facing or background automation
* Clarify synchronous vs. asynchronous behavior
* Document state management expectations

**Dimensions to Address:**

**Trigger & Invocation:**
* **User-initiated:** User explicitly invokes the agent (clicks button, asks question)
* **System-initiated:** Agent runs automatically based on system events or schedule
* **Event-driven:** Agent triggered by specific system events (new meeting created, email received)
* **Hybrid:** Combination of trigger types

**Interaction Pattern:**
* **Conversational:** Back-and-forth dialogue with user
* **One-shot:** Single input → single output, no follow-up
* **Silent/Background:** No direct user interaction, operates autonomously
* **Advisory:** Presents recommendations, user makes final decision
* **Transactional:** Executes actions based on user input

**User Visibility:**
* **Visible agent:** User knows they're interacting with an AI agent
* **Invisible automation:** User sees results but not the agent itself
* **Transparent:** Agent explains what it did and why
* **Opaque:** Agent acts without explanation (user just sees outcome)

**State & Lifecycle:**
* **Stateless:** Each invocation is independent, no memory between interactions
* **Session-based:** Maintains context during a conversation/session, forgets after
* **Persistent:** Remembers context across multiple sessions over time
* **Scoped memory:** Remembers specific things (preferences, past decisions) but not full history

**Timing & Latency:**
* **Real-time:** User waits for response (< 3 seconds expected)
* **Near real-time:** Short wait acceptable (3-10 seconds)
* **Asynchronous:** Agent processes in background, notifies when done
* **Batch:** Runs on schedule (hourly, daily, etc.)

**Example:**
> **Trigger:** System-initiated when a new meeting is added to calendar
>
> **Interaction Pattern:** Advisory (presents recommendations, waits for approval) for external meetings; Transactional (executes automatically) for internal meetings
>
> **User Visibility:** Transparent—user receives notification explaining what the agent did/recommends and why
>
> **State:** Session-based—remembers context of current scheduling decision, but doesn't maintain conversation history across different scheduling events
>
> **Timing:** Near real-time—processes within 5 seconds of meeting creation, sends notification with recommendation

---

### 5. Available Tools

**Purpose:** Document the external tools, APIs, and integrations the agent has access to.

**What to Include:**
* **Tool Name:** Clear identifier for each tool
* **Purpose:** What capability this tool provides to the agent
* **When to Use:** Trigger conditions or scenarios that warrant using this tool
* **Expected Inputs:** What data the tool needs to function
* **Expected Outputs:** What the tool returns
* **Known Constraints:** Rate limits, availability requirements, permissions needed
* **Criticality:** Is this tool essential (agent can't function without it) or supplementary?

**Guidelines:**
* List all tools the agent needs access to, even if implementation details are TBD
* Focus on what the tool enables, not how it works internally
* Note dependencies between tools if relevant (e.g., must authenticate before querying)
* If the agent has no tools (pure conversational), note "N/A — this agent operates without external tools"

**Example:**
> **Tool: calendar_read**
> * Purpose: Retrieve calendar events for a specified time range
> * When to Use: Before any scheduling decision; when user asks about availability
> * Expected Inputs: User ID, date range
> * Expected Outputs: List of events with title, time, attendees, priority
> * Constraints: Max 90-day lookback; rate limited to 100 calls/minute
> * Criticality: Essential — agent cannot make scheduling decisions without calendar data
>
> **Tool: calendar_write**
> * Purpose: Create, update, or delete calendar events
> * When to Use: After user confirms a scheduling action (or within autonomous scope)
> * Expected Inputs: Event details (title, time, attendees, etc.)
> * Expected Outputs: Confirmation with event ID, or error message
> * Constraints: Cannot modify events owned by other users; rate limited to 10 writes/minute
> * Criticality: Essential — agent cannot execute scheduling actions without this

---

### 6. Behavior Requirements

**Purpose:** Define how the agent should behave and make decisions.

**What to Include:**
* **Decision Logic:** Key decision-making frameworks or priorities
* **Key Behaviors:** Critical behaviors the agent must exhibit
* **Interaction Style:** How the agent communicates with users
* **Tone & Voice:** Personality and communication style
* **Quality Standards:** What "good output" looks like

**Guidelines:**
* Include reasoning for decisions, not just rules ("prioritize X because Y")
* Be specific about tradeoffs (when X conflicts with Y, prioritize Z)
* Provide examples of desired tone and interaction patterns
* Define quality in measurable terms where possible

**Example:**
> **Decision Logic:**
> * Client meetings take precedence over internal meetings because billable relationships fund the firm
> * However, internal strategy sessions that directly enable client work (prep calls, case reviews) should be weighted nearly equally
> * Deep work blocks should never be interrupted for routine meetings, only for urgent client matters
>
> **Tone & Voice:**
> * Professional but friendly—helpful colleague, not robotic assistant
> * Concise—respect user's time, get to the point
> * Confident in suggestions but humble about limitations
> * Example: "I moved your 2pm to 3pm to protect your prep time" (not "I have taken the liberty of rescheduling...")

---

### 7. Input/Output Specification

**Purpose:** Define what data the agent receives and what it produces.

**What to Include:**
* **Input Format:** Structure and format of input data
* **Input Sources:** Where data comes from (user input, API, database, etc.)
* **Required vs. Optional Inputs:** What's mandatory vs. nice-to-have
* **Output Format:** Structure and format of agent output
* **Output Delivery:** How/where outputs are delivered to user

**Guidelines:**
* Include actual schemas, data structures, or examples when available
* Specify data types, constraints, and validation rules
* Clarify what happens when optional inputs are missing
* Be explicit about output format—structured data vs. natural language

**Example:**
> **Input Format:**
> ```json
> {
>   "new_meeting": {
>     "title": "string",
>     "attendees": ["email"],
>     "duration": "number (minutes)",
>     "priority": "high | medium | low"
>   },
>   "calendar_context": {
>     "existing_events": [...],
>     "deep_work_blocks": [...],
>     "preferences": {...}
>   }
> }
> ```
>
> **Output Format:**
> * **If no conflicts:** Confirmation message + updated calendar
> * **If conflicts:** List of options with tradeoff analysis + recommendation

---

### 8. Boundary Conditions

**Purpose:** Define the agent's scope and autonomy levels.

**What to Include:**
* **Autonomous Zone:** What the agent can do without asking
* **Confirmation Zone:** What requires user approval before acting
* **Escalate/Refuse Zone:** What the agent should never do or must hand off
* **Scope Limits:** What topics/domains are in vs. out of bounds
* **Disclosure Guardrails:** What should never be revealed

**Guidelines:**
* Be exhaustive in defining zones—ambiguity here causes problems
* Use specific examples to clarify boundaries
* Document why certain things are in each zone
* Consider both capability limits and policy limits

**Example:**
> **Autonomous:**
> * Reschedule internal 1:1s to protect focus blocks
> * Decline meetings that conflict with locked time
> * Send brief "running 5 min late" messages
>
> **Confirmation:**
> * Propose (but don't execute) changes to external meetings
> * Suggest declining a meeting with reasoning, wait for approval
> * Recommend shortening a meeting, get user sign-off first
>
> **Escalate/Refuse:**
> * Never touch anything tagged "locked" or "board meeting"
> * Never cancel client meetings without explicit user instruction
> * Escalate any request involving compensation, legal, or HR matters
> * Never share user's calendar details with external parties

---

### 9. Edge Cases & Failure Modes

**Purpose:** Document known challenges, edge cases, and how the agent should handle them.

**What to Include:**
* **Known Edge Cases:** Scenarios that are tricky or unusual
* **Expected Failure Modes:** How/when the agent might struggle
* **Graceful Degradation:** What to do when things are unclear, including default fallback actions when normal logic doesn't apply
* **Uncertainty Handling:** How to express low confidence
* **Contradiction Handling:** How to behave when new information conflicts with earlier statements

**Guidelines:**
* Include real examples from user testing or anticipated scenarios
* Specify exact language or actions for each edge case
* Default to asking rather than guessing when uncertain
* Document any temporary limitations or known issues

**Example:**
> **Edge Cases:**
> * **Recurring meetings with one conflict:** Clarify if user wants to modify just this instance or all future instances
> * **Meeting with no clear priority indicators:** Ask user explicitly rather than guessing
> * **Calendar at max capacity:** Surface the tradeoff rather than trying to squeeze things in
>
> **Graceful Degradation:**
> * If priority unclear: "I'm not sure how to prioritize [meeting name]—is this a client matter or internal?"
> * If two high-priority events conflict: "You have a conflict: both [A] and [B] are high-priority. Here's the tradeoff: [reasoning]. Which should take precedence?"
> * If request is out of scope: "That's outside what I can help with. You might want to contact [resource] for this."
>
> **Contradiction Handling:**
> * If user provides conflicting preferences: Surface the discrepancy explicitly ("Earlier you said X, but now you're saying Y—which should I go with?")
> * Do not silently override earlier context; always confirm before updating

---

### 10. Agent Characteristics

**Purpose:** Assess this agent across key characteristics that inform system prompt design, guardrails, and operational requirements.

**What to Include:**
* **Level for Each Characteristic:** Assess each of the 5 core characteristics (Sensitivity, Autonomy, Exposure, Reversibility, Blast Radius)
* **Level Assignment:** Low, Medium, High, or Critical (for Sensitivity); specific levels per characteristic
* **Reasoning:** Why this agent has this characteristic level
* **Implications:** What this characteristic level means for system prompt design and implementation

**Guidelines:**
* Reference the Agent Characteristics Reference framework
* Assess each characteristic independently based on the agent's actual behavior
* Provide clear reasoning for each characteristic level
* Note any unusual combinations (e.g., High Autonomy + Critical Sensitivity)
* Flag any tensions or tradeoffs between characteristics

**Example:**

> **Sensitivity:** High
> * Reasoning: Agent accesses client meeting details, attendee information, and calendar patterns that may reveal confidential business relationships

>
> **Autonomy:** Medium
> * Reasoning: Users want proactive help but not surprises on important meetings; can act autonomously for routine internal meetings but must confirm for external stakeholders

>
> **Exposure:** Internal + Partners
> * Reasoning: Used by internal employees but may interface with external calendar systems (Google, Outlook) and meeting participants see agent actions (notifications, reschedules)

>
> **Reversibility:** Reversible with Effort
> * Reasoning: Calendar changes can be undone but require renotifying attendees; sent meeting updates may cause confusion if reversed

>
> **Blast Radius:** Team to Organization
> * Reasoning: Mistakes affect individual users primarily, but bad patterns could impact team coordination; calendar mishaps affect relationships


---

## Guidelines for Writing Agent Specs

### 1. Be Specific, Not Abstract
* ❌ "Handle scheduling appropriately"
* ✅ "Prioritize client meetings over internal meetings, except for client-prep work"

### 2. Include Reasoning
* ❌ "Never reschedule board meetings"
* ✅ "Never reschedule board meetings because they involve senior stakeholders with limited availability and high coordination costs"

### 3. Use Examples Liberally
* Show examples of good behavior, bad behavior, edge cases
* Include real user scenarios when possible
* Use concrete data in examples, not placeholders

### 4. Focus on Requirements, Not Implementation
* ❌ "Use a two-shot prompt with chain-of-thought reasoning"
* ✅ "Agent must explain its reasoning when presenting options"

### 5. Make Tradeoffs Explicit
* ❌ "Optimize for both speed and quality"
* ✅ "When speed and quality conflict, prioritize quality—users prefer waiting 10 seconds for a good recommendation over getting a fast but wrong one"

### 6. Document What You Don't Know
* If something is uncertain or TBD, say so explicitly
* Mark sections that need user research or further clarification
* Don't leave silent gaps—call them out

### 7. Be Complete, Not Lightweight
* ❌ "Handle conflicts appropriately" (too vague, will get lost in translation)
* ✅ "When two client meetings conflict, present both options with pros/cons. When client conflicts with internal, prioritize client unless internal is prep work for that client."
* The spec is where you define ALL the behaviors. Don't hold back thinking "we'll figure it out in the prompt"—if it's not in the spec, it might not make it to the prompt
* Write requirements in natural language for human readers, but be exhaustive about the behaviors

---

## Completeness Checklist

Use this checklist to verify your agent spec is complete before handing off to system prompt creation:

**Section 1: Agent Overview**
- [ ] All metadata fields filled in
- [ ] Version and date current
- [ ] Owner identified

**Section 2: Product Context**
- [ ] User journey clearly described
- [ ] User's starting state documented
- [ ] User's goal specified
- [ ] Product flow explained (before/during/after)
- [ ] Success defined from user perspective
- [ ] Constraints listed

**Section 3: Agent Definition**
- [ ] Purpose statement clear and outcome-focused
- [ ] Core task defined
- [ ] North star articulated
- [ ] Success criteria measurable
- [ ] Key assumptions documented

**Section 4: Agent Operating Model**
- [ ] Trigger & invocation method specified
- [ ] Interaction pattern defined
- [ ] User visibility level clarified
- [ ] State & lifecycle documented
- [ ] Timing & latency expectations specified

**Section 5: Available Tools**
- [ ] All required tools listed (or marked N/A if agent has no tools)
- [ ] Each tool has: name, purpose, when to use
- [ ] Expected inputs and outputs documented
- [ ] Known constraints noted (rate limits, permissions)
- [ ] Criticality assessed (essential vs. supplementary)

**Section 6: Behavior Requirements**
- [ ] Decision logic explained with reasoning
- [ ] Key behaviors listed
- [ ] Interaction style specified
- [ ] Tone & voice defined with examples
- [ ] Quality standards measurable

**Section 7: Input/Output Specification**
- [ ] Input format documented (with schema if applicable)
- [ ] Input sources identified
- [ ] Required vs. optional inputs clarified
- [ ] Output format documented
- [ ] Output delivery method specified

**Section 8: Boundary Conditions**
- [ ] Autonomous zone defined with examples
- [ ] Confirmation zone defined with examples
- [ ] Escalate/refuse zone defined with examples
- [ ] Scope limits specified
- [ ] Disclosure guardrails included

**Section 9: Edge Cases & Failure Modes**
- [ ] Known edge cases documented with handling
- [ ] Expected failure modes identified
- [ ] Graceful degradation behavior specified (including fallback defaults)
- [ ] Uncertainty handling defined
- [ ] Contradiction handling specified

**Section 10: Agent Characteristics**
- [ ] Level assessed for all 5 characteristics (Sensitivity, Autonomy, Exposure, Reversibility, Blast Radius)
- [ ] Reasoning provided for each characteristic level
- [ ] Implications for system prompt and implementation noted
- [ ] Any unusual combinations or tensions flagged

**Quality Standards**
- [ ] Specificity: No vague or abstract terms without definition
- [ ] Reasoning: Key decisions include "because" explanations
- [ ] Examples: Concrete examples provided throughout
- [ ] Completeness: No obvious gaps or missing information
- [ ] Clarity: Someone unfamiliar with the project could understand this

---

## Version History

Track major changes to this agent specification:

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | YYYY-MM-DD | [Name] | Initial specification |

---

## Notes & Open Questions

Use this section to capture:
* Open questions that need resolution
* Areas that need user research
* Known limitations or technical constraints
* Future enhancements under consideration
* Learnings from production deployment (if applicable)

