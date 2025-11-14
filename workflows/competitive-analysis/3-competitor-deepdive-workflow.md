# Competitor Deep-Dive Workflow

## Purpose
Operational workflow to conduct deep competitive analysis on selected competitors and produce individual research files using Perplexity MCP.

## Prerequisites & Inputs
**Required:**
- [ ] Competitive landscape file from **1-landscape-workflow.md** OR
- [ ] Market viability analysis from **2-market-viability-workflow.md**
- [ ] File path: _______
- [ ] File contains: List of competitors to deepdive (typically top 3-5 most threatening)

**User Specifies:**
- [ ] Which competitors to analyze (typically 5–10 based on scores 4–5): _______
- [ ] Target folder path for deepdive files: _______

**This Workflow Will Produce:**
- [ ] Individual files: `deepdive-[company-name].md` (one per competitor)
- [ ] Each file contains: 7 core sections + 5-dimension scoring + strategic analysis
- [ ] All files saved in specified folder: _______

## Tools
**This workflow requires Firecrawl MCP, Claude Haiku API, and Perplexity MCP.**

**Required:**
* `firecrawl_scrape` - Automated website content extraction
* Claude Haiku API - Structured fact extraction from markdown
* `perplexity_research` - Comprehensive intelligence synthesis

## Goal
Deep competitive intelligence on selected competitors, with each competitor documented in a dedicated markdown file for easy reference and comparison.

These deepdive files serve as inputs for **4-competitive-positioning-workflow.md** to create unified strategic analysis.

## Chat Management

**Start a fresh conversation for each competitor deepdive.**

* Verify clean chat before starting
* If conversation contains previous competitor research, start new chat
* Each competitor deepdive consumes ~13% of monthly Cursor token budget

## Workflow (gated for setup, continuous during research)

### Step 1: Input Review
* You read the competitive landscape file from the previous workflow
* Extract context (search map, value props, use cases)
* Review the full competitor list and scores
* Present summary to user

**Gate: User confirms you have the right context**

### Step 2: Competitor Selection
* You present the competitor list organized by score
* Recommend top candidates for deep analysis (typically scores 4–5)
* User selects which competitors to analyze

**Gate: User confirms competitor selection**

### Step 3: Output Folder Setup
* Ask user where to save the competitor research files
* If user provides folder path, confirm it
* If no path provided, ask for one
* Verify folder exists or should be created

**Gate: User provides and confirms folder path**

### Step 4: Deep Research Per Competitor (V3: Firecrawl + Haiku + Perplexity)

**Objective:** Build comprehensive intelligence profile for each selected competitor using an automated pipeline that minimizes cost while maintaining quality.

For each competitor, gather intelligence and create a dedicated markdown file.

**IMPORTANT:** The landscape file already captured basic positioning, tagline, value proposition, target customer, and product category. Your job is to:
* **Reference** these landscape findings in your file
* **Add depth** with recent intelligence and detailed analysis
* **DO NOT re-research** what's already documented in landscape

Focus on recent activity (last 6 months), business model details, moat analysis, and strategic insights.

**Process competitors sequentially - one at a time. No gates between phases within a competitor.**

#### Automated Research Pipeline (4 Phases)

**Phase 1: Firecrawl Scraping (~10 seconds per competitor)**
Tool: Firecrawl MCP (free plan: 500 pages/month)

Scrape 2 pages with content filtering:
1. Pricing page
2. About/Company page

Parameters for all scrapes:
```javascript
{
  "onlyMainContent": true,
  "excludeTags": ["nav", "header", "footer", "aside", "script", "style", "iframe"]
}
```

Output: Clean markdown (~20K tokens, stored in memory only)
Cost: **Free** (16 of 500 pages for 8 competitors)

**Phase 2: Fact Extraction (~5 seconds)**
Tool: Claude Haiku API (external)

Extract structured facts from Firecrawl markdown with prompt:
```
Extract ONLY: founders (names, titles), founding date, headquarters, 
funding rounds (dates, amounts, investors), customer metrics (users, 
companies, ARR if disclosed), pricing tiers (names, prices, features), 
core features list, integrations list. Return as structured JSON.
```

Output: Structured JSON (stored in memory only)
Cost: **$0.003 per competitor** (saves ~10% of Cursor monthly token budget vs using main assistant)

**Phase 3: Perplexity Research (~18 minutes for 3 parallel queries)**
Tool: Perplexity MCP (standard "sonar" model)

Run 3 focused queries in parallel (see templates below)
Output: ~17K words total across all queries (~5-6K per query)
Cost: **$3.90 per competitor** (3 queries @ ~$1.30 each)

**Phase 4: Synthesis (~5 minutes)**
Combine Phase 2 facts + Phase 3 analysis into final deepdive markdown:
* Extract key insights from Perplexity reports (~17K words)
* Apply business scoring (5 dimensions)
* Generate strategic analysis narrative
* Label sources per section ("Source: Firecrawl" / "Source: Perplexity Research")
* Save single file: `deepdive-[company-name].md`
* No intermediate files saved (keep in memory only)

