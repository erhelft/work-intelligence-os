# Context Contract: Scheduling Intelligence Agent

## Purpose
Defines the contract between the system prompt and the backend injection pipeline. Specifies input schemas the prompt expects and output schema the agent produces. **Primary use: Schema alignment verification for backend implementation.**

---

## Input Schemas

### 1. Scheduling Operation (Event-Level Data)

**Injection:** `<scheduling_operation>{{SCHEDULING_OPERATION}}</scheduling_operation>`

**Structure:**
```typescript
{
  title: string,
  duration: number,              // minutes
  location: string,
  timezone: string,
  date: {
    start: string,               // ISO datetime
    end: string                  // ISO datetime
  },
  private: boolean,
  attendees: [                   // Array of all participants
    {
      attendee_email: string,
      attendee_name: string,
      is_internal: boolean,
      is_optional: boolean,
      attendee_analysis: {       // Current state for each attendee
        score: number,           // 0-100
        reason: string,
        engagement: string,      // "High" | "Medium" | "Low"
        next_action: {
          type: string,
          subtype: string | null,
          metadata: object
        },
        suggested_alternative_times: [
          {
            date: string,        // YYYY-MM-DD
            time_range: string   // HH:MM-HH:MM or morning/afternoon/evening
          }
        ]
      }
    }
  ],
  event_analysis: {              // Current event-level state
    score: number,               // 0-100
    reason: string,
    next_action: {
      type: string,
      subtype: string,
      metadata: object
    }
  },
  created_at: string             // ISO datetime
}
```

**Usage in prompt:** Agent reads event details (title, date, location), checks other attendees' states (especially `engagement` and `is_optional` fields), and uses `created_at` for time-relative reasoning.

---

### 2. Coordination (Attendee-Level Data)

**Injection:** `<coordination>{{COORDINATION}}</coordination>`

**Structure:**
```typescript
{
  attendee_email: string,
  attendee_name: string,
  is_internal: boolean,
  is_optional: boolean,
  conv_history: [                // Message history - source of truth
    {
      direction: string,         // "inbound" | "outbound"
      email: string,             // from/to address
      content: string,           // message body
      timestamp: string          // ISO datetime
    }
  ],
  followup_date: string | null,  // ISO datetime when next follow-up scheduled
  attendee_analysis: {           // Previous state for THIS attendee
    score: number,
    reason: string,
    engagement: string,
    next_action: {
      type: string,
      subtype: string | null,
      metadata: object
    },
    suggested_alternative_times: [
      {
        date: string,
        time_range: string
      }
    ]
  }
}
```

**Usage in prompt:** Agent reads `conv_history` to interpret latest message, checks `is_optional` to determine criticality, references previous `attendee_analysis` to assess changes.

---

### 3. Trigger Type

**Injection:** `<trigger>{{TRIGGER_TYPE}}</trigger>`

**Values:** `"user_action"` | `"email_response"` | `"cron_job"` | `"backend_process"`

**Usage in prompt:** Informational context (not heavily referenced in decision logic).

---

## Output Schema

### Agent Output (JSON)

**Structure:**
```typescript
{
  attendee_analysis: {
    score: number,                    // 0-100, probability attendee shows up
    reason: string,                   // User-facing explanation of score
    engagement: string,               // "High" | "Medium" | "Low" - REQUIRED
    next_action: {
      type: string,                   // Enum from action menu
      subtype: string | null,         // Enum subtype or null
      metadata: object                // Varies by action type (see below)
    },
    suggested_alternative_times: [   // Cumulative list, can be empty array
      {
        date: string,                 // YYYY-MM-DD
        time_range: string            // HH:MM-HH:MM or morning/afternoon/evening
      }
    ]
  },
  event_analysis: {
    score: number,                    // 0-100, probability meeting happens
    reason: string,                   // User-facing summary of coordination status
    next_action: {
      type: string,                   // Enum from action menu
      subtype: string,                // Enum subtype
      metadata: object                // Varies by action type (see below)
    }
  },
  follow_up_date: string | null       // ISO datetime or null
}
```

---

### Action Type Enums

**Attendee Next Actions:**
- `Initiate` (no subtype)
- `Reply.answer`
- `Reply.clarify`
- `Reply.persist`
- `Reply.request_alternatives`
- `Wait.attendee`
- `Follow_up` (no subtype)
- `Confirm.pending_others`
- `Confirm.finalized`
- `Escalate.alternatives_proposed` ⚠️ requires metadata
- `Escalate.unusual` ⚠️ requires metadata
- `Escalate.internal` ⚠️ requires metadata
- `Close.declined`
- `Close.unresponsive`
- `Close.removed`

**Event Next Actions:**
- `Coordination in progress.reaching_out`
- `Coordination in progress.collecting_responses`
- `Coordination in progress.getting_alternatives`
- `Coordination in progress.all_confirmed`
- `Waiting for decision.get_alternatives`
- `Waiting for decision.reschedule` ⚠️ requires metadata
- `Waiting for decision.resolve_conflict` ⚠️ requires metadata
- `Waiting for decision.recommend_cancel`
- `Waiting for decision.unusual`
- `Complete.scheduled`
- `Complete.cancelled`

