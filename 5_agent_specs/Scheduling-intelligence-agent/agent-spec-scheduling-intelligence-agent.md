# Agent Specification: Scheduling Intelligence Agent

## 1. Agent Overview

**Agent Name:** Scheduling Intelligence Agent

**Version:** v1.0

**Last Updated:** January 6, 2026

**Owner:** Product Team

**Status:** Draft

**Quick Summary:**
The Scheduling Intelligence Agent is the decision-making brain of the coordination flow for law firm meeting scheduling. It processes attendee responses, assesses coordination status, and determines optimal next actions—all while prioritizing respectful client communication and firm reputation protection.

---

## 2. Product Context

### User Journey

**Starting State:**
An EA or lawyer at a law firm has:
1. Defined a scheduling operation (participants, event length, time range)
2. Built a heatmap showing time slot scores based on conflicts
3. Selected a specific time slot from the heatmap
4. Added event details (title, location, description, etc.)
5. Chosen "Confirm First" coordination flow
6. Customized coordination settings and clicked "Confirm & Send"

The system now begins coordinating with external attendees to confirm the proposed meeting time.

**User's Goal:**
- Get meetings scheduled autonomously, accurately, and efficiently
- Protect firm's brand and professional reputation with clients/prospects
- Respect clients' (external attendees') time and maintain relationship quality
- Stay informed about coordination status throughout the process
- Trust the system's decisions and recommendations

### Product Flow

**Before Agent Interaction:**
- User has selected optimal time slot using heatmap
- Internal attendees' calendars already visible (availability known)
- External coordination settings configured

**During Agent Interaction:**
- Agent is triggered by: user action ("Confirm & Send"), incoming email from attendee, cron job (for follow-ups), potentially other flows
- Agent processes each attendee response as it arrives
- Agent updates coordination status continuously
- EA/lawyer monitors progress on coordination page

**After Agent Interaction:**
- Backend executes agent's decisions (updates DB, forwards instructions to Communication Agent)
- Communication Agent sends emails based on agent's instructions
- When all confirmed: system books event automatically
- When blocked: user makes decision based on agent's recommendations

### Success Definition

**From User Perspective:**

1. **Vanilla case (optimal):** Everyone confirmed, event scheduled autonomously while system handled all back-and-forth

2. **During coordination:** Clear, accurate visibility into each attendee's likelihood to attend and current status

3. **Complex case:** System provides clear status and thoughtful, accurate recommendations when escalating for user decision

4. **Throughout:** Communication with external attendees is respectful, professional, and protects firm's brand

**Success Metrics:**
- **Operational:** High completion rate (booked or clearly abandoned vs. stuck), low interaction count per coordination, high autonomy rate (minimal user intervention), minimal unneeded interactions
- **Trust:** Accurate scores/reasoning that match outcomes, appropriate escalations (escalate when should, don't when shouldn't)

### Constraints

**Product-Level Constraints:**
- Coordination must complete before meeting date
- No hard limit on follow-up iterations (reasoning-based, soft guidance around 4-5 attempts)
- Backend handles all actual execution (agent only produces decisions)
- Data availability limited to what's in scheduling operation + coordination objects

**User Expectations:**
- Accuracy and trust prioritized over speed and autonomous completion
- When uncertain, escalate rather than proceed
- Never waste external attendees' time with redundant or inappropriate outreach

### Key Assumptions

1. **Email behavior:** People read email and respond in reasonable timeframes (no response has meaning)
2. **Data accuracy:** Scheduling operation data is complete and accurately represents attendee statuses
3. **Sequential responses:** Responses typically come one at a time (though simultaneous possible)
4. **Message interpretability:** NOT assumed—agent must handle unclear/ambiguous responses and has internal escalation path when it can't interpret
5. **Timezone:** When not specified, times are assumed to be in event's timezone
6. **Attendee criticality:** External attendees are almost always required; internal attendees typically optional/support

---

## 3. Agent Definition

### Purpose Statement

Make intelligent coordination decisions that lead to efficient, respectful meeting scheduling while maintaining user trust through accurate assessments and appropriate escalations.

### Core Task

Process attendee responses during coordination and produce structured output specifying:
1. **Attendee score + reason** (reasoning-based assessment with guidelines)
2. **Attendee engagement level** (structured assessment: High/Medium/Low)
3. **Attendee next action** (strategic decision from defined menu)
4. **Event score + reason** (reasoning-based assessment with guidelines)
5. **Event next action** (strategic decision from defined menu)
6. **Follow-up date** (timing decision for re-engagement)
7. **Suggested alternative times** (extraction and maintenance of attendee-proposed times)

### North Star

**By priority:**

1. **Decision quality that results in respectful communication** — No unnecessary outreach, accurate interpretation of responses, appropriate follow-ups. Respect external attendees' time and protect firm's reputation.

2. **Coordination efficiency** — Minimize interactions needed to reach clear conclusion (booked or abandoned).

3. **User confidence** — EA/lawyer trusts the system's assessments and recommendations.

4. **Decision clarity** — Scores and reasoning are accurate, understandable, and enable good judgment.

### Success Criteria

