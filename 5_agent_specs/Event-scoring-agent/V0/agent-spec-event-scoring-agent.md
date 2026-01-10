# Agent Specification: Event Scoring Agent

## 1. Agent Overview

**Agent Name:** Event Scoring Agent

**Version:** v1.0

**Last Updated:** December 29, 2025

**Owner:** Product Team

**Status:** Draft

---

## 2. Product Context

**Product:** Smart scheduling system for legal firms that helps EAs and lawyers coordinate meetings by evaluating which existing events can be moved or overridden, rather than simply finding the next available slot.

**User Journey:** EA (or lawyer) wants to schedule a meeting with multiple attendees. They define participants, event length, and time range. The system analyzes existing calendar events to determine which time slots have the highest likelihood of successful scheduling.

**User's Starting State:** User has initiated a scheduling request by:
- Specifying internal and/or external attendees
- Setting meeting duration
- Defining a time range (e.g., next 2 weeks)

**User's Goal:** Find the best time to schedule a meeting where attendees are most likely to attend, understanding that this may require moving or overriding existing commitments based on priorities and context.

**Product Flow:**
1. User configures meeting parameters (attendees, duration, time range)
2. User clicks "Find Best Times" or adds an attendee (triggering optimization)
3. **[Agent operates here]** System scores all events in the timerange for each attendee
4. System aggregates individual event scores into slot-level "likelihood to schedule" scores
5. System displays color-coded heatmap with time slots and conflict explanations
6. User reviews options and selects best time

**Success Definition:** User sees a heatmap where:
- Slot colors and scores accurately reflect scheduling difficulty
- Conflict explanations make sense and align with their understanding
- They can confidently choose the best time based on displayed information

**Constraints:**
- User is waiting for response (synchronous operation)
- Maximum 5 seconds latency for up to 350 events
- Must handle incomplete or low-quality calendar data gracefully

---

## 3. Agent Definition

**Purpose Statement:** Evaluate calendar events to determine how likely each person could move or miss their existing commitment, enabling intelligent scheduling decisions that respect priorities and context.

**Core Task:** Analyze individual calendar events and assign conflict scores (available/minor/medium/major).

**North Star:** Accurate conflict assessments that users trust — where the score matches their intuition and the explanation makes the reasoning transparent.

**Success Criteria:**
- Users viewing the definitions agree with the agent's conflict assessments
- Reasons are clear, concise, and address the main signals driving the decision
- Evaluations (when implemented) validate scoring quality
- Scores enable better downstream scheduling decisions

**Key Assumptions:**
- Event metadata (title, attendees, status, timing, etc.) contains sufficient signals to infer movability
- Legal domain patterns (court, depositions, client meetings) have consistent priority hierarchies
- Users understand "conflict" as "likelihood to not attend" (not traditional time overlap)
- The 7-dimension reasoning framework covers the main factors determining movability in legal scheduling

---

## 4. Agent Operating Model

**Trigger & Invocation:**
- **System-initiated** based on user actions
- Currently triggered when:
  - User clicks "Find Best Times" button
  - User adds an attendee to the meeting (proactive scoring for optimization)
- Future: May also run as background job or via webhooks when events change

**Interaction Pattern:**
- **Silent/Background** — Agent operates invisibly without direct user interaction
- **Output Only** — Agent returns JSON with conflict scores and explanations; no conversational interface or back-and-forth dialogue

**User Visibility:**
- Agent itself is invisible to users
- Agent outputs (conflict scores and reasons) are consumed by downstream system and eventually displayed to users
- Users don't know (or need to know) an AI agent performed the analysis

**State & Lifecycle:**
- **Stateless** — No memory or context maintained between invocations
- Each scoring request is independent
- Agent spins up per request, scores events, returns results, and terminates
- Does not learn from user feedback or remember previous decisions

**Timing & Latency:**
- **Real-time synchronous** — User waits for response
- **Latency requirement:** <5 seconds for up to 350 events
- Must complete all scoring within timeout window
- Should use fast, efficient model (not heavyweight reasoning)

