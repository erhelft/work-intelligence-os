# Preferences & Context Cards - UI Spec

This document defines the user-facing preferences and context collection interface based on the data collection framework.

---

## **CATEGORY 1: PREFERENCES**

**Tab Name:** Preferences  
**Tab Description:** How your work life functions

---

### **Card 1: Work Hours & Availability**

**Title:** Work Hours & Availability  
**Subheader:** When are you available for meetings? Work hours & meeting-free blocks.

**Data to Collect:**
- Core working hours (start/end by day)
- Meeting-free blocks (e.g., no meetings before 10 AM)
- Days typically available for meetings

**Smart Default:** 9 AM - 6 PM, Monday-Friday (detected from your calendar patterns)

**UI Layout Option 1: Weekly Time Grid**
- Visual weekly calendar grid with hourly blocks
- Click/drag to select available hours per day
- Separate "block out times" section for meeting-free periods
- Quick presets: "Standard Hours" (9-6), "Early Bird" (7-5), "Flexible" (8-8)

**UI Layout Option 2: Per-Day Time Pickers**
- List view showing each day of the week
- Start/end time dropdowns per day
- Toggle "Available for meetings this day"
- Optional: "No meetings before [time]" and "No meetings after [time]" per day

---

### **Card 2: Personal Time Protection**

**Title:** Personal Time Protection  
**Subheader:** What personal commitments should be protected? Family time, sports, habits.

**Data to Collect:**
- Recurring personal commitments (school pickup, gym, family dinner)
- Protected time blocks
- Personal calendar integration status

**Smart Default:** No personal commitments assumed - you add what matters

**UI Layout Option 1: Personal Calendar Sync + Manual Blocks**
- Connect personal calendar button (Google/Outlook)
- If connected: Show list of detected personal recurring events with toggle to protect each
- Add manual block button: time + recurrence + label
- Visual: Mini calendar preview showing protected blocks in different color

**UI Layout Option 2: Simple List + Add Block**
- "Add Protected Time" button
- Form: Day(s) of week, start time, end time, label (optional)
- List view of all protected blocks with edit/delete options
- Note: "Connect personal calendar to auto-detect" with CTA button

---

### **Card 3: Meeting Day Structure**

**Title:** Meeting Day Structure  
**Subheader:** How do you prefer your days? Meeting limits, focus time, breaks.

**Data to Collect:**
- Maximum meetings per day
- Maximum consecutive meetings without buffer
- Focus time requirements (when, how often, minimum duration)

**Smart Default:**
- Max 6 meetings/day (based on your typical high-end)
- Max 4 consecutive meetings
- No focus time blocks required

**UI Layout Option 1: Slider Controls with Visual Preview**
- "Maximum meetings per day" - Slider (1-10) with number display
- "Maximum back-to-back meetings" - Slider (1-8) with number display
- "Daily focus time" - Toggle on/off
  - If on: Time selector (Morning / Afternoon / End of day) + Duration slider (30 min - 4 hours)
- Visual: Mini calendar preview showing example day with limits applied

**UI Layout Option 2: Simple Form with Smart Suggestions**
- "How many meetings in one day is too many?" - Number input with +/- buttons
- "How many meetings in a row before you need a break?" - Number input with +/- buttons
- "Do you need protected focus time?" - Yes/No toggle
  - If yes: "When?" (dropdown) + "How long?" (dropdown)
- Helper text showing current average from calendar data

---

### **Card 4: Meeting Preferences**

**Title:** Meeting Format Preferences  
**Subheader:** How do you like to meet? Default length & format.

**Data to Collect:**
- Default meeting length
- Default meeting format (in-person / video / phone)

**Smart Default:**
- 30 minutes (your most common duration)
- Video by default

**UI Layout Option 1: Quick Selection Grid**
- **Default Length**
  - Button group: 15 min / 30 min / 45 min / 60 min (highlight most used)
- **Default Format**
  - Icon buttons: In-person / Video / Phone
  - Large, visual icons with labels
- Note: "You can always adjust these when scheduling individual meetings"

**UI Layout Option 2: Dropdown Selectors with Context**
- "How long are your meetings usually?" 
  - Dropdown: 15 / 30 / 45 / 60 / 90 minutes
  - Helper text: "Currently, 73% of your meetings are 30 minutes"
- "What's your preferred meeting format?"
  - Dropdown: In-person / Video call / Phone call / Let scheduler decide
  - Helper text: "Video calls are easiest to schedule across locations"

---

### **Card 5: Prep & Follow-up Time**

**Title:** Prep & Follow-up Time  
**Subheader:** Need time around meetings? Prep & follow-up buffers.

**Data to Collect:**
- Buffer before internal meetings
- Buffer after internal meetings
- Buffer before external meetings (clients, prospects, opposing counsel)
- Buffer after external meetings
- Materials timing requirement for external meetings