**How we know this agent is working well:**

1. **Events are scheduled** — High percentage of coordinations reach clear conclusion (booked or abandoned) vs. getting stuck

2. **Fast coordination** — Low number of interactions needed to schedule an event

3. **Autonomous operation** — High percentage handled without EA/lawyer intervention

4. **Respectful of guests** — Minimal "unneeded" interactions (redundant questions, reaching out when answer is clear, continuing when outcome is obvious)

5. **Users trust results** — Attendee/event scores and reasons accurately reflect reality; users accept recommendations

6. **Right escalations** — Escalates when needed, handles autonomously when appropriate

---

## 4. Agent Operating Model

### Trigger & Invocation

**The agent is triggered by:**

1. **Backend trigger** — User action (clicks "Confirm & Send")
2. **Email message trigger** — External attendee responds to coordination email
3. **Cron job trigger** — System checks follow_up_date; when current_time >= follow_up_date, triggers agent to execute follow-up
4. **Potentially other flows** — Future expansion possible

**How it works:**
- Agent processes ONE attendee at a time (receives single coordination object)
- Agent schedules its own future invocations by setting follow_up_date in output
- When follow_up_date is reached, cron triggers agent with same coordination object

### Interaction Pattern

**Advisory** — The agent makes recommendations and assessments via structured JSON output.

- Agent does not communicate directly with users or attendees
- Agent does not execute actions itself
- Agent outputs decisions; backend and Communication Agent execute them
- Agent instructs Communication Agent what to do; Communication Agent crafts and sends actual messages

### User Visibility

**What EA/Lawyer sees (on coordination page):**
- Event score, reason, and next action
- Per-attendee: score, reason, and status narrative
- Updates appear when they check the page (on-demand visibility)

**What is NOT visible to user:**
- Attendee next action instructions (internal to Communication Agent)
- Agent's internal reasoning process
- Raw JSON output

### State & Lifecycle

**Stateless** — Agent has no memory between invocations.

- Each invocation: backend fetches fresh data from DB
- Backend injects scheduling operation + coordination data into agent's prompt
- Agent processes, outputs JSON
- All persistent state lives in DB (scheduling operation + coordination objects), not in agent

### Timing & Latency

**Synchronous response expected** — Backend waits for agent's JSON output.

- Not critical to be super fast (~5-10 seconds acceptable)
- Agent performs pure reasoning, no external API calls
- Near real-time processing adequate for coordination use case

---

## 5. Available Tools

**N/A — This agent operates without external tools.**

All necessary context is provided via prompt injection (scheduling operation + coordination data). The agent performs pure reasoning and produces structured JSON output. No API calls, no database access, no external integrations needed.

---

## 6. Behavior Requirements

### Decision Logic

The agent makes 7 core decisions/tasks:

---

#### Decision 1: Attendee Score

**Question answered:** "If we booked this slot right now, what's the probability this attendee would actually show up?"

**Score range:** 0-100%, where 100% = certain attendance, 0% = certain non-attendance

**Signal categories (not rules — inputs to reasoning):**

**1. Explicit Signals (highest weight)**

Direct statements about attendance:
- "I'll be there" / "That works for me" → 100%
- "I can't make it" / "I'm OOO" / "decline" → 0%

Explicit signals should anchor the score unless there's strong reason to doubt sincerity.

**2. Conditional/Tentative Signals**

Attendee expresses uncertainty or conditions:
- "Should work" / "I think so" → high but not certain
- "Let me check my calendar" → unknown, waiting for follow-up
- "I'll try to make it" → lower confidence, depends on phrasing

Agent reasons: What's the nature of uncertainty? Logistical (need to check) or commitment-level (hedging)?

**3. Preference Signals vs. Rejection Signals**

Critical distinction:
- **Rejection:** "Tuesday at 2pm doesn't work - could we do Wednesday?" → Score for Tuesday should be low
- **Preference:** "Tuesday works, though I'd prefer Wednesday if possible" → Score for Tuesday should be high (they said it works)

Agent distinguishes between "can't attend" and "would prefer otherwise."

**4. Engagement Signals**

How attendee is interacting:
- Responsive, asking questions → engaged, likely to attend if booked
- Proposing specific alternatives → engaged, wants meeting to happen
- Short/terse responses → harder to read, reason about context
- Detailed explanations → engaged, trying to find solution

**5. Silence**

No response is hardest to interpret. Agent reasons about:
- How long since outreach? (hours vs. days)
- What day/time was outreach sent? (Friday 5pm → silence until Monday normal)
- Initial outreach or follow-up?
- How close is meeting date?
- Baseline expectations for response time

Key insight: Silence duration only becomes meaningful relative to reasonable response expectations. 48 hours over weekend ≠ 48 hours Tuesday-Thursday.

Rather than rigid decay, agent reasons: "Given when I reached out and what's happened since, is this silence notable or normal?"

---

#### Decision 2: Attendee Reason

**Purpose:** Explain "why I gave this score" in clear, user-facing language.

**Reasoning should be legible:**

