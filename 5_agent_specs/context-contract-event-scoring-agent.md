# Context Contract: Event Scoring Agent

## Purpose

Defines the contract between the system prompt and the context injection pipeline. Specifies what dynamic context the prompt expects and what output format the agent produces.

---

## Dynamic Context Sections

### Input Context: Events Array

#### `<events>`
- **XML Tag:** `<events>`
- **Injection Placeholder:** `{{EVENTS_ARRAY}}`
- **Type:** Array of event objects
- **Required:** Yes
- **Cardinality:** 1 to 350 events per request

#### **Format Specification:**

```xml
<events>
[
  {
    "summary": "string",
    "start": {
      "dateTime": "ISO 8601 datetime",
      "timeZone": "string"
    },
    "end": {
      "dateTime": "ISO 8601 datetime", 
      "timeZone": "string"
    },
    "attendees": [
      {
        "email": "string",
        "displayName": "string",
        "responseStatus": "accepted | tentative | declined | none"
      }
    ],
    "organizer": {
      "email": "string",
      "displayName": "string"
    },
    "showAs": "busy | free | tentative | oof | workingElsewhere",
    "sensitivity": "normal | personal | private | confidential",
    "isAllDay": boolean,
    "isCancelled": boolean,
    "location": "string",
    "description": "string",
    "externalCreatedAt": "ISO 8601 datetime",
    "externalUpdatedAt": "ISO 8601 datetime"
  }
]
</events>
```

#### **Field Requirements:**

**Core Fields (Required):**
- `summary` - Event title
- `start` - Start time object with dateTime and timeZone
- `end` - End time object with dateTime and timeZone
- `attendees` - Array with at least email, displayName, responseStatus
- `organizer` - Object with email and displayName

**Signal Fields (Optional but recommended):**
- `showAs` - Commitment level signal
- `sensitivity` - Privacy level (triggers special handling if "private")
- `isAllDay` - Boolean flag for all-day events
- `isCancelled` - Boolean flag for cancelled events (skips scoring)
- `location` - Physical/virtual location
- `description` - Additional event details
- `externalCreatedAt` - Creation timestamp (for lead time calculation)
- `externalUpdatedAt` - Last modified timestamp (for coordination signal)
- Recurrence info (if available)

#### **Example:**

```xml
<events>
[
  {
    "summary": "Morrison Case Strategy - Client Meeting",
    "start": {
      "dateTime": "2025-01-15T14:00:00.0000000",
      "timeZone": "America/New_York"
    },
    "end": {
      "dateTime": "2025-01-15T15:30:00.0000000",
      "timeZone": "America/New_York"
    },
    "attendees": [
      {
        "email": "sarah@lawfirm.com",
        "displayName": "Sarah Chen",
        "responseStatus": "accepted"
      },
      {
        "email": "jmorrison@clientcorp.com",
        "displayName": "John Morrison",
        "responseStatus": "accepted"
      }
    ],
    "organizer": {
      "email": "sarah@lawfirm.com",
      "displayName": "Sarah Chen"
    },
    "showAs": "busy",
    "location": "Client Office - Downtown",
    "externalCreatedAt": "2025-01-08T09:00:00Z",
    "externalUpdatedAt": "2025-01-08T09:00:00Z"
  }
]
</events>
```