**Smart Default:**
- Internal: 0 min before/after
- External: 15 min before/after, materials 24 hours in advance

**UI Layout Option 1: Two-Column Comparison**
- Left column: **Internal Meetings** (with firm colleagues)
  - Before: Dropdown (0 / 5 / 10 / 15 / 30 min)
  - After: Dropdown (0 / 5 / 10 / 15 / 30 min)
  - Materials: Dropdown (None / Same day / 24 hours)
- Right column: **External Meetings** (clients, opposing counsel, etc.)
  - Before: Dropdown (0 / 5 / 10 / 15 / 30 min)
  - After: Dropdown (0 / 5 / 10 / 15 / 30 min)
  - Materials: Dropdown (None / Same day / 24 hours / 48 hours)

**UI Layout Option 2: Unified List with Meeting Type Tags**
- Single form with "Meeting Type" toggle at top: Internal / External
- Buffer before: Dropdown or slider
- Buffer after: Dropdown or slider
- "Require materials in advance?" Toggle + time selector
- Visual indicator showing example: "Client call 2-3 PM becomes 1:45-3:15 PM (30 min total)"

---

### **Card 6: Work Location & Schedule**

**Title:** Work Location & Schedule  
**Subheader:** Where do you work? Office location and remote days for in-person scheduling.

**Data to Collect:**
- Primary office location
- Remote work pattern (which days)
- Travel time between offices (if applicable)

**Smart Default:** Office-based 5 days/week at primary office (user updates as needed)

**UI Layout Option 1: Weekly Schedule Grid**
- Office selector dropdown (for multi-office firms)
- Weekly grid: M T W Th F
- Click each day to toggle: Office / Remote / Flexible
- If multi-office: Select which office per day
- "Add travel time between offices" - time input
- Visual preview: "You're typically in [Office Name] Mon-Wed, remote Thu-Fri"

**UI Layout Option 2: Simple Form**
- "Primary office location:" - Dropdown
- "Typical remote work days:" - Multi-select checkboxes (M T W Th F)
- "Work schedule pattern:" - Radio buttons (Full-time office / Hybrid / Full-time remote)
- If hybrid selected: Show day selector
- Note: "This helps us schedule in-person meetings on the right days"

---

## **CATEGORY 2: YOUR ROLE & ORGANIZATION**

**Tab Name:** Your Role & Organization  
**Tab Description:** Who you are in the organization

---

### **Card 1: Organizational Hierarchy**

**Title:** Organizational Hierarchy  
**Subheader:** Who gets priority when calendars conflict? Manager, reports, team structure.

**Data to Collect:**
- Direct manager
- Direct reports
- Org chart position

**Smart Default:** Empty - populated from firm directory if available

**UI Layout Option 1: Org Chart Visual**
- Visual hierarchy diagram showing user's position
- Clickable to add/edit manager and reports
- "Sync from directory" button if integration available
- Manual add: Search firm directory or enter name/email

**UI Layout Option 2: Simple List Form**
- "Your manager:" - Single person selector (search directory or manual)
- "Your direct reports:" - Multi-person selector with add/remove
- List view showing current hierarchy
- Note: "This determines whose meeting requests take priority"

---

### **Card 2: VIP Clients**

**Title:** VIP Clients  
**Subheader:** Who gets priority scheduling? Key client relationships.

**Data to Collect:**
- VIP client names/organizations
- Key contacts at those clients
- Relationship status

**Smart Default:** Empty list - must be explicitly designated (can suggest from billing data if available)

**UI Layout Option 1: Client List with Tags**
- "Add VIP Client" button
- List showing: Client name, key contacts, tag (High-value / Strategic / Active)
- Search integration with practice management system
- Badge showing "VIP" status
- Edit/remove options per client

**UI Layout Option 2: Quick Add with Auto-Suggestions**
- Search bar: "Add VIP client or contact"
- Auto-suggestions from: Billing system (highest revenue), calendar (frequent meetings), email (high volume)
- Quick action: "Make VIP" button next to suggestions
- Simple list view with remove option
- Note: "VIP clients can override your meeting limits"

---

### **Card 3: Cases & Team Assignments**

**Title:** Cases & Team Assignments  
**Subheader:** What cases and teams require you? Lead vs. supporting roles for delegation.

**Data to Collect:**
- Matters where user is lead attorney (must attend)
- Matters where user is supporting (can delegate)
- Team involvement and roles
- Level of involvement per matter/team

**Smart Default:** Empty - sync from practice management system or add manually

**UI Layout Option 1: Matter/Team Table with Roles**
- Table view: Name | Type (Matter/Team) | Client | Your role (Lead / Supporting / Coverage)
- "Sync from practice management" button
- Filter: Show all / Lead only / Supporting only / By type
- Add manually: Name, type, client, role dropdown
- Bulk import option

