# System Prompt Template V3

A comprehensive template for creating high-quality system prompts for AI agents. Use alongside agent requirements gathered during discovery.

---

## 1. General Instructions

### Structure Rules
- Follow the template shell exactly. Do not reorder sections.
- Do not add sections not in the template.
- Include section tags even if content is minimal (add a brief note explaining why).

### Using the Configuration Tables
- Identify agent complexity first → use Robustness Table for section depth
- Identify agent characteristics → use Modifiers for content requirements
- Both tables are **recommendations, not blueprints**. Adjust if the agent has unusual needs.

### When Over Budget
If the generated prompt exceeds the target token range:
1. Verify "Skip" sections are empty
2. Reduce "Minimal" sections to 2-3 sentences
3. Trim examples (keep one good/bad pair, shorten reasoning)
4. Reduce "Standard" sections by cutting least decision-relevant content
5. **Never cut:** Identity core purpose, Hard Boundaries, Final Reminders

### Terminology Consistency
- Use identical terms in static instructions and dynamic context tags
- If instructions reference `<priority_level>`, dynamic context must use `<priority_level>`
- Define variables once, reference consistently throughout

### Style
- Be direct and prescriptive ("Do X" not "Consider doing X")
- If something is clear from template structure, don't explain it
- Avoid meta-commentary ("In this section we will...")

---

## 2. Agent Configuration

### 2a. Robustness Table

Determines section depth based on agent complexity.

#### Section Robustness by Complexity

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

#### Robustness Levels

| Level | Description | Budget |
|-------|-------------|--------|
| Skip | Omit entirely | 0% |
| Minimal | 2-4 sentences, essentials only | 2-5% |
| Standard | Complete section, no extras | 5-10% |
| Robust | Expanded with edge cases, multiple examples, nuanced guidance | 10-15% |

---

### 2b. Agent Characteristics & Modifiers

Characteristics capture risk dimensions independent of complexity. A simple tool-caller handling medical records needs stronger guardrails than a complex judgment agent scheduling internal meetings.

**Capture these during discovery. They shape how every section is written—not as bolt-on additions, but as foundational context.**

#### Characteristic Definitions

| Characteristic | Question | Levels |
|----------------|----------|--------|
| **Sensitivity** | What data does this agent access or handle? | Low / Medium / High / Critical |
| **Autonomy** | How much can it do without human confirmation? | Low / Medium / High |
| **Exposure** | Who sees this agent's outputs? | Internal / Partner / External |
| **Reversibility** | How easily can its actions be undone? | Easy / Moderate / Hard / Irreversible |
| **Blast Radius** | If it fails, who or what is affected? | User / Team / Org / External |

---

#### Sensitivity

*What data does the agent touch, and what's the damage if it leaks or is mishandled?*

**Low** — Public information, non-personal data
- No special handling required

**Medium** — Business data, internal documents, work context
- **Domain Context** should define what's internal-only vs. shareable
- **Operational Boundaries** should clarify what data can appear in responses to whom

**High** — PII, financial data, health information, legal documents
- **Hard Boundaries** must address data exposure as absolute prohibitions. The agent should never log sensitive fields in full, never include them in error messages, never store beyond immediate need. These aren't judgment calls—they're bright lines.
- **Domain Context** should include data handling principles: minimization, masking requirements, retention limits
- **Output Format** must specify how sensitive fields are masked or redacted in responses
- **Failure Handling** must address what to do if sensitive data surfaces unexpectedly (don't repeat it, don't log it, escalate)

**Critical** — Auth credentials, payment data, regulated data (HIPAA, SOX, GDPR-special-category)
- Everything from High, plus:
- **Hard Boundaries** must require explicit confirmation before any action involving critical data—even read operations that might expose it
- **Hard Boundaries** should require audit logging; if logging fails, the action should not proceed
- **Operational Boundaries** should shift most actions to "Confirm Before Acting"—autonomy must be narrow when critical data is involved
- **Failure Handling** must include incident escalation paths with specific owners

**Validation criteria:**
- [ ] If High+: Hard Boundaries explicitly prohibit logging/displaying sensitive fields
- [ ] If High+: Output Format specifies masking approach
- [ ] If Critical: Explicit confirmation required for critical data actions
- [ ] Sensitive data prohibitions framed as absolute (NEVER), not conditional

---

#### Autonomy

*How much can this agent do on its own, and what's the risk if it acts wrongly without oversight?*

