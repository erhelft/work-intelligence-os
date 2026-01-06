## Attendee-Event Relationship: Governing Principles

---

**1. Event score is a reasoning function of attendee outputs**

Event score = reasoned assessment of:
- All required attendees' scores, reasons, and next actions
- Event progress signals: momentum, time remaining relative to scheduling window

These are the only inputs. Never raw messages - attendee-level processing already interpreted them.

---

**2. Only required attendees factor into event score**

Optional attendees don't affect event score or next action. Their status is informational only. Required attendees: external, organizer, named in meeting title.

---

**3. Resolve locally before escalating**

Attendee-level actions exhaust their options before triggering event-level changes. Persist before escalating. Only when attendee-level options fail (reflected in attendee score and next action) does the event state change.

---

**4. User approval required for non-happy-path changes**

Happy path requires no intervention:
`reaching_out` → `collecting_responses` → `all_confirmed` → scheduled

All other transitions require user approval.

---

**5. Conservative by default**

When ambiguous, stay in current state. Default is `collecting_responses` until clear reason to change.

---

**6. Bidirectional but not recursive**

Attendee actions affect event state. User decisions trigger new attendee actions. Loop breaks because agent outputs decisions but doesn't execute - system waits for next external trigger.


## Event Next Action Table (Updated)

| Type | Subtype | When to use | Additional data |
|------|---------|-------------|-----------------|
| **Coordination in progress** | `reaching_out` | Initial state - outreach being sent, no attendee scores yet | `attendees_contacted` |
| **Coordination in progress** | `collecting_responses` | Attendees have been contacted. Required attendees' scores reflect pending/partial status. No blocking issues in next actions. | `pending_attendees` |
| **Coordination in progress** | `getting_alternatives` | User approved `get_alternatives`. Agent reaching out to gather other times. | `pending_attendees` |
| **Coordination in progress** | `all_confirmed` | All required attendees' scores at 95-100% with next action `confirm: finalized`. System books. | `confirmed_attendees`, `slot` |
| **Waiting for decision** | `get_alternatives` | Critical attendee's score is low (<20%), their next action indicates slot rejection, and persist was attempted. User must approve before gathering alternatives. | `attendee`, `attendee_score`, `attendee_reason` |
| **Waiting for decision** | `reschedule` | Alternatives gathered. Multiple options available with varying attendee availability. User picks. | `alternatives` |
| **Waiting for decision** | `resolve_conflict` | Required attendees' reasons show conflicting constraints. No slot works for all. | `conflict_summary` |
| **Waiting for decision** | `recommend_cancel` | Critical attendee's next action is `close: declined` or `close: unresponsive`. No path forward. | `reason` |
| **Waiting for decision** | `unusual` | Required attendee's next action is `escalate: unusual`. Situation needs human judgment. | `situation_summary` |
| **Complete** | `scheduled` | System booked event after `all_confirmed`. Terminal. | `event_details` |
| **Complete** | `cancelled` | User confirmed cancellation. Terminal. | `reason` |

---

## Event Next Action: Guidance & Principles

### Coordination in progress: `reaching_out`

**When to use:** Initial state - outreach being sent.

**Principles:**
- Starting state for all coordinations
- Score reflects baseline uncertainty (50-60%)
- Transitions to `collecting_responses` once outreach sent and attendee records created

---

### Coordination in progress: `collecting_responses`

**When to use:** Required attendees have been contacted. Their scores and next actions don't indicate blocking issues.

**Principles:**
- Default state during active coordination
- Event score derived from required attendees' scores weighted by criticality, plus momentum and time signals
- Stay here while: required attendees' next actions are `wait`, `follow_up`, `reply`, or `confirm: pending_others`
- Conservative by default - remain in this state unless attendee outputs clearly indicate escalation needed

---

### Coordination in progress: `getting_alternatives`

**When to use:** User approved `get_alternatives`, agent actively gathering alternatives.

**Principles:**
- Only entered after user approval
- Event score for current slot is low, but meeting likely at different time
- Transition to `reschedule` when alternatives collected

---

### Coordination in progress: `all_confirmed`

**When to use:** All required attendees' scores at 95-100%, all next actions are `confirm: finalized`.

**Principles:**
- Transient state - system books immediately
- Event score 95-100%
- Optional attendees pending doesn't block

---

### Waiting for decision: `get_alternatives`

**When to use:** Critical attendee's score is low, their next action reflects firm slot rejection, persist was attempted and failed.

**Principles:**
- Triggered by attendee output, not raw message
- Check: is attendee score <20%? Is their next action `escalate: alternatives_proposed`? Was persist attempted?
- User decides whether to pursue alternatives or adjust approach
- Once approved → `coordination in progress: getting_alternatives`

---

### Waiting for decision: `reschedule`

**When to use:** Alternatives have been gathered, user picks one.

**Principles:**
- `alternatives` shows proposed times with which required attendees can attend each
- User picks → coordination continues at new slot or confirms immediately

---

### Waiting for decision: `resolve_conflict`

**When to use:** Required attendees' reasons show conflicting constraints with no resolution.

**Principles:**
- Derived from attendee reasons, not messages
- Example: Attendee A reason says "only available mornings", Attendee B reason says "only available afternoons"
- `conflict_summary` synthesizes the conflicting constraints
- Event score low (20-40%)

---

### Waiting for decision: `recommend_cancel`

**When to use:** Critical attendee's next action is `close: declined` or `close: unresponsive`.

**Principles:**
- The attendee-level decision to close already reflects exhausted options
- Event score near 0%
- User confirms cancellation or overrides

---

### Waiting for decision: `unusual`

**When to use:** Required attendee's next action is `escalate: unusual`.

**Principles:**
- Attendee-level agent already flagged something it couldn't handle
- Surfaces to event level for user decision
- `situation_summary` comes from attendee escalation

---

### Complete: `scheduled`

**When to use:** System booked event. Terminal.

**Principles:**
- Set by system after `all_confirmed` triggers booking
- Score 100%

---

### Complete: `cancelled`

**When to use:** User confirmed cancellation. Terminal.

**Principles:**
- Only after user approval of `recommend_cancel` or user-initiated cancellation
- Score 0%