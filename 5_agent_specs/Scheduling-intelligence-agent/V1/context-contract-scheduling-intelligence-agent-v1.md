# Context Contract: Scheduling Intelligence Agent V1

## Purpose
Defines the contract between the system prompt and the context injection pipeline. Specifies what dynamic context the prompt expects and what output format the agent produces.

**This is a schema alignment document** — focused on field structures, types, and transformation requirements for backend implementation.

---

## Dynamic Context: Input Schemas

### 1. `<scheduling_operation>`

**XML Tag:** `<scheduling_operation>`  
**Injection Placeholder:** `{{SCHEDULING_OPERATION}}`  
**Type:** Object  
**Required:** Yes

**Purpose:** Event-level data providing full context about the meeting coordination.

**Schema:**
```json
{
  "title": "string",
  "duration": "number (minutes)",
  "location": "string",
  "timezone": "string",
  "date": {
    "start": "ISO datetime",
    "end": "ISO datetime"
  },
  "private": "boolean",
  "attendees": [
    {
      "attendee_email": "string",
      "attendee_name": "string",
      "is_internal": "boolean",
      "is_optional": "boolean",
      "attendee_analysis": {
        "score": "number (0-100)",
        "reason": "string",
        "engagement": "enum: High | Medium | Low",
        "next_action": {
          "type": "enum (string)",
          "subtype": "enum (string)",
          "metadata": "object"
        },
        "suggested_alternative_times": [
          {
            "date": "string (YYYY-MM-DD)",
            "time_range": "string (HH:MM-HH:MM or morning/afternoon/evening)"
          }
        ]
      }
    }
  ],
  "created_at": "ISO datetime",
  "event_analysis": {
    "score": "number (0-100)",
    "reason": "string",
    "next_action": {
      "type": "enum (string)",
      "subtype": "enum (string)",
      "metadata": "object"
    }
  }
}
```

**Referenced in Prompt:** Decision Logic (event scoring dimension 1-5), Examples

---

### 2. `<coordination>`

**XML Tag:** `<coordination>`  
**Injection Placeholder:** `{{COORDINATION}}`  
**Type:** Object  
**Required:** Yes

**Purpose:** Attendee-specific coordination data for ONE attendee.

**Schema:**
```json
{
  "attendee_email": "string",
  "attendee_name": "string",
  "is_internal": "boolean",
  "is_optional": "boolean",
  "conv_history": [
    {
      "direction": "enum: inbound | outbound",
      "email": "string (from/to address)",
      "content": "string (message content)",
      "timestamp": "ISO datetime"
    }
  ],
  "followup_date": "ISO datetime or null",
  "attendee_analysis": {
    "score": "number (0-100)",
    "reason": "string",
    "engagement": "enum: High | Medium | Low",
    "next_action": {
      "type": "enum (string)",
      "subtype": "enum (string)",
      "metadata": "object"
    },
    "suggested_alternative_times": [
      {
        "date": "string (YYYY-MM-DD)",
        "time_range": "string (HH:MM-HH:MM or morning/afternoon/evening)"
      }
    ]
  }
}
```

**Note:** Agent processes ONE attendee per invocation (single coordination object).

**Referenced in Prompt:** Decision Logic (attendee scoring, engagement, next action), Memory (conv_history contradictions), Examples

---

## Agent Output: JSON Schema

**Type:** JSON Object  
**Structure:**

```json
{
  "attendee_analysis": {
    "score": "number (0-100, required)",
    "reason": "string (required)",
    "engagement": "enum: High | Medium | Low (required)",
    "next_action": {
      "type": "enum (string, required)",
      "subtype": "enum (string, required)",
      "metadata": "object (required, may be empty {})"
    },
    "suggested_alternative_times": [
      {
        "date": "string (YYYY-MM-DD, required)",
        "time_range": "string (required)"
      }
    ]
  },
  "event_analysis": {
    "score": "number (0-100, required)",
    "reason": "string (required)",
    "next_action": {
      "type": "enum (string, required)",
      "subtype": "enum (string, required)",
      "metadata": "object (required, may be empty {})"
    }
  },
  "follow_up_date": "ISO datetime or null (required)"
}
```

---

## Attendee Next Action Types

**Enum values for `attendee_analysis.next_action.type` and `.subtype`:**