---

## 5. Available Tools

**N/A** — This agent operates without external tools. It receives event data as input and performs analysis based solely on that data.

---

## 6. Behavior Requirements

### Decision Logic

**Hard Rules (Always Apply):**

**Always Major Conflict:**
- `showAs: oof` (Out of Office)
- `isAllDay: true` + OOO/vacation/travel indicators in title
- Court/hearing/deposition/trial keywords in title

**Always Available:**
- `showAs: free`
- `responseStatus: declined` (person already said no to this event)

**Skip Scoring:**
- `isCancelled: true` — Don't score canceled events

**Reasoning Framework (7 Dimensions):**

For all other events, agent evaluates across 7 dimensions and makes a judgment call:

**1. Event Type & Urgency**
- Infer category from title, description, location together
- Some events are inherently immovable (court, depositions, deadlines)
- Client-facing events carry high friction — rescheduling affects relationships
- Internal events vary: 1:1s exist for you, large syncs proceed without one person
- Solo blocks typically most movable, but "Focus: Brief due tomorrow" is not
- Scan for urgency markers ("URGENT", "Final", "Deadline", "Critical", "ASAP")
- Location matters: courtroom/external office = real logistical friction; video = easier to move

**2. Scheduling Context**
- Lead time: gap between `createdDateTime` and `start`
  - Long lead time = planned around this, likely important
  - Short lead time = either urgent/reactive, or casual
- Recent modifications: if `lastModifiedDateTime` is recent, people are actively coordinating

**3. Organizer Relationship**
- External organizer (clients, courts, opposing counsel) → attendee conforms to their schedule
- Senior internal organizer (manager, partner, executive) → high expectation to attend
- Peer organizer → most flexibility, can negotiate
- Self-organized → attendee's discretion, unless others accepted
- Note: Without org context, assume external = high friction, internal = medium

**4. Attendee Composition**
- Count: Solo (flexible) → 2-3 (moderate) → 4+ (harder to reschedule)
- External participants (non-company domains) = higher stakes
- Seniority present (executives, partners, judges) = harder to skip
- Attendance status of others:
  - Most accepted → meeting is happening, skipping is conspicuous
  - Most tentative/no-response → meeting may not happen anyway
  - Key people declined → meeting may be rescheduled regardless

**5. Person's Role in This Event**
- Organizer → can't skip, absence effectively cancels it
- Required vs optional → explicit signal from organizer
- Subject of meeting (name in title like "Review with Sarah") → absence defeats purpose
- Passive attendee on large call → can more easily skip

**6. Commitment Signals**
- Response status: Accepted = confirmed; Tentative = left room to skip; No response = undecided
- showAs status: Busy/OOO = committed; Tentative/Free = provisional
- Sensitivity flag: Private/confidential often means personal appointments (different friction)

**7. Temporal Context**
- Proximity: 2 hours away = may be preparing/traveling; 2 weeks away = just calendar blocks
- Recurring vs one-time: Recurring = missing one instance often acceptable; One-time = only chance
- All-day events: Usually markers (OOO, travel, holiday), treat as immovable unless title suggests "Placeholder"

**Guiding Principle:**

The decision is **reasoning-based, not a formula or summary of signals**. The agent considers all dimensions and makes a judgment call. Sometimes one strong signal (like OOO) overrides everything else.

- Event stakes set the floor: What are the consequences of missing this?
- Person signals adjust from there: How committed/central is this person?
- Context reframes signals: Tentative on focus block ≠ tentative on client meeting

### Tone & Voice (for "reason" field)

**Goal:** User understands why this rating was given.

**Style:**
- Concise and factual
- Not robotic, but no fluff
- Users are scanning, not reading
- Maximum 1 sentence

**Pattern:**
- [what the event is] — [what that means for displaceability]
- Examples:
  - ✅ "Client meeting with external attendees"
  - ✅ "Weekly team standup — missing one instance is usually fine"
  - ✅ "Focus time block — easily rescheduled"
  - ✅ "1:1 with manager — expected to attend, but could request to move"

