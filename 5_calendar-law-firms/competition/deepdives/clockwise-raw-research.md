# Clockwise — Raw Perplexity Research Output

**Date:** [Date]
**Query Source:** Step 1 of 5-scheduling-specific-deepdive.md workflow

---

## Instructions
Paste the complete Perplexity research output below this line.

---

Perfect. Now I have comprehensive information. Let me compile the competitive deep-dive report with all the gathered data, organized by the user's requested framework.

## Clockwise (www.getclockwise.com) - Competitive Deep-Dive

### COMPANY BASICS

**Founding date, funding raised, current stage**

Clockwise was founded on October 5, 2016 by Matt Martin, Gary Lerhaupt, and Mike Grinolds (all three previously worked at RelateIQ, which Salesforce acquired for $390 million in 2014). The company has raised $87.1 million total across three major funding rounds:[1]
- Series A: $11 million (June 2019, co-led by Greylock and Accel)[2]
- Series B: $18 million (June 2020, led by Bain Capital Ventures)[2]
- Series C: $45 million (January 2022, led by Coatue with participation from Atlassian Ventures)[2]

Company status: Active, 51-200 employee range officially, though one source suggests 950 employees. Latest funding was January 2022, indicating **mature growth-stage** rather than post-Series C stage announcements.[1]

**Core value proposition and target job-to-be-done**

Official positioning: *"Clockwise uses AI to optimize teams' calendars to create more time in everyone's day. It's a new way of working that gives us flexibility and focus."*[3]

Core job-to-be-done: **Eliminate calendar chaos and manufacturing focus time** by automatically orchestrating team schedules to prevent fragmented days, resolve conflicts, and protect uninterrupted deep work blocks. The value proposition centers on **organizational meeting culture reform** rather than just personal productivity.[4]

Marketing positioning emphasizes three pillars: *Preference Learning* (understanding how individuals and teams work), *Predictive Scheduling* (anticipating conflicts before they occur), and *Real-time Optimization* (continuous daily refinement of calendars).[3]

**Target customer**

- **Company size**: Mid-market to enterprise focus, though freemium model captures SMBs. Messaging targets **teams with chronic meeting overload** and cross-functional coordination challenges[5]
- **Vertical**: Horizontal B2B SaaS (applies across industries), with notable early adoption among tech/SaaS sales and engineering teams
- **Horizontal profile**: Best-fit for organizations already using Google Workspace or Microsoft 365 with distributed/hybrid teams managing internal meeting culture problems
- Notable customer: Segment (customer data platform) uses Clockwise to protect 10 hours/week of pipeline generation focus time for sales reps[6]

**GTM motion**

- **Go-to-market approach**: **Freemium + self-serve with sales overlay** for enterprise. Free forever plan enables individual/small team adoption; paid tiers ($7.75/user/month Teams → $11.50/month Business) unlock team features[7][8]
- **Sales motion**: Primarily product-led for SMBs; sales team for Enterprise deals (sales@getclockwise.com for Enterprise pricing)[8]
- **Market presence**: 40,000+ organizations currently using Clockwise[3]

***

### SCHEDULING PRODUCT FOCUS

**What scheduling problems do they claim to solve? (Marketing positioning)**

From website and marketing materials:[9][3]
- **Meeting fragmentation**: "Never play calendar Tetris again" — eliminating the constant back-and-forth of scheduling coordination
- **Lost deep work time**: Focus Time creation through intelligent meeting consolidation ("Clockwise tests out millions of calendar arrangements every day")
- **Scheduling conflicts**: Automatic real-time conflict detection and resolution without manual intervention
- **Time zone complexity**: Balancing availability across distributed teams ("I have eight people across four time zones—Clockwise tells me when we're all actually online")
- **Meeting bloat**: Reducing meeting load while improving quality of remaining meetings

**What scheduling problems do users report they solve? (G2, Capterra, Reddit)**