| Type | Subtype | Metadata Requirements |
|------|---------|----------------------|
| Initiate | — | `{}` |
| Reply | answer | `{}` |
| Reply | clarify | `{}` |
| Reply | persist | `{}` |
| Reply | request_alternatives | `{}` |
| Wait | attendee | `{}` |
| Follow_up | — | `{}` |
| Confirm | pending_others | `{}` |
| Confirm | finalized | `{}` |
| Escalate | alternatives_proposed | `{"attendee_message": "string", "alternatives_proposed": ["string"]}` |
| Escalate | unusual | `{"attendee_message": "string", "unusual_reason": "string"}` |
| Escalate | internal | `{"attendee_message": "string", "uncertainty_reason": "string"}` |
| Close | declined | `{}` |
| Close | unresponsive | `{}` |
| Close | removed | `{}` |

---

## Event Next Action Types

**Enum values for `event_analysis.next_action.type` and `.subtype`:**

| Type | Subtype | Metadata Requirements |
|------|---------|----------------------|
| Coordination in progress | reaching_out | `{}` |
| Coordination in progress | collecting_responses | `{}` |
| Coordination in progress | getting_alternatives | `{}` |
| Coordination in progress | all_confirmed | `{}` |
| Waiting for decision | get_alternatives | `{}` |
| Waiting for decision | reschedule | `{"alternatives": [object]}` |
| Waiting for decision | resolve_conflict | `{"conflict_summary": "string"}` |
| Waiting for decision | recommend_cancel | `{}` |
| Waiting for decision | unusual | `{}` |
| Complete | scheduled | `{}` |
| Complete | cancelled | `{}` |

---

## Data Transformation Requirements

### Pre-Processing (Before Injection)

**None required.** Agent processes data as-is from scheduling operation + coordination objects.

### Post-Processing (After Agent Output)

1. **Backend must validate enum values** against defined action type/subtype lists above
2. **Backend must validate metadata structure** matches requirements for each action type
3. **Backend must handle follow_up_date:**
   - If not null: Schedule cron job to re-invoke agent at specified datetime
   - If null: No follow-up needed for this attendee

---

## Validation Rules

### Input Validation
- `conv_history` must not be empty (except for initial Initiate action)
- `attendee_analysis` contains previous assessment (may be null on first invocation)
- `is_optional` field should be present; if missing, agent infers from signals

### Output Validation
- All required fields must be present
- Scores must be 0-100 (integers)
- Engagement must be exactly one of: High, Medium, Low
- Action types/subtypes must match defined enums
- Metadata structure must match action type requirements
- `suggested_alternative_times` must be array (may be empty)
- `follow_up_date` must be ISO datetime or null

---

## Integration Notes

### For Backend Engineers:

**Input Context Assembly:**
1. Fetch scheduling operation from DB
2. Fetch specific coordination object for target attendee
3. Inject both into prompt using XML tags `<scheduling_operation>` and `<coordination>`
4. Agent processes ONE attendee per invocation

**Output Processing:**
1. Parse JSON response
2. Validate against schema above
3. Update coordination object with new `attendee_analysis`
4. Update scheduling operation with new `event_analysis`
5. If `follow_up_date` not null: schedule cron job for re-invocation
6. Pass `attendee_analysis.next_action` to Communication Agent for execution

**Error Handling:**
- Invalid JSON: Log error, mark coordination as failed
- Missing required fields: Log error, escalate to user
- Invalid enum values: Log error, use fallback (collecting_responses for event, Reply.clarify for attendee)

### For QA:

**Test scenarios:**
1. **Happy path:** Explicit confirmation → verify score 100, Confirm action
2. **Ambiguous response:** "maybe" → verify score ~50, Reply.clarify action
3. **Silence:** No response after reasonable time → verify Follow_up action with appropriate follow_up_date
4. **Rejection with alternatives:** Verify Escalate.alternatives_proposed with populated metadata
5. **Multiple attendees:** Process each independently, verify event score aggregates correctly

**Edge cases:**
- Empty conv_history on non-initial invocation
- Missing `is_optional` field
- Contradictory messages in conv_history
- Meeting date in past
- All attendees marked optional (no required)

---

## Version

**Agent Spec Version:** v1.1  
**System Prompt Version:** v1  
**Context Contract Version:** v1  
**Last Updated:** January 11, 2026

---

## Future Considerations

- If coordination scales to multiple attendees per invocation, input schema would change from single coordination object to array
- If timezone handling becomes more complex, may need explicit timezone fields in alternative times
- If engagement scoring becomes more sophisticated, may add numeric engagement score alongside categorical level