**Low** — Suggestions only; human executes all actions
- **Identity** should clarify the agent's advisory role: "You suggest; you do not act"
- **Operational Boundaries** will have minimal "Handle Autonomously" scope—mostly information retrieval
- **Output Format** should frame outputs as recommendations, not actions taken ("I recommend..." not "I've done...")

**Medium** — Acts within defined scope; confirms edge cases
- **Operational Boundaries** should draw a clear line between autonomous scope and confirm-first scope
- **Decision Logic** should include guidance for when to act vs. when to ask—the reasoning for where the line is drawn

**High** — Broad action authority; minimal human oversight
- High autonomy requires strong guardrails elsewhere to compensate
- **Hard Boundaries** become more important—these are the few things it truly cannot do alone
- **Operational Boundaries** should have an expanded "Confirm Before Acting" section to catch high-risk actions even within broad authority
- **Decision Logic** must emphasize conservative defaults: "When uncertain, ask" or "When confidence is below X, confirm"
- **Failure Handling** should expand rollback and recovery procedures—if no human is watching, the agent needs to catch and correct its own mistakes
- **Final Reminders** should reinforce caution bias

**Validation criteria:**
- [ ] If Low: Identity clarifies advisory-only role
- [ ] If Low: Output Format uses recommendation framing
- [ ] If High: Decision Logic includes conservative defaults
- [ ] If High: Final Reminders reinforces caution under uncertainty
- [ ] Autonomy level matches Operational Boundaries scope

---

#### Exposure

*Who sees what this agent produces, and what's the damage if the wrong thing is said?*

**Internal** — Only internal team members see outputs
- Technical tone is acceptable
- Internal system details in error messages are fine (useful for debugging)
- No special restrictions on referencing internal tools, processes, or terminology

**Partner** — Vendors, clients, or integrated external systems see outputs
- **Identity** should specify professional tone
- **Hard Boundaries** should prohibit exposing internal system names, architecture details, or internal team structures
- **Output Format** should require error messages that are clear but don't reveal internal workings

**External** — Customers or public see outputs
- **Identity** must include explicit tone calibration for customer communication—warmth, clarity, trust-building
- **Hard Boundaries** must prohibit: referencing internal tools/teams/processes by name, revealing system limitations in ways that damage trust, exposing technical details that confuse or alarm
- **Domain Context** should include customer communication principles relevant to this audience
- **Output Format** requires customer-safe error messages that always include actionable next steps (never leave customer stuck)
- **Failure Handling** should include customer-appropriate escalation language ("Let me connect you with someone who can help with this")

**Validation criteria:**
- [ ] If Partner+: Hard Boundaries prohibit internal detail exposure
- [ ] If External: Identity includes customer-appropriate tone guidance
- [ ] If External: Output Format specifies customer-safe error message requirements
- [ ] If External: Failure Handling includes customer-facing escalation language

---

#### Reversibility

*If the agent does something wrong, how hard is it to undo?*

**Easy** — Drafts, suggestions, internal notes, read-only operations
- Lower confirmation threshold is acceptable
- **Operational Boundaries** can have broader autonomous scope

**Moderate** — Calendar changes, file edits, configuration updates
- **Operational Boundaries** should require confirmation for changes that affect others or external parties
- **Output Format** can include "undo" or "change this" affordances where the system supports it

**Hard** — Sent emails, published content, submitted forms, external communications
- **Hard Boundaries** must require preview before send/publish—the agent should never send without showing what will be sent
- **Operational Boundaries** should move all send/publish actions to "Confirm Before Acting"
- **Examples** should include at least one example showing the preview-confirm-execute flow

**Irreversible** — Payments, deletions, legal filings, binding external commitments
- **Hard Boundaries** must require explicit confirmation with clear action summary—user must understand exactly what will happen
- **Hard Boundaries** should prohibit batching irreversible actions—each one gets individual confirmation
- **Operational Boundaries** should require multi-step confirmation: preview → confirm understanding → execute
- **Output Format** should require confirmation acknowledgment before proceeding
- **Failure Handling** must address the "uncertain completion" problem: if unsure whether an irreversible action completed, assume it did; never retry

**Validation criteria:**
- [ ] If Hard+: Hard Boundaries require preview before send/publish
- [ ] If Irreversible: Multi-step confirmation flow addressed
- [ ] If Irreversible: Failure Handling addresses uncertain completion
- [ ] Reversibility level reflected in Operational Boundaries confirmation requirements

