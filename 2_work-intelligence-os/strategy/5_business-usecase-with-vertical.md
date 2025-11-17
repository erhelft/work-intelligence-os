# Use Case × Vertical: Combined Selection

## Purpose

This document evaluates combinations of the top-performing business use cases with top-tier verticals to identify the optimal entry point for building Phase 1 products. While previous frameworks evaluated use cases and verticals independently, certain critical factors only emerge when analyzing specific combinations.

**Top 3 Business Use Cases** (from `3_selection-business-usecase.md`):
1. Time & Calendar Management (74/90)
2. Project & Priority Management (70/90)
3. Meeting & Conversation Intelligence (64/90)

**Top 3 Verticals** (from `4_selection-vertical.md`):
1. Professional Services
2. Technology & SaaS Companies
3. Financial Services

This creates **9 possible combinations** to evaluate.

---

## The 7-Parameter Combination Framework

Since this is the third layer of analysis (after standalone use case and vertical frameworks), we focus only on parameters that emerge from the specific combination:

### Business Viability (Can we build a business in Phase 1?)
1. **High Use Case Volume** - Does this happen frequently enough in this vertical to matter?
2. **Direct Business Metric Attribution** - Can we measure clear business impact?

### Learning (Can we learn fast enough?)
3. **Pattern Repetition** - Frequent enough to learn quickly?
4. **Feedback Loop Speed** - How fast do we know if we're right?

### Go-to-Market (Can we deploy and scale?)
5. **Use Case Infrastructure** - Clear manual role that exists today we can learn from?
6. **Integration Complexity in Vertical** - Does this vertical use specialized/proprietary tools for this use case?
7. **Existing Workflow Disruption** - Does our use case fit existing workflows or require behavior change?

**Scoring**: 1-10 for each parameter, total out of 70

---

## Combination Rankings

### Tier 1: Exceptional Combinations (60+ / 70)

#### Rank #1: Time & Calendar × Professional Services
**Total Score: 63/70**

| Parameter | Score | Reasoning |
|-----------|-------|-----------|
| **High Use Case Volume** | 10/10 | Partners: 25-30+ meetings/week. Associates: 15-20 meetings/week. Scheduling is constant, daily activity across entire firm. |
| **Direct Business Metric Attribution** | 10/10 | Perfect attribution. Billable hours at $500-1000/hr. Time saved = dollars earned. One recovered hour per day per partner = $125K-250K/year per partner. |
| **Pattern Repetition** | 10/10 | Daily scheduling decisions. Client meetings, internal check-ins, court dates, depositions. Patterns repeat across similar case types and client categories. |
| **Feedback Loop Speed** | 9/10 | Immediate feedback within hours. Did the schedule work? Were conflicts avoided? Was focus time protected? Clear success/failure signals same day. |
| **Use Case Infrastructure** | 10/10 | Legal assistants, practice managers, intake coordinators actively manage partner calendars today. Clear manual workflow to learn from and eventually augment. |
| **Integration Complexity** | 7/10 | Standard calendars (Google/Outlook) are easy. Practice management systems (Clio, MyCase) have calendar integration but require additional API work. Moderate complexity. |
| **Existing Workflow Disruption** | 7/10 | Fits existing workflow (they already manually optimize). Some adjustment needed for AI suggestions. Cultural shift from assistant-managed to AI-assisted may require change management. |

**Why #1**: Perfect business fundamentals (volume, attribution) + excellent learning characteristics + established infrastructure. The billable hour model creates unambiguous ROI. High partner meeting density provides massive data volume for learning. Clear path from individual value (partner productivity) to org-level intelligence (firm priorities revealed through time allocation).

**Key Advantage**: Billable hours make this the clearest possible business case. Every minute saved is directly measurable revenue. Pricing ceiling is high ($75-150/user vs. $20 for horizontal tools).

**Primary Risk**: Practice management systems (Clio, MyCase) may extend into calendar optimization, creating competitive pressure. Mitigation: Focus on intelligence layer they can't replicate.

---

#### Rank #2: Time & Calendar × Technology & SaaS
**Total Score: 60/70**

