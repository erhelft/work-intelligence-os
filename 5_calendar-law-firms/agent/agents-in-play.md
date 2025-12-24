# Multi-Party Coordination Agent Architecture (Revised)

## Introduction: Two Architecture Approaches

This document presents **two distinct architectural approaches** for building the multi-party coordination system, each with different trade-offs between robustness and simplicity.

### Approach Philosophy

**Approach 1: Robust Multi-Agent Architecture**
- 5 specialized agents + hybrid controller
- Maximum separation of concerns
- Built for scale, quality, and flexibility
- **Best for:** Production systems expecting high volume, complex negotiations, need for iterative optimization

**Approach 2: Minimal Two-Agent Architecture**
- 2 agents + event router
- Simplicity and speed to market
- Built for rapid learning and iteration
- **Best for:** MVP launch, faster development, proving product-market fit before optimization

Both approaches handle the same complete flow (happy + challenging paths), but differ in how responsibilities are distributed across agents.

---

## Complete Flow Overview

### Happy Flow (Everyone Can Attend Original Time)
1. User adds external attendees & chooses a slot for scheduling
2. System coordinates with each attendee separately (email/SMS)
3. System collects responses (acceptance/decline/alternative proposals)
4. **Per-attendee status card** - Current status + likelihood for each attendee (with full conversation history)
5. **Overall score** - Likelihood to schedule on original slot + reasoning + next action
6. System auto-confirms if happy path (100% likelihood) or notifies user of action needed

### Challenging Flow (Some Attendees Decline/Propose Alternatives)
6. System proposes alternative times based on general availability + attendee feedback
7. System notifies user "Action Needed" with alternatives + recommendations
8. System follows up with non-responders (deterministic: after 48hrs)
9. System can follow up multiple times until stopping or escalating to user
10. If user changes proposed time, system re-coordinates with all attendees with change context

---

# Approach 1: Robust Multi-Agent Architecture

## Event-Driven Multi-Agent Pipeline with Persistent Conversation State

### Why This Approach?

- **Asynchronous coordination** spans hours/days; requires persistent state external to agent context
- **Two-level scoring** (per-attendee vs. overall) have different inputs/timing; split into separate agents
- **Conversation history** is critical for UI; managed as data layer, not agent responsibility
- **Hybrid follow-ups** - timing is deterministic, content is contextual (rules trigger agent)
- **Re-coordination** requires change context to be preserved and communicated intelligently

---

## Agent Breakdown

### 1. Orchestrator Agent (Enhanced)

| Component | Details |
|-----------|---------|
| **Role** | Coordination lifecycle manager + state synchronizer + escalation controller |
| **Tools** | `get_coordination_state`, `update_coordination_state`, `trigger_agent`, `schedule_followup`, `notify_user`, `trigger_recoordination`, `append_to_conversation_history` |
| **Input** | Events from all agents, user actions, scheduled triggers, webhook responses |
| **Output** | Agent triggers, user notifications, state updates, escalations |

**Responsibilities:**
- Maintains **coordination state** (proposed slot, deadline, response collection phase)
- Maintains **per-attendee state** (status: pending/negotiating/confirmed/declined, response count, last contact)
- Tracks **follow-up schedule** per attendee (deterministic: if no response in 48hrs → queue follow-up)
- Triggers **Per-Attendee Scorer** after each response
- Triggers **Overall Event Scorer** after per-attendee scores update or deadline approaches
- Manages **re-coordination workflow** when user changes proposed time
- Routes escalation to user when likelihood drops below threshold or multiple follow-ups exhausted
- Maintains **conversation history** (append-only log of all agent-attendee interactions)

**State Schema:**
```
{
  coordination_id: string,
  proposed_slot: { start, end, timezone },
  attendees: [
    {
      id: string,
      email: string,
      status: "pending" | "negotiating" | "confirmed" | "declined",
      responses: [{ timestamp, type, content }],
      last_contact: timestamp,
      followup_count: number,
      next_followup_scheduled: timestamp,
      current_per_attendee_score: number
    }
  ],
  overall_score: number,
  overall_reasoning: string,
  next_action: { type, description },
  alternatives_proposed: [slots],
  deadline: timestamp,
  phase: "coordination" | "negotiation" | "recoordination" | "confirmed" | "escalated",
  change_context: { old_slot, new_slot, reason } // For re-coordination
}
```

---

### 2. Outreach Agent (Enhanced)

| Component | Details |
|-----------|---------|
| **Role** | Context-aware communication across all coordination stages |
| **Tools** | `send_email`, `send_sms`, `get_conversation_history`, `get_attendee_context`, `get_change_context`, `get_alternatives` |
| **Input** | Outreach request from **Orchestrator** with message type and context |
| **Output** | Sent message, logged to conversation history |

**Message Types & Contexts:**

- **`initial_outreach`** - First contact
  - Template: "Hi [name], proposing [meeting] for [slot]. Does that work for you?"
  - Context needed: meeting topic, proposed slot

- **`followup`** - Reminder to non-responder
  - Template: "Following up on my previous message about [meeting]. Still checking availability for [proposed time]..."
  - Context: attempt number (1st, 2nd, etc.), previous message content

