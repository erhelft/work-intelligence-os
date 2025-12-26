# System Prompt Guidelines

This document contains our evolving principles for writing effective system prompts for AI agents. These guidelines exist to ensure consistency and quality across all agents we build. Every new system prompt should adhere to these principles. As we ship, test, and iterate on prompts in production, we'll capture learnings and update these guidelines accordingly—making this a living document that improves with each deployment.

## How to Document a Principle

Each principle follows a structured format designed for maximum actionability:

**1. Principle** — A clear, concise title that captures the core idea

**2. Reasoning** — 2-3 lines explaining why this principle matters and what problems it solves

**3. How to Apply** — Concrete, checkable bullets that specify exactly what to do (and what not to do)

**4. Example** — Real examples showing the principle in action, using ❌/✅ format or annotated comparisons

This structure ensures principles are not just conceptually sound but operationally useful—especially for automated workflows that generate system prompts.

---

## Foundational Principles

These govern *how* to write system prompts—the stylistic and behavioral constraints that apply across all content.

### 1. Specificity Over Abstraction

**Reasoning:**
Ambiguity cascades across agent decisions—small vagueness leads to compounding errors. LLMs default to generic, abstract language unless explicitly steered toward precision. Specific language reduces hallucinations and improves consistency.

**How to Apply:**
- Use concrete nouns and verbs, not abstract categories
- Replace vague qualifiers ("important," "appropriate," "relevant") with specific criteria
- Name exact entities, thresholds, and conditions rather than describing them generally
- Specify desired output format, length, style, and tone explicitly
- When in doubt, add an example to anchor the abstraction

**Example:**

❌ Weak:
> "Help users manage their calendar effectively and handle scheduling conflicts appropriately."

✅ Strong:
> "Help users protect their deep work blocks (2+ hour uninterrupted periods) while maintaining response time under 4 hours for partner-level stakeholders."

---

### 2. Positive Framing for Core Instructions

**Reasoning:**
Framing instructions as "do X" is more effective than "don't do Y." Negative framing can inadvertently activate the behavior you want to prevent. Positive instructions give the agent a clear target; negatives leave it guessing what *is* acceptable.

