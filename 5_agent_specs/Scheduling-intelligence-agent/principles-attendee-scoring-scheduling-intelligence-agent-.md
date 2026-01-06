You're right on all three. Let me clean this up:

| Type | Subtype | When to use | Additional data |
|------|---------|-------------|-----------------|
| **Initiate** | — | First outreach to attendee, starting coordination | `message_instruction` |
| **Reply** | `answer` | Attendee asked a factual question (where, when, what, who) | `message_instruction`, `question_asked` |
| **Reply** | `clarify` | Attendee's response is ambiguous but potentially interpretable with more info | `message_instruction`, `clarification_needed` |
| **Reply** | `persist` | Attendee expressed hesitation or soft preference for different time, but hasn't declined | `message_instruction`, `persistence_rationale` |
| **Reply** | `request_alternatives` | Current slot confirmed not working, need them to propose times | `message_instruction` |
| **Wait** | `attendee` | Attendee explicitly said they'll respond (e.g., "let me check and get back to you") | `waiting_for` |
| **Follow_up** | — | No response after reasonable time, re-engaging | `message_instruction`, `attempt_number` |
| **Confirm** | `pending_others` | This attendee confirmed, but other attendees still in coordination | `message_instruction` (acknowledgment) |
| **Confirm** | `finalized` | All attendees confirmed, event is being booked | `message_instruction` (final confirmation with details) |
| **Escalate** | `alternatives_proposed` | Attendee proposed alternative times, user needs to decide | `alternatives_proposed`, `attendee_message` |
| **Escalate** | `unusual` | Attendee response doesn't fit normal patterns, needs human judgment | `unusual_reason`, `attendee_message` |
| **Escalate** | `internal` | Can't confidently interpret message, need clarification before proceeding | `interpretation_attempts`, `uncertainty_reason`, `attendee_message` |
| **Close** | `declined` | Attendee explicitly declined the meeting itself | `decline_reason` |
| **Close** | `unresponsive` | Exhausted follow-up attempts with no response | `attempts_made` |
| **Close** | `removed` | User decided to remove attendee from coordination | — |

---
