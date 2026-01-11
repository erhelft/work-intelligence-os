# Context Contract: Communication Agent

## Purpose

Defines the contract between the system prompt and the context injection pipeline. Specifies what dynamic context the prompt expects and what output format the agent produces.

---

## Input Context Schema

### Required Fields

#### `next_action`
- **Type:** Object
- **Required:** Yes
- **Structure:**
  ```json
  {
    "type": "string",        // Required: Action type (e.g., "Initiate", "Reply", "Follow_up", "Confirm")
    "subtype": "string",     // Optional: Action subtype (e.g., "answer", "clarify", "persist", "request_alternatives")
    "metadata": {}           // Optional: Additional context for the action
  }
  ```
- **Valid type values:** `Initiate`, `Reply`, `Follow_up`, `Confirm`, `Wait`, `Escalate`, `Close`
- **Valid subtypes (for Reply):** `answer`, `clarify`, `persist`, `request_alternatives`
- **Referenced in:** Operational Boundaries, Decision Logic

---

#### `attendee_email`
- **Type:** String
- **Required:** Yes
- **Format:** Valid email address
- **Example:** `"michael.chen@example.com"`
- **Referenced in:** Output metadata (not included in message content per Hard Boundaries)

---

#### `attendee_name`
- **Type:** String
- **Required:** Yes
- **Format:** First name or full name as it should appear in greeting
- **Example:** `"Michael"` or `"Michael Chen"`
- **Referenced in:** Output Format (greeting personalization)

---

#### `attendee` (object)
- **Type:** Object
- **Required:** Yes
- **Structure:**
  ```json
  {
    "default_language": "string"  // Optional: ISO 639-1 language code (e.g., "en", "es", "fr")
  }
  ```
- **Default if missing:** `"en"` (English)
- **Referenced in:** Decision Logic (language selection for initial outreach)

---

#### `conv_history`
- **Type:** Array of objects
- **Required:** Yes (can be empty array for initial outreach)
- **Structure:**
  ```json
  [
    {
      "direction": "inbound | outbound",  // Required
      "email": "string",                   // Required: sender email
      "content": "string",                 // Required: message body
      "timestamp": "string"                // Required: ISO 8601 datetime
    }
  ]
  ```
- **Ordering:** Chronological (oldest first)
- **Referenced in:** Decision Logic (context awareness), Examples (conversation continuity)

---

#### `scheduling_operation`
- **Type:** Object
- **Required:** Yes
- **Structure:**
  ```json
  {
    "title": "string",           // Required: Meeting title
    "duration": "number",        // Required: Duration in minutes
    "location": "string",        // Required: Meeting location/URL
    "timezone": "string",        // Required: Timezone (e.g., "EST", "PST", "UTC")
    "date": {                    // Required
      "start": "string",         // Required: ISO 8601 datetime
      "end": "string"            // Required: ISO 8601 datetime
    },
    "description": "string"      // Optional: Additional meeting context
  }
  ```
- **Critical for:** Initial outreach (Initiate action) must have all required fields
- **Referenced in:** All message types (meeting details)

---

## Output Schema

### Response Format

**Type:** JSON object

**Required Fields:**
```json
{
  "subject": "string",    // Required: Email subject line
  "body": "string",       // Required: Email body content (plain text)
  "metadata": {}          // Optional: Only populated on error
}
```

---

### Field Specifications

#### `subject`
- **Type:** String
- **Format:** Plain text, no HTML
- **Length:** Typically 5-10 words
- **Patterns:**
  - Initial: `"Meeting Request: [Title]"` or `"[Title]"`
  - Follow-up: `"Following up: [Title]"`
  - Reply: `"Re: [Title]"`
- **Example:** `"Meeting Request: Q3 Integration Roadmap"`

---

