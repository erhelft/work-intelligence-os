# Data Collection Framework

Building an INTELLIGENT scheduling system requires deep context about the user — not just availability, but priorities, preferences, relationships, and real-time constraints. This framework defines five core dimensions of context that, when combined, enable truly smart scheduling decisions.

This data collection framework will eventually become user-facing preferences in the app, so all questions are framed from the user's perspective.

---

## 1. PREFERENCES — How does my work life function?

### 1. What are my work hours and availability?

**Scheduling Impact:**
Determines when meetings can and cannot be scheduled - establishes the time boundaries for all scheduling decisions.

**Key Data Points:**
- Core working hours (start/end times by day of week)
- Meeting-free blocks (e.g., no meetings before 10 AM, Friday afternoons protected)
- Days of the week typically available for meetings

**Collection Method:**
- **Primary:** Analyze calendar meeting distribution over 3+ months to identify when meetings actually occur
- **Secondary:** Identify recurring protected time blocks explicitly labeled "focus time," "do not schedule," or similar
- **Smart Default:** 9 AM - 6 PM, Monday-Friday

---

### 2. What personal time should be protected from work meetings?

**Scheduling Impact:**
Identifies time blocks that must be protected from work meetings - hard constraints that override work scheduling requests.

**Key Data Points:**
- Recurring personal time blocks (school pickup, gym, family dinner)
- Protected personal time (family dinners, weekends)
- Specific days/times that should remain clear

**Collection Method:**
- **Primary:** Identify recurring calendar events marked as "private" or "personal" with consistent timing
- **Secondary:** Pattern matching on event titles containing explicit personal keywords: "school," "doctor," "gym," "family"
- **Integration:** Personal calendar integration (separate personal Google/Outlook calendar) for clear boundaries
- **Smart Default:** No personal commitments assumed - user must explicitly add

---

### 3. What are my meeting limits and format preferences?

**Scheduling Impact:**
Sets boundaries on meeting density (how many meetings can be added) and establishes default meeting formats (length, location, medium) for new scheduling requests.

**Key Data Points:**
- Maximum meetings per day
- Maximum consecutive meetings without buffer
- Focus time requirements (when, how often, minimum duration)
- Default meeting length
- In-person vs. video vs. phone defaults
- Location preferences (office, client site, remote)

**Collection Method:**
- **Primary:** Analyze range and maximum of meetings per day over past 3 months - what's the typical high end?
- **Secondary:** Identify blocks where user had multiple consecutive meetings without breaks - how common is this?
- **Tertiary:** Detect recurring calendar blocks labeled as "focus time," "admin time," or "do not schedule"
- **Quaternary:** Analyze calendar meeting durations - what's the most common length for meetings the user schedules?
- **Quinary:** Analyze meeting format distribution - ratio of in-person vs. video vs. phone calls across all meetings
- **Smart Default:** Max 6 meetings/day, max 4 consecutive meetings, 30-minute default meeting length, video by default

---

### 4. How much prep/follow-up time should be planned?

**Scheduling Impact:**
Determines buffer time to automatically add before/after meetings and sets expectations for advance material sharing - prevents back-to-back scheduling when prep/follow-up is needed.

**Key Data Points:**
- Buffer time before internal meetings & external meetings (clients, prospects, opposing counsel)
- Buffer time after internal meetings & external meetings
- Materials required in advance for internal meetings & external meetings

**Collection Method:**
- **Primary:** Analyze calendar for explicit buffer blocks scheduled before/after meetings
- **Secondary:** Classify meetings as internal (only firm attendees) vs. external (any outside attendee) and identify pattern differences
- **Tertiary:** Look for recurring prep blocks specifically before client meetings, court appearances, or meetings with "new" in the title
- **Smart Default:** Internal meetings: 0 min before/after, no materials; External meetings: 15 min before/after, materials 24 hours in advance

---

## 2. STATIC CONTEXT — Who am I in the organization?

### 1. Who's your manager? Who reports to you?

**Scheduling Impact:**
Determines organizational hierarchy for prioritizing conflicting meeting requests - whose internal requests take precedence when calendar conflicts arise.

**Key Data Points:**
- Direct manager (whose internal meeting requests take priority)
- Direct reports (people who report to me)
- Org chart position and relationships

**Collection Method:**
- **Primary:** Firm directory or HR system integration (org chart data)
- **Smart Default:** Ask user directly during onboarding if org chart data unavailable

---

### 2. Which clients are VIP?

**Scheduling Impact:**
VIP client meeting requests get priority scheduling and can bypass normal meeting limits.

**Key Data Points:**
- VIP client names/organizations
- Key client contacts who should get priority
- Client relationship status (active, high-value, strategic)

**Collection Method:**
- **Primary:** Practice management system integration - identify clients with highest billing or strategic designation
- **Secondary:** Calendar analysis - clients with recurring meetings or high meeting frequency
- **Tertiary:** Email analysis - external contacts with high email volume from leadership
- **Smart Default:** Empty list - user must explicitly designate VIP clients