#### **Data Transformation Requirements:**
- Meeting rooms/resources should be filtered from attendees before injection (email patterns: room@, resource@, meetingroom@, conf@; displayName patterns: "room", "conference", "boardroom")
- Maximum 350 events per request (performance constraint)
- Each event must have all core fields present
- Missing signal fields are acceptable (omit field, don't use null/undefined)
- Unknown fields are ignored gracefully

---

## Agent Output Specification

### Response Format
- **Type:** JSON array (one result per input event)
- **Cardinality:** Same length as input events array
- **Latency requirement:** < 5 seconds for up to 350 events

### Output Schema

**Per-event response:**

```json
{
  "conflictLevel": "minor | medium | major | available",
  "confidence": 0.0 - 1.0,
  "signals": {
    "eventType": {
      "detected": "string - what kind of event was inferred",
      "impact": "minor | medium | major | neutral"
    },
    "schedulingContext": {
      "detected": "string - lead time and modification recency",
      "impact": "minor | medium | major | neutral"
    },
    "organizerRelationship": {
      "detected": "string - who organized and their relationship",
      "impact": "minor | medium | major | neutral"
    },
    "attendeeComposition": {
      "detected": "string - count, externals, seniority",
      "impact": "minor | medium | major | neutral"
    },
    "personRole": {
      "detected": "string - their role in the event",
      "impact": "minor | medium | major | neutral"
    },
    "commitmentSignals": {
      "detected": "string - response status and showAs",
      "impact": "minor | medium | major | neutral"
    },
    "temporalContext": {
      "detected": "string - proximity and recurrence pattern",
      "impact": "minor | medium | major | neutral"
    }
  },
  "reason": "string - user-facing explanation (max 1 sentence)"
}
```

### Field Definitions

**conflictLevel:**
- `available` - Person is free or declined the event
- `minor` - Easy to move/skip (focus blocks, recurring internal meetings, low-commitment)
- `medium` - Movable with coordination (internal 1:1s, team meetings with commitment)
- `major` - High friction to move (client meetings, court, external commitments, immovable)

**confidence:**
- Range: 0.0 to 1.0
- `0.9-1.0` - Signals strongly converge, or hard rule applies
- `0.7-0.9` - Clear patterns, some minor ambiguity
- `0.5-0.7` - Mixed signals, sparse data, genuine uncertainty
- `< 0.5` - Avoid (indicates missing critical context)

**signals.*.detected:**
- Natural language description of what the agent detected for that dimension
- Examples: "Client strategy meeting", "Scheduled 1 week ahead", "Self-organized with external client"
- If field unavailable: "Field not available" or "Unable to determine [aspect]"

**signals.*.impact:**
- How this signal pushes the conflict assessment
- `major` - Pushes toward major conflict
- `medium` - Pushes toward medium conflict
- `minor` - Pushes toward minor conflict
- `neutral` - Doesn't push either way

**reason:**
- User-facing explanation (max 1 sentence)
- Pattern: [What the event is] — [what that means for movability, if not obvious]
- Examples: "Client meeting with external attendee", "Weekly team standup — missing one instance is usually fine"
- **Special case:** Private events always get "Private event" (no details exposed)

### Validation Rules

**Hard Rules Applied:**
- `showAs: oof` → `conflictLevel: major`, high confidence
- `isAllDay: true` + OOO/vacation/travel keywords → `conflictLevel: major`, high confidence
- Court/hearing/deposition/trial keywords → `conflictLevel: major`, high confidence
- `showAs: free` → `conflictLevel: available`, high confidence
- `responseStatus: declined` → `conflictLevel: available`, high confidence
- `isCancelled: true` → Event skipped (no output for this event)

**Error Response:**
If core required fields are missing:
```json
{
  "error": "Missing required field: [field_name]",
  "cannotScore": true
}
```

### Example Output

**For client meeting example above:**

```json
{
  "conflictLevel": "major",
  "confidence": 0.95,
  "signals": {
    "eventType": {
      "detected": "Client strategy meeting",
      "impact": "major"
    },
    "schedulingContext": {
      "detected": "Scheduled 1 week ahead",
      "impact": "medium"
    },
    "organizerRelationship": {
      "detected": "Self-organized with external client",
      "impact": "major"
    },
    "attendeeComposition": {
      "detected": "1 external client (CEO-level)",
      "impact": "major"
    },
    "personRole": {
      "detected": "Organizer",
      "impact": "major"
    },
    "commitmentSignals": {
      "detected": "Accepted, shows as busy",
      "impact": "major"
    },
    "temporalContext": {
      "detected": "2 weeks away, one-time, external location",
      "impact": "medium"
    }
  },
  "reason": "Client meeting with external attendee"
}
```

---

## Integration Notes

### For Backend Engineers

**Context Injection Pipeline:**

1. **Pre-processing:**
   - Filter meeting rooms/resources from attendees arrays (email patterns: room@, resource@, meetingroom@, conf@; displayName patterns: "room", "conference", "boardroom")
   - Ensure all core fields present; if missing, don't inject that event (or inject with clear error flag)
   - Handle optional fields gracefully (omit if unavailable, don't use null/undefined)

2. **Array Construction:**
   - Build JSON array of event objects
   - Maximum 350 events per request
   - Each event represents one calendar event for one attendee

3. **Injection:**
   - Inject complete array into `{{EVENTS_ARRAY}}` placeholder
   - Ensure proper JSON formatting (valid JSON array)

4. **Performance:**
   - Target < 5 seconds total latency for full batch
   - Use fast model (not heavyweight reasoning model)
   - Consider batching strategy if approaching 350-event limit

**Output Processing:**

1. **Response Parsing:**
   - Expect JSON array with same length as input (minus any skipped cancelled events)
   - Handle error responses (events with `cannotScore: true`)

2. **Validation:**
   - Verify conflictLevel is one of: available, minor, medium, major
   - Verify confidence is 0.0-1.0
   - Verify all 7 signal dimensions present

3. **Downstream Use:**
   - conflictLevel + confidence → slot-level aggregation
   - signals breakdown → debugging/explanation transparency
   - reason → user-facing display

### For QA

**Test Scenarios:**

1. **Hard Rule Coverage:**
   - Test event with `showAs: oof` → expect major conflict
   - Test event with `responseStatus: declined` → expect available
   - Test event with `isCancelled: true` → expect no output for that event
   - Test all-day event with "Vacation" title → expect major conflict

2. **Signal Dimension Coverage:**
   - Test events with varying attendee counts (solo, 2-3, 4+)
   - Test events with external vs internal organizers
   - Test events with different responseStatus values
   - Test events with different lead times

3. **Edge Cases:**
   - Non-English titles (Spanish, French, German, Mandarin, Hebrew, Arabic, etc.) → verify translation attempted
   - Private events (`sensitivity: private`) → verify reason is always "Private event"
   - Vague titles ("Block", "Hold") → verify confidence lowered
   - Missing optional fields → verify graceful handling

4. **Data Quality:**
   - Events with missing core fields → expect error response
   - Events with 350 items → verify < 5 second latency
   - Meeting rooms in attendees → verify filtered out before counting

5. **Confidence Calibration:**
   - Events with strong convergent signals → expect 0.9+ confidence
   - Events with mixed signals → expect 0.5-0.7 confidence
   - Verify low confidence doesn't appear in reason field (only in confidence score)

### For Future Prompt Updates

**Dependencies to maintain:**

1. **Tag Name Consistency:**
   - Dynamic context tag: `<events>` (don't rename without updating injection pipeline)
   - Placeholder: `{{EVENTS_ARRAY}}` (don't rename without updating injection code)

2. **Field Name Consistency:**
   - All field references in Decision Logic must match Input Format schema
   - If new calendar fields added, update Input Format section and relevant Decision Logic dimensions

3. **Output Schema Stability:**
   - conflictLevel values are hardcoded in downstream aggregation logic
   - signals structure (7 dimensions) expected by debugging UI
   - Reason field displayed directly to users—tone matters

4. **Hard Rules:**
   - Hard Boundaries section defines business logic enforced downstream
   - Changes to hard rules must be coordinated with product/business stakeholders

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-12-30 | Initial context contract for Event Scoring Agent v1.0 |

---

## Related Documents

- **Agent Specification:** `agent-spec-event-scoring-agent.md`
- **System Prompt:** `system-prompt-event-scoring-agent.md`
- **Workflow Used:** `1_workflows/agent-builder-and-system-prompt/system-prompt-workflow.md`

