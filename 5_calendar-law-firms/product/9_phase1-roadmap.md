# Phase 1 Roadmap: EA Productivity

**Overall Phase 1 Goal**: Reduce EA scheduling coordination time by 60-80% within 60 days

---

## Subphase 1a: Core Scheduling Loop

**Business goal**
- Prove basic value proposition: EA saves 30 minutes per client meeting scheduled

**Product goal**
- EA schedules single client meeting via email with zero manual coordination

**Main flow**
- EA receives/initiates scheduling request for partner-client meeting
- System finds optimal time based on partner calendar and client availability
- System handles email negotiation and sends confirmed invite

**Scheduling medium**
- Email (primary)
- Basic web dashboard (view status, set partner working hours)

**Builds**
- Email parsing and scheduling intent detection
- Single calendar conflict detection
- 2-party availability matching
- Automated email responses (propose times, confirm, send invite)
- Partner working hours and basic preferences

**Opportunity for delight**
- EA sees scheduling request resolve itself in email thread without her involvement
- First "it just handled it" moment when EA checks email and meeting is already scheduled
- Partner gets perfectly-timed meeting without knowing system was involved

---

## Subphase 1b: Multi-Party Coordination

**Business goal**
- Eliminate 3-5 hour coordination burden for depositions and mediations

**Product goal**
- EA coordinates 5+ party depositions/mediations with same ease as 2-party meetings

**Main flow**
- EA receives/initiates multi-party scheduling (deposition, mediation, expert consultation)
- System aggregates availability across 5-10 busy calendars
- System identifies overlapping slots and handles coordinated invite sending

**Scheduling medium**
- No change (email + web dashboard)

**Builds**
- Multi-calendar availability aggregation (5-10 calendars)
- Heatmap visualization: match percentage scoring per time slot
- Coordinated invite sending and confirmation tracking
- Conflict explanation ("Sarah only has flexible lunch block—cheap to move")
- Meeting type detection (deposition, mediation patterns)

**Opportunity for delight**
- Heatmap shows 5 calendars resolve into clear visual in under 1 second
- System explains why specific slots work ("only slot with zero hard conflicts")
- "Found across 4 busy calendars" celebration copy when system finds rare good slot
- EA feels like she has x-ray vision into complex coordination

---

## Subphase 1c: Cascade Rescheduling

**Business goal**
- Recover 3-5 hours of EA time when single meeting change triggers cascade

**Product goal**
- System detects dependent meetings and orchestrates coordinated rescheduling automatically

**Main flow**
- Meeting cancellation or reschedule occurs (court date moves, client cancels)
- System identifies dependent meetings (client prep, witness prep linked to that court date)
- System coordinates rescheduling of 5-10 dependent meetings simultaneously

**Scheduling medium**
- No change (email + web dashboard)

**Builds**
- Meeting dependency detection (case context, temporal proximity)
- Cascade impact analysis (which meetings affected by this change)
- Batch rescheduling orchestration
- Priority ordering (which meetings to reschedule first)
- Proactive gap-filling suggestions (late cancellation leaves billable hour gap)

**Opportunity for delight**
- EA sees court date change trigger automatic cascade coordination
- "5 dependent meetings identified, rescheduling in progress" status
- System prevents disaster: "Depo prep would have conflicted with new court date—automatically moved"
- EA goes from panic to relief in seconds

---

## Subphase 1d: Multi-Partner Management

**Business goal**
- Enable single EA to manage 6-7 partners instead of 4 (50% capacity increase)

**Product goal**
- EA manages 3-5 partner calendars simultaneously with cross-calendar intelligence

**Main flow**
- EA juggles scheduling across multiple partner calendars
- System prevents cross-partner conflicts
- System learns per-partner preferences and patterns

**Scheduling medium**
- Enhanced web dashboard (multi-partner view, calendar switching)
- Email (unchanged)

**Builds**
- Multi-partner dashboard with calendar switching
- Cross-partner conflict detection (Partner A meeting impacts Partner B availability)
- Per-partner preference learning (Partner A prefers mornings, Partner B blocks Fridays)
- Intelligent context switching (system remembers which partner context EA is in)
- Priority routing (VIP client request goes to right partner automatically)

**Opportunity for delight**
- Dashboard shows all partner calendars at once with zero cognitive load
- System suggests "Partner B has better availability for this client type"
- Cross-partner conflict caught before EA even sees it: "Would conflict with Partner A's depo prep"
- EA feels like she has superhuman coordination ability

---

## Phase 1 Success Criteria

**Must-have**
- 60-80% reduction in EA manual coordination time within 60 days
- 80%+ EA active usage within 30 days
- Zero critical scheduling errors (double-bookings, timezone failures)

**Product-market fit signals**
- 40%+ partner adoption by end of 90 days (grassroots "I want this too")
- EAs managing 6-7 partners instead of 4
- 100% of scheduling decisions captured with metadata for Phase 2-3 learning