**Key Principles:**
* Sequential processing - complete one competitor before starting next
* Memory-only intermediates - save only final deepdive file
* Clear source attribution per section
* **Target cost:** ~$3.90 per competitor ($31.20 for 8 competitors)
  * Firecrawl: $0 (free plan)
  * Haiku extraction: $0.024 total
  * Perplexity: $31.20 (from pre-purchased credits)
* **Target time:** ~25 minutes per competitor
* **Cursor token budget:** ~79K tokens per competitor (63% of monthly budget for 8 competitors)

#### File Naming Convention
Format: `deepdive-[company-name].md`
* Use kebab-case (lowercase with hyphens)
* Examples: `deepdive-motion.md`, `deepdive-reclaim-ai.md`, `deepdive-clockwise.md`

#### File Structure and Content (Round 1 - Core Intelligence)

Each competitor file should contain these 7 core sections:

##### Header
```markdown
# [Company Name] — Competitive Analysis

**Website:** [URL]
**Competitive Score:** [1–5] (from landscape file)
**Last Updated:** [Date]
**Research Source:** Perplexity MCP

**From Landscape File:**
* Tagline: [copy from landscape]
* Product Type: [copy from landscape]
* Value Proposition: [copy from landscape]
* Positioning: [copy from landscape]
```

##### Company Overview
**Source: Firecrawl + Haiku Extraction**

From Phase 2 JSON extraction:
* **Founding date:** [month and year]
* **Founding story:** [1–2 sentences if available]
* **Funding history:** [total raised, rounds, key investors, last round date]
* **Founders:** [names with LinkedIn URLs if available]
* **Company size:** [employee count if available]
* **Headquarters:** [location]
* **Customer base & metrics:** [number of users, companies, ARR if publicly disclosed]
* **Sources:** [Firecrawl URLs scraped]

Format as bullet points with 1–2 sentences per point. Keep factual, avoid lengthy narratives.

##### Target Audience and Positioning
**Source: Perplexity Research**

Using `perplexity_research`, Query 3 (GTM + Positioning + Distribution):

**Query Template:**
```
[Company] go-to-market strategy (product-led vs sales-led), distribution 
channels with specific names (LinkedIn, content marketing, affiliates, etc.), 
target audience segments, primary use cases from case studies, market 
positioning evolution. Include distribution channel details and named tactics. 
Bullet points only.
```

Provide:
* **Target audience:** [from landscape + additional depth from case studies]
* **Primary use cases:** [3–6 use cases from landscape + recent additions]
* **Market category:** [how they categorize themselves - add depth to landscape positioning]
* **Positioning evolution:** [any recent shifts in messaging or focus]
* **Sources:** [links]

Format as bullet points. Reference landscape findings and add recent intelligence.

##### Product Analysis

**Core features & integrations (Source: Firecrawl + Haiku)**
From Phase 2 JSON extraction:
* **Core features:** [list key features, organized by category]
* **Integrations:** [notable integrations and ecosystem partners]
* **Platforms:** [web, mobile, desktop, browser extension]
* **Sources:** [Firecrawl URLs]

**Product strengths, weaknesses & approach (Source: Perplexity Research)**
Using `perplexity_research`, Query 1 (User Reviews):

**Query Template:**
```
[Company] user reviews from G2, Capterra, Reddit: main product strengths 
cited by users, main weaknesses and limitations, unique product approach 
or philosophy. Synthesize patterns across sources. Bullet points only.
```

Provide:
* **Product strengths:** [what they do exceptionally well, from reviews]
* **Product weaknesses:** [gaps, limitations, user complaints from reviews]
* **Unique approach:** [what makes their approach distinct]
* **Sources:** [links including review sites]

Format as bullet points with 1–2 sentences per point.

##### Business Model

**Pricing model (Source: Firecrawl + Haiku)**
From Phase 2 JSON extraction:
* **Pricing model:** [free tier, paid tiers, pricing levels with actual dollar amounts]
* **Sources:** [Firecrawl pricing page URL]

**GTM & Monetization (Source: Perplexity Research)**
Using `perplexity_research`, Query 3 (GTM + Positioning + Distribution):

**Query Template:**
```
[Company] go-to-market strategy (product-led vs sales-led), distribution 
channels with specific names (LinkedIn, content marketing, affiliates, etc.), 
target audience segments, primary use cases from case studies, market 
positioning evolution. Include distribution channel details and named tactics. 
Bullet points only.
```

Provide:
* **Pricing philosophy:** [value-based, usage-based, seat-based, etc.]
* **Main GTM motion:** [product-led, sales-led, community-led, partner-led]
* **Distribution channels:** [how users discover and adopt the product - with specific channel names]
* **Monetization strategy:** [freemium conversion, enterprise sales, etc.]
* **Sources:** [links]

Format as bullet points with 1–2 sentences per point.

##### Moat Analysis
**Source: Perplexity Research**

Using `perplexity_research`, Query 2 (Competitive Moat):

**Query Template:**
```
[Company] competitive moat: switching costs, integration lock-in, user 
habit formation timeline, data advantages, contract structures, behavioral 
lock-in. Focus on what creates customer stickiness. Analytical assessment. 
Bullet points only.
```