**Avoid:**
- **No logic explanation** — Don't restate what conflict level already conveys
  - ❌ "Client meeting with external attendees — hard to reschedule" (redundant)
  - ❌ "This event represents a client-facing engagement with external stakeholders, suggesting limited scheduling flexibility" (too verbose, restates conflict level)
- **No preambles/postambles** — Stick to reason only
  - ❌ "Based on my analysis..."
  - ❌ "I determined that..."
- **No hedging language** — Avoid "might be", "could potentially", "it seems like"
- **No AI-speak** — Sound human, not robotic
- **No judgmental framing** — Avoid "just a standup", "only a focus block"

**Edge Case Handling in Reason:**
- **Low confidence:** Don't acknowledge it in the reason. Confidence is captured in confidence score, not user-facing explanation.
- **Conflicting signals:** Only mention if genuinely informative to user
  - ✅ "Client meeting, but marked tentative — may not be confirmed yet"
  - ❌ "Several factors were weighed and balanced to reach this assessment"

Rule: User doesn't need to see how the sausage is made. They need to know what they're looking at.

### Quality Standards

**Good output:**
- Accurate conflict scores that align with user intuition
- Consistent scoring across similar events
- Appropriate confidence calibration (high confidence when signals are clear, lower when ambiguous)
- Signal detection accuracy (correctly identifying event type, role, commitment level, etc.)
- Concise, honest reasons that don't fabricate or over-explain

---

## 7. Input/Output Specification

### Input Format

**Structure:** Array of event objects, one per attendee for the selected time range

**Core Fields (Required):**
- `summary` (string) — Event title
- `start` (object: dateTime, timeZone)
- `end` (object: dateTime, timeZone)
- `attendees` (array of objects: email, displayName, responseStatus)
- `organizer` (object: email, displayName)

**Signal Fields (Optional — enhance accuracy):**
- `showAs` (string: busy/free/tentative/oof/workingElsewhere)
- `sensitivity` (string: normal/personal/private/confidential)
- `isAllDay` (boolean)
- `isCancelled` (boolean)
- `location` (string)
- `description` (string)
- `externalCreatedAt` (datetime)
- `externalUpdatedAt` (datetime)
- Recurrence info (if available)

**Example Event Object:**

```json
{
  "summary": "Sunday 9am with room",
  "description": "...",
  "start": {
    "dateTime": "2025-12-28T07:00:00.0000000",
    "timeZone": "UTC"
  },
  "end": {
    "dateTime": "2025-12-28T08:00:00.0000000",
    "timeZone": "UTC"
  },
  "attendees": [
    {
      "email": "eyal.ronel@nopa.dev",
      "displayName": "Eyal Ronel",
      "responseStatus": "none"
    },
    {
      "email": "someone@nopa.dev",
      "displayName": "Some One",
      "responseStatus": "none"
    }
  ],
  "organizer": {
    "email": "eyal.ronel@nopa.dev",
    "displayName": "Eyal Ronel"
  },
  "externalCreatedAt": "2025-12-24T11:53:20.9053004Z",
  "externalUpdatedAt": "2025-12-24T11:54:23.6134784Z"
}
```

**Schema Resilience:**
- **Missing signal fields:** Note "field not available" in relevant signal's `detected`, treat impact as neutral
- **Unknown fields:** Ignore gracefully — don't break on unexpected fields
- **Missing core fields:** Return error with reasoning (internal error message)

**Note:** Schema will be extended with additional fields (`showAs`, `sensitivity`, `isAllDay`, `isCancelled`, `location`) as they become available from calendar APIs.

### Output Format

**Structure:** JSON object per event

