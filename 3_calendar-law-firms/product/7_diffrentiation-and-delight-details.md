# Differentiation & Delight Details

**Purpose**: Track specific implementation details that bring our differentiation strategy to life. Each entry starts with high-level component differentiation (from main flows), then details the tactical implementation at the subcomponent level.

**Rule**: This doc is for *how we implement* differentiation, not *what* differentiation is (that lives in main flows).

---

## Template Structure

### [High-Level Component Name]

**Location**: [Screen/Flow name, line reference]

**Key Differentiation** *(from main flows)*:
> [Quote the relevant differentiation points from the product main flow doc]

**Delight Opportunity** *(from main flows)*:
> [Quote the delight opportunity from the product main flow doc — this is the *what/where*, implementation ideas below are the *how*]

#### Differentiation Implementation Ideas

**Idea 1: [Name of idea]**

A. **Subcomponent**: [Specific UI element, e.g., Card cell, Badge, Copy text]

B. **Idea**: [One sentence describing the implementation approach]

C. **Examples**:
   - Example 1: [Concrete example with actual copy/interaction]
   - Example 2: [Concrete example with actual copy/interaction]

D. **Structure/Logic/Rule**: [How this works systematically — the pattern/algorithm behind it]

**Idea 2: [Name]**
[Same structure...]

#### Delight Implementation Ideas

**Idea 1: [Name of idea]**

A. **Subcomponent**: [Specific UI element]

B. **Idea**: [One sentence describing the delight moment]

C. **Examples**:
   - Example 1: [Concrete example]
   - Example 2: [Concrete example]

D. **Structure/Logic/Rule**: [The pattern/timing/trigger that creates the delight]

---

## Components

### Heatmap

**Location**: Screen 1 — Availability Analysis & Slot Recommendation (Main Flow, Line 31-32)

**Key Differentiation** *(from main flows)*:
> - **Visibility**: We aggregate ALL attendee availability before any outreach — not just the scheduler's
> - **Scoring**: We score by booking probability, not binary free/busy
> - **Transparency**: We explain conflicts ("Sarah only has a flexible Lunch block — cheap to move")
> - **Decision support**: 100% match vs 20% match are fundamentally different decisions, not just colors
> - **Context is visible**: Decisions are based on legal intelligence (case priority, client importance, meeting type) and personal preferences (prep time needs, focus blocks, working rhythms) — not just calendar free/busy

**Delight Opportunity** *(from main flows)*:
> The moment when 5 calendars resolve into a clear heatmap in under a second — the "I can see everything at once" feeling, plus slot explanations that feel like the system actually *knows* these people.

#### Differentiation Implementation Ideas

**Idea 1: Dynamic Slot Reasoning Copy** 💭

A. **Subcomponent**: Slot recommendation cards — secondary text below match percentage

B. **Idea**: Replace generic "Everyone is free" with dynamic copy that reveals *why* this slot scored well, pulling from legal context and learned preferences

C. **Examples**:
   - "Best for Sarah Chen—avoids her morning prep block"
   - "Only slot this week with zero hard conflicts"
   - "David Kim has a soft conflict (internal sync) that can move"
   - "High efficiency—only 1 flexible lunch block needs adjustment"
   - "Only slot with zero conflicts across all 5 calendars. Sarah's afternoon preference honored."

D. **Structure/Logic/Rule**: 
   - Format: `[Benefit statement] — [specific reasoning]`
   - Pull from scoring factors: conflict severity, attendee preferences, meeting type context, case priority
   - Prioritize showing: (1) attendee-specific benefits, (2) conflict efficiency, (3) uniqueness ("only slot")
   - Dynamic per slot based on what made it rank high
   - If multiple factors contributed, choose the most human-meaningful one (attendee preference > efficiency > uniqueness)

**Idea 2: Legal Context Badges** 💭

A. **Subcomponent**: Slot cards — subtle badge/tag below match percentage