Good examples:
- "Michael explicitly rejected Tuesday 2pm citing conflicts, but proposed Wednesday as alternative. He's engaged and wants the meeting, just not at this time."
- "Emily said 'Tuesday works, though Wednesday is slightly better for me.' She's confirmed Tuesday. She might appreciate a shift to Wednesday but will attend Tuesday as proposed."
- "Initial outreach sent Thursday evening, no response yet (now Saturday morning). This is within normal response window given weekend. No signal of problems, just hasn't been seen yet."
- "Initial outreach sent Monday, follow-up sent Wednesday, still no response Friday. Three business days of silence after two attempts. Silence is becoming meaningful, either not seeing emails or choosing not to engage."

**Guidelines:**
- Explain what happened (their response, timing, engagement)
- Connect that to the score
- Natural language, legible to EA/lawyer
- Specific about signals, not generic

---

#### Decision 3: Attendee Engagement Level

**Question answered:** "How engaged is this attendee with the coordination process?"

**Output:** One of three levels: `High` | `Medium` | `Low`

**Purpose:** Provide structured engagement signal for event scoring logic. When processing one attendee, event scoring needs to know engagement level of all other required attendees. This data must be available beyond the current attendee's message history.

**Level Definitions:**

**High Engagement:**
- Quick responses (responds within hours to 1 day)
- Asking clarifying questions about meeting details
- Proposing specific alternative times
- Active problem-solving ("That's tough but I could make it work if we...")
- Showing commitment and interest in making meeting happen

**Medium Engagement:**
- Responding but not elaborating
- Acknowledging without strong commitment
- Passive responses ("OK" / "Noted" / "Thanks")
- Takes 2-3 days to respond
- Not proactive but cooperative when contacted

**Low Engagement:**
- Slow responses (4+ days to respond)
- Vague deflections without follow-through
- Declining engagement over time (enthusiastic → passive)
- Minimal interaction, terse responses
- Says they'll respond but doesn't follow up
- Pattern of ignoring follow-ups

**Assessment basis:**
- Response timing (how quickly they respond)
- Response quality (detail, questions, alternatives)
- Trajectory (engagement increasing, stable, or declining)
- Initiative (proactive vs. reactive)

**Critical note:** Engagement reflects coordination interaction quality, not likelihood to attend. High engagement + declined slot = engaged person who can't make this time. Low engagement + tentative yes = concerning commitment level.

---

#### Decision 4: Attendee Next Action

**Purpose:** Strategic decision about what the Communication Agent should do next with this attendee.

**Complete Action Menu:**

| Type | Subtype | When to use |
|------|---------|-------------|
| **Initiate** | — | First outreach to attendee |
| **Reply** | `answer` | Attendee asked factual question |
| **Reply** | `clarify` | Attendee's response ambiguous but potentially interpretable |
| **Reply** | `persist` | Attendee expressed hesitation but hasn't declined |
| **Reply** | `request_alternatives` | Current slot not working, need alternatives |
| **Wait** | `attendee` | Attendee said they'll respond |
| **Follow_up** | — | No response after reasonable time |
| **Confirm** | `pending_others` | This attendee confirmed, others still pending |
| **Confirm** | `finalized` | All attendees confirmed, event being booked |
| **Escalate** | `alternatives_proposed` | Attendee proposed alternatives, user decides |
| **Escalate** | `unusual` | Response doesn't fit normal patterns |
| **Escalate** | `internal` | Can't interpret message, need clarification |
| **Close** | `declined` | Attendee explicitly declined |
| **Close** | `unresponsive` | Exhausted follow-ups with no response |
| **Close** | `removed` | User removed attendee |

**Follow-up Logic:**

**Core tension:** Following up increases confirmation rate (people miss emails), but there's a point where continued outreach becomes unprofessional and damages firm reputation.

**Agent should reason:** "Would a thoughtful EA send another follow-up here, or would that cross the line into pestering?"

**Factors favoring another follow-up:**
- Low attempt count (1-2 almost always appropriate; 3 needs justification; 4+ needs strong reasons)
- Substantial time since last attempt (4-5+ days)
- Meeting is important and attendee is critical
- Other attendees confirmed (social proof)
- Meeting date has runway (10+ days out)
- Message may have been missed (Friday afternoon, holiday weeks)

**Factors favoring closing as unresponsive:**
- Multiple attempts over reasonable timespan (3 attempts across 7-10 days with zero response)
- Meeting is imminent (48 hours away, need to make decisions)
- Diminishing returns on firm reputation (another email makes firm look desperate)
- Attendee is optional (meeting can proceed without them)
- Pattern suggests deliberate non-response

**Rather than counting attempts, reason about overall picture.**

**Baseline spacing guidance:**
Agent calculates follow_up_date based on context:
- "Standard" urgency: ~3-4 days from last outreach
- "Soon" urgency (meeting imminent, critical attendee): ~1-2 days
- "Final" attempt (this should be last one): ~2-3 days, but signals this is final check-in

---

#### Decision 5: Attendee Suggested Alternative Times

**Purpose:** Extract and maintain cumulative list of alternative times attendee has proposed.

**Behavior:**
- Read existing `suggested_alternative_times` from input
- Based on latest message: ADD new times mentioned, REMOVE times attendee says won't work
- Output updated cumulative list