- **`alternative_exploration`** - Active negotiation 
  - Template: "I understand [proposed time] doesn't work. Would [alternative 1] or [alternative 2] be better?"
  - Context: attendee's stated constraints, alternative times ranked by overall fit

- **`recoordination`** - Time change notification
  - Template: "The [meeting] has been moved from [old slot] to [new slot] because [change_context]. Does this still work for you?"
  - Context: change reason (e.g., "Michael couldn't make Tuesday"), new time

- **`confirmation`** - Final confirmation when all aligned
  - Template: "Great! [Meeting] confirmed for [final slot] with [all attendees]. Adding to your calendar..."
  - Context: final slot, list of confirmed attendees

**Key Principle:** Every message is logged to conversation history immediately for UI display. Includes timestamps and channel (GMAIL/SMS).

---

### 3. Response Parser Agent

| Component | Details |
|-----------|---------|
| **Role** | Extract structured data from natural language responses |
| **Tools** | `parse_email_response`, `parse_sms_response`, `extract_time_preferences`, `detect_sentiment`, `classify_response_type` |
| **Input** | Raw email/SMS response from **Email/SMS Webhooks** |
| **Output** | Structured response object to **Orchestrator** |

**Output Schema:**
```
{
  attendee_id: string,
  response_type: "accept" | "decline" | "propose_alternative" | "conditional" | "unclear",
  accepted_original_slot: boolean,
  proposed_times: [
    {
      original_text: "Tuesday 4:30 PM",
      parsed_datetime: "2025-12-16T16:30:00Z",
      confidence: 0.95,
      extraction_method: "explicit" | "inferred"
    }
  ],
  constraints: [
    "not before 10am",
    "Wednesdays only",
    "no late afternoons"
  ],
  sentiment: "positive" | "neutral" | "reluctant" | "frustrated",
  reasoning_hint: "User has core hours 9-4, rejected Tuesday afternoon"
}
```

**Why separate:** Parsing is per-response (stateless, triggered by webhook). Each new response independently parsed → Orchestrator updates state → triggers Scorers.

---

### 4a. Per-Attendee Scorer

| Component | Details |
|-----------|---------|
| **Role** | Calculate likelihood for individual attendee to attend original slot |
| **Tools** | `get_attendee_conversation`, `get_attendee_calendar`, `get_previous_responses`, `analyze_response_patterns` |
| **Input** | Attendee ID, full conversation history from **Orchestrator** |
| **Output** | Per-attendee score + status card to **Orchestrator → UI** |

**Output (Per-Attendee Status Card):**
```
{
  attendee_id: "michael_chen",
  name: "Michael Chen",
  status: "Negotiating",  // Pending | Confirmed | Negotiating | Declined
  likelihood: 65,  // 0-100% for original slot
  interaction_count: 4,
  last_response: "Today, 10:15 AM",
  
  current_status_summary: 
    "Michael rejected Tuesday 2 PM due to conflicting core hours (9-4). He proposed Tuesday 4:30 PM or Wednesday early morning. Agent is currently verifying Sarah's Wednesday availability.",
  
  conversation_history: [
    // See below in "Conversation History Schema"
  ]
}
```

**Scoring Factors:**
- Has attendee responded? (pending = 50%, accepted = 100%, declined = 0%, negotiating = varies)
- If alternatives proposed, can they overlap with others? (estimate based on proposed times)
- Sentiment and engagement level
- Historical patterns (is this person typically flexible?)

---

### 4b. Overall Event Scorer

| Component | Details |
|-----------|---------|
| **Role** | Aggregate attendee scores, propose alternatives, determine next action |
| **Tools** | `get_all_attendee_scores`, `get_all_calendars`, `calculate_time_overlaps`, `rank_alternatives`, `determine_next_action` |
| **Input** | All per-attendee scores + attendee responses from **Orchestrator** |
| **Output** | Overall assessment to **Orchestrator → UI** |

**Output (Overall Score Card):**
```
{
  overall_likelihood: 71,  // 0-100% for original slot
  
  reason: "High overlap in availability for key stakeholders but Michael cannot make Tuesday afternoons (core hours 9-4).",
  
  next_action: {
    type: "auto_confirm" | "user_action_needed" | "escalate",
    description: "Auto-confirm and send calendar invites to all attendees.",
    urgency: "normal" | "high" | "critical"
  },
  
  alternatives: [
    {
      category: "efficiency_choice",
      slot: { date: "Mon 11", start_time: "12:00 PM", end_time: "1:00 PM" },
      likelihood: 100,
      reasoning: "Michael Chen suggested this specific slot in his email as his 'preferred option'.",
      impact: "High efficiency – Sarah only has a flexible block (Lunch) that is cheap to move."
    },
    {
      category: "user_request",
      slot: { date: "Mon 11", start_time: "3:00 PM", end_time: "4:00 PM" },
      likelihood: 100,
      reasoning: "Derived from Michael Broad request for 'Monday afternoon' availability.",
      impact: "Best for Sarah – Respects her morning prep block."
    },
    {
      category: "backup_option",
      slot: { date: "Tue 12", start_time: "9:00 AM", end_time: "10:00 AM" },
      likelihood: 85,
      reasoning: "Emily Davis mentioned she is free all Tuesday morning if Monday doesn't work.",
      impact: "Good Fit – Requires moving a non-critical 1:1 sync."
    }
  ]
}
```