**UI Layout Option 2: Two-Column Layout**
- Left: "Lead Role" (must attend meetings)
- Right: "Supporting Role" (can delegate if needed)
- Each shows both matters and teams
- Drag-and-drop between columns
- "Add matter or team" button adds to appropriate column
- Search integration with practice management system

---

### **Card 4: Recurring Commitments**

**Title:** Recurring Commitments  
**Subheader:** What regular meetings are protected? Weekly standups, monthly reviews, etc.

**Data to Collect:**
- Recurring work meetings
- Regular time blocks (admin, billing, business development)
- Predictable patterns

**Smart Default:** Auto-detected recurring calendar events (user can edit protection status)

**UI Layout Option 1: Calendar-Detected List**
- Auto-populated list from calendar: "We found these recurring meetings:"
- Each item: Meeting name, frequency (Weekly/Monthly), attendees
- Toggle per meeting: "Protect this meeting" (on/off)
- Filter: All recurring / Protected only
- Add manual block option

**UI Layout Option 2: Simple Protection Toggle**
- "Recurring meetings from your calendar:" - List view
- Each meeting shows: Title, time, frequency, attendees
- Single toggle: "Keep this protected"
- Visual indicator: Protected (locked icon) vs. Flexible
- Bulk action: "Protect all" / "Unprotect all"
- Note: "Protected meetings can't be moved for new requests"

---

## **CATEGORY 3: DYNAMIC CONTEXT & PRIORITIES**

**Tab Name:** CONTEXT & PRIORITIES  
**Tab Description:** What's happening right now

---

### **Card 1: Upcoming Deadlines**

**Title:** Upcoming Deadlines  
**Subheader:** What critical deadlines need protected time? Court dates, filings, closings.

**Data to Collect:**
- Hard deadlines in next 30-90 days (court dates, filing deadlines, deal closings)
- Work time needed before each deadline
- Meetings or events tied to specific deadlines

**Smart Default:** Empty - sync from practice management or add manually

**UI Layout Option 1: Timeline View**
- Visual timeline showing next 90 days
- Deadlines plotted as pins/markers with countdown
- Click to add: Deadline name, date, related matter, prep time needed
- Auto-suggest work blocks before deadline
- Color-coded by urgency: Red (< 7 days), Yellow (7-30 days), Green (30+ days)

**UI Layout Option 2: List with Countdown**
- List view: Deadline name | Date | Days remaining | Matter | Prep time
- Sort by: Soonest / Matter / Date added
- "Add deadline" button
- Integration sync from practice management system
- Each deadline shows: Protected time blocks automatically created

---

### **Card 2: Out-of-Office**

**Title:** Out-of-Office  
**Subheader:** When are you unavailable? Vacation, travel, or personal time off.

**Data to Collect:**
- Planned vacation and time off
- Business travel with limited/no availability
- Personal leave or unavailable periods

**Smart Default:** Auto-detected from OOO calendar blocks (user confirms)

**UI Layout Option 1: Calendar Picker with List**
- Mini calendar showing upcoming months
- Click dates to mark OOO (click-drag for ranges)
- List below: Upcoming OOO periods with dates
- Toggle: "Block all meetings" vs "Limited availability"
- Note type: Vacation / Business travel / Personal leave
- Auto-detected OOO blocks shown with "Confirm" button

**UI Layout Option 2: Simple Date Range Form**
- "Add out-of-office period" button
- Form: Start date, end date, type (Vacation / Travel / Personal)
- "Completely unavailable" toggle (blocks all meetings)
- List of upcoming OOO periods
- Auto-sync from calendar OOO events
- Note: "No meetings will be scheduled during these periods"

---

### **Card 3: Temporary Changes**

**Title:** Temporary Schedule Changes  
**Subheader:** Any short-term adjustments? Remote days, hour changes, format restrictions.

**Data to Collect:**
- Short-term remote work periods
- Temporary hour changes
- Limited-time format restrictions

**Smart Default:** Empty - user adds as needed

**UI Layout Option 1: Quick Override Form**
- "Add temporary change" button
- Type selector: Hours / Location / Format
- Date range picker (start/end)
- Specific change: 
  - Hours: Modified start/end times
  - Location: Force remote or force office
  - Format: In-person only / Video only
- List of active temporary changes with end dates
- Auto-expire when end date passes

**UI Layout Option 2: Override Cards**
- Card-based interface for each type
- "Hours Override" card: "Working 9am-3pm only" + date range
- "Location Override" card: "Remote all week" + date range
- "Format Override" card: "In-person meetings only" + date range
- Each shows remaining days: "3 days remaining"
- Quick remove option
- Note: "These override your normal preferences temporarily"

---

## **CATEGORY 4: RELATIONAL CONTEXT**

**Status:** Not included in V1 - Too sensitive for initial release

