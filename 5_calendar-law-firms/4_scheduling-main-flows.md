# Main Scheduling Flows

## Purpose
This document maps the core scheduling flows in law firm calendar management, considering different initiators, timing, and meeting characteristics. These flows form the foundation for Phase 1 behavioral automation design.

---

## Flow Classification

### Primary Dimensions
1. **Initiator**: Who starts the scheduling process?
   - User-initiated (outbound)
   - 3rd party-initiated (inbound)
   - System-initiated (reactive/cascade)

2. **Meeting Type**: Who participates?
   - Internal (firm-only participants)
   - External (includes clients, opposing counsel, experts, etc.)

3. **Complexity**: How many parties?
   - Single-party (1:1, two people)
   - Multi-party (3+ people)

4. **Timing**: When does this happen?
   - Planned (advance scheduling)
   - Ad-hoc (reactive/emergency changes)

---

## Core Flows

### Flow 1: User Schedules with 3rd Party (Outbound, Planned)

**Description**: Partner or assistant wants to schedule a meeting with external party in advance.

#### Variants by Dimensions

**1A: External + Single-Party (1:1 client meeting)**
- **Trigger**: Partner needs to meet with client about case
- **Current process**: 
  - Partner/assistant emails client proposing times
  - Back-and-forth to find mutual availability
  - Send calendar invite once confirmed
- **Pain points**: 
  - 3-5 email exchanges per meeting
  - Partner coordination time (15-30 min/meeting)
  - Timezone confusion for remote clients
- **Phase 1 solution**: 
  - Share booking link with available slots
  - Client self-schedules
  - Automatic timezone handling
- **Success criteria**: Reduce coordination time from 15-30 min to <2 min

**1B: External + Multi-Party (deposition with 5+ participants)**
- **Trigger**: Need to coordinate deposition (partner + client + opposing counsel + court reporter + expert)
- **Current process**:
  - Assistant polls all parties for availability
  - Days/weeks of back-and-forth coordination
  - Multiple rounds as conflicts emerge
- **Pain points**:
  - 3-5 hours coordination time per complex meeting
  - Meeting delayed 2-4 weeks due to coordination
  - Calendar conflicts discovered late
- **Phase 1 solution**:
  - Collect availability from all parties
  - Find overlapping slots automatically
  - Send coordinated invites to all
- **Success criteria**: Reduce coordination time from 3-5 hrs to <30 min; schedule within 1 week

**1C: Internal + Single-Party (partner 1:1 with associate)**
- **Trigger**: Partner needs to meet with associate about case strategy
- **Current process**:
  - Direct calendar check or quick message
  - Usually easy due to same organization
- **Pain points**:
  - Lower priority but still requires manual coordination
  - Interruptions to find time
- **Phase 1 solution**:
  - Internal booking links or instant scheduling
  - Auto-find next available slot
- **Success criteria**: Zero coordination overhead

**1D: Internal + Multi-Party (case team meeting)**
- **Trigger**: Need case team meeting with 3-5 firm members
- **Current process**:
  - Assistant checks multiple calendars
  - Finds common availability
  - Sends invites
- **Pain points**:
  - Moderate coordination time (30-60 min)
  - Often results in suboptimal times for some
- **Phase 1 solution**:
  - Multi-calendar availability check
  - Auto-find overlapping slots
  - Coordinated invites
- **Success criteria**: Reduce coordination from 30-60 min to <5 min

---

### Flow 2: 3rd Party Schedules with User (Inbound, Planned)

**Description**: External party wants to schedule meeting with partner/firm in advance.

#### Variants by Dimensions

**2A: External + Single-Party (new client inquiry)**
- **Trigger**: Prospective client wants initial consultation
- **Current process**:
  - Client emails/calls requesting meeting
  - Assistant responds with available times
  - Back-and-forth until confirmed
- **Pain points**:
  - Response time delay impacts client experience
  - Assistant coordination overhead
  - First-come-first-served regardless of client value
- **Phase 1 solution**:
  - Public booking link on website/email signature
  - Client self-schedules from available slots
  - Automatic confirmation
- **Success criteria**: Zero assistant time; instant booking confirmation

**2B: External + Multi-Party (opposing counsel requests mediation)**
- **Trigger**: External party initiates complex multi-party meeting
- **Current process**:
  - Opposing counsel proposes times
  - Assistant checks partner + client + mediator availability
  - Multiple rounds of coordination
- **Pain points**:
  - Same as Flow 1B but initiated externally
  - Reactive mode makes coordination harder
- **Phase 1 solution**:
  - Provide available slots considering all required parties
  - External party selects from viable options
  - System confirms with all parties
- **Success criteria**: Reduce coordination from hours to minutes

**2C: Internal + Single-Party (associate requests partner time)**
- **Trigger**: Associate needs guidance from partner
- **Current process**:
  - Direct message or calendar check
  - Quick scheduling usually
- **Pain points**:
  - Interrupts partner's flow
  - No priority filtering (urgent vs routine)
- **Phase 1 solution**:
  - Internal booking links by meeting type
  - Auto-schedule based on urgency rules
- **Success criteria**: Zero partner interruption for scheduling

**2D: Internal + Multi-Party (admin schedules firm meeting)**
- **Trigger**: Firm administrator needs all-hands or department meeting
- **Current process**:
  - Check multiple calendars for common availability
  - Send invites to group
- **Pain points**:
  - Time-consuming for large groups
  - Often results in conflicts requiring reschedule
- **Phase 1 solution**:
  - Group availability finder
  - Optimal time suggestion based on most availability
  - Bulk invite sending
- **Success criteria**: Find optimal time in <5 min

---

### Flow 3: Ad-Hoc Event Change Causes Schedule Reshuffle (Reactive)