**Scoring Triggers:**
- After each new response (re-calculate based on cumulative feedback)
- When deadline approaches (even if not all responded)
- When user changes proposed time (re-score with new context)

---

### 5. Follow-up Controller (Hybrid: Deterministic Rules + Agent)

| Component | Details |
|-----------|---------|
| **Role** | Manage follow-up timing and escalation logic |
| **Type** | **Deterministic scheduler** with agent-powered content |
| **Input** | Scheduled tick from **Orchestrator** (e.g., every 1 hour) |
| **Output** | Follow-up trigger or escalation |

**Deterministic Rules (Not Agent):**

```
SCHEDULED_CHECK (every 1 hour):
  For each attendee in [pending, negotiating]:
    time_since_last_contact = now() - attendee.last_contact
    
    if time_since_last_contact > 48 hours:
      if attendee.followup_count < 2:
        QUEUE followup with type="followup"
        attendee.next_followup_scheduled = now() + 24h
      elif attendee.followup_count == 2:
        QUEUE followup with type="last_chance"
        attendee.next_followup_scheduled = now() + 24h
      else if attendee.followup_count >= 3:
        ESCALATE to user: "{attendee} not responding despite 3 attempts"
        mark attendee as "no_response_escalated"
    
    if overall_likelihood < THRESHOLD (e.g., 40%):
      if deadline approaching (< 24 hours):
        ESCALATE to user: "Meeting unlikely at proposed time. Review alternatives?"
```

**Why Hybrid:**
- **Deterministic:** When to follow up (time-based thresholds) is algorithmic, not contextual
- **Agentic:** What to say (tone, reasoning, alternative framing) is contextual and requires intelligence
  - Outreach Agent receives followup trigger with `followup_count`, `last_message_content`, `current_state`
  - Outreach Agent drafts contextual follow-up message
  - Message sent, logged to conversation history

---

## Data Layers (Not Agents)

### Conversation History Store

**Purpose:** Single source of truth for all agent-attendee interactions; UI displays this directly.

**Per-Attendee Conversation Schema:**
```
{
  attendee_id: "michael_chen",
  conversation: [
    {
      id: "msg_001",
      type: "agent_sent",
      channel: "GMAIL",
      timestamp: "2025-12-16T09:00:00Z",
      subject: "Q3 Integration Roadmap Follow-up",
      content: "Hi Michael, proposing a follow-up on the Q3 integration roadmap. Does next Tuesday at 2 PM work for you?"
    },
    {
      id: "msg_002",
      type: "user_reply",
      channel: "GMAIL",
      timestamp: "2025-12-16T10:15:00Z",
      content: "Hey, Tuesday is packed. I might be able to do late afternoon, maybe 4:30 PM? Or early Wednesday."
    },
    {
      id: "msg_003",
      type: "ai_reasoning",
      timestamp: "2025-12-16T10:16:00Z",
      content: "Detected conflict: Michael's core hours are 9-4 PM. Tuesday 4:30 PM falls outside preferred window. Proposing Wednesday early morning. Checking Sarah's Wednesday 9 AM availability in parallel."
    },
    {
      id: "msg_004",
      type: "agent_sent",
      channel: "GMAIL",
      timestamp: "2025-12-16T10:18:00Z",
      subject: "Re: Q3 Integration Roadmap Follow-up",
      content: "I understand. Wednesday at 9:30 AM is open for Sarah. Would that be better for you to start the day fresh?"
    },
    {
      id: "msg_005",
      type: "user_reply",
      channel: "GMAIL",
      timestamp: "2025-12-16T11:45:00Z",
      content: "Wednesday 9:30 works! Looking forward to it."
    }
  ]
}
```

**Key Properties:**
- **Append-only:** Never delete, only add
- **Type-tagged:** `agent_sent`, `user_reply`, `ai_reasoning`, `system_event`
- **Channel-tracked:** GMAIL, SMS, Slack (for audit trail)
- **Timestamped:** UTC for sorting
- **AI Reasoning Visible:** Shows user WHY agent made decisions

**UI Usage:** Display full conversation thread per attendee card, with current status overlay.

---

## Re-coordination Flow (Point 10)

When user changes proposed time due to attendee feedback:

