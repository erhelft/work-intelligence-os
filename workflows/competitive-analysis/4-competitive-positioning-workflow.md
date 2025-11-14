# Competitive Positioning Workflow

## Purpose
Operational workflow to synthesize individual competitor deepdives into a unified strategic analysis document with comparative insights and positioning recommendations.

## Prerequisites & Inputs
**Required:**
- [ ] Individual competitor deepdive files from **3-competitor-deepdive-workflow.md**
- [ ] Folder path: _______
- [ ] Number of competitors: _______ (typically 3-10 files)
- [ ] Competitive landscape file from **1-landscape-workflow.md** OR
- [ ] Market viability analysis from **2-market-viability-workflow.md**
- [ ] File path: _______

**User Specifies:**
- [ ] Output file location for the summary: _______

**This Workflow Will Produce:**
- [ ] File: `summary-[date].md` (e.g., `summary-2025-11-01.md`)
- [ ] Contains: Comparison tables, strategic synthesis, decision framework
- [ ] Location: _______ [user specifies]

## Tools
No external tools required. This workflow synthesizes existing research into strategic insights.

## Goal
Create a comprehensive strategic analysis that compares competitors, identifies patterns, reveals white space opportunities, and informs product and positioning decisions.

## Workflow (gated — user approves at each step)

### Step 1: Input Collection
* User provides path to folder containing competitor deepdive files
* You read all deepdive files in the folder
* You read the competitive landscape file for context
* Present list of competitors that will be synthesized

**Gate: User confirms you have all the right files**

### Step 2: Comparative Analysis Tables

**Objective:** Create quick-reference comparison tables across all analyzed competitors.

#### Table 1: Company and Business Model Overview
Create a markdown table with these columns:
* **Competitor Name** (link to their deepdive file)
* **Founding Date**
* **Total Funding**
* **Target Audience**
* **Pricing Model** (simplified)
* **GTM Motion**
* **Competitive Score** (from landscape file)

#### Table 2: Business Analysis Scores
Create a markdown table with these columns:
* **Competitor Name** (link to their deepdive file)
* **Product Strength** (1–5)
* **Market Momentum** (1–5)
* **GTM Effectiveness** (1–5)
* **Moat Depth** (1–5)
* **Threat Relevance** (1–5)
* **Overall Score** (average)

Sort by Overall Score (highest to lowest).

#### Table 3: Positioning Matrix
Create a markdown table with these columns:
* **Competitor Name** (link to their deepdive file)
* **Positioning** (how they describe themselves)
* **Core Differentiator** (key unique value)
* **Primary ICP** (target customer)
* **Main Use Case** (primary job-to-be-done)

**Gate: User reviews tables**

### Step 3: Strategic Synthesis

**Objective:** Write narrative analysis that synthesizes patterns and reveals strategic insights.

#### Section 1: Competitive Landscape Overview
**Length:** 4–6 sentences

Provide high-level view:
* Total competitors analyzed and breakdown by competitive score (how many 5s, 4s, 3s)
* Market maturity signals (funding levels, company ages, market consolidation)
* Category definition (is this a defined category or emerging space)
* Key takeaway about the competitive environment

#### Section 2: Product and Positioning Landscape
**Length:** 8–12 sentences

Analyze product capabilities AND how competitors position themselves:

**Product Analysis:**
* Table stakes features (what everyone has)
* Advanced capabilities (what only some competitors offer)
* Unique product approaches or philosophies
* Product gaps or weaknesses across competitors

**Positioning Analysis:**
* Common positioning themes (what do most competitors claim)
* Positioning clusters (groups of similar approaches)
* Unique positioning plays (standout differentiation strategies)
* Positioning gaps (unclaimed territory or underserved angles)
* White space opportunities (unmet needs or underserved use cases)

#### Section 3: Business Model, GTM, and Moat Analysis
**Length:** 8–12 sentences

Analyze business models, go-to-market strategies, AND competitive moats:

**Business Model & GTM:**
* Dominant pricing models and pricing ranges
* GTM motion patterns (product-led vs. sales-led vs. hybrid)
* Most effective acquisition strategies (based on momentum scores)

**Moat & Defensibility:**
* Strongest moats observed (data, integrations, contracts, network effects)
* Weakest moats or high replaceability competitors
* Common switching cost patterns and lock-in mechanisms
* Implications for building defensibility in this space

#### Section 4: Threat Assessment and Competitive Dynamics
**Length:** 6–10 sentences