#### `body`
- **Type:** String
- **Format:** Plain text with line breaks (`\n`), no HTML
- **Structure:**
  1. Greeting: `"Hi [FirstName],"`
  2. Content: Context and request
  3. Call to action: Clear question or next step
  4. Closing: `"Best regards"` (or equivalent in recipient's language)
- **Length:** 2-5 sentences depending on message type
- **Example:**
  ```
  Hi Michael,
  
  I'm coordinating a meeting to discuss the Q3 Integration Roadmap. We'd like to schedule this for Tuesday, January 14th at 2:00 PM EST (60 minutes) via video call.
  
  Would this time work for you?
  
  Best regards
  ```

---

#### `metadata` (error cases only)
- **Type:** Object
- **Populated when:** Agent cannot generate message due to error
- **Structure:**
  ```json
  {
    "error": "string",          // Error type code
    "details": "string",        // Human-readable description
    "missing_fields": [],       // Optional: array of missing required fields
    "action_received": "string" // Optional: unrecognized action type
  }
  ```
- **Error types:**
  - `"missing_critical_details"` — Required meeting data missing for initial outreach
  - `"undefined_action_type"` — Action type not in defined menu
  - `"language_detection_failed"` — Cannot determine language (rare)

---

## Data Transformation Requirements

### Pre-Injection Transformations

1. **Language field location:**
   - `default_language` must be provided within `attendee` object
   - Backend should default to `"en"` if missing
   - For replies, backend determines language from most recent inbound message in `conv_history`

2. **Conversation history ordering:**
   - Must be chronological (oldest first)
   - Must include both inbound and outbound messages
   - Each message must have direction, email, content, timestamp

3. **Meeting details completeness:**
   - For `Initiate` actions: All required fields in `scheduling_operation` must be present
   - For other actions: Meeting details should be available but can be reconstructed from conv_history if needed

4. **Sensitive data handling:**
   - Do NOT include other attendees' information in input
   - Do NOT include internal coordination state or scores
   - Only provide data for the specific attendee being contacted

---

### Post-Processing (Backend Responsibility)

1. **Email sending:**
   - Use `subject` and `body` as provided
   - Add any system-level email headers/footers outside of agent's output
   - Handle actual email delivery

2. **Conversation history storage:**
   - Store generated message in `conv_history` for future invocations
   - Tag as `direction: "outbound"`
   - Include timestamp of actual send

3. **Error handling:**
   - If `metadata.error` is present, do NOT send email
   - Log error for investigation
   - Surface to appropriate monitoring/alerting system

---

## Integration Notes

### For Backend Engineers

1. **Stateless invocation:** Each call to Communication Agent must include complete context. Agent has no memory between invocations.

2. **Action filtering:** Only invoke Communication Agent for actions that require outbound messages. Actions like `Wait.attendee`, `Escalate.*`, `Close.*` do not require Communication Agent.

3. **Language handling:**
   - Initial outreach: Use `attendee.default_language` (default to `"en"`)
   - Replies: Determine language from most recent inbound message in `conv_history`
   - Backend should handle language detection logic; agent expects language to be determinable from provided data

4. **Error recovery:**
   - If agent returns error metadata, log it and investigate root cause
   - Do not retry automatically without fixing underlying issue
   - Undefined action types indicate Intelligence Agent produced unexpected output

### For QA

1. **Test critical paths:**
   - Initial outreach with complete data
   - Follow-up with existing conversation history
   - Reply actions with various subtypes (answer, clarify, persist, request_alternatives)
   - Language matching (initial uses default, reply matches inbound language)

2. **Test edge cases:**
   - Empty conversation history (should work for Initiate)
   - Missing `default_language` (should default to English)
   - Very long conversation history (>10 messages)
   - Language switching mid-conversation

3. **Test error conditions:**
   - Missing critical fields for Initiate action
   - Undefined action type
   - Contradictory conversation history

4. **Validate output:**
   - Subject line follows patterns
   - Body has proper structure (greeting, content, CTA, closing)
   - Plain text only (no HTML)
   - Tone is professional and accommodating
   - Natural variation across multiple messages (not templated)

### For Future Prompt Updates

1. **Tag name consistency:** If you rename input fields or change structure, update both:
   - Dynamic Context section in system prompt
   - This context contract document
   
2. **Action type additions:** If Intelligence Agent adds new action types:
   - Update Operational Boundaries in system prompt
   - Update Decision Logic with message crafting guidance for new type
   - Update this contract's valid action type list
   - Add example to Examples section

3. **Field additions:** If adding new fields to input:
   - Document in this contract (type, required/optional, example)
   - Reference in appropriate prompt section
   - Ensure examples demonstrate usage

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-11 | Initial context contract created alongside system prompt v1.0 |

---

## Related Documents

- **Agent Specification:** `agent-spec-communication-agent.md` (v1.1)
- **System Prompt:** `system-prompt-communication-agent.md` (v1.0)