G2 reviews (21+ mentions of effective scheduling):[10]
- **Automatic rescheduling of internal meetings** to create contiguous Focus Time blocks — users highlight this as the primary differentiator vs. competitors
- **Elimination of scheduling back-and-forth with external clients** via Scheduling Links (similar to Calendly but embedded in workflow)[11]
- **Conflict resolution**: "Clockwise automagically makes [conflicts] disappear"[3]
- **Smart meeting breaks**: Automatic insertion of buffer time between meetings to prevent "meeting whiplash"
- **Team availability visibility**: Shared team calendar reduces scheduling friction for group meetings[12]

Capterra reviews highlight:[12]
- "Cut down on scheduling conflicts and last-minute rescheduling"
- "Helps to easily find slots with my team through its AI scheduler"
- "Eliminates the back-and-forth for external meetings"

Reddit consensus (Clockwise vs. Reclaim.ai threads):[13]
- Highly rated specifically for **focus time optimization and meeting coordination** (not task scheduling)
- Users emphasize: "Clockwise is great for what it does — ensure you have enough time to focus between all those meetings"[14]

**Scheduling scope**

- **Internal vs. external**: Dual-mode — primarily optimizes internal team meetings (where AI has full intelligence) but supports external customer/client scheduling via Scheduling Links
- **1:1 vs. group**: Both — supports 1:1 recurring meetings (Smart 1:1s to find optimal recurring sync times) and large group coordination (analyzes 80+ million meetings for optimal patterns)[15]
- **Existing vs. new clients**: Focuses on **existing clients/internal teams**; external booking page is for introducing new meeting slots, not replacing traditional booking tools like Calendly

**Scheduling mechanism**

Primary mechanisms:[16][17]
1. **Flexible Meetings** (core differentiator): Organizer marks internal meetings as flexible → Clockwise automatically reschedules them daily at 4:00 PM to optimal times if a better slot is found. Only reschedules if all attendees are available at new time; no approval required.[18]
2. **Booking Pages/Scheduling Links**: External-facing links with customizable availability rules (duration, notice period, video conferencing tool, pre-qualifying questions) that respect Focus Time blocks in background[19][16]
3. **Group Scheduling Links**: Aggregates availability of multiple internal team members for external coordination[20]
4. **AI-powered "Find Time"**: Intelligent suggestion engine for ad-hoc meeting scheduling ranked by convenience and schedule impact[21]
5. **Chat-based scheduling (Prism)**: Newer feature allowing natural language commands ("Schedule a meeting with the design team next Monday at 10 AM")[22]

**Rescheduling/cascade handling capabilities**

Automatic conflict resolution:[23]
- **Smart Conflict Resolutions**: System surfaces 6 types of suggestions (disruptive meetings, low focus time alerts, meeting flexibility recommendations, out-of-office conflicts, scheduling conflicts, "should this person be on Clockwise")[23]
- **Disruptive Meeting detection**: Identifies meetings disrupting Focus Time and offers lower-cost alternatives automatically[23]
- **Real-time optimization**: System runs up to 1 million calendar permutations per team daily to resolve cascades[15][21]
- **Buffer time management**: Automatically inserts breaks between meetings to prevent back-to-back scheduling[24]
- **Constraints-aware**: Respects time zones, meeting hours, working hours, personal preferences (e.g., "no meetings after 4 PM") without moving meetings within 20 hours of occurrence[18]
- **Recurrence handling**: Flexible meetings are rescheduled once daily (4:00 PM in org timezone) with email notifications to all attendees[18]

One user concern from G2: "Sometimes the automatic rescheduling can throw off colleagues as they might have been expecting a meeting at a certain time" — indicating autonomy creates adoption friction.[25]

***

### AI & AUTOMATION

**What AI capabilities do they claim? (Marketing)**

From website and blog:[26][13][3]
- **Preference Learning**: "Clockwise understands your priorities and how you like to work, adapts to how you and your team actually get things done"
- **Predictive Scheduling**: "Regularly analyzes constraints and applies knowledge of org and team-wide boundaries to anticipate conflicts before they happen"
- **Real-time Optimization**: "Tests out millions of calendar arrangements every day to continuously improve your schedule as things change"
- **Team Coordination**: "Balances individual preferences with group requirements to ensure the right mix of focus and collaboration"
- **Intelligent meeting suggestion**: Ranks meeting times by convenience impact and schedule fragmentation cost