---

### Metadata Requirements

**Most actions require no metadata** (`metadata: {}`). Only these require additional fields:

**Attendee Actions:**
```typescript
// Escalate.alternatives_proposed
metadata: {
  attendee_message: string,
  alternatives_proposed: string[]
}

// Escalate.unusual
metadata: {
  attendee_message: string,
  unusual_reason: string
}

// Escalate.internal
metadata: {
  attendee_message: string,
  uncertainty_reason: string
}
```

**Event Actions:**
```typescript
// Waiting.reschedule
metadata: {
  alternatives: [
    {
      date: string,
      time_range: string,
      available_attendees: string[]  // emails of who can attend
    }
  ]
}

// Waiting.resolve_conflict
metadata: {
  conflict_summary: string
}
```

---

## Data Transformation Requirements

### Pre-processing (Backend → Prompt)

1. **Conversation history ordering:** Messages in `conv_history` must be chronologically ordered (oldest first)
2. **Timezone consistency:** All datetime fields should use same timezone as `scheduling_operation.timezone`
3. **Previous analysis availability:** Both `coordination.attendee_analysis` and `scheduling_operation.event_analysis` must contain previous state (not empty/null on subsequent invocations)

### Post-processing (Prompt → Backend)

1. **Engagement field:** Must be validated as one of: "High", "Medium", "Low" (case-sensitive)
2. **Action enum validation:** Validate type.subtype combinations against allowed action menu
3. **Metadata validation:** Ensure required metadata fields present for escalation actions
4. **Follow-up date validation:** If not null, must be future datetime

---

## Critical Integration Notes

### For Backend Engineers

1. **Stateless agent:** Each invocation requires full context injection. Agent has no memory between calls.
2. **Sequential reasoning:** Agent produces attendee_analysis first, then synthesizes event_analysis based on new attendee state + event context.
3. **Engagement field is new:** Added January 2026. Critical for event scoring when processing one attendee (needs engagement levels of other required attendees).
4. **Cross-attendee isolation:** Each coordination object is processed independently. Agent should not see other attendees' message content when analyzing one attendee.

### For QA Testing

**Test cases to verify:**
1. **Engagement field presence:** Every attendee_analysis output includes valid engagement value
2. **Action metadata completeness:** Escalation actions include required metadata fields
3. **Score range validation:** Scores are 0-100 (not percentages, not floats outside range)
4. **Suggested alternatives accumulation:** Alternatives list grows/shrinks appropriately based on message content
5. **Follow-up date logic:** When Follow_up action, follow_up_date is populated; when Close.*, follow_up_date is null

### For Future Prompt Updates

**Schema dependencies to watch:**
1. Changing `engagement` enum values requires prompt update (references "High", "Medium", "Low" throughout)
2. Adding action types requires updating action menu tables in Decision Logic section
3. Changing `is_optional` field name requires updating Event Score Dimension 1 logic
4. Any new metadata requirements need documentation in Output Format section

---

## Example Full Context → Output

**Input Context:**
```json
{
  "scheduling_operation": {
    "title": "Client Strategy Session",
    "date": {"start": "2026-01-15T14:00:00Z", "end": "2026-01-15T15:00:00Z"},
    "attendees": [
      {
        "attendee_email": "sarah@client.com",
        "is_optional": false,
        "attendee_analysis": {"score": 100, "engagement": "High", ...}
      },
      {
        "attendee_email": "michael@client.com",
        "is_optional": false,
        "attendee_analysis": {"score": 50, "engagement": "Low", ...}
      }
    ]
  },
  "coordination": {
    "attendee_email": "michael@client.com",
    "is_optional": false,
    "conv_history": [
      {"direction": "outbound", "content": "Does Tuesday at 2pm work?", "timestamp": "2026-01-06T10:00:00Z"},
      {"direction": "outbound", "content": "Following up on Tuesday meeting", "timestamp": "2026-01-08T10:00:00Z"}
    ],
    "attendee_analysis": {"score": 50, "engagement": "Low", ...}
  }
}
```

**Agent Output:**
```json
{
  "attendee_analysis": {
    "score": 45,
    "reason": "No response to two outreach attempts over 2 days. One more follow-up warranted.",
    "engagement": "Low",
    "next_action": {"type": "Follow_up", "subtype": null, "metadata": {}},
    "suggested_alternative_times": []
  },
  "event_analysis": {
    "score": 70,
    "reason": "Sarah confirmed. Michael hasn't responded after 2 attempts.",
    "next_action": {"type": "Coordination in progress", "subtype": "collecting_responses", "metadata": {}}
  },
  "follow_up_date": "2026-01-11T10:00:00Z"
}
```

---

## Schema Version

**Version:** 1.1  
**Date:** January 7, 2026  
**Changes from 1.0:** Added `engagement` field to attendee_analysis (required)