---

#### Blast Radius

*If this agent fails or makes a mistake, how far does the damage spread?*

**User** — Affects only the individual user
- Standard failure handling is sufficient
- Mistakes are contained and correctable

**Team** — Affects shared workspace, team data, or colleagues' work
- **Hard Boundaries** should prohibit modifying shared resources without surfacing who will be affected
- **Operational Boundaries** should require confirmation for actions that affect others' data or work
- **Failure Handling** should include notification guidance—affected parties should know something went wrong

**Org** — Affects organization-wide systems, data, or operations
- **Hard Boundaries** must prohibit org-wide changes without explicit authorization from appropriate authority
- **Operational Boundaries** should include staged rollout guidance for changes with broad impact
- **Failure Handling** must include rollback requirements and incident escalation with clear owners
- Consider adding pre-action validation checks within relevant sections

**External** — Affects customers, public perception, external partners, or systems outside the organization
- Everything from Org, plus:
- **Hard Boundaries** must require verification before any customer-impacting action
- **Failure Handling** should include customer communication templates for failures
- **Failure Handling** should include incident severity classification

**Validation criteria:**
- [ ] If Team+: Operational Boundaries requires confirmation for actions affecting others
- [ ] If Team+: Failure Handling addresses notification of affected parties
- [ ] If Org+: Rollback requirements documented
- [ ] If External: Customer communication guidance for failures included

---

#### Section Density Reference

Anticipate heavier modification in these sections:

| Section | Modified By | Density |
|---------|-------------|---------|
| Hard Boundaries | All 5 characteristics | Heaviest |
| Operational Boundaries | Sensitivity, Autonomy, Reversibility, Blast Radius | Heavy |
| Failure Handling | All 5 characteristics | Heavy |
| Output Format | Sensitivity, Autonomy, Exposure, Reversibility | Moderate |
| Identity | Autonomy, Exposure | Light-Moderate |
| Domain Context | Sensitivity, Exposure | Light-Moderate |
| Decision Logic | Autonomy | Light |
| Examples | Reversibility | Light |
| Final Reminders | Autonomy | Light |

---

#### Applying Characteristics

1. **Read characteristics before writing any section.** They're context, not patches.

2. **Weave, don't append.** A High Sensitivity agent's Hard Boundaries should feel like data protection was a design principle, not an afterthought.

3. **Compound effects are additive.** An agent with High Sensitivity + External Exposure + Irreversible actions gets all applicable guidance. When guidance overlaps, combine into coherent requirements.

4. **Higher level implies lower.** High Sensitivity includes Medium concerns. External Exposure includes Partner concerns. Don't repeat—assume escalation.

5. **Characteristics can reduce as well as add.** Low Autonomy means *less* in Operational Boundaries. Easy Reversibility means *fewer* confirmation requirements. Don't add guardrails that don't fit the risk profile.

---

## 3. Section Guidance

### Section 1: Identity & Purpose

**Answers:** "When I'm unsure what to do, what should I optimize for?"

**Guidelines:**
- Lead with role and purpose, not capabilities or features
- Purpose explains WHY the agent exists (outcome), not WHAT it does (features)
- Success metric must be observable—something you could measure or verify
- Autonomy statement clarifies what the agent can decide alone vs. must escalate
- If agent has no user-facing communication (backend/tool agent), omit tone
- If Autonomy is Low, clarify advisory-only role here
- If Exposure is External, include customer-appropriate tone calibration

**Common Mistakes:**
- Listing features instead of stating purpose
- Vague success metrics ("be helpful") instead of observable outcomes
- Missing autonomy boundaries

**Example:**
```
✅ GOOD:
You are a Scheduling Agent for professional services firms.
Purpose: Protect high-value time while maintaining relationship quality.
Success: The right meetings happen at the right times, minimal friction.
You have authority to reschedule internal meetings and suggest times.
You escalate: client-facing conflicts, overrides to protected time.

❌ BAD:
You are an AI assistant that helps with scheduling. You can check 
calendars, send invites, and find meeting times.
```
*Problems: No purpose, lists features, no success metric, no autonomy bounds*

---

### Section 2: Hard Boundaries

**Answers:** "What lines can I absolutely never cross?"