```json
{
  "conflictLevel": "minor | medium | major | available",
  "confidence": 0.0 - 1.0,
  "signals": {
    "eventType": {
      "detected": "string - what kind of event (e.g., 'focus time', 'client meeting', 'team standup', 'court hearing')",
      "impact": "minor | medium | major | neutral"
    },
    "schedulingContext": {
      "detected": "string - lead time and recency (e.g., 'scheduled 2 months ago', 'created yesterday, modified today')",
      "impact": "minor | medium | major | neutral"
    },
    "organizerRelationship": {
      "detected": "string - who organized and relationship (e.g., 'self-organized', 'external client', 'senior partner', 'peer')",
      "impact": "minor | medium | major | neutral"
    },
    "attendeeComposition": {
      "detected": "string - count, externals, seniority (e.g., 'solo block', '4 internal attendees', '6 attendees including external client')",
      "impact": "minor | medium | major | neutral"
    },
    "personRole": {
      "detected": "string - their role (e.g., 'organizer', 'required attendee', 'optional attendee', 'subject of meeting')",
      "impact": "minor | medium | major | neutral"
    },
    "commitmentSignals": {
      "detected": "string - their response and showAs (e.g., 'accepted, shows as busy', 'tentative, shows as tentative', 'no response')",
      "impact": "minor | medium | major | neutral"
    },
    "temporalContext": {
      "detected": "string - proximity and recurrence (e.g., '48 hours away, one-time', '2 weeks away, recurring weekly', 'all-day OOO')",
      "impact": "minor | medium | major | neutral"
    }
  },
  "reason": "string - user-facing explanation (concise, no jargon, max 1 sentence)"
}
```

**Impact Levels:**
- `major` = this signal pushes toward major conflict
- `medium` = this signal pushes toward medium conflict
- `minor` = this signal pushes toward minor conflict
- `neutral` = this signal doesn't push either way

**Important:** The overall `conflictLevel` is NOT a formula or average of signal impacts. It's a reasoning-based judgment that considers all signals holistically.

### Output Delivery

- Returns JSON object per event
- Synchronous response
- Must complete within <5 seconds for batch of up to 350 events
- Use fast, efficient model for scoring

---

## 8. Boundary Conditions

### Autonomous Zone

**What the agent can do without asking:**
- Score all events in the input array
- Apply hard rules automatically (OOF → major, declined → available, etc.)
- Make judgment calls on conflict levels across all 7 dimensions
- Assign confidence scores
- Generate user-facing explanations

The agent operates fully autonomously within its scoring responsibility.

### Confirmation Zone

**N/A** — Agent does not take actions requiring user confirmation. It only returns assessments.

### Escalate/Refuse Zone

**When to return error:**
- **Missing core fields** (summary, start, end, attendees, organizer) → Return error with reasoning (internal error message, not user-facing)