**Description**: Existing meeting is cancelled/rescheduled, triggering cascade of schedule changes.

#### Variants by Dimensions

**3A: External meeting cancelled → Affects external dependencies**
- **Trigger**: Court date rescheduled, forcing all dependent meetings to move
- **Example cascade**:
  - Court date moves from June 15 → July 10
  - Must reschedule: client prep (was June 14), witness prep (was June 12-13), expert consultation (was June 10), opposing counsel meeting (was June 8)
- **Current process**:
  - Assistant manually identifies all dependent meetings
  - Coordinates new times for each (5-10 meetings)
  - 3-5 hours of coordination work
- **Pain points**:
  - Massive assistant time burden
  - Case timeline delays
  - Client inconvenience
  - Some meetings fall through cracks
- **Phase 1 solution**:
  - Identify linked/dependent meetings (tagging system)
  - Suggest new times for cascade automatically
  - Bulk rescheduling coordination
- **Success criteria**: Reduce 3-5 hr coordination to <30 min; zero missed dependencies

**3B: External meeting cancelled → Gap recovery opportunity**
- **Trigger**: Client cancels with <24hr notice, leaves billable hour gap
- **Current process**:
  - Partner has unexpected free hour
  - Usually goes unfilled (too late to schedule new client meeting)
  - Wasted billable hour opportunity
- **Pain points**:
  - Lost billable hour ($500-1000 revenue loss)
  - Partner prep time wasted
- **Phase 1 solution**:
  - Alert partner immediately of gap
  - Suggest alternate uses: other client reschedule, focus work, waitlist bookings
  - Auto-offer slot to waitlist clients
- **Success criteria**: Recover 50%+ of late-cancel gaps with productive use

**3C: Internal meeting cancelled → Time reallocation**
- **Trigger**: Internal meeting cancelled, frees partner time
- **Current process**:
  - Partner keeps as free time or manually decides what to do
  - Often becomes fragmented/unproductive time
- **Pain points**:
  - Opportunity to reallocate to billable work missed
  - Time not used strategically
- **Phase 1 solution**:
  - Suggest reallocation options
  - Offer to pending clients if appropriate
  - Convert to focus block if meeting-heavy day
- **Success criteria**: Freed time used productively 80%+ of the time

**3D: Partner emergency → Full day reshuffle**
- **Trigger**: Partner illness/emergency, must cancel entire day of meetings (8-12 meetings)
- **Current process**:
  - Assistant frantically calls/emails all affected parties
  - Reschedules each meeting individually
  - 4-6 hours of crisis coordination
  - Client frustration and relationship damage
- **Pain points**:
  - Massive operational burden
  - Client inconvenience
  - Revenue impact from delayed meetings
  - Assistant stress
- **Phase 1 solution**:
  - One-click "reschedule all meetings for [date]"
  - System automatically finds next available slots
  - Sends coordinated notifications with context
  - Prioritizes urgent matters first
- **Success criteria**: Handle full-day reshuffle in <1 hr; maintain client satisfaction

---

## Flow Interaction Matrix

| Flow Type | External + Single | External + Multi | Internal + Single | Internal + Multi |
|-----------|------------------|------------------|-------------------|------------------|
| **Outbound (User initiates)** | 1A: Client meeting | 1B: Deposition | 1C: Associate 1:1 | 1D: Case team |
| **Inbound (3rd party initiates)** | 2A: New client inquiry | 2B: Mediation request | 2C: Associate requests | 2D: Admin schedules |
| **Reactive (Change cascade)** | 3A: Court date moves | 3A: Cascade coordination | 3C: Time reallocation | 3C: Group reshuffle |
| **Reactive (Gap recovery)** | 3B: Late cancel recovery | 3B: Complex gap fill | 3C: Focus time | 3C: Team time |

---

## Priority for Phase 1 Development

Based on business impact from problems document:

### Tier 1 (Must Have)
1. **Flow 1A** (External, single-party outbound) - Highest volume, addresses Problem #3 (partner time)
2. **Flow 2A** (External, single-party inbound) - Client experience, addresses Problem #3 (partner time)
3. **Flow 3B** (Late cancel recovery) - Addresses Problem #2 (revenue loss from gaps)
4. **Flow 3A** (Cascade rescheduling) - Addresses Problem #5 (cascade burden)

### Tier 2 (Should Have)
5. **Flow 1B** (External, multi-party outbound) - Addresses Problem #6 (multi-party coordination)
6. **Flow 2B** (External, multi-party inbound) - Addresses Problem #6 (multi-party coordination)
7. **Flow 3D** (Emergency full-day reshuffle) - Addresses Problem #1 (coordination errors) and Problem #5

### Tier 3 (Nice to Have)
8. **Flows 1C, 1D, 2C, 2D, 3C** (Internal meetings) - Lower business impact in Phase 1; more relevant for Phase 2-3 strategic optimization

---

## Next Steps

1. **For each Tier 1 flow**: Map detailed user journey (current state → Phase 1 → success metrics)
2. **Define technical requirements**: What data, integrations, and automation needed per flow
3. **Identify shared components**: Booking engine, conflict detection, notification system used across flows
4. **Design validation plan**: How to test each flow with design partner firms

---

## Notes

- This document focuses on **Phase 1 behavioral automation** - logistics handling without strategic context
- **Phase 2-3 additions** (out of scope for now):
  - Priority-based time allocation (Problem #4)
  - Strategic meeting value assessment
  - Learned preference optimization
  - Buffer time and prep time intelligence (Problem #7)
- All flows assume **calendar integration** (Google/Outlook) as baseline
- **Phase 1 success** = eliminate coordination overhead, not optimize strategic value (that's Phase 2-3)