**What AI capabilities do users report? (Reviews, does it learn over time?)**

User observations from reviews:[25][12]
- Effective automatic rescheduling that improves fragmentation — users report they don't think about it anymore
- Learning elements mentioned indirectly: system "remembers" when users prefer lunch breaks, adapts to recurring patterns
- One user: "It has magic to move [my lunch] to the most optimal time. So, everyday I eat!"[3]

**Limitation noted**: Users report that learning is **organizational pattern-based** (analyzing historical meeting patterns, inferring meeting hours) rather than individual preference-learning in the sense of predicting user intent. Preferences are primarily set by user configuration, not inferred from behavior alone.[27]

Reddit assessment: "Reddit users see Clockwise as the better choice for optimizing focus time and meetings" compared to Reclaim AI specifically for AI coordination intelligence.[24]

**Autonomy level**

**Mostly autonomous with guardrails**:
- Flexible meetings reschedule automatically without user approval[18]
- Conflict detection surfaces alerts but leaves decisions to human (e.g., "Low on Focus Time" suggestion)[23]
- All changes within defined constraints (working hours, meeting hours, time zones)[18]
- **No approval workflow** — system acts independently, then notifies participants[18]
- Users can override preferences and manually intervene

This is **human-in-loop at the policy level** (users set constraints) but **autonomous in execution**.

**Observable personalization features**

Configuration-based personalization (user-controlled):[28]
- Weekly Focus Time goals (hours per week)
- Morning vs. afternoon focus time preference
- Meeting hours vs. working hours (split schedules)
- Flexible meeting depth (reschedule within day only, or within week)
- Specific time ranges per meeting ("coffee with team on Thursday mornings only")[17]
- Video conferencing tool preference[16]
- Calendar sync preferences (personal to work calendar sync)[7]

Pattern-based adaptations (inferred):
- Lunch time optimization based on historical patterns
- Team availability learning (understanding when people actually work)
- Meeting duration inference for attendees not on Clockwise[27]

***

### INTEGRATION & DEPTH

**How embedded in workflow? (Daily-use tool vs. occasional booking)**

**Deep daily integration for power users; lighter for external clients:**
- **For internal users**: Daily workflow — Chrome extension adds Clockwise UI to Google Calendar, Slack integration provides status updates and muting during meetings[12]
- **Primary interaction**: Weekly/daily observation of team Focus Time analytics and monthly "Week in Review" emails[29]
- **Setup once, hands-off after**: Described as "set it and forget it" once preferences configured[12]
- **For external clients**: Occasional use — only when scheduling meetings via booking links (similar to Calendly frequency)

**Usage intensity**: Medium-high for teams implementing Clockwise formally (dedicated focus time initiatives); low friction after onboarding.[28]

**Integrations beyond calendar**

Confirmed integrations::[30][31][32]
1. **Google Calendar** (primary, deep integration via Chrome extension)
2. **Microsoft Outlook** (support confirmed but less feature-rich than Google)
3. **Slack** (integration for status updates, meeting muting, team availability notifications)
4. **Zoom, Google Meet, Microsoft Teams** (video conferencing platform selection for meeting links)
5. **Asana** (project management — can auto-add Asana tasks to calendar)[32]
6. **Email** (notifications, email-based scheduling support)

**Notable gap**: No deep CRM integrations (Salesforce, HubSpot) unlike competitors like Reclaim AI. Limited PM tool integrations vs. Motion. Focus is on calendar+communication+task-light tooling, not full workflow replacement.[33][4]

**Setup complexity and time-to-value (from reviews)**

From support documentation and user feedback:[28]
- **Onboarding time**: 4 main steps, ~10-15 minutes
  1. Set working hours and meeting availability
  2. Set weekly Focus Time goal (e.g., 20 hours)
  3. Mark at least one recurring meeting as flexible
  4. Review analytics