---

### 3. Which matters require my involvement?

**Scheduling Impact:**
Determines which matter-related meetings I must attend vs. can delegate when scheduling conflicts arise.

**Key Data Points:**
- Matters where I'm lead attorney (required to attend)
- Matters where I'm supporting attorney (can delegate if needed)
- Level of involvement per matter (lead, supporting, coverage)

**Collection Method:**
- **Primary:** Practice management system integration - matters with role designation (lead vs. supporting attorney)
- **Secondary:** Billing/time-tracking system - matters with time allocation patterns
- **Tertiary:** Calendar analysis - matters appearing in meeting titles with required vs. optional attendance
- **Smart Default:** Empty list - user must add manually or sync from practice management system

---

### 4. What recurring meetings should be protected?

**Scheduling Impact:**
Identifies time that's already committed and unavailable for new meetings - calculates true available capacity by accounting for recurring obligations.

**Key Data Points:**
- Recurring work meetings (team meetings, practice group calls, office hours)
- Regular time blocks (admin time, billing time, business development)
- Predictable patterns (monthly all-hands, quarterly reviews, annual conferences)

**Collection Method:**
- **Primary:** Identify all recurring calendar events with firm attendees (exclude personal events from Section 1.2)
- **Secondary:** Detect consistent weekly/monthly patterns even without explicit recurrence rules
- **Tertiary:** Look for calendar events with keywords like "standing," "weekly," "monthly," "recurring"
- **Smart Default:** Only show explicitly recurring calendar events - don't assume unlabeled patterns

---

### 5. When and where can I take in-person meetings?

**Scheduling Impact:**
Determines default meeting format (in-person vs. remote) and location for new meeting requests - ensures meetings are scheduled in the right place/format based on where the user will be.

**Key Data Points:**
- Primary office location (which office for multi-office firms)
- Remote work patterns (which days of the week working from home)
- Travel time between offices (for multi-office scheduling)

**Collection Method:**
- **Primary:** Ask user directly for office location and typical work patterns
- **Secondary:** User updates when work patterns change (new office, remote schedule shift)
- **Smart Default:** Office-based 5 days/week at primary office location

---

## 3. RELATIONAL CONTEXT — How do I work with specific others?

1. What are my ethical walls and conflict constraints?
2. Who requires special handling and how?
3. What do I know about external parties I coordinate with?

---

## 4. CURRENT PRIORITIES — What am I optimizing for right now?

1. What's my focus this period?
2. What's urgent right now?
3. What relationships need attention?

---

## 5. CURRENT SITUATION — What's true right now?

1. What are my hard deadlines?
2. What's my current capacity?
3. What temporary constraints am I operating under?
4. What just changed?

---

## Implementation Notes

The framework intentionally separates:
- **Static** (sections 1-3): Changes rarely, forms the foundation
- **Dynamic** (sections 4-5): Changes frequently, provides real-time context

This separation allows the system to:
- Build a stable understanding of the user over time
- Adapt quickly to changing priorities and situations
- Make intelligent trade-offs between long-term preferences and immediate needs

---

## Design Principles & Guidelines

### Data Point Selection

**1. Favor Measurable Over Soft**
- ✅ Good: "Maximum meetings per day"
- ❌ Bad: "Maximum meetings per day before quality/satisfaction declines"
- Principle: Only collect concrete, tangible data points that can be objectively measured or observed

**2. Keep It Simple for V1**
- ✅ Good: "Default meeting length"
- ❌ Bad: "Preferred meeting length by meeting type and attendee"
- Principle: Avoid overly granular segmentation. Start with broad, simple data that covers 80% of use cases

**3. Concrete Over Abstract**
- ✅ Good: "Recurring personal time blocks (school pickup, gym)"
- ❌ Bad: "Hard constraints vs. flexible personal time"
- Principle: Use specific, tangible examples rather than abstract categorizations

---

### Question Framing: Consequence Over Collection

**Core Principle:** Frame questions by their scheduling CONSEQUENCE, not data COLLECTION. Users should immediately understand WHY we're asking and HOW it affects scheduling, without having to think about it.

**The Problem with Data Collection Framing:**
When questions are framed as data collection, users feel surveilled and don't understand the utility:
- ❌ "What clients and matters am I responsible for?" → User thinks: "Why do you need to know this? Are you tracking my work?"
- ❌ "Who do you work with?" → User thinks: "This feels invasive"
- ❌ "What's your typical schedule?" → User thinks: "Just look at my calendar"

**The Solution - Consequence-Based Framing:**
When questions reveal their scheduling purpose, users understand the value:
- ✅ "Which clients are VIP?" → User thinks: "Oh, their meetings get prioritized. That makes sense."
- ✅ "Who can book you without approval?" → User thinks: "This controls auto-accept rules. Useful."
- ✅ "What's the latest you take meetings?" → User thinks: "This sets my time boundaries. Perfect."