| Parameter | Score | Reasoning |
|-----------|-------|-----------|
| **High Use Case Volume** | 8/10 | Execs/PMs: 15-25 meetings/week. Engineers: 5-10 meetings/week. High volume for leadership, moderate for individual contributors. Good data generation but less universal than law firms. |
| **Direct Business Metric Attribution** | 7/10 | Indirect but real. Executive time is valuable (focus time → strategic work → company outcomes) but harder to measure than billable hours. Can track meeting cost, but outcome attribution requires proxies. |
| **Pattern Repetition** | 9/10 | Daily scheduling across sprints, standups, 1-on-1s, planning sessions. Clear patterns in product/engineering cycles. Recurring meeting structures. |
| **Feedback Loop Speed** | 9/10 | Very fast. Engineering culture provides explicit feedback. "This meeting was useful/not useful" is normal conversation. Async-first culture creates documented preferences. |
| **Use Case Infrastructure** | 7/10 | Execs have EAs at larger companies (Series B+), but not universal. Many people self-manage calendars with ad-hoc optimization. Weaker infrastructure than professional services but still observable. |
| **Integration Complexity** | 10/10 | Easiest possible. Google Workspace dominance. Modern API-first tooling (Slack, Linear, Notion). Digital-first culture means seamless integration. No proprietary systems. |
| **Existing Workflow Disruption** | 10/10 | Perfect fit. Tech culture embraces automation. Already use scheduling tools (Calendly, etc.). AI calendar optimization is culturally expected, not resisted. Zero behavior change required. |

**Why #2**: Strongest integration story and cultural fit. While business attribution is less direct than law firms, go-to-market efficiency is exceptional. Tech companies are early adopters who will evangelize if product works.

**Key Advantage**: Fastest path to product-market fit. Digital-native culture, lowest friction adoption, vocal community for word-of-mouth growth.

**Primary Risk**: Lower pricing ceiling ($20-30/user) limits revenue per customer. Meeting volume for engineers is lower, reducing value perception for majority of users. Must demonstrate executive/PM value clearly.

---

#### Rank #3: Project & Priority × Professional Services
**Total Score: 60/70**

| Parameter | Score | Reasoning |
|-----------|-------|-----------|
| **High Use Case Volume** | 9/10 | Every case is a project. Firms manage 50-200+ active cases simultaneously. Daily priority decisions: which cases get attention today? Continuous task/milestone tracking. |
| **Direct Business Metric Attribution** | 9/10 | Strong attribution. Cases have clear outcomes (won/lost, settled, completed). Case profitability tracked (hours spent vs. revenue). Project velocity impacts billing and client satisfaction. |
| **Pattern Repetition** | 9/10 | Case types repeat (divorce, contract disputes, estate planning). Similar workflows within practice areas. Task dependencies similar across cases of same type. |
| **Feedback Loop Speed** | 7/10 | Medium-term feedback. Weekly/monthly case progress visible, but full case outcomes take months. Faster feedback on task completion, slower on strategic prioritization quality. |
| **Use Case Infrastructure** | 10/10 | Case managers, paralegals, practice managers actively manage project workflows. Clear manual processes: intake → assignment → milestone tracking → closeout. Established role to learn from. |
| **Integration Complexity** | 6/10 | Practice management systems (Clio, MyCase, Smokeball) ARE the project management layer. Must integrate directly with these vertical-specific tools, not generic PM tools. Moderate-high complexity. |
| **Existing Workflow Disruption** | 10/10 | Perfect fit. Firms already track cases as projects. Adding intelligence layer to existing practice management enhances rather than replaces current workflow. Natural extension of what they do. |

**Why #3**: Excellent business fundamentals with very strong infrastructure. Case-based model in law firms is essentially project-based work. Clear manual workflows to learn from (case managers, paralegals).

**Key Advantage**: Combines well with Time & Calendar. Scheduling + Project Management together reveal firm priorities and resource allocation. Natural product bundle.

**Primary Risk**: Practice management systems (Clio, MyCase) are evolving into this space. They own the data and relationship. May need to partner rather than compete, or differentiate through superior intelligence.

---

### Tier 2: Strong Combinations (50-59 / 70)

#### Rank #4: Project & Priority × Technology & SaaS
**Total Score: 58/70**