**Guidelines:**
- TRUE non-negotiables only—no exceptions, no judgment calls
- Keep short (5-10 items total). Too many dilutes attention.
- Use NEVER and ALWAYS—no soft language in this section
- If tempted to add "unless..."—it belongs in Operational Boundaries instead
- This section absorbs the most from characteristics—expect it to grow for high-risk agents
- Sensitivity High+: Add data exposure prohibitions (logging, error messages, storage)
- Sensitivity Critical: Add audit logging requirements
- Exposure Partner+: Add internal detail disclosure prohibitions
- Reversibility Hard+: Add preview-before-action requirements
- Reversibility Irreversible: Add batching prohibition, confirmation requirements
- Blast Radius Team+: Add shared resource modification restrictions
- Blast Radius Org+: Add org-wide change authorization requirements

**Common Mistakes:**
- Including soft preferences that belong elsewhere
- Too many items, causing all to be treated as suggestions
- Vague escalation triggers instead of specific conditions

**Example:**
```
✅ GOOD:
## NEVER
- Schedule over blocks marked "immovable" without explicit user override
- Disclose one client's calendar details to another client
- Confirm external meetings without user approval
- Include full email addresses in error messages or logs

## ALWAYS Escalate
- Client-facing meeting must be moved or cancelled
- Two high-priority events conflict with no clear resolution

❌ BAD:
## NEVER
- Be unhelpful
- Make mistakes
- Schedule meetings at bad times
```
*Problems: Vague, unenforceable, mixes preferences with prohibitions*

---

### Section 3: Domain Context

**Answers:** "What background do I need to make informed decisions?"

**Guidelines:**
- Include only context that affects agent behavior—not general FYI
- Define terms as THIS AGENT should interpret them, not dictionary definitions
- User characteristics should inform communication approach and assumptions
- Knowledge sources must be actionable (things agent can actually query)
- Sensitivity Medium+: Define what's internal-only vs. shareable
- Sensitivity High+: Include data handling principles (minimization, retention)
- Exposure External: Include customer communication principles

**Conditions:**
- Skip for simple tool-callers without domain knowledge needs
- Minimal for workflow executors: key terminology and constraints only
- Robust for multi-domain: may need sub-sections per domain

**Common Mistakes:**
- Generic context that doesn't change behavior
- Defining obvious terms
- Including context the agent can't use

**Example:**
```
✅ GOOD:
## Business Context
Mid-market law firms (50-200 attorneys). Billable hours drive revenue.
Partner time is the scarcest resource.

## Key Terminology
- **Billable meeting**: Client-facing, revenue-generating — highest priority
- **Protected time**: Reserved for deep work — respect unless billable conflict

## User Characteristics
Partners and senior associates. Time-poor, interruption-averse. Expect 
the system to make good decisions without configuration.

❌ BAD:
## Business Context
We help people with their calendars.

## Key Terminology  
- **Meeting**: When people get together
```

---

### Section 4: Decision Logic

**Answers:** "How do I reason through situations my instructions don't cover?"

**Guidelines:**
- This is the intelligence layer—most critical for judgment-heavy agents
- Explain REASONING behind principles, not just rules
- Priority hierarchy needs clear ordering with rationale for each level
- Tradeoff guidance should address common tensions this agent faces
- Goal: agent could use this to reason about novel situations
- Autonomy Medium: Include guidance for when to act vs. when to ask
- Autonomy High: Emphasize conservative defaults ("when uncertain, ask")

**Conditions:**
- Skip for simple tool-callers (they follow rules, not judgment)
- Minimal for workflow executors (basic priority order)
- Robust for judgment agents (their core capability)

**Common Mistakes:**
- Listing rules without reasoning ("Client meetings first"—why?)
- No priority hierarchy for conflicts
- Assuming all cases are covered

**Example:**
```
✅ GOOD:
## Core Reasoning Principles
1. **Revenue-generating time is sacred.** Client work pays the bills. 
   Protect billable time unless there's a compelling reason not to.
   
2. **Relationships have momentum.** New relationships are fragile—
   reliability matters more. Established relationships tolerate flexibility.

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
- Default to protecting the more fragile relationship

❌ BAD:
## Rules
1. Client meetings are priority 1
2. Internal meetings are priority 2  
3. Always check availability
```
*Problems: No reasoning, can't handle novel cases*

---

### Section 5: Operational Boundaries

**Answers:** "What's within my scope, and what requires approval or handoff?"

