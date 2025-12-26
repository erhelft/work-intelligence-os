# System Prompt Template V2

This template guides the creation of high-quality system prompts for AI agents. Use it alongside the agent requirements gathered during discovery.

---

## General Instructions

### Structure Rules
- Follow the template shell exactly. Do not reorder sections.
- Do not add sections not in the template.
- Include section tags even if content is minimal (use a brief note explaining why minimal).

### Using the Robustness Table
- Identify agent complexity first based on discovery.
- Use the table to determine which sections to skip, minimize, or expand.
- The table is a **recommendation, not a blueprint**. Adjust if the agent has unusual needs (e.g., simple agent with complex tool dependencies).

### When Over Budget
If the generated prompt exceeds the target token range:
1. First, verify "Skip" sections are actually empty
2. Reduce "Minimal" sections to bare essentials (2-3 sentences)
3. Trim examples (keep one good/bad pair, shorten reasoning)
4. Reduce "Standard" sections by cutting least decision-relevant content
5. **Never cut:** Identity core purpose, Hard Boundaries, Final Reminders

### Terminology Consistency
- Use identical terms in static instructions and dynamic context tags
- If instructions reference `<priority_level>`, dynamic context must use `<priority_level>`
- If instructions describe behavior for "protected time blocks," dynamic context should use that exact phrase

### Style
- Be direct and prescriptive ("Do X" not "Consider doing X")
- If something is clear from the template structure, don't explain it
- Avoid meta-commentary ("In this section we will..." — just write the content)

---

## Robustness Table

### Section Robustness by Agent Complexity

|                           | Simple Tool-Caller | Workflow Executor | Judgment Agent | Multi-Domain Agent |
|---------------------------|-------------------|-------------------|----------------|-------------------|
| Identity & Purpose        | Minimal           | Standard          | Standard       | Robust            |
| Hard Boundaries           | Standard          | Standard          | Standard       | Robust            |
| Domain Context            | Skip              | Minimal           | Standard       | Robust            |
| Decision Logic            | Skip              | Minimal           | Robust         | Robust            |
| Operational Boundaries    | Standard          | Standard          | Standard       | Robust            |
| Tool Integration          | Standard          | Standard          | Minimal*       | Robust            |
| Memory Management         | Skip              | Standard          | Standard       | Standard          |
| Dynamic Context Injection | Minimal           | Standard          | Standard       | Robust            |
| Examples                  | Skip              | Standard          | Robust         | Robust            |
| Output Format             | Standard          | Standard          | Standard       | Standard          |
| Failure Handling          | Minimal           | Standard          | Standard       | Robust            |
| Final Reminders           | Skip              | Minimal           | Standard       | Standard          |
| **Target Total**          | **800-1200 tokens** | **1200-1800 tokens** | **1800-2500 tokens** | **2000-3000 tokens** |

*Judgment agents may have minimal tools or none

### Robustness Levels Defined

| Level    | Description | Budget Guidance |
|----------|-------------|-----------------|
| Skip     | Omit entirely. Include empty tags with a one-line note if helpful. | 0% |
| Minimal  | 2-4 sentences covering only the essentials. No examples or elaboration. | 2-5% |
| Standard | Complete section with all relevant content. No extras or edge cases. | 5-10% |
| Robust   | Expanded with additional detail, edge cases, multiple examples, or nuanced guidance. | 10-15% |

---

## Section Guidance

### Section 1: Identity & Purpose

**Answers:** "When I'm unsure what to do, what should I optimize for?"

**Guidelines:**
- Lead with role and purpose, not capabilities or features
- Purpose should explain WHY the agent exists (outcome), not WHAT it does (features)
- Success metric must be observable—something you could actually measure or verify
- Autonomy statement clarifies what the agent can decide alone vs. must escalate
- If agent has no user-facing communication (backend/tool agent), omit the tone line entirely

**Common Mistakes:**
- Listing features instead of stating purpose
- Vague success metrics ("be helpful") instead of observable outcomes
- Missing autonomy boundaries, leaving the agent to guess what it can decide

**Example:**
```
✅ GOOD:
You are a Scheduling Agent for professional services firms.
Purpose: Protect high-value time while maintaining relationship quality.
Success: The right meetings happen at the right times, with minimal friction.
You have authority to reschedule internal meetings and suggest times.
You escalate: client-facing conflicts, overrides to protected time.

❌ BAD:
You are an AI assistant that helps with scheduling. You can check 
calendars, send invites, and find meeting times. You are helpful.
```
*Problems: No purpose, lists features, vague tone, no success metric, no autonomy bounds*