| Parameter | Score | Reasoning |
|-----------|-------|-----------|
| **High Use Case Volume** | 8/10 | Continuous project work. Sprint planning, feature development, roadmap management. Multiple concurrent projects typical. Good volume across engineering, product, operations. |
| **Direct Business Metric Attribution** | 7/10 | Moderate attribution. Delivery velocity visible (sprint velocity, feature completion), but connecting prioritization quality to business outcomes requires proxies. Revenue attribution harder than law firms. |
| **Pattern Repetition** | 8/10 | Sprint cycles repeat. Feature development patterns similar. Clear project structures (epics → stories → tasks). Recurring planning/review ceremonies create learnable patterns. |
| **Feedback Loop Speed** | 8/10 | Fast feedback. Sprint retros provide explicit feedback on prioritization quality. Agile culture means continuous refinement. Faster than most industries. |
| **Use Case Infrastructure** | 7/10 | Project managers, product managers own this function. Clear roles but processes vary widely by company. Some companies highly structured (Jira workflows), others ad-hoc (Notion docs). |
| **Integration Complexity** | 10/10 | Excellent. Standard tools (Jira, Linear, Asana, GitHub Projects) with robust APIs. Tech companies comfortable with tool integration. No proprietary barriers. |
| **Existing Workflow Disruption** | 10/10 | Fits perfectly. Companies already use project management tools. Intelligence layer adds value without changing core workflow. Tech culture embraces AI-powered prioritization assistance. |

**Why #4**: Very strong technical fit with excellent integration and cultural alignment. Slightly lower business attribution than professional services, but still compelling.

**Key Advantage**: Combines extremely well with Calendar. Time allocation + Project tracking = complete picture of execution vs. stated priorities. Natural product bundle for Phase 3 strategy-execution gap detection.

**Primary Risk**: Crowded competitive landscape (Jira, Linear, Asana, Monday are well-established). Differentiation requires vertical-specific intelligence or cross-primitive synthesis that competitors can't match.

---

#### Rank #5: Meeting & Conversation × Professional Services
**Total Score: 55/70**

| Parameter | Score | Reasoning |
|-----------|-------|-----------|
| **High Use Case Volume** | 10/10 | 25-30+ meetings/week for partners. Client meetings, depositions, court appearances, internal case discussions. Massive volume of strategic conversations. |
| **Direct Business Metric Attribution** | 8/10 | Strong but indirect. Meeting time is billable, but conversation intelligence value is in knowledge capture, not time saved. Client intelligence and case insights have clear value but harder to quantify. |
| **Pattern Repetition** | 8/10 | Client meeting patterns repeat by case type. Internal discussions follow similar structures. Consultation patterns similar across clients with similar issues. |
| **Feedback Loop Speed** | 7/10 | Medium feedback. Immediate utility for summaries/action items, but strategic value (knowledge reuse, client intelligence) manifests over weeks/months. |
| **Use Case Infrastructure** | 9/10 | Associates take meeting notes, document client conversations, prepare case summaries. Clear manual process that AI can augment. Established workflow for capturing meeting outcomes. |
| **Integration Complexity** | 5/10 | Moderate-difficult. Requires meeting platform integration (Zoom, Teams) + recording consent + practice management integration to link meetings to cases. Client confidentiality adds compliance layer. |
| **Existing Workflow Disruption** | 8/10 | Mostly fits. They already take notes and document conversations. Resistance may come from: (1) recording client meetings (confidentiality concerns), (2) cultural comfort with AI processing sensitive discussions. |

**Why #5**: Excellent volume and infrastructure, but integration challenges and adoption friction (recording consent, confidentiality) create barriers. Higher strategic value but harder to deploy than Calendar.

**Key Advantage**: Captures highest strategic signal. Client conversations contain explicit strategy, decision rationale, constraints. Natural complement to Calendar (Product 4-5 after establishing trust).

**Primary Risk**: Client confidentiality concerns may limit adoption. Recording consent friction. May require waiting until firm trusts you (after Calendar + Projects) before gaining access to strategic conversations.

---

#### Rank #6: Time & Calendar × Financial Services
**Total Score: 54/70**

