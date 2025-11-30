# Scheduling-Specific Competitor Deep-Dive

## Purpose
Lightweight competitive analysis workflow for scheduling products, optimized for manual Perplexity UI research. Focuses on scheduling-specific dimensions tailored to law firm calendar intelligence problems.

## Context
This workflow is an alternative to **3-competitor-deepdive-workflow.md** when:
- You want to minimize token costs by running research in Perplexity UI instead of Cursor
- You're specifically analyzing scheduling competitors
- You need tailored dimensions that map to your scheduling problems hypothesis

**Design Philosophy:**
This workflow prioritizes **fact discipline over polish**. The output is a canonical source of truth organized by product primitives (mechanisms, scopes, controls), with clear separation of marketing claims vs. user-reported reality. Simple, open-ended queries reduce hallucination risk. Executive summaries or comparison tables should be generated separately after verifying the base facts.

## Prerequisites
- [ ] List of competitors to analyze (from landscape analysis or direct selection)
- [ ] Access to Perplexity Pro (for research)
- [ ] Access to Claude Pro (for analysis and structuring)
- [ ] Reference: `5_calendar-law-firms/product/1_scheduling-problems-hypothesis.md`

## Target Output
- [ ] Individual markdown files: `deepdive-[competitor-name].md`
- [ ] One file per competitor with structured findings
- [ ] Saved in: `5_calendar-law-firms/competition/deepdives/` (or your chosen folder)

---

## Workflow (2-Step Process)

**Per Competitor:**
- **Step 1:** Run Perplexity query → get raw research (7-10 min, ~$1.30)
- **Step 2:** Copy complete Claude prompt → paste Perplexity output → get structured deepdive (5-7 min, uses Claude Pro quota)

**Total per competitor:** ~15-20 minutes, ~$1.30 Perplexity cost  
**For 8 competitors:** ~2.5 hours total, ~$10.40 Perplexity cost

**Token economics:**
- Perplexity research: ~10-12K words output per competitor
- Claude analysis: ~10K input + ~5K output per competitor (uses Claude Pro quota, not Cursor)
- **Cursor usage: 0 tokens** ✅

---

## Step 1: Perplexity Query Template

Copy this query, replace `[Competitor Name]`, and paste into Perplexity:

```
[Competitor Name] competitive deep-dive for scheduling product:

COMPANY BASICS:
- Founding date, funding raised, current stage
- Core value proposition and target job-to-be-done
- Target customer (SMB/enterprise, horizontal/vertical-specific)
- GTM motion (product-led/sales-led), pricing tiers

SCHEDULING PRODUCT FOCUS:
- What scheduling problems do they claim to solve? (cite marketing/positioning)
- What scheduling problems do users report they solve? (G2, Capterra, Reddit reviews)
- Scheduling scope: external/internal clients? 1:1 or group? New or existing clients?
- Scheduling mechanism: booking page, AI agent, email-based, or other?
- Rescheduling/cascade handling capabilities

AI & AUTOMATION:
- What AI capabilities do they claim? (marketing)
- What AI capabilities do users report? (reviews - does it learn over time?)
- Autonomy level: fully automated or human-in-loop?
- Observable personalization features (preferences, settings, context awareness)

INTEGRATION & DEPTH:
- How embedded in workflow? (daily-use tool vs. occasional booking)
- Integrations beyond calendar (email, CRM, meeting tools)
- Setup complexity and time-to-value (from reviews)
- User comments on replaceability/switching (review analysis)

BRAND & POSITIONING:
- Main selling point and brand emphasis
- Notable product offerings beyond scheduling

Focus on observable evidence. Cite sources. Bullet points preferred.
```

---

## Step 2: Analyze and Structure Using Claude

**Time:** ~5-7 minutes per competitor  
**Cost:** Uses Claude Pro quota (not Cursor tokens)

### Complete Claude Prompt (Ready to Copy-Paste)