```
USER CHANGES SLOT: "Tuesday 2 PM" → "Wednesday 9:30 AM"
(Reason: "Michael unavailable Tuesday")
     │
     ▼
ORCHESTRATOR
  • Sets phase = "recoordination"
  • Captures: change_context = { 
      old_slot: "Tuesday 2 PM", 
      new_slot: "Wednesday 9:30 AM", 
      reason: "Michael couldn't make Tuesday"
    }
  • For already-confirmed attendees: trigger Outreach (type: recoordination)
  • For pending attendees: continue negotiation using new time as reference
  • Resets per-attendee scores (need confirmation on new time)
     │
     ▼
OUTREACH AGENT (type: recoordination)

For already-confirmed attendees:
  "Hi Emily, the Q3 review meeting has been moved from Tuesday 2 PM to Wednesday 9:30 AM 
   (Michael couldn't make Tuesday). Does Wednesday morning still work for you?"

For pending/negotiating attendees:
  "Hi Michael, based on your feedback about Tuesday availability, we're proposing 
   Wednesday 9:30 AM instead. Does that time work better for you?"
     │
     ▼
RESPONSES → Parser → Per-Attendee Scorer → Overall Scorer → Updated status
```

**Key:** Change context is preserved in conversation history and explicitly mentioned in re-coordination message. Builds transparency and maintains attendee buy-in.

---

## Updated Data Flow Diagram

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                           USER / UI                                          │
│  • Sees per-attendee status cards (status, likelihood, conversation history) │
│  • Sees overall score, reason, next action, ranked alternatives             │
│  • Can change proposed time → triggers re-coordination flow                  │
│  • Receives "Action Needed" notifications when escalated                     │
└──────────────────────────────────┬─────────────────────────────────────────────┘
                                   │
        ┌──────────────────────────▼──────────────────────────┐
        │         ORCHESTRATOR (State Manager)               │
        │                                                     │
        │  Persistent State Store:                            │
        │  • Coordination metadata                            │
        │  • Per-attendee status                              │
        │  • Follow-up schedule                               │
        │  • Score cache (per-attendee + overall)             │
        │  • Phase tracking (coord→negotiation→recoord)       │
        └──────────┬──────────┬──────────┬──────────┬─────────┘
                   │          │          │          │
      ┌────────────▼────┐┌────▼──────┐┌──▼──────┐┌──▼────────────┐
      │    OUTREACH     ││ RESPONSE  ││ SCORING ││  FOLLOW-UP    │
      │     AGENT       ││  PARSER   ││ AGENTS  ││  CONTROLLER   │
      │                 ││           ││ ┌─────┐ ││ (Hybrid)      │
      │ • Initial       ││ • Parse   ││ │Per- │ ││               │
      │ • Followup      ││ • Extract ││ │Atnd │ ││ • Timer rules │
      │ • Alternative   ││   times   ││ └─────┘ ││ • Escalation  │
      │ • Recoord       ││ • Detect  ││ ┌─────┐ ││   logic       │
      │ • Confirm       ││   intent  ││ │Over ││               │
      │                 ││           ││ │all  │ ││ • Triggers    │
      │ (Content)       ││ (Parsing) ││ └─────┘ ││   Outreach    │
      └────────┬────────┘└─────┬─────┘└────────┘└───────────────┘
               │               │
          Email/SMS        Webhooks
               │               │
               └───────┬───────┘
                       │
        ┌──────────────▼───────────────┐
        │  CONVERSATION HISTORY STORE  │
        │  (Append-only, per-attendee) │
        │                              │
        │  • Agent messages (GMAIL)    │
        │  • User replies (GMAIL)      │
        │  • AI reasoning notes        │
        │  • System events             │
        │  • Timestamps + channels     │
        └──────────────────────────────┘