B. **Idea**: Surface legal-specific intelligence through contextual badges that show the system understands legal workflows, not just free/busy

C. **Examples**:
   - 🔒 "Avoids depo prep" (system knows deposition patterns)
   - ⭐ "VIP client prioritized" (client tier affected ranking)
   - 📊 "Partner preference learned" (system adapted to user patterns)
   - 🎯 "Case priority honored" (urgent case got preferred time slot)

D. **Structure/Logic/Rule**:
   - Maximum one badge per card to avoid clutter
   - Muted gray initially, reveals full context on hover
   - Priority order: legal context > client tier > case priority > learned preferences
   - Only show if it materially affected the slot ranking (threshold: >10% score impact)
   - Use present-tense active verbs ("avoids", "prioritizes", "learns", "honors")
   - Place below match percentage, above conflict details

#### Delight Implementation Ideas

**Idea 1: Micro-Celebration for Great Finds** 💭

A. **Subcomponent**: Top-ranked slot card — tertiary copy line (below match % and reasoning)

B. **Idea**: When the system finds a genuinely great slot against hard constraints, celebrate it with copy that makes the EA feel like she's getting a win, not just finding "fine" time

C. **Examples**:
   - "Found across 4 busy calendars" (reframes coordination complexity as achievement)
   - "Found 1 needle in the haystack" (emphasizes rarity when constraints are tight)
   - "2 relevant slots across 80 analyzed" (shows the work the system did)
   - "Only 3% of slots worked—this is one of them" (quantifies the difficulty)
   - "Threaded between 2 depo preps and a client call" (celebrates navigating legal context)

D. **Structure/Logic/Rule**:
   - **Trigger conditions** (must meet at least 2):
     - High constraint complexity (5+ attendees OR 3+ hard conflicts OR tight time window)
     - Few viable slots found (≤3 slots with >80% match)
     - Legal context navigated (avoided depo prep, honored VIP client, etc.)
     - Partner preference honored despite constraints
   - **Tone calibration**: Celebratory but professional—"found" not "nailed it"
   - **Placement**: Tertiary line, subtle gray, below the reasoning copy (doesn't compete with key info)
   - **Only show on top recommendation**: Don't dilute by celebrating every slot
   - **Copy formula**: Quantify the challenge (N calendars, N% of slots, specific conflicts threaded through)

---

### [Next Component]

**Location**: [TBD]

**Key Differentiation** *(from main flows)*:
> [Quote from main flows]

**Delight Opportunity** *(from main flows)*:
> [Quote from main flows]

#### Differentiation Implementation Ideas

**Idea 1: [Name]** 💭

A. **Subcomponent**: [TBD]

B. **Idea**: [TBD]

C. **Examples**:
   - [TBD]

D. **Structure/Logic/Rule**: [TBD]

#### Delight Implementation Ideas

**Idea 1: [Name]** 💭

A. **Subcomponent**: [TBD]

B. **Idea**: [TBD]

C. **Examples**:
   - [TBD]

D. **Structure/Logic/Rule**: [TBD]

---

## Status Legend
- 💭 Proposed — idea stage, needs validation
- 🎨 In Design — being refined/prototyped
- ⚙️ In Development — being implemented
- ✅ Shipped — live in product

---

## Usage Notes

**When to add an entry:**
- You're designing a specific component and need to detail out how it's differentiated
- You have concrete implementation ideas that support high-level differentiation
- You want to capture delight moments for specific interactions

**When NOT to add an entry:**
- High-level differentiation or delight concepts (those go in main flow docs — this doc quotes them and adds implementation)
- General product philosophy (that goes in product values)
- Anything already well-documented in the screen differentiation sections

**How to maintain:**
- Start ideas as 💭 Proposed
- Update status as they progress through design/dev
- When an idea is shipped (✅), it becomes the source of truth for "how we do this"
- Archive or remove ideas that get rejected (move to a "Rejected Ideas" section if useful for reference)