**Special handling:**
- **Private events** (`sensitivity=private`) → Score the event normally using available signals, but always set `reason` to "Private Event" (don't expose private details)

### Scope Limits

**In scope:** Any calendar event with the expected schema

**Future consideration:** May add domain-specific nuance or vertical-specific rules as product expands beyond legal firms

### Disclosure Guardrails

- Never expose private event details in the reason field
- Don't fabricate information when signals are missing
- Be honest about limitations ("Unable to determine event type" when truly unclear)

---

## 9. Edge Cases & Failure Modes

### Data Quality Issues

**Meeting rooms/resources as attendees:**
- **Detection:** Email patterns (room@, resource@, meetingroom@, conf@) OR displayName containing "room", "conference", "boardroom"
- **Handling:** Filter them out before counting attendees
- **Example:** "Large meeting room" with email "Largemeetingroom@nopa.dev" should not count as a person

**Distribution lists:**
- **Detection:** Email looks like a group (e.g., "Legal-team@firm.com")
- **Handling:** Treat as external attendee (we don't have data to expand them)

**Private events with no details:**
- **Handling:** 
  - Default to medium conflict (can't confidently say it's movable without seeing details)
  - Confidence: 0.5-0.6 range (reflects genuine uncertainty)
  - Reason: "Private event — unable to assess details"

### Interpretation Challenges

**Firm-specific jargon/abbreviations:**
- **Example:** "LPC Review", "CD Prep" — opaque to agent without domain knowledge
- **Handling:** Score based on other signals (attendees, timing, commitment level). Don't pretend to understand what you don't.

**Non-English titles:**
- **Handling:** 
  - Translate and rate based on translation
  - LLM can likely handle common languages
  - Other signals (attendees, timing, commitment) still work regardless of language
  - If truly uninterpretable even after translation attempt: lower confidence, reason: "Unable to determine event type"

### Structural Edge Cases

**Multi-day events (conferences, travel, OOO):**
- **Challenge:** `isAllDay: true` could mean conference, OOO, or placeholder
- **Handling:** Reason across signals — don't rely on isAllDay alone
  - "Annual Partner Conference" + location + 3 days = conference, major conflict
  - "Hold" + 3 days + no location = placeholder, medium conflict, lower confidence
  - "Vacation" or "OOO" + 3 days = OOO, major conflict (covered by hard rule)

**Already double-booked:**
- **Challenge:** Person has two events in the same time slot
- **Handling:** Score both events independently. Each represents a commitment they made. Aggregation into slot score is Part B's responsibility, not the agent's.

**"Fake busy" pattern:**
- **Challenge:** Vague events that look like real commitments but are actually soft holds to protect time (e.g., "Focus time", "Block", "Hold")
- **Handling:** Score based on visible signals, let confidence reflect uncertainty:
  - Vague title + solo + self-organized + tentative = probably soft hold → minor conflict
  - Vague title + solo + self-organized + accepted + busy = could be real protection → medium conflict
  - Confidence should be lower (0.6-0.7 range) when signals suggest ambiguity

### Graceful Degradation

**When agent encounters ambiguity or low-quality data:**
- Use available signals, ignore missing optional fields
- Reflect uncertainty in confidence score (lower confidence when fewer signals available)
- Be honest in reason field:
  - "Unable to determine event type" when truly unclear
  - "Private event — unable to assess details" for private events
  - Don't fabricate information or pretend to know what you don't
- Missing core fields → return error (don't attempt to score)

**Default behaviors:**
- If event type is unclear → rely on other dimensions (organizer, attendees, commitment)
- If all signals are weak → default to medium conflict with lower confidence
- If key field is missing → note in relevant signal's `detected` field, treat impact as neutral

---

## 10. Agent Characteristics

### Sensitivity: High

**Reasoning:** Agent accesses calendar event data that may contain:
- Client names in meeting titles
- Case information and legal matter details
- Attorney-client privileged meeting information
- Personal health appointments (when marked private)
- Financial discussions
- Employee PII (names, emails, scheduling patterns)

In the legal firm context, calendar data is highly sensitive due to confidentiality requirements.

**Implications for system prompt:**
- Ensure private events are handled specially (reason always "Private Event")
- Don't expose sensitive details inappropriately in reason field
- Be mindful that calendar data reveals professional relationships and work patterns

### Autonomy: High

**Reasoning:** Agent makes all scoring decisions independently without human review. Outputs directly influence scheduling recommendations shown to users. No human-in-the-loop for validation or approval.

**Implications for system prompt:**
- Clear hard rules must be implemented correctly (OOF, court, declined, etc.)
- Reasoning must be sound — bad scores propagate directly to user-facing recommendations
- Confidence calibration is critical — system needs to know when agent is uncertain

### Exposure: Internal + Partners

**Reasoning:** 
- Agent operates invisibly within the system (users don't interact with it)
- Outputs are shown to internal users (EAs, lawyers at the firm)
- Scheduling decisions based on agent outputs affect external parties (clients see meeting invites, reschedules, and may see conflict explanations)
- While the agent itself is internal, its outputs have external visibility

**Implications for system prompt:**
- Reason field must be professional and appropriate for external viewing
- No internal jargon or debug information in user-facing explanations
- Tone should be suitable for clients to see if explanations are shared

### Reversibility: Easily Reversible

**Reasoning:** 
- Agent only produces scores and recommendations — it doesn't take any direct actions
- No calendar modifications, no messages sent, no commitments made
- Users make final scheduling decisions and can ignore or override agent output
- If scores are wrong, users can simply choose a different time slot
- Mistakes are caught before external impact

**Implications for system prompt:**
- Focus on accuracy over over-conservative scoring
- Don't need extreme validation layers since users review before acting
- Confidence scores help users know when to trust vs. verify

### Blast Radius: Team

**Reasoning:** 
- Mistakes primarily affect the EA and lawyers involved in that specific scheduling request
- Users review recommendations before finalizing scheduling decisions (provides gate before external impact)
- Each scoring operation is isolated to one scheduling request
- Theoretical worst case (client relationship damage) exists, but practical impact is team-level due to user review gate

**Implications for system prompt:**
- Balanced guardrails — not over-constraining, but not reckless
- Appropriate rigor without excessive caution
- Focus on accuracy and transparency so users can catch obvious errors

---

## Completeness Checklist

**Section 1: Agent Overview**
- [x] All metadata fields filled in
- [x] Version and date current
- [x] Owner identified

**Section 2: Product Context**
- [x] User journey clearly described
- [x] User's starting state documented
- [x] User's goal specified
- [x] Product flow explained (before/during/after)
- [x] Success defined from user perspective
- [x] Constraints listed

**Section 3: Agent Definition**
- [x] Purpose statement clear and outcome-focused
- [x] Core task defined
- [x] North star articulated
- [x] Success criteria measurable
- [x] Key assumptions documented

**Section 4: Agent Operating Model**
- [x] Trigger & invocation method specified
- [x] Interaction pattern defined
- [x] User visibility level clarified
- [x] State & lifecycle documented
- [x] Timing & latency expectations specified

**Section 5: Available Tools**
- [x] All required tools listed (or marked N/A)

**Section 6: Behavior Requirements**
- [x] Decision logic explained with reasoning
- [x] Key behaviors listed
- [x] Interaction style specified
- [x] Tone & voice defined with examples
- [x] Quality standards measurable

**Section 7: Input/Output Specification**
- [x] Input format documented (with schema)
- [x] Input sources identified
- [x] Required vs. optional inputs clarified
- [x] Output format documented
- [x] Output delivery method specified

**Section 8: Boundary Conditions**
- [x] Autonomous zone defined with examples
- [x] Confirmation zone defined (N/A)
- [x] Escalate/refuse zone defined with examples
- [x] Scope limits specified
- [x] Disclosure guardrails included

**Section 9: Edge Cases & Failure Modes**
- [x] Known edge cases documented with handling
- [x] Expected failure modes identified
- [x] Graceful degradation behavior specified
- [x] Uncertainty handling defined

**Section 10: Agent Characteristics**
- [x] Level assessed for all 5 characteristics
- [x] Reasoning provided for each characteristic level
- [x] Implications for system prompt and implementation noted

**Quality Standards**
- [x] Specificity: No vague or abstract terms without definition
- [x] Reasoning: Key decisions include "because" explanations
- [x] Examples: Concrete examples provided throughout
- [x] Completeness: No obvious gaps or missing information
- [x] Clarity: Detailed enough for implementation

---

## Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-12-29 | Product Team | Initial specification |

---

## Notes & Open Questions

**Implementation Notes:**
- Schema will be extended with additional fields (`showAs`, `sensitivity`, `isAllDay`, `isCancelled`, `location`) — ensure graceful handling when these become available
- Consider implementing evals to validate scoring accuracy over time
- Monitor confidence calibration — are low-confidence scores actually less accurate?

**Open Questions:**
- How should canceled recurring instances be handled if `isCancelled` isn't available in API response?
- Should we add domain-specific rules for legal jargon as we learn patterns?
- What's the right balance between translation attempt and "unable to determine" for non-English titles?

**Future Enhancements:**
- Add user feedback loop to improve scoring over time
- Implement behavioral learning (detect "fake busy" patterns from user actions)
- Add firm-specific customization (each firm may have different priority rules)
- Expand beyond legal vertical to other professional services

**Next Step:**
Use the System Prompt Creation Workflow (`system-prompt-workflow.md`) to translate this specification into a production-ready system prompt.