Copy the entire prompt below into Claude.ai (claude.ai), then paste Perplexity's output where indicated:

```
I ran competitive research on a scheduling product competitor. Please analyze the research below and structure it into our deepdive template format.

CONTEXT:
I'm building calendar intelligence for law firms and analyzing scheduling competitors. My priority focus areas are:
1. SCHEDULING PRODUCT capabilities (problems solved, mechanisms, rescheduling)
2. AI & AUTOMATION depth (learning, personalization, autonomy)
3. INTEGRATION & DEPTH (workflow embedding, switching costs, setup)

FACT DISCIPLINE REQUIREMENTS:
- Clearly separate "marketing claims" vs "user-reported reality" vs "inference"
- Flag any numbers or claims you couldn't verify (note: "needs verification")
- When user reviews contradict marketing claims, highlight the gap
- Do NOT make confident assertions about AI/ML/LLM technology unless explicitly stated in sources
- Use hedging language when appropriate ("appears to", "likely", "unclear from sources")
- If data is missing or ambiguous, say so explicitly

TASK:
Analyze the Perplexity research below and produce a structured competitive deepdive using the Output Structure Template provided at the end. 

**OUTPUT IN MARKDOWN FORMAT** - your entire response should be properly formatted markdown that can be saved directly as a .md file.

STRUCTURE GUIDELINES:
- For "Scheduling Problems Addressed" section, assess each of these 4 problems:
  1. Coordination errors in scheduling
  2. Multi-party meeting coordination speed
  3. Schedule change cascades (rescheduling automation)
  4. Reducing manual scheduling work
- Mark each as: Core Focus / Addressed / Not Addressed / Unclear (with evidence)
- Organize by product primitives: meeting types, mechanisms, controls, autonomy model, integrations
- In "AI Capabilities" section, separate marketing claims from user-reported reality
- In "Integration Depth" section, focus on workflow embedding level and switching friction
- Include Business Analysis Scoring (1-5 on each dimension with evidence)
- Write Strategic Analysis as coherent narrative (5-8 sentences)
- Cite sources throughout with [URLs] or [Source: G2 reviews]

CRITICAL: Stay grounded in observable evidence. This is the canonical source of truth, not an exec summary.

---

PERPLEXITY RESEARCH OUTPUT:
Copied in a separate copy-paste

---

OUTPUT STRUCTURE TEMPLATE:

# [Competitor Name] — Scheduling Deep-Dive

**Website:** [URL]
**Last Updated:** [Date]
**Research Method:** Perplexity UI Research

---

## Overview

**Founding & Stage:**
- Founding date: [date]
- Funding raised: [amount]
- Current stage: [Beta/GA/Scaling/Mature]

**Core Offering:**
- Value proposition: [1-2 sentences]
- Main job-to-be-done: [what problem they solve]

---

## Problems/Usecases in Focus

What they claim vs. what users report solving:

### 1. Coordination errors in scheduling
- **Status:** [Core Focus / Addressed / Not Addressed / Unclear]
- **Evidence:** [cite marketing claims and/or user review quotes with sources]

### 2. Multi-party meeting coordination speed
- **Status:** [Core Focus / Addressed / Not Addressed / Unclear]
- **Evidence:** [features mentioned, time savings reported - cite sources]

### 3. Schedule change cascades (rescheduling automation)
- **Status:** [Core Focus / Addressed / Not Addressed / Unclear]
- **Evidence:** [cascade/rescheduling features and capabilities - cite sources]

### 4. Reducing manual scheduling work
- **Status:** [Core Focus / Addressed / Not Addressed / Unclear]
- **Evidence:** [automation level, autonomy, time savings - cite sources]

---

## Business/GTM

**Target Audience:**
- Buyer profile: [Individual/Team/Company - who pays?]
- User profile: [Same as buyer or different?]
- Market focus: [Horizontal or vertical-specific?]

**Go-to-Market:**
- GTM motion: [Product-led growth / Sales-led / Hybrid]
- Pricing tiers: [Number of tiers, price range with actual amounts if available]
- Pricing philosophy: [Seat-based, usage-based, value-based]

**Positioning:**
- Main selling point: [how they position themselves]
- Brand emphasis: [what they emphasize in messaging]

**Sources:** [list]

---

## Scheduling Offering (Product Primitives)

**Scheduling Scope:**
- External vs. Internal clients: [Both/External/Internal]
- Meeting types: [1:1 / Group / Both]
- Client types: [New clients / Existing clients / Both]

**Scheduling Mechanism:**
- Primary model: [Booking page (Calendly-style) / AI agent (PA-style) / Email-based / Hybrid / Other]
- How it works: [brief description of mechanism]
- Rescheduling/cascade handling: [Yes/No/Limited - describe capabilities and controls]

**Scheduling Mediums:**
- Available through: [UI / Email / Messaging / Other]

**Core Features:**
- [List key scheduling features organized by category/primitive]

**Integrations:**
- Calendar platforms: [which calendars]
- Beyond calendar: [email, CRM, meeting tools, messaging platforms]

**Sources:** [list]

---

## Product Quality (from User Reviews)

**Product Strengths:**
- [What do users consistently praise? Quote specific feedback]
- [What does it do exceptionally well based on reviews?]

**Product Weaknesses:**
- [What do users consistently complain about? Quote specific feedback]
- [Common limitations or pain points mentioned in reviews?]

**Unique Product Approach:**
- [What makes their product philosophy or approach distinct?]
- [How do they think differently about the scheduling problem?]

**Sources:** [G2, Capterra, Reddit links]

---

## AI Capabilities (Observable Evidence)

**Marketing Claims:**
- [What AI capabilities do they claim in marketing materials?]
- [Specific features or technology mentioned]

**User-Reported Reality:**
- [What do users actually report about AI performance?]
- [Do users mention learning/personalization? Include quotes if available]
- [Any gaps between claims and reality?]

**Personalization & Learning:**
- Preference settings: [What preferences can users configure?]
- Learning over time: [Do users report it learns their patterns? Evidence]
- Context awareness: [Basic slot-finding / Preference-aware / Context-aware - evidence]

**Autonomy Model:**
- Human-in-loop: [Requires confirmation / Semi-autonomous / Fully autonomous]
- Control surfaces: [What controls do users have? Override mechanisms?]
- Evidence: [from product descriptions and user workflows]

**NOTE:** Flag any uncertain technical claims with [NEEDS VERIFICATION]

**Sources:** [list]

---

## Integration Depth

**Workflow Embedding:**
- Classification: [Bolt-on tool / Daily-use embedded / Infrastructure layer]
- Evidence: [How do users describe their usage patterns? Quotes]

**Setup & Time-to-Value:**
- Setup complexity: [Simple / Moderate / Complex]
- Time to first value: [from reviews - minutes/hours/days]
- Configuration required: [Out-of-box / Preferences needed / Extensive setup]

**Switching Friction:**
- User comments on replaceability: [Easy to replace / Moderate friction / High switching cost]
- Lock-in mechanisms: [What creates stickiness? Integration dependencies?]
- Evidence: [review quotes about switching, leaving, or lock-in]

**Sources:** [list]

---

## Additional Product Offerings

**Beyond Scheduling:**
- [List main features/surfaces beyond core scheduling]

---

## Business Analysis Scoring

Score this competitor 1–5 on each dimension:

**Product Strength (1–5):** [score]
- *Definition: Feature quality, UX, user satisfaction*
- *Evidence:* [1–2 sentences from reviews and product analysis]

**Market Momentum (1–5):** [score]
- *Definition: Company growth signals, funding, market traction*
- *Evidence:* [1–2 sentences on funding, customer metrics, growth signals]

**GTM Effectiveness (1–5):** [score]
- *Definition: Repeatable acquisition motion, efficient distribution*
- *Evidence:* [1–2 sentences on their distribution and acquisition]

**Moat Depth (1–5):** [score]
- *Definition: Data, integration lock-in, switching costs that compound*
- *Evidence:* [1–2 sentences on switching costs and replaceability]

**Threat Relevance (1–5):** [score]
- *Definition: Overlap with law firm scheduling problems and target customers*
- *Evidence:* [1–2 sentences on overlap with your focus problems]

**Overall Business Score:** [average of 5 scores]

---

## Strategic Analysis

**Narrative synthesis (5–8 sentences):**

Answer these strategic questions:
- **Where are they headed?** [Direction signals from trajectory and positioning]
- **What makes them strong?** [Core competitive advantages vs alternatives]
- **Where are they vulnerable?** [Gaps, weaknesses, exposed positions]
- **Why do they matter to us?** [Threat level and competitive overlap with law firm scheduling]

[Write as coherent narrative connecting the dots across all research. This is synthesis and interpretation grounded in evidence above, not new facts.]

---

## Sources Summary

**Primary Sources:**
- Company website: [URL]
- Pricing page: [URL]
- User reviews: [G2, Capterra, Reddit URLs]
- Product documentation: [URLs if applicable]
- Other: [additional sources used]

---

## Fact Check Notes

[List any claims, numbers, or statements that need verification or where sources were unclear]
```