- **Described as**: "Exceptionally easy to use and set up" and "very straightforward setup"[12]
- **Time-to-value**: Immediate (1-2 days) for focus time creation; 2-4 weeks for pattern recognition and team-wide optimization to show impact[4]
- **User feedback**: "Lightweight" and "straightforward setup for quick adoption"[34]

Minor friction mentioned: "Learning curve for mastering advanced settings" and "might be overwhelming for new users"—but this appears limited to granular customization (custom time ranges, priority rules).[34]

**User comments on replaceability/switching**

**High switching friction for team-wide deployments** (positive for Clockwise retention):
- Users report Clockwise only optimizes internal meetings when **all attendees are Clockwise users**[13][12]
- One user noted: "Not everyone at my company uses Clockwise, so sometimes events can't be automatically managed"[12]
- This creates **network effects** — value increases with adoption breadth

**Switching barrier**: G2 reviews don't mention competitor comparisons; Reddit discussions show users comparing Clockwise vs. Reclaim AI based on **use case (team coordination vs. personal productivity)** rather than feature parity, suggesting **distinct positioning** rather than direct replacement.[33][24]

***

### AI & AUTOMATION (DEEPER DIVE)

**Recent AI innovations (2025)**

**MCP Server for Time** (October 2025) — significant product evolution:[35][36][37]
- **First MCP (Model Context Protocol) server for calendar intelligence**, enabling AI agents to access Clockwise optimization at API level
- Packages "8 years of scheduling optimization" for Claude, Cursor, and MCP-compatible tools
- Capabilities: Automatically respects deep work blocks, handles time zones, learns team preferences, prevents scheduling suboptimal times
- **Strategic implication**: Clockwise repositioning from "standalone scheduler" to **infrastructure for AI-agent workload scheduling**
- Problem statement: "Most AI agents treat calendars like spreadsheets. They schedule meetings that destroy deep work blocks"[37]

This signals Clockwise's strategic shift toward becoming the **calendar intelligence layer** for agentic AI systems rather than end-user-only product.

***

### BRAND & POSITIONING

**Main selling point and brand emphasis**

**Primary positioning**: *"Time Orchestration for Teams"* (not booking/scheduling)