**Format:**
```json
"suggested_alternative_times": [
  {"date": "2026-01-08", "time_range": "14:00-15:00"},
  {"date": "2026-01-09", "time_range": "morning"}
]
```

**Time range defaults:**
- "morning" = 08:00-12:00
- "afternoon" = 12:00-17:00
- "evening" = 17:00-20:00
- Or specific range like "14:00-15:00"

**Timezone:** Assume same as event (no timezone field in output)

---

#### Decision 6: Event Score

**Question answered:** "What's the likelihood this meeting will actually happen at the proposed time?"

**Score range:** 0-100%

**Five dimensions (reasoning-based, not formulaic):**

**Dimension 1: Attendee Criticality**

**Core question:** Who actually needs to be there?

**Inference signals:**
- External attendee → Required (you don't coordinate with external for optional attendance)
- Meeting organizer → Required
- Named in meeting title → Required
- Senior role mentioned → Likely required
- Internal attendee alongside externals → Likely optional/support

**Principles:**
- External attendees almost always required
- Internal attendees have visible calendars, easier to influence (lower stakes)
- When uncertain, weight external attendees heavily
- Optional attendees don't affect event score

**Dimension 2: Required Attendee Status**

**Core question:** What's the current state of people who matter?

| State | Event implication |
|-------|-------------------|
| All required confirmed | High confidence |
| Required pending but engaged | Uncertain, trending positive |
| Required pending, disengaged | Uncertain, concerning |
| Required declined | Cannot happen as proposed |
| Required unresponsive, time running out | At serious risk |

**Principles:**
- Single required external declining is near-fatal to event score
- Internal problems rarely tank event score (easy to resolve directly)
- "Pending" with engagement (asking questions) ≠ pending with silence
- Distinguish "declined this slot" (can happen at different time) from "declined meeting" (cannot happen)

**Dimension 3: Engagement & Momentum**

**Core question:** How are required attendees interacting, which direction is this trending?

**Data available:** Each attendee's engagement level (High/Medium/Low) from their attendee_analysis, plus their score and reason.

**Positive signals:** High engagement levels, trending positive trajectory, multiple required attendees engaged

**Negative signals:** Low engagement levels, declining engagement, silence after initial contact, enthusiasm fading

**Principles:**
- Engagement signals intent (High engagement = wants meeting to happen, even if schedule difficult)
- Momentum matters as much as current state (Medium engagement trending to High is positive)
- When multiple required attendees, overall momentum shaped by least-engaged required attendee
- Low engagement + high score = concerning (says yes but shows little commitment)
- High engagement + low score = promising (can't make this time but actively trying to find solution)

**Dimension 4: Time Remaining (Relative)**

**Core question:** How much runway exists relative to original scheduling window?

**The trap:** Treating time remaining as absolute. "Meeting in 2 days" means different things if scheduling started yesterday vs. two weeks ago.

**Principles:**
- Score reflects progress relative to available window, not just absolute days
- If window was always tight (Monday for Wednesday), initial uncertainty is normal
- If window was generous (3 weeks), late uncertainty is concerning
- Reason: "Given when coordination started and how much time was available, is current state reasonable or concerning?"

**Framework:**
| Window consumed | Interpretation of "pending" |
|-----------------|----------------------------|
| < 25% | Normal, expected uncertainty |
| 25-50% | Should have signal, mild concern if silent |
| 50-75% | Should be closer to resolution |
| > 75% | Running out of time, pending = at risk |

**Dimension 5: Partial Accommodations**

**Core question:** Has attendee offered a way to make meeting work that requires organizer approval?

**Types:**
- **Delegate:** "I can't but X can replace me"
- **Location change:** "Can't come to office but could do video"
- **Partial attendance:** "Can only join first 30 minutes"
- **Proceed without:** "Go ahead without me, I'll catch up"

**Principles:**
- Partial accommodations are NOT declines (attendee trying to make it work — positive signal)
- Partial accommodations are NOT confirmations (require organizer decision)
- Score reflects increased likelihood vs. pure decline, but with uncertainty until approved (40-60% range)
- Escalate with clear framing; once approved, treat as confirmed

**Event Score Interpretation:**
| Score Range | What it means |
|-------------|---------------|
| 90-100% | All required confirmed |
| 70-90% | Required confirmed or highly likely, positive momentum |
| 40-70% | Genuine uncertainty - required pending, or partial accommodation awaiting approval |
| 20-40% | At risk - required attendee problems, likely needs intervention |
| 0-20% | Cannot happen as proposed |

---

#### Decision 7: Event Reason

**Purpose:** Provide enough context to allow the user to understand what's going on with this coordination.

**Overarching Principle:**
The reason gives the EA/lawyer exactly the information they need to understand event likelihood—no more, no less. What's included (and omitted) signals what matters.

**Core Principles:**

1. **Be specific, not vague**
   - ❌ "Internal participants pending but manageable"
   - ✅ "Internal team members haven't responded yet but their calendars show availability"

2. **Use concrete statements, not interpretive proxies**
   - ❌ "One external attendee tentative but engaged"
   - ✅ "One external attendee said 'Tuesday should work' but hasn't confirmed definitively"

3. **State what's happening, not what to do about it**
   - ❌ "Key attendee declined. Needs organizer decision"
   - ✅ "Key attendee declined Tuesday citing travel conflicts"

4. **Be selective - only mention what affects the score**
   - If only one attendee mentioned, signals they're the critical factor
   - Don't include non-critical attendees' status
   - Omission is informative

5. **Scale with number of attendees**
   - 1 attendee: Event reason matches attendee reason
   - Multiple: Summarize overall status, focus on critical factors

6. **Explain the score's basis**
   - High scores: What's confirmed/locked in
   - Medium scores: What's positive but uncertain
   - Low scores: What's blocking or at risk

7. **Keep it concise**
   - 1-2 sentences maximum

---

#### Decision 8: Event Next Action

**Purpose:** Strategic decision about what should happen at event level.

**Complete Action Menu:**

| Type | Subtype | When to use |
|------|---------|-------------|
| **Coordination in progress** | `reaching_out` | Initial outreach being sent |
| **Coordination in progress** | `collecting_responses` | Waiting on required attendees, no blocking issues |
| **Coordination in progress** | `getting_alternatives` | User approved, gathering alternatives |
| **Coordination in progress** | `all_confirmed` | All required attendees confirmed, system books |
| **Waiting for decision** | `get_alternatives` | Required attendee rejected slot, persist attempted |
| **Waiting for decision** | `reschedule` | Alternatives gathered, user picks |
| **Waiting for decision** | `resolve_conflict` | Conflicting constraints, no overlap |
| **Waiting for decision** | `recommend_cancel` | No viable path forward |
| **Waiting for decision** | `unusual` | Needs human judgment |
| **Complete** | `scheduled` | Event booked |
| **Complete** | `cancelled` | Event cancelled |

**Decision Guidance:**

**reaching_out:**
- Initial state after coordination begins
- Score reflects baseline uncertainty (50-60%)
- Transitions to collecting_responses once outreach sent

**collecting_responses:**
- Default state during active coordination
- Event score derived from required attendees' scores + momentum + time signals
- Stay here while attendee next actions are: Wait, Follow_up, Reply, Confirm.pending_others
- **Conservative by default** — remain in this state unless attendee outputs clearly indicate escalation needed

**getting_alternatives:**
- Only after user approves get_alternatives
- Event score for current slot low, but meeting likely at different time
- Transition to reschedule when alternatives collected

**all_confirmed:**
- All required attendees' scores 95-100%, all next actions are Confirm.finalized
- Transient state — system books immediately
- Optional attendees pending doesn't block

**get_alternatives:**
- Triggered when required attendee's score <20%, next action indicates slot rejection, persist was attempted
- User decides whether to pursue alternatives
- Once approved → getting_alternatives

**reschedule:**
- Alternatives gathered with which required attendees can attend each
- User picks → coordination continues at new slot or confirms immediately

**resolve_conflict:**
- Required attendees' reasons show conflicting constraints with no resolution
- Example: Attendee A reason says "only available mornings", Attendee B says "only available afternoons"
- Synthesize conflict in metadata
- Event score low (20-40%)

**recommend_cancel:**
- Critical attendee's next action is Close.declined or Close.unresponsive
- Attendee-level decision to close already reflects exhausted options
- Event score near 0%
- User confirms or overrides

**unusual:**
- Required attendee's next action is Escalate.unusual
- Attendee-level agent already flagged something it couldn't handle
- Surfaces to event level for user decision

**scheduled / cancelled:**
- Terminal states set by system after all_confirmed or user cancellation

---

#### Decision 9: Follow-up Date

**Purpose:** When should the agent re-engage if attendee doesn't respond?

**Agent outputs:** Specific datetime (ISO format) or null (no follow-up needed)

**Reasoning factors:**
- Attempt count (1st, 2nd, 3rd+ follow-up)
- Spacing quality (not just count — too aggressive vs. appropriately spaced)
- Meeting urgency (how close is meeting date)
- Attendee importance (critical client vs. optional internal)
- Firm reputation protection (at what point does another email become pestering)

**Conceptual urgency levels (not output, but guide reasoning):**
- **Standard:** Normal coordination, ~3-4 days
- **Soon:** Meeting imminent or critical attendee, ~1-2 days
- **Final:** This should be last attempt, ~2-3 days

Agent calculates actual datetime based on these factors plus current time.

---

### Governing Principles

**Attendee-Event Relationship:**

1. **Event score is a reasoning function of attendee outputs**
   - Event score = reasoned assessment of all required attendees' scores, reasons, next actions + event progress signals
   - Never uses raw messages; attendee-level already interpreted them

2. **Only required attendees factor into event score**
   - Optional attendees don't affect event score or next action
   - Required: external, organizer, named in meeting title

3. **Resolve locally before escalating**
   - Attendee-level actions exhaust their options before triggering event-level changes
   - Only when attendee-level options fail (reflected in attendee score and next action) does event state change

4. **User approval required for non-happy-path changes**
   - Happy path (reaching_out → collecting_responses → all_confirmed → scheduled) requires no intervention
   - All other transitions require user approval

5. **Conservative by default**
   - When ambiguous, stay in current state
   - Default is collecting_responses until clear reason to change

6. **Bidirectional but not recursive**
   - Attendee actions affect event state
   - User decisions trigger new attendee actions
   - Loop breaks because agent outputs decisions but doesn't execute

---

## 7. Input/Output Specification

### Input Object 1: Coordination

The agent receives a coordination object specific to ONE attendee:

**Fields:**
```
attendee_email: string
attendee_name: string
is_internal: boolean
is_optional: boolean
conv_history: array of objects
  - each object contains:
    - direction: string (inbound/outbound)
    - email: string (from/to address)
    - content: string (message content)
    - timestamp: ISO date
followup_date: ISO date (when next follow-up scheduled)
attendee_analysis: object
  - score: int (0-100)
  - reason: string
  - engagement: enum (High | Medium | Low)
  - next_action: object
    - type: enum (string)
    - subtype: enum (string)
    - metadata: object (structure varies by action type)
  - suggested_alternative_times: array of objects
    - date: string (YYYY-MM-DD)
    - time_range: string (HH:MM-HH:MM or morning/afternoon/evening)
```

### Input Object 2: Scheduling Operation

The agent receives the full scheduling operation context:

**Fields:**
```
title: string
duration: int (minutes)
location: string
timezone: string
date: object
  - start: ISO date
  - end: ISO date
private: boolean
attendees: array of objects
  - each object contains:
    - attendee_email: string
    - attendee_name: string
    - is_internal: boolean
    - is_optional: boolean
    - attendee_analysis: object (same structure as in Coordination)
created_at: ISO date
event_analysis: object
  - score: int (0-100)
  - reason: string
  - next_action: object
    - type: enum (string)
    - subtype: enum (string)
    - metadata: object (structure varies by action type)
```

### Output Object

The agent outputs a single JSON object:

```json
{
  "attendee_analysis": {
    "score": 0-100,
    "reason": "string",
    "engagement": "High | Medium | Low",
    "next_action": {
      "type": "enum",
      "subtype": "enum",
      "metadata": {}
    },
    "suggested_alternative_times": [
      {
        "date": "YYYY-MM-DD",
        "time_range": "HH:MM-HH:MM or morning/afternoon/evening"
      }
    ]
  },
  "event_analysis": {
    "score": 0-100,
    "reason": "string",
    "next_action": {
      "type": "enum",
      "subtype": "enum",
      "metadata": {}
    }
  },
  "follow_up_date": "ISO date or null"
}
```

### Minimal Essential Metadata

Most action types need no metadata. Only these require additional fields:

**Attendee Next Actions:**
- **Escalate.alternatives_proposed:** `attendee_message` (string), `alternatives_proposed` (array of strings)
- **Escalate.unusual:** `attendee_message` (string), `unusual_reason` (string)
- **Escalate.internal:** `attendee_message` (string), `uncertainty_reason` (string)

**Event Next Actions:**
- **Waiting.reschedule:** `alternatives` (array of objects with time slots + availability info)
- **Waiting.resolve_conflict:** `conflict_summary` (string)

All other actions: `metadata` can be empty object `{}`.

---

## 8. Boundary Conditions

### Autonomous Zone

**What the agent decides without user approval:**

- All attendee scores and reasons
- All event scores and reasons
- Follow-up dates and timing
- Attendee next actions: Initiate, Reply.*, Wait.*, Follow_up, Confirm.*, Close.*
- Event next actions: Coordination in progress.* (reaching_out, collecting_responses, getting_alternatives, all_confirmed)
- Extraction and maintenance of suggested alternative times

**Rationale:** These are assessments and routine coordination actions within well-defined scope. Agent has enough context to make these decisions reliably.

### Confirmation/Escalation Zone

**What requires user approval before proceeding:**

- Attendee next actions: Escalate.* (alternatives_proposed, unusual, internal)
- Event next actions: Waiting for decision.* (get_alternatives, reschedule, resolve_conflict, recommend_cancel, unusual)

**Rationale:** These situations require judgment calls about alternatives, conflicts, or non-standard scenarios. User needs to make strategic decisions about how to proceed.

### Escalate/Refuse Zone

**What the agent should never do:**

1. **Never change anything outside happy path without user approval** — Only reaching_out → collecting_responses → all_confirmed → scheduled proceeds autonomously. Everything else escalates.

2. **Never make assumptions about attendee availability not stated in their messages** — Agent should be able to justify everything based on documented conversation history.

3. **Never fabricate or infer information not present in conversation history** — If it's not in conv_history or scheduling operation data, agent doesn't know it.

4. **Never suggest next action outside defined options** — Must use actions from the specified menu; no custom/undefined actions.

5. **Never guess when uncertain** — When confidence is low, escalate rather than proceeding with assumptions.

### Scope Limits

**In scope:**
- Coordination status assessment (scores, reasons)
- Communication flow decisions (next actions)
- Timing/urgency assessment (follow-up dates)
- Alternative time extraction and maintenance
- Reasoning about attendee engagement and event likelihood

**Out of scope:**
- Actually sending emails (Communication Agent's job)
- Booking events in calendar systems (backend's job after all_confirmed)
- Changing event details (title, duration, location, date)
- Adding or removing attendees from coordination
- Making decisions about meeting content, agenda, or purpose
- Accessing systems beyond provided input data
- Modifying scheduling operation structure beyond specified output fields

---

## 9. Edge Cases & Failure Modes

### Known Edge Cases

**1. Multiple attendees respond simultaneously**
- Agent always processes ONE attendee at a time (receives single coordination object)
- If simultaneous responses occur, backend triggers agent separately for each
- Agent only updates the attendee it's currently processing

**2. Attendee contradicts themselves**
- Example: First message "Tuesday works," second message "Actually, I can't make Tuesday"
- **Handling:** Re-assess based on all available information in conv_history
- Trust most recent clear signal
- Don't make contradiction a special case; just update assessment

**3. Partial/ambiguous information**
- Example: "I might be able to make it" with no context
- **Handling:** 
  - Score reflects genuine uncertainty (~50%)
  - Use Reply.clarify to get more information
  - Document ambiguity in reason

**4. Long message history (>20 messages)**
- **Handling:** Weight last 10 messages more heavily in assessment
- Still consider full history for context, but recent messages matter most

**5. Alternative times outside scheduling window**
- Example: User created coordination for "this week" but attendee proposes "next month"
- **Handling:** Extract and include in suggested_alternative_times anyway
- User decides if viable

**6. External attendee delegates to colleague**
- Example: "I can't make it but my colleague Sarah can attend instead"
- **Handling:**
  - Score current attendee as declined
  - Treat as partial accommodation
  - Escalate.alternatives_proposed with delegation offer for user decision

**7. Out-of-band communication**
- Example: Attendee made phone call but it's not documented; agent follows up via email, attendee is confused
- **Handling:**
  - Agent operates only on documented conv_history
  - If attendee expresses confusion/frustration in email ("I already told Sarah..."), escalate.unusual
  - Don't try to guess what happened outside documented conversation

**8. Timezone ambiguity**
- Example: Attendee says "2pm" without specifying timezone
- **Handling:** Assume same timezone as event

**9. Meeting date has passed**
- Example: Coordination still "in progress" but proposed meeting date was yesterday
- **Handling:** Escalate.unusual with reason that meeting date passed

**10. No required attendees (all marked optional)**
- Edge case in data
- **Handling:** Flag and escalate.unusual (data issue or unusual coordination)

**11. Long, rambling message**
- Example: Multiple topics, hard to extract clear signal about attendance
- **Handling:**
  - Extract what possible, note ambiguity in reason
  - Use Reply.clarify asking for specific confirmation
  - If multiple clarifications fail, Escalate.unusual

**12. Claims of missed email**
- Example: Attendee says "I never received your first email" but conv_history shows they replied to it
- **Handling:** Continue process normally, don't argue about whether they received it; focus on moving coordination forward

**13. Alternative times contradict each other**
- Example: Attendee first says "Wednesday works" then later "I'm out of office all week including Wednesday"
- **Handling:** Update suggested_alternative_times list (remove Wednesday), assess as usual

### Failure Modes & Graceful Degradation

**When agent can't confidently interpret a message:**
- Try to extract what it can from context
- Use Reply.clarify for minor ambiguity
- Use Escalate.internal if truly blocked after interpretation attempts
- Document uncertainty clearly in reason field
- **Never guess** — if uncertain, escalate

**When multiple signals conflict:**
- Example: Attendee says "Tuesday works" but tone/context suggests reluctance
- **Handling:** Make judgment call based on preponderance of evidence
- Document reasoning in reason field
- If contradiction too significant to resolve, Reply.clarify

**When agent encounters unexpected data:**
- Missing critical fields: Escalate.unusual with description of data issue
- No required attendees: Escalate.unusual
- Data inconsistencies: Document in reason, proceed with best interpretation where possible

**Default behaviors when uncertain:**
- **Score:** Reflect genuine uncertainty (don't artificially inflate/deflate)
- **Next action:** Default to Reply.clarify if needs more info; otherwise stay in current state (conservative)
- **Event action:** Stay in collecting_responses unless clear reason to change

### Contradiction Handling

**Attendee contradicts themselves:**
- Re-assess based on all available information
- Trust most recent clear signal
- Don't make contradiction special; just update assessment

**Alternative time changes:**
- Update suggested_alternative_times list (add/remove as appropriate)
- Assess as usual

**Out-of-band confusion:**
- If attendee expresses confusion suggesting missed context, escalate
- Otherwise continue based on documented conversation

---

## 10. Agent Characteristics

### Sensitivity: High

**Reasoning:**
- Accesses client email addresses, names, and message content
- Processes meeting details that may contain client names, case references
- Operates in law firm context where confidentiality is paramount
- Handles business relationship data that could reveal client connections
- Not "Critical" because it doesn't directly handle privileged legal content, credentials, or payment data

**Implications for system prompt:**
- Strong emphasis on confidentiality and data handling
- Never log or expose sensitive details inappropriately
- Careful reasoning that doesn't inadvertently reveal sensitive patterns

### Autonomy: Medium

**Reasoning:**
- Makes substantial decisions autonomously (scores, reasons, most next actions, follow-up timing)
- Operates within well-defined coordination scope with clear boundaries
- Escalates for significant decisions (alternatives, conflicts, cancellations)
- Doesn't execute actions directly—outputs JSON that backend and other agents execute
- User has meaningful oversight points throughout the process

**Implications for system prompt:**
- Clear guidance on autonomous vs. escalation boundaries
- Robust reasoning to justify autonomous decisions
- Conservative defaults when uncertain (escalate rather than guess)

### Exposure: Internal

**Reasoning:**
- Agent's outputs (scores, reasons, next actions) visible only to internal users (EA/lawyers)
- Seen through internal UI/coordination dashboard
- While its decisions influence external communication, the agent itself is not customer-facing
- Communication Agent is the external-facing component

**Implications for system prompt:**
- Professional but internal-focused language in reasoning
- Can use terminology familiar to EA/lawyers without needing to be client-safe
- Focus on clarity for internal audience

### Reversibility: Hard to Reverse

**Reasoning:**
- Agent's decisions lead to external emails being sent (via Communication Agent)
- Sent external emails are explicitly in "Hard to Reverse" category
- Correcting inappropriate or poorly-timed emails to clients requires damage control
- Can harm firm reputation and client relationships
- While technically correctable, consequences can be significant
- Wrong booking decisions trigger calendar invites that need coordination to reverse

**Implications for system prompt:**
- High-quality reasoning is critical—mistakes have real consequences
- Strong emphasis on "think before acting" (escalate when uncertain)
- Validation checks before recommending actions that trigger external communication
- Priority #1 principle: decision quality that results in respectful communication

### Blast Radius: External

**Reasoning:**
- Mistakes directly affect external clients and partners involved in coordination
- Errors damage firm's professional reputation with clients
- Poor coordination experiences can harm critical business relationships
- Impacts go beyond internal team to external stakeholders who judge the firm by these interactions
- Fits "customers, partners" category of External blast radius

**Implications for system prompt:**
- Maximum care in decision-making given external impact
- Strong emphasis on professional standards and firm reputation protection
- Escalation thresholds should err on side of caution
- Quality over speed—better to take time than make external-facing errors

---

## Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-06 | Product Team | Initial specification created through agent spec workflow interview |

---

## Notes & Open Questions

### Current Limitations

1. **Message interpretability:** Agent must handle all languages, slang, and communication styles. Internal escalation process exists for cases where agent cannot interpret.

2. **Metadata schemas:** Minimal metadata approach adopted. May need to expand based on Communication Agent's needs and user feedback.

3. **Followup_date past due scenario:** Not an edge case to handle (either cron failed or user replied making follow-up moot).

### Future Considerations

1. **Enhanced criticality signals:** Currently infers attendee criticality from external/internal status and meeting metadata. Could add explicit criticality flags or role/title information for better assessment.

2. **Cross-coordination learning:** Agent currently processes each coordination independently. Future: learn patterns about what works (optimal follow-up timing, effective persistence strategies) across coordinations.

3. **Proactive conflict detection:** Currently reactive (waits for responses). Could proactively flag likely conflicts based on external attendee patterns, meeting importance, etc.

4. **Relationship context:** Richer data about client relationships, past interaction patterns, preferred communication styles could improve decision quality.

5. **Alternative time validation:** Agent extracts alternatives but doesn't validate against internal calendars. Backend could check feasibility before escalating to user.

---

## Appendix: Complete Action Reference

### Attendee Next Actions Reference

| Type | Subtype | Usage |
|------|---------|-------|
| Initiate | — | First outreach |
| Reply | answer | Factual question |
| Reply | clarify | Ambiguous response |
| Reply | persist | Soft hesitation |
| Reply | request_alternatives | Slot doesn't work |
| Wait | attendee | They'll respond |
| Follow_up | — | No response, re-engage |
| Confirm | pending_others | This one yes, others pending |
| Confirm | finalized | All yes, booking |
| Escalate | alternatives_proposed | User decides on alternatives |
| Escalate | unusual | Doesn't fit patterns |
| Escalate | internal | Can't interpret |
| Close | declined | Explicit no |
| Close | unresponsive | Gave up after attempts |
| Close | removed | User removed them |

### Event Next Actions Reference

| Type | Subtype | Usage |
|------|---------|-------|
| Coordination in progress | reaching_out | Initial outreach |
| Coordination in progress | collecting_responses | Active, no blocks |
| Coordination in progress | getting_alternatives | User approved, gathering |
| Coordination in progress | all_confirmed | All yes, system books |
| Waiting for decision | get_alternatives | Need approval to ask |
| Waiting for decision | reschedule | Pick from alternatives |
| Waiting for decision | resolve_conflict | No overlap |
| Waiting for decision | recommend_cancel | No viable path |
| Waiting for decision | unusual | Needs human judgment |
| Complete | scheduled | Booked |
| Complete | cancelled | Cancelled |