Provide:
* **Switching costs:** [what makes it hard for customers to leave]
* **Data advantages:** [proprietary data, learning effects, network effects]
* **Integration lock-in:** [dependencies on their integrations or ecosystem]
* **Contract structures:** [annual commitments, enterprise agreements]
* **Feature depth:** [specialized capabilities that are hard to replicate]
* **User habits:** [behavioral patterns or workflows users adopt - include habit formation timeline if available]
* **Replaceability assessment:** [how easy is it to replace them, from customer POV]
* **Sources:** [links]

Format as bullet points with 1–2 sentences per point. Focus on customer perspective and what creates stickiness.

##### Business Analysis Scoring

Score this competitor 1–5 on each dimension:

* **Product Strength (1–5):** [score]
  * Definition: Feature quality, UX, user satisfaction
  * Evidence: [1–2 sentences on what you observed]

* **Market Momentum (1–5):** [score]
  * Definition: Company growth signals, funding, market traction
  * Evidence: [1–2 sentences on what you observed from company metrics and Perplexity research]

* **GTM Effectiveness (1–5):** [score]
  * Definition: Repeatable acquisition motion, efficient distribution
  * Evidence: [1–2 sentences on what you observed]

* **Moat Depth (1–5):** [score]
  * Definition: Data, integration lock-in, switching costs that compound
  * Evidence: [1–2 sentences on what you observed]

* **Threat Relevance (1–5):** [score]
  * Definition: Overlap with your ICP and jobs-to-be-done
  * Evidence: [1–2 sentences on what you observed]

**Overall Business Score:** [average of 5 scores]

Format as structured scoring with brief evidence for each dimension.

##### Strategic Analysis

**Narrative synthesis (5–8 sentences):**

Answer these strategic questions:
* **Where are they headed?** Direction signals from company trajectory and positioning
* **What makes them strong?** Core competitive advantages vs. alternatives
* **Where are they vulnerable?** Gaps, weaknesses, or exposed positions
* **Why do they matter to us?** Threat level and competitive overlap assessment

Write as coherent narrative connecting the dots across all research. This is synthesis and interpretation, not fact compilation.

**No gate - continue to next competitor automatically. User reviews all files after batch completion.**

---

## Optional: Deep Research Round 2 (Advanced Intelligence)

If needed for specific competitors or trend analysis, conduct additional research on these dimensions:

### When to Use Round 2
* After Round 1 analysis reveals specific competitors need deeper investigation
* When analyzing market trends and ecosystem patterns across multiple competitors
* When specific strategic questions require additional depth

### Round 2 Sections (add to existing files)

##### Community and Ecosystem (Detailed)
* **Community links and health:** Slack, Discord, forums, user groups
* **Developer resources:** API docs, SDKs, integration marketplace
* **Partner ecosystem:** Key partnerships, channel partners, ecosystem maturity
* **Sources:** [links]

##### Organizational Signals
* **Notable open positions:** What hiring reveals about strategic direction
* **Team expansion areas:** Which functions are hiring aggressively
* **Leadership changes:** Recent executive hires or departures
* **Sources:** [links including careers pages]

##### Product Evolution Timeline
* **Historical product launches:** 6-12 month timeline of major releases
* **Roadmap signals:** Public roadmap or beta programs
* **Release cadence patterns:** How frequently they ship
* **Product strategy evolution:** What launch patterns reveal
* **Sources:** [links including changelogs]

##### Media and Communications Strategy
* **Recent blog posts:** CEO/founder posts, themes, messaging focus
* **Press strategy:** Media coverage patterns, key publications
* **Awards and recognition:** Analyst coverage, rankings, notable mentions
* **Sources:** [links]

Format as needed per section. Call this round only when strategic questions require the additional depth.

## Output Specification

Each deepdive file contains:
* Header with company basics and landscape reference
* 7 core sections with findings
* 5-dimension business analysis scoring with evidence
* Strategic analysis narrative (5-8 sentences)
* Inline source citations throughout

All files stored in user-specified folder for summary workflow input.

## Success Criteria

* Actionable insights across all dimensions for each competitor
* Business analysis scores with clear evidence
* Strategic analysis reveals competitive gaps and opportunities
* All findings include source citations
* Within cost ($3.90/competitor) and time (25 min/competitor) targets
* Within Cursor token budget (79K tokens/competitor)

## Research Quality Guidelines

### Query Best Practices
* Use standard "sonar" model (NOT "reasoning-pro")
* Keep scope narrow - one focus per query
* Name specific sources ("from G2, Capterra, Reddit")
* Request "bullet points only" in queries
* Use for synthesis, not facts (use Firecrawl + Haiku for facts)

### Evidence Standards
* Always cite sources with links
* Distinguish facts (verifiable) from signals (inference) from assessment (your analysis)
* Note when information unavailable

### Output Quality
* Provide insights, not just data compilation
* Strategic analysis connects the dots
* Include specifics: feature names, pricing numbers, quotes
* Each file stands alone with consistent structure