This category will cover:
- Who can't meet together (conflicts of interest, ethical walls)
- Who needs special scheduling considerations
- External contact scheduling preferences

To be developed in a future iteration after V1.

---

## Notes

**Naming Principles:**
- Card titles describe WHAT we're collecting (the domain)
- Subheaders describe WHY it matters (the scheduling consequence)
- Keep both concise - user should "get it" in 2 seconds

**Smart Defaults Philosophy:**
- Show what we detected from their calendar
- Make it easy to adjust, not confirm
- Conservative defaults when we have no data

**Progressive Disclosure:**
- Cards collapsed by default showing title + subheader + status ("Complete" / "3 items" / "Not set")
- Click to expand and edit
- Save happens automatically or with explicit "Save" button (TBD based on implementation)

---

## Copy Guidelines

### Card Title & Subheader Pattern

**Title Structure:**
- Short, clear descriptor of the domain (2-4 words)
- Use common terminology, avoid jargon
- Examples: "Work Hours & Availability", "Meeting Day Structure", "Personal Time Protection"

**Subheader Structure:**
Formula: **[User-centered question?] + [1-3 brief examples]**

**Rules:**
1. **Start with a question** - Put the user in the center ("you")
2. **Keep it short** - One sentence, ~10-15 words max
3. **Show examples** - 1-3 generic categories, not specific instances
4. **Vary your punctuation** - Use ampersands (&) to connect related concepts, commas for lists. Mix it up for variety.
5. **Be conversational** - Natural language, not technical
6. **Flex the question style** - Match the question to the domain naturally. Use "When/What/How/Need" as fits best - don't force the same pattern everywhere.
7. **Create variety within category** - Not all cards should look identical. Vary length, structure, and tone to keep it interesting and human.

**How We Got to Conversational (Evolution):**

Our process moved from technical/consequence-based to user-centered/conversational:

| Before (Technical) | After (Conversational) | What Changed |
|-------------------|----------------------|--------------|
| "Sets when meetings can and cannot be scheduled" | "When are you available for meetings? Work hours & meeting-free blocks." | Added user question, removed passive "sets", added examples |
| "Controls meeting density and protects focus time" | "How do you prefer your days? Meeting limits, focus time, breaks." | Centered on user preference, made it personal |
| "Automatic buffers before and after meetings" | "Need time around meetings? Prep & follow-up buffers." | Compact question, removed "automatic" (too technical) |

**Key Shifts:**
- From passive "sets/controls" → active "you/your"  
- From feature descriptions → user questions
- From technical explanations → conversational check-ins
- Added concrete examples to show what's included

**Good Examples:**
- ✅ "When are you available for meetings? Work hours & meeting-free blocks."
- ✅ "What personal commitments should be protected? Family time, sports, habits."
- ✅ "How do you prefer your days? Meeting limits, focus time, breaks."
- ✅ "Need time around meetings? Prep & follow-up buffers." (shorter, punchier)

**Bad Examples:**
- ❌ "Sets when meetings can and cannot be scheduled" (technical, not user-centered)
- ❌ "What personal commitments should be protected? School pickup at 3 PM, Thursday yoga class, Sunday family dinners" (too specific, not generic)
- ❌ "Configure your meeting day structure parameters" (jargon, no examples, robotic)

### Variety is Critical

**Why Cards Need Variety:**
Cards within the same category should NOT all look identical. Repetitive patterns feel robotic and boring.

**How to Create Variety:**
1. **Vary question types** - Mix "When/What/How/Need" openings
2. **Vary length** - Some cards can be punchier (8 words), others fuller (15 words)
3. **Vary structure** - Some use ampersands, some use commas, some have fewer examples
4. **Fit the domain** - Let the subject matter guide the natural phrasing

**Example of Good Variety (within Preferences category):**
- "When are you available for meetings? Work hours & meeting-free blocks." (When + 2 connected items)
- "What personal commitments should be protected? Family time, sports, habits." (What + 3 list items)
- "How do you prefer your days? Meeting limits, focus time, breaks." (How + 3 list items)
- "Need time around meetings? Prep & follow-up buffers." (Short, punchy, direct)

Notice: Different openings, different punctuation, different lengths - but all feel cohesive and conversational.

### Why This Matters

1. **User Understanding** - Question format immediately shows what we're asking
2. **Value Clarity** - Examples demonstrate what's included without reading details
3. **Trust Building** - Conversational tone feels helpful, not invasive
4. **Scanability** - Short, consistent format helps users navigate quickly
5. **Human Feel** - Variety prevents robotic, repetitive copy that feels automated

### Testing Your Copy

Before finalizing any card copy, ask:
1. Would a user immediately understand what this card is about?
2. Is the value clear without expanding the card?
3. Does it feel conversational and helpful, not technical?
4. Could you make it shorter?