**Guidelines:**
- Clearly separate: autonomous / confirm-first / out-of-scope
- Escalation paths need specific destinations, not just "escalate"
- Out-of-scope items should include where to redirect
- Don't duplicate hard boundaries—those have no exceptions
- Autonomy Low: Minimal autonomous scope, mostly information retrieval
- Autonomy High: Expanded confirm-first to catch high-risk actions
- Sensitivity Critical: Shift most actions to confirm-first
- Reversibility Moderate+: Require confirmation for changes affecting others
- Blast Radius Team+: Require confirmation for actions affecting others' data

**Common Mistakes:**
- Unclear boundary between autonomous and confirm-first
- Vague escalation without specifying to whom
- Missing redirects for out-of-scope requests

**Example:**
```
✅ GOOD:
## Handle Autonomously
- Reschedule internal meetings to resolve conflicts
- Suggest optimal times based on preferences
- Decline requests conflicting with protected time (with explanation)

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
```

---

### Section 6: Tool Integration

**Answers:** "How do I use external systems, and what if they fail?"

**Guidelines:**
- Specify WHEN to use each tool (trigger conditions)
- Include failure handling for every tool—tools fail
- Note dependencies if order matters
- Rate limits prevent overloading systems

**Conditions:**
- Skip if agent has no tools
- Minimal for judgment agents with simple tool needs
- Robust for tool-heavy agents

**Common Mistakes:**
- No failure handling
- Missing trigger conditions
- Undocumented dependencies

**Example:**
```
✅ GOOD:
### calendar_read
- **Purpose**: Get calendar events for a time range
- **When to use**: Before any scheduling decision
- **If it fails**: Tell user unavailable; don't guess availability

### calendar_write
- **Purpose**: Create, update, or delete events
- **When to use**: After user confirms (unless in autonomous scope)
- **If it fails**: Inform user; do not retry automatically

## Tool Sequencing
- Always calendar_read before calendar_write

## Constraints
- calendar_write: Max 10 operations/minute

❌ BAD:
## Tools
- calendar_read: reads the calendar
- calendar_write: writes to the calendar
```

---

### Section 7: Memory Management

**Answers:** "What should I remember vs. forget, and how do I handle contradictions?"

**Guidelines:**
- Be explicit about what persists within session vs. across sessions
- "Do NOT retain" prevents context pollution
- Contradiction handling prevents silent overwrites
- Session boundaries clarify what resets

**Conditions:**
- Skip for stateless tool-callers
- Standard for most multi-turn agents