**Instructions:**
1. Copy the entire prompt above (everything between the triple backticks)
2. Paste into Claude.ai (claude.ai)
3. At `[Paste Perplexity's full output here]`, paste your Perplexity research output
4. Submit to Claude and wait for structured output (~5-7 min)
5. Review output for hallucinations or unverified claims
6. Copy Claude's response and save as `deepdive-[competitor-name].md`

---

## Success Criteria

- Observable evidence cited for each claim
- Clear distinction between marketing claims and user-reported reality
- Actionable insights on scheduling-specific dimensions
- Maps back to your scheduling problems hypothesis
- Cost-efficient: ~$1.30 per competitor in Perplexity costs
- Time-efficient: ~15-20 minutes total per competitor (research + documentation)

---

## Notes

**Why This Workflow:**
- **Token efficient:** 0 Cursor tokens used (Perplexity + Claude only)
- **Cost efficient:** ~$1.30 per competitor (Perplexity only, Claude uses Pro quota)
- **Fact discipline:** Simple query reduces hallucination risk vs. over-specified prompts

**Fact Discipline Philosophy:**
- This deepdive is your **canonical source of truth**, not an exec summary
- Simple, open-ended Perplexity queries → better hedging and fewer hallucinations
- Natural "claims vs users report" structure → built-in fact checking
- Claude adds structure without injecting new "facts"
- Flag uncertain claims with [NEEDS VERIFICATION] for follow-up

**What's Observable vs. Not:**
- ✅ Marketing claims, user reviews, visible features, pricing
- ✅ Target audience, GTM signals, integration lists, setup processes
- ✅ User-reported strengths/weaknesses with quotes
- ⚠️ AI/ML technology specifics (unless explicitly stated by company)
- ❌ Internal metrics (unless publicly disclosed)
- ❌ Actual time saved (without verified user data)
- ❌ Internal product roadmaps (unless publicly shared)

**Quality Principles:**
- Organize by product primitives (mechanisms, scopes, controls, autonomy, integrations)
- Separate marketing claims from user-reported reality
- Include source citations throughout
- Highlight gaps between claims and reality
- Use hedging language when appropriate ("appears to", "likely", "unclear")
- The goal: reusable standard for future analysis with minimal hallucination risk

**If You Need Executive Summary:**
- Generate it separately AFTER verifying the deepdive facts
- Never let summary-style confident assertions contaminate the canonical deepdive
- Comparison tables should include source/confidence columns

