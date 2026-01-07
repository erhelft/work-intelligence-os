# Scheduling Definitions

**Purpose:** Central glossary for scheduling terminology used across the product. Maintained for internal alignment and potential user-facing documentation.

**Last Updated:** January 5, 2026

---

## Guidelines

1. **Alphabetical Order:** Terms are ordered alphabetically. When adding a new term, place it in the correct alphabetical position.
2. **Writing Style:** Definitions should be clear, accurate, and concise.

---

## Core Concepts

### Attendee Engagement Level
**Definition:** A categorical assessment (High | Medium | Low) of how actively an attendee is participating in the coordination process.
**Context:** Based on response timing, quality, trajectory, and initiative. Reflects coordination interaction quality, not likelihood to attend. High engagement with a declined slot means an engaged person who can't make the time; low engagement with tentative yes signals concerning commitment level.

### Attendee Next Action
**Definition:** The recommended next step for engaging with an attendee, as determined by the scheduling intelligence agent.
**Context:** Output from the intelligence agent that guides what action should be taken with a specific attendee in the scheduling process.

### Attendee Score
**Definition:** A numerical value (1-100) representing an attendee's likelihood of attending a meeting at the proposed time, where 100 indicates certain attendance and 1 indicates non-attendance.
**Context:** Determined by the scheduling intelligence agent through reasoning based on interactions with the attendee, not mathematical calculation.

### Attendee Score Reason
**Definition:** Text-based explanation for why the scheduling intelligence agent assigned a particular score to an attendee.
**Context:** Provides transparency and reasoning behind the attendee score to help understand the agent's assessment.

### Attendee Suggested Alternative Times
**Definition:** A cumulative list of alternative meeting times that an attendee has proposed during the coordination process.
**Context:** Extracted and maintained by the intelligence agent, updated as new times are mentioned or rejected. Includes date and time range (specific times or general periods like "morning," "afternoon," "evening").

### Event Next Action
**Definition:** The recommended next step for the overall meeting event, as determined by the scheduling intelligence agent.
**Context:** Output from the intelligence agent that guides what action should be taken at the event level in the scheduling process.

### Event Score
**Definition:** A numerical value (1-100) representing the overall likelihood that a meeting event will successfully occur at the proposed time, where 100 indicates certain success and 1 indicates failure.
**Context:** Determined by the scheduling intelligence agent through reasoning that considers all attendees' scores, engagement levels, and coordination dynamics.

### Event Score Reason
**Definition:** Text-based explanation for why the scheduling intelligence agent assigned a particular score to an event.
**Context:** Provides transparency and reasoning behind the event score to help understand the agent's overall assessment of meeting viability.

---