| Parameter | Score | Reasoning |
|-----------|-------|-----------|
| **High Use Case Volume** | 9/10 | Wealth advisors: 20-30 client meetings/week. Financial planners similar density. High volume of client-facing time. Internal meetings add to density. |
| **Direct Business Metric Attribution** | 9/10 | Strong attribution. Client meeting time drives AUM growth and retention. Time optimized for client relationships has clear revenue impact. Similar to law firm model. |
| **Pattern Repetition** | 9/10 | Client meeting patterns repeat. Review meetings, planning sessions, onboarding follow similar structures. Portfolio reviews quarterly. Clear cycles. |
| **Feedback Loop Speed** | 8/10 | Good feedback. Schedule quality visible within days. Client satisfaction visible within weeks. Relationship outcomes visible quarterly. |
| **Use Case Infrastructure** | 8/10 | Advisors often have support staff managing calendars, especially at larger firms. Solo advisors self-manage. Infrastructure varies by firm size but exists. |
| **Integration Complexity** | 4/10 | **Major barrier**. Many firms use proprietary portfolio management systems with integrated calendars. Some use standard Google/Outlook, others locked into vertical-specific tools. Compliance requirements add integration complexity. |
| **Existing Workflow Disruption** | 7/10 | Fits existing workflow but regulatory concerns create friction. Client meeting scheduling is critical relationship management. Some resistance to AI managing client relationships initially. |

**Why #6**: Excellent business fundamentals (volume, attribution) similar to Professional Services, but **integration complexity and regulatory friction** create significant barriers. Strong combination if you can overcome integration challenges.

**Key Challenge**: Integration complexity with proprietary systems + regulatory compliance (SEC, finra) means longer deployment cycles and higher support burden. Slows learning loops.

**Viability Path**: Target independent RIAs using standard tools (Google Calendar, simpler CRM systems) rather than large firms with complex proprietary systems. Smaller addressable market but more accessible.

---

#### Rank #7: Project & Priority × Financial Services
**Total Score: 52/70**

| Parameter | Score | Reasoning |
|-----------|-------|-----------|
| **High Use Case Volume** | 8/10 | Client relationships are projects (onboarding, planning, reviews). Portfolio management tasks. Compliance projects. Moderate-high volume of project-like work. |
| **Direct Business Metric Attribution** | 8/10 | Client outcomes visible (portfolio performance, retention, AUM growth). Project velocity impacts service quality and capacity for new clients. |
| **Pattern Repetition** | 8/10 | Client lifecycle repeats: onboarding → planning → quarterly reviews → ongoing management. Financial planning workflows similar across clients. |
| **Feedback Loop Speed** | 6/10 | Slower feedback. Client relationship outcomes visible quarterly or annually. Portfolio performance lags decisions. Longer cycle than other verticals. |
| **Use Case Infrastructure** | 7/10 | Client service teams, advisors manage client workflows. Process exists but may be less formalized than law firm case management. Varies by firm sophistication. |
| **Integration Complexity** | 5/10 | Must integrate with portfolio management systems, CRM (often Salesforce), compliance tools. Moderate complexity with multiple systems. Regulatory reporting adds constraints. |
| **Existing Workflow Disruption** | 10/10 | Fits well. Client lifecycle management already structured. Intelligence layer enhances without replacing. Financial services embraces tools for client management efficiency. |

**Why #7**: Good fundamentals but **slower feedback loops and integration complexity** make it less attractive than Professional Services or Tech/SaaS for same use case.

**Key Challenge**: Client relationship outcomes are longer-term. Harder to demonstrate fast ROI compared to law firm billable hours or tech company sprint velocity.

---

### Tier 3: Moderate Combinations (40-49 / 70)

#### Rank #8: Meeting & Conversation × Technology & SaaS
**Total Score: 49/70**

| Parameter | Score | Reasoning |
|-----------|-------|-----------|
| **High Use Case Volume** | 7/10 | Moderate volume. Execs/PMs: 15-25 meetings/week (high). Engineers: 5-10 meetings/week (low). Average across company is moderate. Less universal value than law firms. |
| **Direct Business Metric Attribution** | 5/10 | Weak attribution. Meeting intelligence value is in knowledge capture and alignment, but hard to connect to revenue/outcomes. "Better meetings" is abstract value. |
| **Pattern Repetition** | 8/10 | Sprint ceremonies repeat (standups, planning, retros). Product discussions follow patterns. Customer calls have structure. Good pattern repetition. |
| **Feedback Loop Speed** | 9/10 | Very fast. Engineering culture provides explicit feedback. Async documentation culture means written feedback on meeting summaries. Quick iteration. |
| **Use Case Infrastructure** | 5/10 | Weak infrastructure. Most people take their own notes ad-hoc. Some companies have notetakers for important meetings, but not systematic. Harder to learn from established process. |
| **Integration Complexity** | 10/10 | Easy integration. Zoom/Google Meet APIs straightforward. Modern tool stack makes connection to other systems seamless. |
| **Existing Workflow Disruption** | 5/10 | **Mixed**. Tech culture embraces tools, but recording meetings may face resistance (some companies have async/no-meeting culture). Consent friction for recording. "Meeting culture" varies widely by company stage. |