**How to Apply This:**

1. **Start with the scheduling action** - What decision does this data enable?
2. **Frame the question around that action** - Make the consequence explicit in the question itself
3. **Test with "So what?"** - If the user would ask "why do you need this?", reframe it
4. **Add the impact statement** - The "Scheduling Impact" line should feel like a natural explanation, not a revelation

**Examples:**

| ❌ Data Collection Frame | ✅ Consequence Frame | Scheduling Impact |
|-------------------------|---------------------|-------------------|
| "What clients do you work with?" | "Which clients are VIP?" | Their requests get priority scheduling |
| "What meetings do you attend?" | "Which meetings can you delegate?" | Enables substitution when overbooked |
| "Who do you report to?" | "Whose requests take priority?" | Determines hierarchy-based scheduling |
| "What are your relationships?" | "Whose requests override your meeting limits?" | Exception handling for key stakeholders |

**The User Test:**
When a user sees this question on their preferences screen, they should think:
- ✅ "That makes sense, this will help the system schedule better"
- ❌ "Why are they asking me this? What are they going to do with it?"

**Why This Matters:**
1. **Transparency** - User immediately sees WHY we need the data
2. **Trust** - No feeling of surveillance, just utility
3. **Accuracy** - User gives us the right data for the right purpose (e.g., VIP clients, not all clients)
4. **Actionability** - The question itself implies the scheduling behavior

---

### Collection Method Strategy

**1. Inference First, Asking Last**
Priority order for data collection:
1. **First:** Analyze calendar patterns (3+ months of data)
2. **Second:** Analyze email patterns (if relevant)
3. **Third:** Integrate with other systems (billing, document management, etc.)
4. **Last Resort:** Ask the user directly

**2. Safe and Accurate Over Aggressive Guessing**
- ✅ Good: "Identify recurring calendar events marked as 'private' or 'personal'"
- ❌ Bad: "Detect consistent time blocks where no meetings are scheduled despite availability"
- Principle: Avoid harsh assumptions. Only infer from explicit signals, not absence of data

**3. Assume Calendar + Email Access**
- Start with what we can deduce from calendar and email metadata
- Suggest integrations to other systems when it adds clear value
- Don't overcomplicate with systems that provide marginal benefit

**4. Look for Explicit Patterns, Not Vague Signals**
- ✅ Good: Calendar blocks labeled "focus time," "do not schedule"
- ❌ Bad: Detecting subsequent behavior after high meeting load days
- Principle: Use clear, observable patterns rather than complex behavioral inference

---

### Smart Defaults Philosophy

**1. Replace "Fallback" with "Smart Default"**
- Don't ask users to "confirm" what we've inferred
- Instead: Show a reasonable default if we have no data
- Let users see and adjust it in their preferences

**2. Smart Defaults Should Be Conservative**
- Example: "9 AM - 6 PM, Monday-Friday" (not 8 AM - 8 PM)
- Example: "No personal commitments assumed" (not trying to guess)
- Principle: Better to under-assume than over-assume

**3. When to Default to Zero vs. A Value**
- Zero/None: Personal commitments, internal meeting prep time (user must explicitly add)
- Reasonable Value: Work hours, max meetings/day (industry standard baseline)

---

### Collection Method Structure

For each question, follow this pattern:

**Primary:** The most reliable, direct source of data  
**Secondary:** Supporting or validating data source  
**Tertiary/Quaternary:** Additional sources if needed  
**Integration:** Suggested external system connections (optional)  
**Smart Default:** What we show if we have zero data

**Remove These Elements:**
- ❌ "Validation" - Don't add validation as a separate step
- ❌ "Fallback" - Use "Smart Default" instead
- ❌ Complex behavioral inference - Keep pattern detection simple and explicit

---

### Segmentation Guidelines

**When to Segment Data:**
- ✅ Internal vs. External meetings (clear, binary, easy to detect)
- ✅ By day of week (simple, observable)

**When NOT to Segment:**
- ❌ By specific meeting type (too many types, hard to classify)
- ❌ By attendee relationship (too complex for V1)
- ❌ By matter type (requires external integration, too granular)

**Rule of Thumb:** If segmentation requires manual user classification or complex inference, save it for V2.

---

### V1 Mindset

This is the **first version** of the intelligent system. The goal is to:

1. **Get the foundation right** - Collect simple, reliable data that works for most users
2. **Avoid overwhelming users** - Don't ask 50 questions or show complex configuration screens
3. **Build trust through accuracy** - Better to have 5 things right than 15 things partially wrong
4. **Create room to grow** - Design for future enhancement without overbuilding now

Remember: An intelligent system doesn't need to know everything on day one. It needs to know the right things and use them well.

