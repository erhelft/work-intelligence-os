# Smart Meeting Scheduling Flow

## Flow Overview

**From Availability Analysis to Coordinated Booking**

The system guides secretaries through an intelligent three-phase booking process that transforms complex multi-party coordination into a guided workflow. Rather than manually checking calendars and sending back-and-forth emails, the secretary defines meeting parameters once, and the system analyzes availability across all attendees, surfaces optimal time slots with transparent conflict assessment, then handles the coordination workflow for both internal conflicts and external confirmations—all before the meeting is actually booked.

**Core Innovation**: The system doesn't just find "free" time—it understands conflict severity, weighs attendee importance, and manages the coordination dance between internal rescheduling and external confirmation, giving the secretary control over what gets committed versus what stays tentative.

## Flow Phases

1. **Availability Analysis & Slot Recommendation** — Define parameters, see optimal slots
2. **[TBD]** — Conflict resolution & internal coordination
3. **[TBD]** — External confirmation & booking

## Template Guidelines

**Trigger**: List ALL available entry points to this screen (sidebar, calendar, email, etc.)

**What Happens Here**: Keep compact — one line for User, one line for System. No UI-specific language.

**Feeling**: Write a vivid, emotional description. What does the user *feel* when this screen works? Use quotes, metaphors, sensory language.

**Differentiation**: State how we're different. Use categories (Visibility, Scoring, Transparency, etc.) to clarify what aspect we're differentiating on.

**Main Pitfall**: What could go wrong here? What would break trust or create a bad experience? How do we prevent it?

**Delight Opportunity**: One sentence identifying *where* the delight moment is on this screen. What/where, not how. Implementation details go in the Differentiation & Delight Details doc.

---

# Screen 1: Availability Analysis & Slot Recommendation

## Context
**Trigger**: 
- Sidebar: "New Smart Meeting" button
- Calendar: Through our calednar plugin.
- Email: "Schedule meeting" request from email thread, when our agent is CC'd.

**Follows**: None — entry point → **Leads to**: Slot selection → Conflict resolution

## Goal
Enable the secretary to quickly identify optimal meeting times across multiple calendars without manual calendar-hopping.

## Job to Be Done
When I'm **scheduling a meeting with multiple people**, I want to **instantly see which times work best and understand the tradeoffs**, so I can **make a confident decision without checking each calendar individually**.

## What Happens Here
- User: Configures meeting (internal/external attendees, duration, time range), reviews recommendations, selects a slot
- System: Aggregates calendars, scores slots by booking probability, renders heatmap, surfaces top 3 recommendations with match %, reveals conflict details on hover

## Emphasis
**Primary focus**: Heatmap + "Best slots" panel — the secretary sees the whole picture at once.

**Feeling**: *"I can see the whole picture at once."* Relief from the mental load of calendar-hopping. Confidence that green means genuinely easy, red means genuinely hard. The system has already done the analysis — I'm reviewing conclusions, not raw data.

## Constraints
- Must: Show transparency on hover — never hide why a slot scored the way it did
- Must: Differentiate between "available" and "could be made available" (flexible vs. hard conflicts)
- Must not: Auto-select or auto-proceed — the secretary chooses
- Must not: Show external attendee calendar details (we don't have them)
- Assumes: All internal attendees have connected calendars

## Differentiation
- **Visibility**: We aggregate ALL attendee availability before any outreach — not just the scheduler's
- **Scoring**: We score by booking probability, not binary free/busy
- **Transparency**: We explain conflicts ("Sarah only has a flexible Lunch block — cheap to move")
- **Decision support**: 100% match vs 20% match are fundamentally different decisions, not just colors
- **Context is visible**: The heatmap, slot reasoning, and suggestions make it evident that decisions are based on legal intelligence (case priority, client importance, meeting type) and personal preferences (prep time needs, focus blocks, working rhythms) — not just calendar free/busy

## Main Pitfall
**Risk 1**: Secretary trusts a "green" slot that actually has hidden complexity, books the meeting, and causes a conflict.

**How we prevent it**: 
- Every slot shows match percentage — nothing is just "available" without context
- Hover reveals full breakdown: who's available, who has conflicts, what the conflicts are
- We distinguish "truly free" from "could be freed up" visually and in explanations
- System never auto-books — secretary always confirms after seeing the full picture

**Risk 2**: This looks, feels, and behaves like "just another scheduling tool" — we lose our differentiation and become commodity.

**How we prevent it**:
- Slot explanations reference context-aware reasoning, not just availability ("Best for Sarah — respects her morning prep block", "High efficiency — only flexible blocks need moving")
- Heatmap scoring visibly incorporates legal intelligence (case priority, client tier) and personal preferences (focus time, meeting preferences)
- The UI surfaces *why* we're smart, not just *that* we're smart — the intelligence should be evident, not hidden

## Delight Opportunity
The moment when 5 calendars resolve into a clear heatmap in under a second — the "I can see everything at once" feeling, plus slot explanations that feel like the system actually *knows* these people.

## Values in Play
| Value | How it manifests |
|-------|------------------|
| **Control & Trust** | Hover reveals full reasoning. Secretary decides, system recommends. |
| **We Do The Work** | System already analyzed and ranked. Secretary reviews conclusions. |
| **Delight & Speed** | Instant results. Heatmap renders in <1 second. |
| **We Share One Brand** | Match % + conflict details prevent mistakes (booking over OOO). |

## Important Details
[To be added]