**Common Mistakes:**
- Assuming agent knows what's worth remembering
- No contradiction guidance
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
- Abandoned options not selected

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
- Include empty tags with comment when data is missing (don't omit)
- Put request/task LAST—closest to model's generation point
- Document expected schema for injection pipeline

**Conditions:**
- Minimal for simple agents (just the request)
- Standard/Robust based on context needs

**Common Mistakes:**
- Tag names don't match static instruction references
- Missing tags when data absent
- Request buried in middle instead of end

**Schema Documentation:**
```
Include notes for each injection point:

### <user_preferences>
Required: yes/no
Fields: [list fields instructions depend on]
Example: [sample payload]

### <request>
Required: yes
Fields: action_type, participants (if any), constraints (if any)
```

---

### Section 9: Examples

**Answers:** "How should I think through decisions? What does good vs. bad look like?"

**Guidelines:**
- Reasoning traces are key—show THINKING, not just input→output
- Include at least one edge case requiring judgment
- Include at least one anti-example showing what NOT to do and why
- Keep examples representative of common scenarios
- Limit to 3-4 examples (more dilutes attention)
- Reversibility Hard+: Include example showing preview-confirm-execute flow

**Conditions:**
- Skip for simple tool-callers
- Standard for workflow executors (2-3 examples)
- Robust for judgment agents (3-4 with detailed reasoning)

**Common Mistakes:**
- Input→output without reasoning
- Only happy-path examples
- Missing anti-examples
- Too many examples

**Example Structure:**
```
## Example 1: [Scenario Type]
**Input:** [Request + relevant context]

**Reasoning:**
1. [First consideration]
2. [Second consideration]  
3. [Decision point]

**Output:** [Response]

---

## Anti-Example: What NOT to Do
**Input:** [Input that could be mishandled]

**❌ Wrong:** [Bad response]
Why: [Brief explanation]

**✅ Correct:** [Good response]
```

---

### Section 10: Output Format

**Answers:** "What should my responses look like?"

**Guidelines:**
- Define response structure for main response types
- Tone calibration works best through contrast ("Say X, not Y")
- Required elements ensure critical info always appears
- Length guidelines prevent over/under-communication
- Autonomy Low: Frame outputs as recommendations, not actions
- Sensitivity High+: Specify masking for sensitive fields
- Exposure External: Customer-safe error messages with actionable next steps
- Reversibility Moderate+: Include undo/change affordances where applicable
- Reversibility Irreversible: Require confirmation acknowledgment format

**Conditions:**
- If no user-facing output (backend), cover internal response format (e.g., JSON structure)

**Common Mistakes:**
- Vague tone descriptors without examples
- No contrast examples
- Missing length guidance

**Example:**
```
✅ GOOD:
## Response Structure
1. State action/recommendation (1 sentence)
2. Provide reasoning if non-obvious (1-2 sentences)
3. Clear next step or question

## Tone Calibration
Say: "Tuesday 3pm works well. Want me to send the invite?"
Not: "I have identified an available time slot at 1500 hours 
     pending your approval to dispatch an invitation."

## Required Elements
- Always state action taken or recommended
- Always end with clear next step

## Length
- Simple confirmations: 1-2 sentences
- Tradeoff decisions: 3-5 sentences with options
- Max 150 words unless user requests detail
```

---

### Section 11: Failure Handling

**Answers:** "What do I do when things go wrong?"

**Guidelines:**
- Cover common failure modes for this agent type
- Be specific about behavior—not "handle gracefully"
- Include user communication (if user-facing)
- Escalation criteria should be specific conditions
- This section absorbs significant modifier content for high-risk agents
- Sensitivity High+: Address unexpected sensitive data exposure
- Sensitivity Critical: Include incident escalation with specific owners
- Autonomy High: Expand rollback and self-correction procedures
- Exposure External: Include customer-appropriate escalation language
- Reversibility Irreversible: Address uncertain completion (assume completed, don't retry)
- Blast Radius Team+: Include affected party notification
- Blast Radius Org+: Include rollback requirements
- Blast Radius External: Include customer communication templates, severity classification

**Conditions:**
- Minimal for simple agents
- Standard/Robust based on failure mode complexity

**Common Mistakes:**
- Only happy-path instructions
- Vague guidance
- No user communication for failures

**Example:**
```
✅ GOOD:
## When Information Is Missing
- Missing calendar data → Ask user for availability; don't guess
- Missing relationship context → Use conservative defaults; note the gap

## When Confidence Is Low
- Unsure about priority → Ask, don't guess
- Multiple interpretations → Present options

## When Tools Fail
- calendar_read fails → "Calendar temporarily unavailable. 
  What times work for you?"
- calendar_write fails → Inform user; do not retry without asking

## When Unable to Help
1. Acknowledge what they're trying to do
2. Explain why you can't help
3. Redirect: "For [X], contact [specific alternative]"
```

---

### Section 12: Final Reminders

**Answers:** "What must I absolutely not forget?"

**Guidelines:**
- Restate only 2-3 most critical rules from earlier sections
- Include 2-3 common mistakes to avoid
- Keep extremely concise—reinforcement, not new information
- Benefits from recency effect (models weight ending content heavily)
- Autonomy High: Reinforce caution bias

**Conditions:**
- Skip for simple tool-callers
- Minimal to Standard for others

**Common Mistakes:**
- Introducing new rules (should only reinforce)
- Too many items
- Too long

**Example:**
```
✅ GOOD:
CRITICAL — Always remember:
1. Client-facing time is sacred — protect it
2. When in doubt, surface tradeoffs rather than deciding alone
3. Confirm before acting on anything external

Avoid:
- Moving meetings without checking relationship context
- Assuming "internal" means "freely movable"
- Executing when you should be confirming
```

---

## 4. Template Shell

Complete structure. Fill according to robustness table and characteristic modifiers.

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
1. [How to navigate complexity]
2. [Key judgment call]

**Output:** [Expected response]

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

## 5. Quality Checklist

Review the complete prompt against these criteria.

### Configuration Alignment
- [ ] Complexity level identified; robustness matches table
- [ ] All five characteristics identified and levels set
- [ ] Applicable modifiers integrated (not appended)
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
- [ ] List short enough to be memorable (5-10 max)
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
- [ ] Schema documented for injection pipeline
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

### Consistency
- [ ] Variable/tag names consistent throughout
- [ ] Terminology matches between static and dynamic sections
- [ ] No redundancy between sections
- [ ] Characteristic content woven in, not appended