---

### Section 2: Hard Boundaries

**Answers:** "What lines can I absolutely never cross?"

**Guidelines:**
- These are TRUE non-negotiables—no exceptions, no judgment calls
- Keep the list short (5-10 items total across all subsections). Too many dilutes attention.
- Use NEVER and ALWAYS—this section has no soft language
- Security/confidentiality rules should cover data the agent can access
- If you're tempted to add "unless..."—it's not a hard boundary, it goes in Operational Boundaries

**Common Mistakes:**
- Including soft preferences ("try to avoid") that belong elsewhere
- Too many items, causing the model to treat them all as suggestions
- Vague escalation triggers ("when things seem off") instead of specific conditions

**Example:**
```
✅ GOOD:
## NEVER
- Schedule over blocks marked "immovable" without explicit user override
- Disclose one client's calendar details to another client
- Confirm external meetings without user approval

## ALWAYS Escalate
- Client-facing meeting must be moved or cancelled
- Two high-priority events conflict with no clear resolution

❌ BAD:
## NEVER
- Be unhelpful
- Make mistakes
- Schedule meetings at bad times
- Forget to check the calendar
```
*Problems: Vague, not actually enforceable, mixes preferences with prohibitions*

---

### Section 3: Domain Context

**Answers:** "What background do I need to make informed decisions?"

**Guidelines:**
- Include only context that affects agent behavior—not general FYI
- Define terms as THIS AGENT should interpret them, not dictionary definitions
- User characteristics should inform how the agent communicates and what it assumes
- Knowledge sources must be actionable (things the agent can actually query or reference)
- Compliance constraints should be specific enough to apply in decisions

**Conditions:**
- Skip for simple tool-callers that don't need domain knowledge
- Minimal for workflow executors: just key terminology and constraints
- Robust for multi-domain: may need sub-sections per domain

**Common Mistakes:**
- Generic context that doesn't change behavior ("We are a company that serves clients")
- Defining obvious terms ("Meeting: a scheduled gathering")
- Including context the agent can't use (e.g., company history that doesn't affect decisions)

**Example:**
```
✅ GOOD:
## Business Context
Mid-market law firms (50-200 attorneys). Billable hours drive revenue.
Partner time is the scarcest resource.

## Key Terminology
- **Billable meeting**: Client-facing, revenue-generating — highest priority
- **Protected time**: Reserved for deep work — respect unless billable conflict
- **Internal**: Firm meetings — flexible, can be moved for billable needs

## User Characteristics
Partners and senior associates. Time-poor, interruption-averse. Expect 
the system to make good decisions without extensive configuration.

❌ BAD:
## Business Context
We help people with their calendars.

## Key Terminology  
- **Meeting**: When people get together
- **Calendar**: A tool for tracking time
```

---

### Section 4: Decision Logic

**Answers:** "How do I reason through situations my instructions don't explicitly cover?"

**Guidelines:**
- This is the intelligence layer—most critical for judgment-heavy agents
- Explain the REASONING behind principles, not just the rules themselves
- Priority hierarchy must have clear ordering with rationale for each level
- Tradeoff guidance should address the most common tensions this agent will face
- The goal: an agent could use this section to reason about novel situations

**Conditions:**
- Skip for simple tool-callers (they follow rules, not judgment)
- Minimal for workflow executors (basic priority order)
- Robust for judgment agents (this is their core capability)

**Common Mistakes:**
- Listing rules without explaining the logic ("Client meetings first" — why?)
- No priority hierarchy for when rules conflict
- Assuming all cases are covered—leaving no reasoning tools for edge cases

**Example:**
```
✅ GOOD:
## Core Reasoning Principles
1. **Revenue-generating time is sacred.** Client work pays the bills. 
   Protect billable time unless there's a compelling reason not to.
   
2. **Relationships have momentum.** New relationships are fragile—
   reliability matters more than efficiency. Established relationships 
   can tolerate flexibility.

3. **Context beats labels.** A "low priority" meeting with a key client 
   may matter more than "high priority" internal training. When labels 
   conflict with context, flag the tension.

## Priority Hierarchy
When signals conflict:
1. Explicit user overrides — human judgment wins
2. Client-facing commitments — revenue and reputation
3. Protected deep work — sustainable productivity
4. Internal meetings — important but movable

## Tradeoff Guidance
When two high-priority items conflict:
- Surface the tradeoff; don't decide unilaterally
- Provide context: relationship maturity, history, stakes
- Default to protecting the more fragile relationship

❌ BAD:
## Rules
1. Client meetings are priority 1
2. Internal meetings are priority 2  
3. Always check availability
```
*Problems: No reasoning, just rules. Agent can't handle novel cases.*

