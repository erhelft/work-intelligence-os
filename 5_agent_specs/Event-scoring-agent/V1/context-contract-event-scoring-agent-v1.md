# Context Contract: Event Scoring Agent (V1)

**Version:** v1.1  
**Generated:** January 10, 2026  
**Purpose:** Schema alignment verification between system prompt and context injection pipeline

---

## Input Context Schema

### Event Object Array

**Type:** Array of event objects

**Structure:** Each event object in the array contains:

#### Core Fields (Required)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `summary` | string | Yes | Event title |
| `start` | object | Yes | Start time with `dateTime` (string) and `timeZone` (string) |
| `end` | object | Yes | End time with `dateTime` (string) and `timeZone` (string) |
| `attendees` | array | Yes | Array of objects with `email` (string), `displayName` (string), `responseStatus` (string) |
| `organizer` | object | Yes | Object with `email` (string), `displayName` (string) |

#### Signal Fields (Optional—Enhance Accuracy)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `showAs` | string | No | Values: busy/free/tentative/oof/workingElsewhere |
| `sensitivity` | string | No | Values: normal/personal/private/confidential |
| `isAllDay` | boolean | No | Indicates all-day event |
| `isCancelled` | boolean | No | Indicates cancelled event |
| `location` | string | No | Event location |
| `description` | string | No | Event description/notes |
| `externalCreatedAt` | datetime | No | When event was created |
| `externalUpdatedAt` | datetime | No | When event was last modified |
| `recurrence` | object | No | Recurrence pattern (if available) |

#### Example Input

```json
[
  {
    "summary": "Client Meeting - Morrison Case",
    "description": "Strategy discussion",
    "start": {
      "dateTime": "2026-01-20T14:00:00.0000000",
      "timeZone": "UTC"
    },
    "end": {
      "dateTime": "2026-01-20T15:30:00.0000000",
      "timeZone": "UTC"
    },
    "attendees": [
      {
        "email": "partner@firm.com",
        "displayName": "Sarah Chen",
        "responseStatus": "accepted"
      },
      {
        "email": "client@morrison.com",
        "displayName": "James Morrison",
        "responseStatus": "accepted"
      }
    ],
    "organizer": {
      "email": "partner@firm.com",
      "displayName": "Sarah Chen"
    },
    "showAs": "busy",
    "sensitivity": "normal",
    "isAllDay": false,
    "isCancelled": false,
    "location": "Conference Room A",
    "externalCreatedAt": "2025-11-15T10:00:00Z",
    "externalUpdatedAt": "2025-11-16T09:30:00Z"
  }
]
```

---

## Output Schema

### Response Per Event

**Type:** JSON object

**Structure:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `conflictLevel` | string | Yes | Values: "minor" / "medium" / "major" / "available" |
| `confidence` | number | Yes | Range: 0.0 - 1.0 |
| `signals` | object | Yes | Contains 7 dimension objects (see below) |
| `reason` | string | Yes | User-facing explanation (max 1 sentence) |

#### Signals Object Structure

Each of the 7 dimension objects contains:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `detected` | string | Yes | What the agent detected for this dimension |
| `impact` | string | Yes | Values: "minor" / "medium" / "major" / "neutral" |

**Seven dimensions:**
1. `eventType`
2. `schedulingContext`
3. `organizerRelationship`
4. `attendeeComposition`
5. `personRole`
6. `commitmentSignals`
7. `temporalContext`

#### Example Output

```json
{
  "conflictLevel": "major",
  "confidence": 0.95,
  "signals": {
    "eventType": {
      "detected": "client meeting with case discussion",
      "impact": "major"
    },
    "schedulingContext": {
      "detected": "scheduled 2 months in advance",
      "impact": "major"
    },
    "organizerRelationship": {
      "detected": "senior partner",
      "impact": "major"
    },
    "attendeeComposition": {
      "detected": "3 attendees including external client",
      "impact": "major"
    },
    "personRole": {
      "detected": "required attendee",
      "impact": "medium"
    },
    "commitmentSignals": {
      "detected": "accepted, shows as busy",
      "impact": "major"
    },
    "temporalContext": {
      "detected": "3 weeks away, one-time meeting",
      "impact": "medium"
    }
  },
  "reason": "Client meeting with external attendees"
}
```

---

## Data Transformations

### Pre-Processing Requirements

**Meeting Room/Resource Filtering:**
- **Requirement:** Filter out meeting rooms and resources from attendees array before injection
- **Detection patterns:**
  - Email contains: `room@`, `resource@`, `meetingroom@`, `conf@`
  - DisplayName contains: "room", "conference", "boardroom"
- **Rationale:** Prevents inflating attendee count with non-human participants

**Example:**
```json
// Before filtering
"attendees": [
  {"email": "lawyer@firm.com", "displayName": "John Doe"},
  {"email": "largemeetingroom@firm.com", "displayName": "Large Meeting Room"}
]

// After filtering (send to agent)
"attendees": [
  {"email": "lawyer@firm.com", "displayName": "John Doe"}
]
```

**Field Availability:**
- Optional signal fields may not be available from all calendar APIs
- Agent handles missing optional fields gracefully (treats as neutral signal)
- Do not inject fields with null/undefined values—omit them entirely

---

## Integration Notes

### For Backend Engineers

**Error Handling:**
- If any core required field is missing, agent returns error (not a scored response)
- Handle this as a 4xx error (bad request) with error message for debugging
- Error response format: `{"error": "Missing required field: [field_name]"}`

**Batching:**
- Agent processes individual events
- For batch scoring (e.g., 350 events), send array and process each independently
- Latency target: <5 seconds for up to 350 events

**Sensitive Data:**
- Agent automatically masks private events in `reason` field
- No additional masking needed in pipeline
- Do not log event details (titles, descriptions) in production—contains sensitive data

### For QA

**Test Coverage:**
1. Core happy path: Event with all fields → valid score
2. Minimal event: Only required fields → valid score (lower confidence)
3. Private event: `sensitivity: private` → reason is always "Private event"
4. Missing core field: No `summary` → error response
5. Hard rules: `showAs: oof` → always major conflict
6. Meeting room filtering: Resource in attendees → filtered out before counting

**Confidence Calibration:**
- High confidence (0.8+): Clear signals, all pointing same direction
- Medium confidence (0.6-0.8): Mixed signals or one dominant signal
- Low confidence (0.5-0.6): Weak or conflicting signals

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| v1.1 | 2026-01-10 | V1 framework version for workflow testing |

---

**End of Context Contract**