```

---

## What's NOT an Agent

| Component | Type | Reason |
|-----------|------|--------|
| **Conversation History Store** | Data layer | Pure append-only log; no reasoning needed |
| **Follow-up Timer** | Cron/Scheduler | Deterministic time checks; run as scheduled job |
| **User Notification System** | Event handler | Pushes notification based on Orchestrator trigger |
| **Time Overlap Calculator** | Algorithmic | Calendar overlaps are deterministic math |
| **Response Parsing Trigger** | Webhook | Email/SMS webhook → Parser; no logic needed |

---

## Key Architecture Decisions

| Decision | Rationale | Alternative Considered |
|----------|-----------|------------------------|
| **Split Per-Attendee vs. Overall Scoring** | Different inputs (one person's responses vs. all), different timing (triggered per-response vs. deadline/aggregation), different outputs (status card vs. alternatives) | Single Scorer agent would be overloaded context |
| **Conversation History as Data, Not Agent** | UI needs raw access to full history; agents just append. Transparency & audit trail critical. | Alternative: Agent manages history (too slow, doesn't scale) |
| **Follow-up as Hybrid (Rules + Agent)** | When to follow up is algorithmic (time-based); what to say is contextual. Separates concerns. | Alternative: All agentic (slower, expensive); all rules (bad messaging) |
| **Orchestrator as Single State Manager** | Prevents race conditions with concurrent responses. All agents read/write through Orchestrator. | Alternative: Agent-local state (risks inconsistency) |
| **Re-coordination as Distinct Flow** | Change context must be preserved and communicated. Attendee sentiment matters. | Alternative: Treat as normal re-outreach (loses context) |
| **AI Reasoning Logged to History** | Build user trust. Show why agent made decisions. Enables learning. | Alternative: Only show outcomes (black box, low confidence) |

---

## Implementation Priority

### Phase 1 (MVP): Happy Path
- Orchestrator (basic state tracking)
- Outreach Agent (initial outreach only)
- Response Parser
- Per-Attendee Scorer
- Overall Event Scorer (simplified)
- Conversation History Store

### Phase 2: Challenging Path
- Follow-up Controller (deterministic rules)
- Alternative time ranking
- Outreach Agent (followup + alternatives)
- Escalation logic

### Phase 3: Intelligence
- AI Reasoning logging
- Re-coordination flow
- Historical pattern analysis for follow-ups
- Smart deadline adjustment based on urgency

---

# Approach 2: Minimal Two-Agent Architecture

## Simplified Architecture: Two Agents + Event Router

### Why This Approach?

- **Speed to market:** 2 agents vs 5 = faster build, less integration, faster iteration
- **Simpler mental model:** Communication vs. Intelligence = clear separation
- **Reduced failure points:** Fewer handoffs between agents
- **Lower operational cost:** Fewer LLM calls, simpler infrastructure
- **Easier debugging:** Clear ownership boundaries

**Trade-off:** Less separation of concerns, but sufficient for MVP validation.

---

## Core Components

### 1. Communication Agent

| Component | Details |
|-----------|---------|
| **Role** | All message handling: compose, send, parse, follow-up |
| **Tools** | `send_email`, `send_sms`, `parse_response`, `extract_time_preferences`, `detect_sentiment`, `get_conversation_history`, `get_change_context` |
| **Input** | Trigger from **Event Router** with message type (initial/followup/recoordination/confirmation) + context |
| **Output** | Sent message logged to conversation store + parsed response data to state |

**Responsibilities:**
- **Compose messages** for all coordination stages (initial, followup, alternative exploration, recoordination, confirmation)
- **Send via appropriate channel** (email/SMS)
- **Parse incoming responses** to extract: acceptance/decline, proposed times, constraints, sentiment
- **Log all interactions** to conversation history for UI display
- **Context-aware messaging** based on conversation history and coordination phase

**Why combined:** Composing and parsing are in same domain (natural language). Agent that sends messages understands response format. Reduces context handoff.

---

### 2. Intelligence Agent

| Component | Details |
|-----------|---------|
| **Role** | All scoring, alternative ranking, decision logic |
| **Tools** | `get_all_attendee_responses`, `get_all_calendars`, `calculate_overlap`, `rank_alternatives`, `determine_next_action`, `calculate_per_attendee_likelihood`, `calculate_overall_likelihood` |
| **Input** | Trigger from **Event Router** with full coordination state (all attendees, all responses) |
| **Output** | Per-attendee scores + overall score + alternatives + next action recommendation |

**Responsibilities:**
- **Per-attendee scoring:** Calculate likelihood for each attendee to attend original slot (0-100%)
- **Overall scoring:** Aggregate likelihood across all attendees for original slot
- **Alternative generation:** Propose ranked alternative slots based on feedback and calendar availability
- **Next action determination:** Decide if system can auto-confirm, needs user action, or should escalate
- **Reasoning generation:** Explain why scores are what they are and what drove alternative selection

**Why combined:** All scoring uses same input data (responses + calendars). Per-attendee and overall scoring are sequential operations (per-attendee feeds into overall). Single call more efficient than two separate triggers.

---

### 3. Event Router (Not an Agent)

| Component | Details |
|-----------|---------|
| **Type** | Stateless event handler + state machine |
| **Role** | Route events, trigger agents, enforce rules, manage state transitions |
| **Input** | Events from: user actions, webhooks (responses), scheduled timers, agent completions |
| **Output** | Agent triggers with context, state updates, user notifications |

**Event Handling Logic:**

```
USER creates coordination:
  → Update state (coordination_id, proposed_slot, attendees)
  → Trigger Communication Agent (type: initial_outreach)

WEBHOOK receives response:
  → Trigger Communication Agent (type: parse_response)
  → Communication Agent returns parsed data
  → Update state (attendee status, response content)
  → Trigger Intelligence Agent (type: score_update)
  → Intelligence Agent returns scores + alternatives
  → Update state (scores, alternatives, next_action)

TIMER fires (follow-up check):
  For each attendee where:
    - status = pending or negotiating
    - time_since_last_contact > 48 hours
    - followup_count < 3
  → Trigger Communication Agent (type: followup)
  
  If followup_count >= 3:
  → Notify user (escalation)

USER changes proposed time:
  → Update state (change_context: old_slot, new_slot, reason)
  → Set phase = recoordination
  → For all attendees: Trigger Communication Agent (type: recoordination)

INTELLIGENCE determines next_action = "auto_confirm":
  → Trigger Communication Agent (type: confirmation)
  → Update state (phase = confirmed)
  → Send calendar invites

INTELLIGENCE determines next_action = "user_action_needed":
  → Notify user (action needed: review alternatives)