---

### Section 5: Operational Boundaries

**Answers:** "What's within my scope, and what requires approval or handoff?"

**Guidelines:**
- Clearly separate: autonomous / confirm-first / out-of-scope
- Escalation paths need a specific destination (who or what), not just "escalate"
- Out-of-scope items should include where to redirect
- Don't duplicate hard boundaries here—those have no exceptions, these have judgment

**Common Mistakes:**
- Unclear boundary between autonomous and confirm-first
- Vague escalation ("escalate if needed") without specifying to whom
- Missing redirects for out-of-scope requests

**Example:**
```
✅ GOOD:
## Handle Autonomously
- Reschedule internal meetings to resolve conflicts
- Suggest optimal times based on preferences
- Decline requests that conflict with protected time (with explanation)

## Confirm Before Acting
- Move any meeting with external participants
- Schedule outside normal working hours
- Cancel meetings (vs. rescheduling)

## Out of Scope — Redirect
- Travel booking → "For travel, use [travel system]"
- Expense questions → "Contact finance@company.com"

## Escalation Paths
- No clear resolution → Surface options to user
- External complaints → User + office manager
- System errors → admin@company.com
```

---

### Section 6: Tool Integration

**Answers:** "How do I use external systems, and what if they fail?"

**Guidelines:**
- Specify WHEN to use each tool (trigger conditions), not just what it does
- Include failure handling for every tool—tools fail, plan for it
- Note dependencies if order matters (Tool A must complete before Tool B)
- Rate limits and constraints prevent the agent from overloading systems

**Conditions:**
- Skip if agent has no tools
- Minimal for judgment agents with simple tool needs
- Robust for tool-heavy agents or complex integrations

**Common Mistakes:**
- No failure handling (what happens when the API times out?)
- Missing trigger conditions (agent guesses when to use tools)
- Undocumented dependencies causing failed tool chains

**Example:**
```
✅ GOOD:
### calendar_read
- **Purpose**: Get calendar events for a time range
- **When to use**: Before any scheduling decision
- **If it fails**: Tell user calendar is unavailable; don't guess availability

### calendar_write
- **Purpose**: Create, update, or delete events
- **When to use**: After user confirms (unless in autonomous scope)
- **If it fails**: Inform user; do not retry automatically

## Tool Sequencing
- Always calendar_read before calendar_write
- contact_lookup before decisions involving external parties

## Constraints
- calendar_write: Max 10 operations/minute

❌ BAD:
## Tools
- calendar_read: reads the calendar
- calendar_write: writes to the calendar
```
*Problems: No trigger conditions, no failure handling, no sequencing*

---

### Section 7: Memory Management

**Answers:** "What should I remember vs. forget, and how do I handle contradictions?"

**Guidelines:**
- Be explicit about what persists within session vs. across sessions
- "Do NOT retain" is as important as "retain"—prevents context pollution
- Contradiction handling prevents the agent from silently overwriting information
- Session boundaries clarify what resets when

**Conditions:**
- Skip for stateless tool-callers
- Standard for most multi-turn agents
- Consider whether your agent even has cross-session memory

**Common Mistakes:**
- Assuming the agent knows what's worth remembering
- No guidance on contradictions (new info vs. old info)
- Unclear session boundaries

**Example:**
```
✅ GOOD:
## Retain Across Turns
- User's stated preferences for this session
- Decisions made and commitments given
- Corrections user has provided

## Do NOT Retain
- Speculative statements ("I think maybe...")
- Off-topic information mentioned in passing
- Abandoned options that weren't selected

## Handling Contradictions
If new information conflicts with earlier statements:
1. Note the discrepancy explicitly
2. Ask for confirmation before updating
3. Do not silently override

## Session Boundaries
- Within session: Full context retained
- Across sessions: Only persistent user preferences
```

---

### Section 8: Dynamic Context Injection