Analyze momentum and competitive threats:
* Highest momentum competitors (who's shipping fast and winning)
* Stagnant or declining competitors (signs of slowdown)
* Threat tiers:
  * **Tier 1 threats:** High threat relevance + strong momentum
  * **Tier 2 threats:** Moderate threat with potential
  * **Tier 3 threats:** Lower threat or defensive position
* Emerging threats (competitors gaining traction)
* Overall threat landscape assessment

**Format:** Write all sections as narrative analysis. Draw connections across competitors. Include specific examples and reference competitor names when illustrating points.

**Gate: User reviews strategic synthesis**

### Step 4: Strategic Decision Framework

**Objective:** Translate competitive intelligence into specific, actionable strategic decisions across five dimensions.

This section explicitly addresses your strategic goals by synthesizing all findings into decision-ready recommendations.

#### A. Market Opportunity Assessment
**Length:** 4–6 sentences

Based on competitive analysis, identify:
* **Unmet user needs:** Gaps in current solutions across analyzed competitors
* **Underserved use cases:** Jobs-to-be-done that competitors handle poorly or ignore
* **Market white space:** Positioning territory or segments that are unclaimed or weakly served
* **Opportunity size:** Which gaps represent the largest addressable opportunity

#### B. Product Strategy Recommendations
**Length:** 4–6 sentences

Translate product analysis into feature strategy:
* **Table stakes features:** Must-have capabilities to be credible (what all competitors have)
* **Differentiation features:** Where to go deep to stand out (gaps + weak points in competitors)
* **Feature set for identified gaps:** Specific capabilities needed to fill unmet needs from (A)
* **Product approach:** Unique angle or philosophy that differentiates your solution

#### C. Positioning and Value Proposition
**Length:** 4–6 sentences

Define positioning strategy based on competitive landscape:
* **Positioning territory:** Where to position vs. the competitive set (unclaimed angles from analysis)
* **Value prop framing:** How to articulate the core promise to capture the opportunity
* **Differentiation messaging:** What to emphasize that competitors don't own
* **Target audience focus:** Which ICP segment to prioritize based on competitive gaps

#### D. Go-to-Market Strategy
**Length:** 4–6 sentences

Recommend GTM approach based on what works in this space:
* **GTM motion:** Product-led, sales-led, or hybrid (based on successful competitor patterns)
* **Pricing strategy:** Model and ranges based on competitive analysis and target ICP
* **Distribution channels:** How to reach target audience most effectively
* **Customer acquisition approach:** Tactics that work in this competitive environment

#### E. Moat and Defensibility Strategy
**Length:** 4–6 sentences

Recommend how to build long-term defensibility:
* **Moat-building priorities:** Which defensibility mechanisms to invest in (data, integrations, network effects)
* **Switching cost strategy:** How to create stickiness and retention
* **Overcoming competitor moats:** How to address switching costs of competitors you're displacing
* **Long-term durability:** What will make your position defensible as market matures

**Format:** Write each subsection (A-E) as narrative with specific, actionable recommendations. Reference specific competitors and findings from earlier analysis to support recommendations.

**Gate: User reviews strategic decision framework**

### Step 5: Appendix — Detailed Comparisons (Optional)

**Objective:** Provide detailed reference sections for specific dimensions (include only if user requests deeper comparison).

#### Funding and Team Comparison
* List all competitors with funding amounts, last round, and key investors
* Note patterns in investor types or funding stages
* Highlight outliers (heavily funded vs. bootstrapped)

#### Feature Matrix
* Create a feature comparison table across key capabilities
* Mark which competitors have which features
* Identify unique capabilities by competitor

#### Community and Ecosystem Comparison
* Compare community presence (Slack, Discord, forums)
* Compare integration ecosystems
* Compare developer resources and API maturity
* Note strength of ecosystem by competitor

**Note:** Only include appendix sections if user specifically requests detailed comparisons. Default is to skip this step.

## Output

**File Creation Instructions:**
Create a **dedicated markdown file** for the competitive summary.

**File Naming:** Use format `summary-[date].md` (e.g., `summary-2025-11-01.md`)

**If no location specified:** Ask user where to save the file before creating it.

**File Contents:**
* Executive summary (2–3 sentences at top)
* All comparison tables (3 tables)
* Strategic synthesis (4 narrative sections)
* Strategic decision framework (5 subsections: A–E)
* Optional appendix with detailed comparisons (if requested)
* Links to all source deepdive files
* Date of analysis

## Success Criteria

The competitive summary succeeds when:

* **Comprehensive comparison:** All deepdive files synthesized into unified view
* **Strategic insights:** Clear patterns, gaps, and opportunities identified across competitive landscape
* **Decision framework delivered:** All five strategic dimensions (A-E) addressed with actionable recommendations
* **Answers key questions:** User can identify market opportunities, product strategy, positioning, GTM approach, and moat-building priorities
* **Decision-ready:** User can make strategic decisions on:
  * Where to compete (unmet needs, gaps, white space)
  * How to compete (product features, positioning, value prop)
  * How to win (GTM motion, pricing, customer acquisition)
  * How to defend (moat building, overcoming competitor switching costs)
* **Well-organized:** Tables enable quick scanning, narratives provide depth, decision framework provides action
* **Evidence-based:** All recommendations grounded in competitive intelligence with specific examples

## Quality Guidelines

### Synthesis Over Repetition
* Don't just summarize each competitor — find patterns across them
* Draw connections between similar approaches or strategies
* Highlight what makes competitors different from each other
* Identify trends that emerge when viewing the full landscape

### Strategic Thinking
* Move beyond facts to interpretation and implications
* Answer "so what?" for every insight
* Connect competitive intelligence to strategic decisions
* Provide reasoning, not just observations

### Specificity and Examples
* Reference specific competitors when illustrating points
* Use actual numbers (funding amounts, pricing, scores)
* Quote positioning statements when relevant
* Anchor insights in evidence from deepdives

### Balanced Perspective
* Note both threats and opportunities
* Identify strong competitors and weak ones
* Recognize patterns and outliers
* Acknowledge uncertainty when information is limited

### Readability
* Tables for quick scanning
* Narrative sections for depth and synthesis
* Clear section headers that convey the insight
* Logical flow from overview → patterns → recommendations