**Why #8**: **Weakest business attribution** of all combinations. Meeting volume for engineers is low, and value proposition is abstract. Integration is easy, but unclear if people will pay premium for meeting intelligence when meeting volume is deliberately kept low.

**Key Challenge**: Tech companies often have anti-meeting culture. "Fewer meetings" is the goal, not "better meetings." Value proposition misaligned with cultural values.

**Positioning Question**: Is the value for executives/leadership only (higher meeting volume) or company-wide? If leadership-only, limited TAM within each customer.

---

#### Rank #9: Meeting & Conversation × Financial Services
**Total Score: 45/70**

| Parameter | Score | Reasoning |
|-----------|-------|-----------|
| **High Use Case Volume** | 9/10 | High client meeting volume. Advisors meet with clients constantly. Internal meetings for portfolio reviews, compliance discussions. Strong volume. |
| **Direct Business Metric Attribution** | 7/10 | Moderate attribution. Client conversation intelligence impacts relationship quality and compliance, but indirect path to revenue. Compliance documentation has clear value (regulatory requirement). |
| **Pattern Repetition** | 8/10 | Client meeting patterns repeat. Portfolio reviews, planning discussions follow structure. Compliance conversations repeat patterns. |
| **Feedback Loop Speed** | 6/10 | Slower feedback. Client relationship impact visible over quarters. Compliance value immediate but narrow. |
| **Use Case Infrastructure** | 7/10 | Advisors document client conversations for compliance. Manual note-taking is standard practice. Clear workflow to augment. |
| **Integration Complexity** | 3/10 | **Major barrier**. Client confidentiality + regulatory requirements (SEC record-keeping) + proprietary CRM systems create complex integration and compliance challenges. Recording client conversations may require additional regulatory approvals. |
| **Existing Workflow Disruption** | 5/10 | **High friction**. Client confidentiality and regulatory concerns create resistance to AI processing client conversations. Compliance department involvement required. Cultural resistance to recorded client meetings. |

**Why #9**: **Worst integration complexity + adoption friction** of all combinations. Regulatory requirements (SEC, FINRA) around client conversations create significant barriers. Even if technically feasible, cultural and compliance concerns may block adoption.

**Key Challenge**: Financial services has strict requirements around client communication recording and retention. AI processing of client conversations may trigger additional regulatory review. Compliance teams risk-averse.

**Viability Assessment**: Likely **not viable** as first product. Perhaps viable later after establishing trust with less sensitive use cases (Calendar, Projects first).

---

## Summary: Top 5 Combinations for First Product

| Rank | Combination | Score | Primary Strength | Primary Risk |
|------|-------------|-------|------------------|--------------|
| **1** | **Time & Calendar × Professional Services** | 63/70 | Perfect business attribution (billable hours), massive volume | Practice mgmt systems may compete |
| **2** | **Time & Calendar × Technology & SaaS** | 60/70 | Easiest go-to-market, cultural fit, fastest adoption | Lower pricing ceiling, value less clear |
| **3** | **Project & Priority × Professional Services** | 60/70 | Strong attribution, excellent infrastructure | Must integrate with practice mgmt systems |
| **4** | **Project & Priority × Technology & SaaS** | 58/70 | Clean integration, good feedback loops | Crowded competitive landscape |
| **5** | **Meeting & Conversation × Professional Services** | 55/70 | Highest strategic signal capture | Confidentiality concerns, recording friction |

---

## Strategic Recommendations

### Recommendation 1: Start with Calendar × Professional Services

**Why**: Highest score (63/70) with perfect business fundamentals. Billable hours create unambiguous ROI. High partner meeting density provides massive learning data. Clear path from individual value to organizational intelligence.

**Path to Phase 3**: Calendar reveals time allocation patterns → shows firm priorities → enables resource optimization → foundation for strategic planning intelligence.

**Product Sequence**: 
- Product 1: Calendar (this)
- Product 2: Project Management (case management intelligence)
- Product 3: Meeting Intelligence (after trust established)
- Product 4+: Resource allocation, strategic artifacts synthesis