**Answers:** "Where does session-specific information go?"

**Guidelines:**
- Use exact tag names that static instructions reference
- Include empty tags with a comment when data is missing (don't omit)
- Put the request/task LAST—closest to where the model generates response
- Document the expected schema so the injection pipeline knows what to provide

**Conditions:**
- Minimal for simple agents (just the request)
- Standard/Robust based on how much context the agent needs per session

**Common Mistakes:**
- Tag names don't match what static instructions reference
- Missing tags when data is absent (instead of empty tags with note)
- Request buried in the middle instead of at the end

**Schema Documentation:**
Include notes about what each injection point expects:
```
## Expected Schemas

### <user_preferences>
Scheduling rules, time blocks, communication preferences.
Required fields: [list any fields that instructions depend on]

### <current_state>
Calendar state, pending items, current time.
Required fields: [list]

### <request>
The specific action or decision needed.
Required fields: action_type, participants (if any), constraints (if any)
```

---

### Section 9: Examples

**Answers:** "How should I think through decisions? What does good vs. bad look like?"

**Guidelines:**
- Reasoning traces are the key—show the THINKING, not just input→output
- Include at least one edge case that requires judgment
- Include at least one anti-example showing what NOT to do and why
- Keep examples representative of common scenarios the agent will face
- Limit to 3-4 examples total (more dilutes attention)

**Conditions:**
- Skip for simple tool-callers
- Standard for workflow executors (2-3 examples)
- Robust for judgment agents (3-4 examples with detailed reasoning)

**Common Mistakes:**
- Input→output without reasoning (model can't learn the pattern)
- Only happy-path examples (model fails on edge cases)
- Missing anti-examples (model makes predictable mistakes)
- Too many examples (attention dilution)

**Example Structure:**
```
## Example 1: [Scenario Type]
**Input:** [Request + relevant context]

**Reasoning:**
1. [First consideration]
2. [Second consideration]
3. [Decision point]
4. [Conclusion]

**Output:** [Response]

---

## Anti-Example: What NOT to Do
**Input:** [Input that could be mishandled]

**❌ Wrong:** [Bad response]
Why: [2-3 words explaining the problem]

**✅ Correct:** [Good response]
```

---

### Section 10: Output Format

**Answers:** "What should my responses look like?"

**Guidelines:**
- Define response structure for main response types
- Tone calibration works best through contrast ("Say X, not Y")
- Required elements ensure critical information always appears
- Length guidelines prevent over/under-communication

**Conditions:**
- If agent has no user-facing output (pure backend), this section covers internal response format (e.g., JSON structure)
- Adjust tone guidance based on audience (technical users vs. executives vs. general)

**Common Mistakes:**
- Vague tone descriptors ("be professional") without examples
- No contrast examples to calibrate style
- Missing length guidance (agent produces walls of text or terse non-answers)

**Example:**
```
✅ GOOD:
## Response Structure
1. State action/recommendation (1 sentence)
2. Provide reasoning if non-obvious (1-2 sentences)
3. Clear next step or question

## Tone Calibration
Say: "Tuesday 3pm works well. Want me to send the invite?"
Not: "I have identified an available time slot at 1500 hours on Tuesday 
     and placed a tentative hold pending your approval."

## Required Elements
- Always state the action taken or recommended
- Always end with clear next step

## Length
- Simple confirmations: 1-2 sentences
- Tradeoff decisions: 3-5 sentences with options
- Never exceed 150 words without user requesting detail
```

---

### Section 11: Failure Handling

**Answers:** "What do I do when things go wrong?"

**Guidelines:**
- Cover the most common failure modes for this agent type
- Be specific about behavior—not "handle gracefully" but exactly what to do
- Include what to communicate to users (if user-facing)
- Escalation criteria should be specific conditions, not vibes

**Conditions:**
- Minimal for simple agents (basic error messages)
- Standard/Robust based on how many ways things can fail

**Common Mistakes:**
- Only happy-path instructions (agent freezes or hallucinates on errors)
- Vague guidance ("handle errors appropriately")
- No user communication guidance (agent fails silently)

**Example:**
```
✅ GOOD:
## Missing Information
- Missing calendar data → Ask user for availability; don't guess
- Missing relationship context → Use conservative defaults; note the gap

## Low Confidence
- Unsure about priority → Ask, don't guess
- Multiple valid interpretations → Present options

## Tool Failures  
- calendar_read fails → "Calendar temporarily unavailable. What times work for you?"
- calendar_write fails → Inform user; do not retry without asking

## Unable to Help
1. Acknowledge what they're trying to do
2. Explain why you can't help
3. Redirect: "For [X], contact [specific alternative]"
```

---

### Section 12: Final Reminders

**Answers:** "What must I absolutely not forget?"

**Guidelines:**
- Restate only the 2-3 most critical rules from earlier sections
- Include 2-3 most common mistakes to avoid
- Keep extremely concise—this is reinforcement, not new information
- This section benefits from recency effect (models weight ending content heavily)

**Conditions:**
- Skip for simple tool-callers (not enough complexity to warrant)
- Minimal to Standard for others

**Common Mistakes:**
- Introducing new rules here (should only reinforce existing ones)
- Too many items (defeats the purpose of emphasis)
- Too long (dilutes the recency effect benefit)

**Example:**
```
✅ GOOD:
CRITICAL — Always remember:
1. Client-facing time is sacred — protect it
2. When in doubt, surface tradeoffs to user rather than deciding alone
3. Confirm before acting on anything external

Avoid:
- Moving meetings without checking relationship context
- Assuming "internal" means "freely movable"
- Executing when you should be confirming
```

---

## Template Shell

This is the complete structure. Fill each section according to the robustness table and guidelines above.

```
<system_prompt>

<identity>
You are [ROLE], [BRIEF_DESCRIPTION].

Your purpose is to [CORE_PURPOSE — why you exist, the outcome you enable].

Success means: [OBSERVABLE_SUCCESS_METRIC].

[IF USER-FACING: You communicate in a [TONE] manner, appropriate for [AUDIENCE].]

You have authority to [AUTONOMOUS_ACTIONS]. 
You escalate [ESCALATION_TRIGGERS].
</identity>

<hard_boundaries>
## NEVER
- [Absolute prohibition 1]
- [Absolute prohibition 2]
- [Absolute prohibition 3]

## ALWAYS Escalate When
- [Non-negotiable trigger 1]
- [Non-negotiable trigger 2]

## Security & Confidentiality
- [Security rule 1]
- [Security rule 2]
</hard_boundaries>

<domain_context>
## Business Context
[2-4 sentences: industry, business model, what matters]

## Key Terminology
- **[Term]**: [Definition as this agent should interpret it]
- **[Term]**: [Definition]

## User Characteristics
[Who uses this agent, their expertise level, what they expect]

## Knowledge Sources
[What data/systems the agent can access or reference]

## Compliance & Constraints  
[Regulatory, policy, or legal constraints affecting decisions]
</domain_context>

<decision_logic>
## Core Reasoning Principles
1. **[Principle name]**: [Principle with underlying reasoning]
2. **[Principle name]**: [Principle with underlying reasoning]
3. **[Principle name]**: [Principle with underlying reasoning]

## Priority Hierarchy
When signals conflict, prioritize:
1. [Highest priority] — [why]
2. [Second priority] — [why]
3. [Third priority] — [why]
4. [Fourth priority] — [why]

## Tradeoff Guidance
When facing [common tension]:
- [How to weigh the factors]
- [Default behavior]
- [When to deviate from default]
</decision_logic>

<operational_boundaries>
## Handle Autonomously
- [Task type the agent can do without asking]
- [Task type]

## Confirm Before Acting
- [Task type requiring user approval]
- [Task type]

## Out of Scope — Redirect
- [Out of scope request] → [Where to redirect]
- [Out of scope request] → [Where to redirect]

## Escalation Paths
- [Situation] → [Specific person/team/system]
- [Situation] → [Specific destination]
</operational_boundaries>

<tools>
## Available Tools

### [tool_name]
- **Purpose**: [What it does]
- **When to use**: [Trigger conditions]
- **If it fails**: [Specific fallback behavior]

### [tool_name]
- **Purpose**: [What it does]
- **When to use**: [Trigger conditions]
- **If it fails**: [Specific fallback behavior]

## Tool Sequencing
[Dependencies and ordering if applicable]

## Constraints
[Rate limits, usage restrictions]
</tools>

<memory>
## Retain Across Turns
- [What to remember]
- [What to remember]

## Do NOT Retain
- [What to forget]
- [What to forget]

## Handling Contradictions
[How to resolve when new info conflicts with prior info]

## Session Boundaries
[What persists vs. resets across sessions]
</memory>

<dynamic_context>
<!-- 
INJECTION POINT: Session-specific content populated here.
Static instructions above reference these tags by name.
Include empty tags with a note if data is unavailable.
-->

<user_preferences>
{{USER_PREFERENCES}}
</user_preferences>

<current_state>
{{CURRENT_STATE}}
</current_state>

<relevant_data>
{{RELEVANT_DATA}}
</relevant_data>

<request>
{{CURRENT_REQUEST}}
</request>
</dynamic_context>

<examples>
## Example 1: [Common Scenario]
**Input:** [Representative input with context]

**Reasoning:**
1. [Consideration]
2. [Consideration]
3. [Decision]

**Output:** [Expected response]

---

## Example 2: [Edge Case]
**Input:** [Tricky or ambiguous input]

**Reasoning:**
1. [How to navigate the complexity]
2. [Key judgment call]

**Output:** [Expected response, possibly including clarification request]

---

## Anti-Example: What NOT to Do
**Input:** [Input that could be mishandled]

**❌ Wrong:** [Bad response]
Why: [Brief explanation]

**✅ Correct:** [Good response]
</examples>

<output_format>
## Response Structure
[Expected structure for typical responses]

## Tone Calibration
Say: "[Good example]"
Not: "[Bad example]"

## Required Elements
[What must always appear in responses]

## Length Guidelines
[Expectations for response length by type]
</output_format>

<failure_handling>
## When Information Is Missing
[Specific behavior]

## When Confidence Is Low
[Specific behavior]

## When Tools Fail
[Specific behavior]

## When Unable to Help
[How to communicate and redirect]
</failure_handling>

<final_reminders>
CRITICAL — Always remember:
1. [Most important rule]
2. [Second most important]
3. [Third most important]

Avoid:
- [Common mistake 1]
- [Common mistake 2]
</final_reminders>

</system_prompt>
```

---

## Quality Checklist

After generating the full prompt, review against this checklist:

### Identity & Purpose
- [ ] Purpose explains WHY, not just WHAT
- [ ] Success metric is observable/measurable
- [ ] Autonomy boundaries are explicit
- [ ] Tone included only if user-facing

### Hard Boundaries
- [ ] All items are truly non-negotiable (no "unless...")
- [ ] List is short enough to be memorable (5-10 items max)
- [ ] NEVER/ALWAYS language used (no soft hedging)
- [ ] Security rules cover data the agent accesses

### Domain Context
- [ ] Every piece of context affects agent behavior
- [ ] Terminology definitions are agent-specific, not generic
- [ ] User characteristics inform communication approach
- [ ] Knowledge sources are actionable

### Decision Logic
- [ ] Principles include reasoning, not just rules
- [ ] Priority hierarchy has clear ordering with rationale
- [ ] Tradeoff guidance covers common tensions
- [ ] Agent could reason about novel situations using this

### Operational Boundaries
- [ ] Clear separation: autonomous / confirm / out-of-scope
- [ ] Escalation paths have specific destinations
- [ ] Out-of-scope items include redirects

### Tool Integration
- [ ] Each tool has trigger conditions (when to use)
- [ ] Each tool has failure handling
- [ ] Dependencies documented if order matters

### Memory Management
- [ ] Explicit what to retain vs. forget
- [ ] Contradiction handling specified
- [ ] Session boundaries clear

### Dynamic Context
- [ ] Tag names match static instruction references exactly
- [ ] Schema documented for injection pipeline
- [ ] Request positioned last

### Examples
- [ ] Reasoning traces included (not just input→output)
- [ ] At least one edge case
- [ ] At least one anti-example with explanation
- [ ] 3-4 examples maximum

### Output Format
- [ ] Tone calibrated with contrast examples
- [ ] Required elements specified
- [ ] Length guidelines included

### Failure Handling
- [ ] Common failure modes covered
- [ ] Specific behaviors, not vague guidance
- [ ] User communication included (if user-facing)

### Final Reminders
- [ ] Only 2-3 critical rules (reinforcement, not new)
- [ ] Common mistakes listed
- [ ] Kept concise

### Overall
- [ ] Total length within target range for agent complexity
- [ ] Terminology consistent between static and dynamic sections
- [ ] No redundancy between sections
- [ ] Robustness levels match agent complexity