```

**Why not an agent:** Event routing is deterministic state machine logic. No reasoning needed—just "if X happened, trigger Y with context Z."

---

## Data Flow

```
┌─────────────────────────────────────────────┐
│              USER / UI                      │
│  • Per-attendee status + conversation       │
│  • Overall score + alternatives             │
│  • Action needed notifications              │
└─────────────────┬───────────────────────────┘
                  │
     ┌────────────▼────────────┐
     │    EVENT ROUTER         │
     │  (Stateless handler)    │
     │                         │
     │  Triggers:              │
     │  • User actions         │
     │  • Webhooks             │
     │  • Timers (48hr check)  │
     └────┬───────────────┬────┘
          │               │
    ┌─────▼──────┐   ┌────▼─────────┐
    │COMMUNIC.   │   │INTELLIGENCE  │
    │AGENT       │   │AGENT         │
    │            │   │              │
    │• Compose   │   │• Per-attendee│
    │• Send      │   │  scoring     │
    │• Parse     │   │• Overall     │
    │• Log       │   │  scoring     │
    │            │   │• Alternatives│
    │            │   │• Next action │
    └─────┬──────┘   └────┬─────────┘
          │               │
     Email/SMS       State updates
          │               │
          └───────┬───────┘
                  │
    ┌─────────────▼──────────────┐
    │    COORDINATION STATE      │
    │    (Database)              │
    │                            │
    │  • Proposed slot           │
    │  • Per-attendee status     │
    │  • Conversation history    │
    │  • Follow-up schedule      │
    │  • Scores (cached)         │
    │  • Phase tracking          │
    └────────────────────────────┘