Brand hierarchy:[4]
1. **Focus Time Protection** (#1 differentiator vs. competitors) — creating 2+ hour uninterrupted blocks
2. **Team Coordination at Scale** — org-wide optimization vs. individual calendar defense
3. **Meeting Culture Reform** — transparency into meeting load, analytics-driven insights
4. **Time Zone Fairness** — optimizing for distributed teams globally

Vs. competitors:[4]
- **vs. Reclaim AI**: Clockwise = team orchestration; Reclaim AI = individual defense
- **vs. Motion**: Clockwise = calendar optimization; Motion = project-aware deadline management
- **vs. Calendly**: Clockwise = internal meeting optimization + external booking; Calendly = external booking only
- **vs. traditional tools**: Clockwise = AI-driven proactive; traditional = reactive/manual

**Notable product offerings beyond scheduling**

1. **Team Analytics Dashboard**:[29]
   - Focus Time visibility per team member
   - Meeting load trends and fragmentation metrics
   - Historical pattern analysis ("Low on Focus Time" alerts)
   - Only available on Teams/Business/Enterprise plans

2. **Team No-Meeting Days**:[29]
   - Organization-wide meeting-free day capability
   - Automated enforcement across team calendars

3. **Team Availability Calendar**:[29]
   - Shared team calendar syncing OOO/WFH statuses automatically
   - Single source of truth vs. manual updates

4. **Prism (Chat Interface)**:[27]
   - Natural language scheduling ("Schedule meeting with design team Monday 10 AM")
   - Task-to-calendar integration (paste to-do list, Clockwise auto-schedules tasks)
   - **Newer offering** (rolling out in 2025)

5. **Custom branding on booking links**:[16]
   - Logo/company branding on Scheduling Links landing pages

6. **MCP Server integration** (2025):[37]
   - API-level access for AI agents
   - Enables third-party agents to use Clockwise intelligence

**Market positioning statement**:
Clockwise is **not** a booking tool (like Calendly), task manager (like Motion), or personal assistant (like x.ai Clara). It's **organizational calendar infrastructure** for teams that want to reform meeting culture and maximize collective productivity.

***

### COMPETITIVE POSITIONING SUMMARY

| Dimension | Clockwise | Primary Competitors |
|-----------|-----------|-------------------|
| **Primary Use Case** | Team meeting optimization + focus time | Reclaim AI: Individual productivity; Motion: Project deadlines; Calendly: External booking |
| **Scheduling Scope** | Internal meetings (primary), external clients (secondary) | Reclaim: Individual; Motion: Project-aware; Calendly: Booking-only |
| **AI Approach** | Collective optimization (team-wide permutations) | Reclaim: Priority-based tradeoffs; Motion: Deadline-driven |
| **Autonomy** | High (automatic rescheduling, no approval) | Reclaim: User-controlled priorities; Motion: Configurable |
| **Setup Complexity** | Very low (4 steps, ~15 min) | Reclaim: Low-medium; Motion: Medium-high |
| **Price Point** | $6.75/user/month (Teams) | Reclaim: $8/user/month; Motion: $19-29/user/month |
| **Best For** | Distributed teams; meeting culture change; Google Workspace | Reclaim: Individual focus defense; Motion: Complex projects; Calendly: Simple external booking |

***

### CITATIONS REFERENCE KEY
 Golden Wiki - Clockwise founding & funding data[1]
 TechCrunch & Yahoo Finance - Series funding announcements[2]
 getclockwise.com homepage & marketing[3]
 Canvas Business Model - Competitive landscape analysis[5]
 Clockwise customer case study - Segment[6]
 Support documentation - Plan offerings[7]
 getclockwise.com/pricing[8]
 Canvasbusinessmodel.com - Clockwise positioning[9]
 G2 reviews - Scheduling effectiveness[10]
 Skywork.ai - Booking link workflow[11]
 Capterra reviews - User feedback[12]
 Support docs - Scheduling Link creation[16]
 G2 individual reviews - Cons[25]
 Support docs - Group Scheduling Links[20]
 Skywork.ai - External scheduling workflow[19]
 getclockwise.com blog - AI task managers 2025[22]
 ClickUp blog - Reclaim vs. Clockwise[13]
 Reddit assessment via ClickUp[24]
 Testgrid.io - AI platforms[26]
 Salesforce AU - Reddit recommendations[14]
 Support docs - Smart conflict resolutions[23]
 getclockwise.com blog - Project scheduling tools[30]
 Support docs - Getting started[28]
 Reclaim.ai blog - Clockwise vs. Reclaim comparison[33]
 Ronspot blog - Scheduling tools comparison[31]
 getclockwise.com blog - Workflow creation[32]
 Genesys Growth - Motion vs. Reclaim vs. Clockwise[4]
 Workmate blog - Top AI scheduling tools[38]
 Scalarly - Clockwise review[34]
 Human Upgrade Hub - Reclaim vs. Clockwise[39]
 Support docs - Flexible Meetings feature[18]
 Support docs - Team setup & Prism[27]
 YouTube - Flexible meetings tutorial[17]
 Support docs - Team features[29]
 getclockwise.com blog - MCP protocol[35]
 getclockwise.com - Vs. Reclaim comparison page[15]
 Skywork.ai - AI engine workflow[21]
 getclockwise.com blog - MCP comprehensive guide[36]
 LinkedIn - MCP server release announcement[37]

[1](https://golden.com/wiki/Clockwise_(software_company)-PB4BWNW)
[2](https://productsthatcount.com/product-divergence-series-clockwise-product-vp-on-building-products-that-optimize-time/)
[3](https://www.usemotion.com/blog/clockwise-vs-reclaim.html)
[4](https://genesysgrowth.com/blog/motion-vs-reclaim-ai-vs-clockwise)
[5](https://finance.yahoo.com/news/smart-calendar-tool-clockwise-raises-140021042.html)
[6](https://www.getclockwise.com/customers/segment)
[7](https://support.getclockwise.com/article/75-clockwise-plan-offerings)
[8](https://techcrunch.com/2022/01/18/smart-calendar-tool-clockwise-raises-45m-to-use-ai-to-help-remote-teams-avoid-burnout/)
[9](https://canvasbusinessmodel.com/blogs/competitors/clockwise-competitive-landscape)
[10](https://www.getclockwise.com/pricing)
[11](https://www.getclockwise.com/blog/clockwise-18m-seriesb)
[12](https://www.capterra.com/p/194643/Clockwise/)
[13](https://www.getclockwise.com)
[14](https://www.salesforce.com/au/artificial-intelligence/ai-scheduling-assistant/)
[15](https://www.getclockwise.com/vs/reclaim)
[16](https://support.getclockwise.com/article/164-create-your-clockwise-scheduling-link)
[17](https://www.youtube.com/watch?v=BfY_73hVg9c)
[18](https://support.getclockwise.com/article/184-flexible-meetings)
[19](https://skywork.ai/skypage/en/Beyond-Color-Coding:-How-Clockwise-AI-Revolutionized-My-Google-Calendar/1976119560211460096)
[20](https://support.getclockwise.com/article/167-group-scheduling-links)
[21](https://skywork.ai/skypage/en/Beyond-Color-Coding-How-Clockwise-AI-Revolutionized-My-Google-Calendar/1976119560211460096)
[22](https://www.getclockwise.com/blog/ai-task-managers-scheduling-tools)
[23](https://support.getclockwise.com/article/185-smart-conflict-resolutions)
[24](https://clickup.com/blog/reclaim-ai-vs-clockwise/)
[25](https://www.g2.com/products/clockwise-clockwise/reviews)
[26](https://testgrid.io/blog/top-ai-platforms/)
[27](https://www.getclockwise.com/blog/scheduling-apps)
[28](https://support.getclockwise.com/article/101-how-to-get-started-with-clockwise)
[29](https://support.getclockwise.com/article/77-clockwise-teams-features)
[30](https://www.getclockwise.com/blog/project-scheduling-software-tools)
[31](https://ronspotflexwork.com/blog/top-scheduling-tools-for-business-in-2025/)
[32](https://www.getclockwise.com/blog/how-to-create-workflows)
[33](https://reclaim.ai/blog/clockwise-vs-reclaim)
[34](https://www.scalarly.com/startup-stack/clockwise-enhance-your-time-management/)
[35](https://www.getclockwise.com/blog/mcp-new-standard-ai-agents)
[36](https://www.getclockwise.com/blog/mcp-ai-comprehensive-guide)
[37](https://www.flowtrace.co/collaboration-blog/top-meeting-analytics-tools)
[38](https://www.workmate.com/blog/top-10-ai-scheduling-tools-for-busy-professionals)
[39](https://thehumanupgradehub.com/reclaim-ai-vs-clockwise/)
[40](https://www.g2.com/products/clockwise-clockwise/reviews?qs=pros-and-cons)
[41](https://www.capterra.co.il/reviews/194643/clockwise)
[42](https://www.smbguide.com/review/clockwise/)
[43](https://www.capterra.co.il/alternatives/194643/clockwise)
[44](https://www.getclockwise.com/blog/resolve-schedule-conflict-ways)
[45](https://www.getclockwise.com/blog/conflict-management-resolution-strategies)
[46](https://www.agentlocker.ai/agent/clockwise)
[47](https://emelia.io/hub/best-calendar-apps)
[48](https://www.datadab.com/blog/why-targeting-smbs-can-be-more-lucrative-than-chasing-enterprise-clients/)
[49](https://support.getclockwise.com/article/102-setting-up-your-clockwise-team)
[50](https://www.cmoalliance.com/how-to-scale-your-marketing-for-smbs-and-enterprises/)
[51](https://pulsestrat.com/enterprise-sales-vs-smb-sales-key-differences/)
[52](https://www.getclockwise.com/blog/reschedule-meeting-tips-examples)
[53](https://www.linkedin.com/posts/eric-vyacheslav-156273169_introducing-the-first-mcp-server-for-time-activity-7381342809791979520-eA88)