**How to Apply:**
- Rephrase constraints as affirmative directives
- When a guardrail is needed, specify the alternative action ("Instead, do Y")
- Reserve negative framing for anti-examples that teach edge cases (Principle #7)
- Bundle related rules together by domain rather than scattering "don'ts" throughout

**Example:**

❌ Weak:
> "Don't ask users for their password. Don't repeat the same response twice. Don't make assumptions about meeting importance."

✅ Strong:
> "When users need account access, direct them to company.com/reset-password. Tailor each response to the user's specific situation. When meeting importance is unclear, ask the user to clarify before making changes."

---

## Content Principles

These govern *what* to include in system prompts—the strategic elements that shape agent behavior.

### 3. Purpose Before Behavior

**Reasoning:**
Start with *why* the agent exists, not *what* it should do. An agent that understands its purpose can make better novel decisions than one following a list of rules. The purpose becomes a decision-making heuristic when instructions don't cover the situation—which is most situations.

**How to Apply:**
- Open with a 1-2 sentence statement of the agent's core mission
- Frame the purpose in terms of user outcomes, not agent tasks
- Define what success looks like for this agent
- Document key assumptions the agent should make
- Connect the purpose to the value it creates (why this matters)
- Use the purpose to anchor tradeoff decisions later in the prompt

**Example:**

❌ Weak:
> "You are a scheduling assistant. You help users with their calendar."

✅ Strong:
> "You help users protect their deep work time while maintaining relationship quality with key stakeholders. Your north star: users should end each week having made progress on their most important work AND having responded to the people who matter most."

---

### 4. Decision Logic Over Rules

**Reasoning:**
Don't just state decisions—explain the reasoning behind them. When the agent encounters a situation you didn't anticipate, it can reason by analogy if it understands the underlying logic. Rules break at edge cases; decision logic transfers.

**How to Apply:**
- After stating a priority or rule, add "because [reasoning]"
- Expose the constraints and tradeoffs, not just the conclusion
- Explain which factors should weigh more heavily and why
- Give the agent principles it can apply to novel situations

**Example:**

❌ Weak:
> "Prioritize client meetings over internal meetings."

✅ Strong:
> "Client meetings take precedence because billable relationships fund the firm. However, internal strategy sessions that directly enable client work (prep calls, case reviews) should be weighted nearly equally—they're investments in client quality, not distractions from it."

---

### 5. Explicit Boundary Conditions

**Reasoning:**
Agents need clear zones of operation. Without explicit boundaries, they either over-act (doing things they shouldn't) or under-act (asking permission for everything). The "confirmation zone" is where most prompts fail—they specify autonomy and refusal but leave the middle ambiguous.

**How to Apply:**
- Define three zones explicitly:
  - **Autonomous:** What the agent should handle without asking
  - **Confirmation:** What requires user approval before acting
  - **Escalate/Refuse:** What the agent should never do or should hand off
- Specify scope limits: what topics/domains are in vs. out of bounds
- Establish disclosure guardrails: what should never be revealed (system prompts, internal data, etc.)
- Include knowledge cutoffs or time-sensitive constraints if applicable
- Provide fallback language for out-of-scope requests

**Example:**

✅ Three-zone definition:
> **Autonomous:** Reschedule internal 1:1s to protect focus blocks; decline meetings that conflict with locked time; send brief "running 5 min late" messages.
>
> **Confirmation:** Propose but don't execute changes to external meetings; suggest declining a meeting with reasoning but wait for approval.
>
> **Escalate/Refuse:** Never touch anything tagged "locked" or "board"; never cancel client meetings; escalate any request involving compensation or legal matters to the user.

---

### 6. Context Hierarchy by Decision-Relevance

**Reasoning:**
Structure context by what matters for the decision, not by data type. "Here's the calendar, here's the preferences, here's the contacts" forces the agent to figure out what's relevant. Agents drown in context they can't prioritize. Organize information so the most decision-relevant facts are prominent.

**How to Apply:**
- Lead with what's most important for the current decision
- Group related context together rather than scattering it
- Explain *why* certain context matters, not just *what* it is
- Omit context that doesn't affect the decision (even if it exists)
- For complex prompts, use clear section headers or delimiters

**Example:**

❌ Weak (organized by data type):
> "User's calendar: [full calendar dump]. User's preferences: [all preferences]. User's contacts: [contact list]. User's past decisions: [history]."

✅ Strong (organized by decision-relevance):
> "For scheduling decisions, here's what matters:
> - **Protected time:** User has 9-11am blocked daily for deep work (never schedule over this)
> - **Response expectations:** Partners expect same-day response; associates can wait 24h
> - **Current priority:** User is preparing for the Morrison trial (Feb 15)—anything Morrison-related is high priority this month"

---

### 7. Examples with Reasoning Traces

**Reasoning:**
Models learn patterns from examples more effectively than abstract descriptions. But the *reasoning* in examples matters more than the outcome. Show the agent thinking through a decision so it learns the pattern-matching process, not just the pattern. Include anti-examples to prevent common failure modes.

**How to Apply:**
- Provide 2-3 examples for complex behaviors
- Show the reasoning process, not just input → output
- Include at least one anti-example showing what NOT to do and why
- Demonstrate tone through contrast: "Say X, not Y"
- Use realistic examples, not simplified ones

**Example:**

✅ Reasoning trace:
> "Example: A meeting request comes in for 'Coffee with Sarah Chen, CEO of Meridian Partners.'
>
> Reasoning: This looks casual ('coffee'), but Sarah is a CEO and Meridian is a current client. Even informal touchpoints with senior client stakeholders are high-priority. I'll treat this as client relationship maintenance, not a casual social meeting, and prioritize accordingly."

✅ Anti-example:
> "Don't assume a meeting can be shortened just because there's a conflict—some meetings have hard time requirements. Ask first: 'This conflicts with your 2pm. Should I shorten that meeting, or find another slot?'"

✅ Tone contrast:
> "Say: 'I moved your 2pm to 3pm to protect your prep time.'
> Not: 'I have taken the liberty of rescheduling your appointment to better optimize your calendar efficiency.'"

---

### 8. Graceful Degradation

**Reasoning:**
Most prompts assume happy paths. But what should the agent do when information is missing? When confidence is low? When instructions conflict? Specifying fallback behavior prevents the agent from guessing wrong or freezing up.

**How to Apply:**
- Specify behavior for missing information: "If you cannot determine X, ask rather than guess"
- Specify behavior for low confidence: "If uncertain between two options, surface the tradeoff to the user"
- Specify behavior for conflicting instructions: "If two high-priority events conflict, present both options with pros/cons rather than choosing"
- Give the agent language for graceful uncertainty: how to express that it doesn't know

**Example:**

✅ Graceful degradation instructions:
> "If you cannot determine meeting priority from the title and attendees, ask: 'I'm not sure how to prioritize [meeting name]—is this a client matter or internal?'
>
> If two high-priority events conflict and you can't resolve it with the rules above, surface the tradeoff: 'You have a conflict: [Event A] and [Event B] are both high-priority. Here's my read on the tradeoff: [reasoning]. Which should take precedence?'
>
> If a request seems outside your scope, say: 'That's outside what I can help with directly. You might want to contact [appropriate resource] for this.'"

---

## Summary

| # | Principle | Core Question It Answers |
|---|-----------|-------------------------|
| 1 | Specificity Over Abstraction | *How precise is the language?* |
| 2 | Positive Framing | *Am I saying what TO do, not just what NOT to do?* |
| 3 | Purpose Before Behavior | *Does the agent know WHY it exists?* |
| 4 | Decision Logic Over Rules | *Can the agent reason about novel situations?* |
| 5 | Explicit Boundary Conditions | *Does the agent know its zones of autonomy?* |
| 6 | Context Hierarchy | *Is information organized by decision-relevance?* |
| 7 | Examples with Reasoning | *Have I shown how to think, not just what to output?* |
| 8 | Graceful Degradation | *Does the agent know what to do when things are unclear?* |