```

---

## Coordination State Schema

```
{
  coordination_id: string,
  proposed_slot: { start, end, timezone },
  phase: "coordination" | "negotiation" | "recoordination" | "confirmed" | "escalated",
  deadline: timestamp,
  change_context: { old_slot, new_slot, reason },
  
  attendees: [
    {
      id: string,
      email: string,
      status: "pending" | "negotiating" | "confirmed" | "declined",
      last_contact: timestamp,
      followup_count: number,
      
      // Parsed from responses
      proposed_times: [{ text, parsed_datetime, confidence }],
      constraints: ["not before 10am"],
      sentiment: "positive" | "neutral" | "reluctant",
      
      // Calculated by Intelligence Agent
      per_attendee_likelihood: number,
      current_status_summary: string,
      
      // Conversation log
      conversation: [
        { type: "agent_sent", timestamp, channel, content },
        { type: "user_reply", timestamp, channel, content },
        { type: "ai_reasoning", timestamp, content }
      ]
    }
  ],
  
  // Calculated by Intelligence Agent
  overall_likelihood: number,
  overall_reasoning: string,
  next_action: { type: "auto_confirm" | "user_action_needed" | "escalate", description, urgency },
  alternatives: [
    { category, slot, likelihood, reasoning, impact }
  ]
}
```

---

## How Complete Flow Works

### Happy Path: Everyone Accepts

1. **User creates coordination** → Router updates state → triggers Communication Agent (initial)
2. **Communication Agent** sends personalized email to each attendee
3. **Responses arrive** → Router triggers Communication Agent (parse)
4. **Communication Agent** extracts "accepted" → Router updates attendee status
5. **Router** triggers Intelligence Agent after each response
6. **Intelligence Agent** calculates scores: per-attendee = 100%, overall = 100%
7. **Intelligence Agent** determines next_action = "auto_confirm"
8. **Router** triggers Communication Agent (confirmation) → sends calendar invites
9. **Done**

### Challenging Path: Some Decline, Propose Alternatives

1-3. Same as happy path
4. **Communication Agent** extracts "declined" + proposed time "Wednesday 9 AM"
5. **Intelligence Agent** scores: per-attendee = 0% (for original), suggests alternatives including "Wednesday 9 AM" (category: user_request)
6. **Intelligence Agent** determines next_action = "user_action_needed"
7. **Router** notifies user → User reviews alternatives
8. **User changes proposed time** to Wednesday 9 AM
9. **Router** sets phase = "recoordination", triggers Communication Agent for all attendees
10. **Communication Agent** sends: "Meeting moved from Tuesday to Wednesday (Michael couldn't make Tuesday). Does this work?"
11. **Cycle repeats** until all confirmed or escalated

### Follow-up Flow

1. **Timer fires** (cron every 1 hour)
2. **Router** checks: attendee.last_contact > 48hrs AND followup_count < 3
3. **Router** triggers Communication Agent (followup) with attendee context
4. **Communication Agent** drafts contextual reminder: "Following up on my previous message..."
5. **Router** increments followup_count
6. If followup_count >= 3 → Router notifies user (escalation: "Michael not responding")

---

## Key Simplifications vs. Approach 1

| What Changed | Approach 1 (Robust) | Approach 2 (Minimal) | Impact |
|--------------|---------------------|----------------------|--------|
| **Agents** | 5 specialized agents | 2 combined agents | Faster build, less handoff |
| **Orchestration** | Orchestrator Agent (reasoning) | Event Router (rules) | Simpler, deterministic routing |
| **Parsing** | Dedicated Parser Agent | Communication Agent parses | Same domain = natural combination |
| **Scoring** | Split Per-Attendee + Overall | Single Intelligence Agent (sequential) | One call instead of two triggers |
| **Follow-ups** | Hybrid Controller triggers Outreach | Router triggers Communication | Same pattern, simpler naming |

---

## What Stays the Same

- **Conversation history logging:** Both approaches log all interactions for UI transparency
- **Two-level scoring:** Both calculate per-attendee + overall likelihood
- **Alternative ranking:** Both propose categorized alternatives (efficiency/user request/backup)
- **Re-coordination flow:** Both preserve change context when time shifts
- **Follow-up logic:** Both use deterministic timers (48hrs) + contextual messaging
- **State management:** Both use persistent database for coordination state

---

## Scaling Considerations

**When to split Communication Agent:**
- Context window exceeded (>10 attendees with long conversation histories)
- Parsing quality degrades when combined with composition
- Need parallel response processing (unlikely—responses arrive sequentially)

**When to split Intelligence Agent:**
- Per-attendee scoring takes >5 seconds, blocking overall scoring
- Need different models (fast model for per-attendee, premium model for alternatives)
- Want to cache per-attendee scores independently

**When to upgrade Event Router to Orchestrator Agent:**
- Routing logic becomes too complex (>50 conditional branches)
- Need context-aware routing decisions (not just deterministic rules)
- Multi-tenant coordination conflicts require intelligent scheduling

**Reality check:** Most coordination systems won't hit these limits. Start simple.

---

## Success Metrics

**Per Agent:**
- **Outreach:** Message delivery rate, open rate, click rate
- **Parser:** Extraction accuracy (yes/no/maybe classification), time extraction confidence
- **Scorers:** Prediction accuracy vs. actual attendance, alternative slot acceptance rate
- **Follow-up:** Response rate to follow-ups, time-to-response improvement

**Overall System:**
- **Coordination success rate:** % of meetings confirmed on original or proposed slot
- **Time-to-confirmation:** Average hours from initial outreach to all confirmations
- **User action rate:** % meetings that auto-confirm vs. require user input
- **Attendee satisfaction:** Likelihood score accuracy, alternative quality

---

# Comparative Analysis: Approach 1 vs. Approach 2

## Side-by-Side Comparison

| Dimension | Approach 1: Robust Multi-Agent | Approach 2: Minimal Two-Agent | Winner |
|-----------|-------------------------------|------------------------------|--------|
| **Agent Count** | 5 agents + hybrid controller | 2 agents + event router | Approach 2 |
| **Lines of Code** | ~3,000-4,000 (estimated) | ~1,500-2,000 (estimated) | Approach 2 |
| **Development Time** | 8-12 weeks | 4-6 weeks | Approach 2 |
| **Separation of Concerns** | Excellent (each agent single-purpose) | Good (communication vs. intelligence) | Approach 1 |
| **Debugging Complexity** | Medium (more components to trace) | Low (clear ownership) | Approach 2 |
| **Iteration Speed** | Slower (changes may affect multiple agents) | Faster (changes isolated to 1-2 agents) | Approach 2 |
| **Scalability** | Built for 100+ attendee coordinations | Sufficient for 10-20 attendee coordinations | Approach 1 |
| **Context Window Risk** | Low (specialized agents, smaller contexts) | Medium (combined agents, larger contexts) | Approach 1 |
| **Quality Potential** | Higher (dedicated parser, dedicated scorers) | Good (combined but sufficient) | Approach 1 |
| **Operational Cost** | Higher (more LLM calls, more infra) | Lower (fewer calls, simpler infra) | Approach 2 |
| **Testing Complexity** | Higher (more integration tests) | Lower (fewer handoffs to test) | Approach 2 |

---

## Detailed Pros & Cons

### Approach 1: Robust Multi-Agent Architecture

#### ✅ Pros

| Benefit | Why It Matters |
|---------|----------------|
| **Best-in-class quality** | Dedicated Parser ensures parsing accuracy; dedicated Scorers can use different models/strategies |
| **Easy to optimize** | Can improve parsing without touching scoring; can swap scorer models independently |
| **Built for scale** | Handles 50+ attendee coordinations with complex multi-day negotiations |
| **Lower context risk** | Each agent has narrow focus = smaller context windows = less hallucination risk |
| **Parallel processing** | Can parse 5 responses simultaneously (different agent instances) |
| **Clear accountability** | If parsing fails, it's Parser Agent. If scoring is wrong, it's Scorer Agent. |

#### ⚠️ Cons

| Risk | Why It's a Problem |
|------|-------------------|
| **Slower to ship** | 8-12 weeks development = delayed learning from real users |
| **Over-engineering risk** | Building for scale you may not need (80% of coordinations are 3-5 people) |
| **More failure points** | 5 agents + controller = 6 places things can break |
| **Higher operational cost** | More agents = more LLM API calls = higher monthly spend |
| **Harder onboarding** | New engineers need to understand 5 agent responsibilities + handoff protocols |
| **Testing burden** | Must test Orchestrator→Parser→Scorer1→Scorer2 handoff chains |

---

### Approach 2: Minimal Two-Agent Architecture

#### ✅ Pros

| Benefit | Why It Matters |
|---------|----------------|
| **Ship in 4-6 weeks** | Get to users faster = learn faster = iterate faster |
| **Simpler mental model** | 2 agents = easier to understand, explain, document |
| **Fewer failure points** | 2 agents + router = 3 components vs. 6 = more reliable |
| **Lower operational cost** | Fewer LLM calls per coordination (combined operations) |
| **Easier debugging** | "Message wrong?" → Communication Agent. "Score wrong?" → Intelligence Agent. |
| **Faster iteration** | Change scoring logic without touching 3 other agents |
| **Good enough quality** | 95% as good as Approach 1 for 90% of use cases |

#### ⚠️ Cons

| Risk | Why It's a Problem |
|------|-------------------|
| **Context window risk** | 10+ attendees with long conversations may exceed context limits |
| **Quality ceiling** | Harder to optimize parsing independently from message composition |
| **Scaling requires refactor** | At high volume, will need to split agents (but only if you reach that scale) |
| **Blurred boundaries** | "Why did scoring fail?" could be parsing OR scoring logic—harder to isolate |
| **Less parallelism** | Can't parse multiple responses simultaneously (one Communication Agent instance) |

---

## Decision Framework

### Choose Approach 1 (Robust) If:

✅ You're **post-PMF** and building for scale  
✅ You expect **high coordination volume** (1,000+ coordinations/day)  
✅ You have **complex negotiations** (10+ attendees, multi-day, high stakes)  
✅ You have **engineering resources** (team of 3+ engineers)  
✅ You prioritize **best-in-class quality** over speed to market  
✅ You can afford **2-3 months** development before launch  
✅ You need **independent optimization** of parsing, scoring, alternatives

### Choose Approach 2 (Minimal) If:

✅ You're **pre-PMF** and validating product-market fit  
✅ You expect **moderate volume** (10-100 coordinations/day in first 6 months)  
✅ Most coordinations are **3-5 attendees** (typical for law firm meetings)  
✅ You have **limited resources** (solo founder or small team)  
✅ You need to **ship fast** and learn from real users  
✅ You want **4-6 weeks** to first beta launch  
✅ You can **refactor later** if you hit scale limits (good problem to have)

---

## Recommendation

### For This Product (Calendar Intelligence for Law Firms): Start with Approach 2

**Why:**

1. **Unknown PMF:** You don't know if law firms will pay $75-150/user yet. Ship fast, validate value, iterate.

2. **Volume is unknown:** You're targeting 15K-20K firms, but will you get 10 or 1,000 customers in Year 1? Don't optimize for 1,000 until you have 100.

3. **Typical coordination is simple:** Law firm meetings average 3-5 attendees (partner + client + 1-2 other attorneys). Not 50-person conference coordination.

4. **Speed beats perfection:** 4-6 weeks to beta with Approach 2 vs. 10-12 weeks with Approach 1 = 6 weeks more customer feedback = better product.

5. **Easy migration path:** If you hit scale/quality limits (great problem!), you can split Communication → Outreach + Parser, and Intelligence → Per-Attendee Scorer + Overall Scorer. The state schema is identical. Migration is 2-3 weeks, not a rewrite.

6. **Resource efficiency:** Approach 2 costs ~50% less in development time and ~30% less in operational LLM costs. Use savings to invest in product discovery and sales.

### When to Migrate to Approach 1:

- **Volume trigger:** 500+ coordinations/day sustained for 2+ weeks
- **Quality trigger:** Parsing accuracy drops below 85% OR scoring accuracy below 80%
- **Complexity trigger:** 20% of coordinations have 10+ attendees OR multi-day negotiations
- **Context trigger:** Hitting LLM context window limits (errors or truncated conversations)

### The Bottom Line:

**Approach 2 gets you to PMF faster. Approach 1 gets you to scale better. You need PMF before scale matters.**

Start with Approach 2. Split to Approach 1 only when you have proof the architecture is the bottleneck (not the product, not the market, not the sales process).

---

## Implementation Roadmap

### Phase 1 (Weeks 1-6): MVP with Approach 2
- Build Communication Agent + Intelligence Agent + Event Router
- Implement happy path (all attendees accept)
- Implement challenging path (some decline, alternatives proposed)
- Basic follow-up logic (deterministic 48hr timer)
- Ship to 5-10 design partner law firms

### Phase 2 (Weeks 7-12): Learn & Iterate (Still Approach 2)
- Gather coordination data (how many attendees? how many rounds? success rate?)
- Improve prompts based on real conversations
- Add re-coordination flow
- Expand to 20-30 customers
- **Measure:** Are we hitting context limits? Parsing quality? Scoring quality?

### Phase 3 (Weeks 13-18): Scale Decision Point
- **IF** volume > 500/day OR quality issues OR context limits:
  - Migrate to Approach 1 (split agents)
  - Estimated 2-3 weeks engineering
- **ELSE:**
  - Continue with Approach 2
  - Invest time in product features (not architecture)

### Long-term (6+ months):
- If still on Approach 2 at high volume: migrate proactively before problems
- If migrated to Approach 1: continue optimization (model selection, parallel processing, caching)

---

**Final Word:** The best architecture is the one that ships. Approach 2 ships faster. Start there.