### Recommendation 2: Tech/SaaS as Fast Follower

**Why**: Score nearly identical to Professional Services (60/70) but with easiest go-to-market. Use Tech/SaaS as **validation vertical** after proving Professional Services, or as **alternative if Professional Services proves challenging**.

**Advantage**: Tech companies are vocal early adopters. Success creates evangelism and word-of-mouth growth. Fastest path to product-market fit demonstration.

**Trade-off**: Lower revenue per customer, but faster scaling and easier expansion to adjacent verticals (consulting, agencies).

### Recommendation 3: Avoid Financial Services as Entry Point

**Why**: While fundamentals are strong, **integration complexity (ranks 4/10, 5/10, 3/10 across combinations) and regulatory friction create severe barriers**. Every combination with Financial Services scores bottom-half.

**Better Approach**: Target Financial Services as **Year 2-3 vertical** after proving product in Professional Services or Tech/SaaS and building compliance infrastructure.

### Recommendation 4: Meeting Intelligence as Product 3-4, Not Product 1

**Why**: Even best combination (Meeting × Professional Services, rank #5) scores lower than Calendar or Projects in same vertical due to **adoption friction (recording consent, confidentiality concerns)**.

**Better Approach**: Use Meeting Intelligence as **synthesis multiplier** after establishing trust through Calendar and Projects. By Product 3-4, you have organizational relationship that justifies access to strategic conversations.

---

## Key Insights from Combination Analysis

### Insight 1: Billable Hours is a Cheat Code
Professional Services combinations consistently outscore Tech/SaaS on business attribution because **billable hours create perfect ROI measurement**. Time saved = dollars earned. This eliminates the hardest part of B2B sales (proving value).

### Insight 2: Integration Complexity Kills Financial Services
Despite excellent business fundamentals (volume, attribution, patterns), Financial Services scores consistently lower due to **proprietary systems and regulatory friction**. Integration complexity (3-5/10) creates deployment delays that slow learning loops—the opposite of what Phase 1-2 strategy requires.

### Insight 3: Use Case Infrastructure Matters More Than Expected
Combinations with clear manual roles (legal assistants, case managers, project managers) score 9-10/10 on infrastructure. This isn't just about GTM—it's about **having expert humans to learn from during Phase 2 development**. The manual role becomes your training data source.

### Insight 4: Calendar Beats Projects as First Product
Across all three verticals, **Time & Calendar outscores Project & Priority**:
- Calendar × Professional Services: 63 vs 60
- Calendar × Tech/SaaS: 60 vs 58
- Calendar × Financial Services: 54 vs 52

Why? Higher volume (daily vs. weekly), faster feedback loops (hours vs. days), simpler integration (one calendar vs. multiple project systems), clearer business metric attribution (time is universal, project value varies).

### Insight 5: The "Cultural Fit" Factor
Tech/SaaS combinations have perfect 10/10 scores on "Existing Workflow Disruption" across all use cases. Professional Services typically scores 7-10/10. Financial Services scores 5-7/10. **Cultural openness to AI tools is a hidden advantage** that shows up in adoption speed and friction.

---

## Final Verdict: First Product Selection

**Recommended First Product**: **Time & Calendar Management for Professional Services (Law Firms)**

**Score**: 63/70 (highest of all 9 combinations)

**Why this wins**:
1. ✓ Perfect business attribution (billable hours = clear ROI)
2. ✓ Highest use case volume (25-30+ meetings/week per partner)
3. ✓ Established infrastructure to learn from (legal assistants manage calendars today)
4. ✓ Clear path to organizational intelligence (time allocation reveals firm priorities)
5. ✓ Premium pricing viable ($75-150/user vs. $20 horizontal market)
6. ✓ Natural progression to Products 2-3 (project management, meeting intelligence)

**Alternative/Validation Market**: Time & Calendar Management for Tech/SaaS Companies (score 60/70, easier go-to-market)

**Next Steps**: 
1. Deep customer research with law firms (20-200 person firms)
2. Competitive analysis (Reclaim.ai, Motion, Clockwise horizontally; Clio, MyCase practice mgmt)
3. Validate billable hour attribution hypothesis
4. Design calendar intelligence specific to legal workflows
5. Build synthesis architecture from day one (calendar is data input to Phase 3 intelligence)

