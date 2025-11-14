# Competitive Landscape Workflow

## Purpose
Operational workflow to conduct broad competitive discovery and produce an initial landscape map using Perplexity MCP.

## Prerequisites & Inputs
**Required:**
- [ ] Context document or product description (value proposition, target audience, key use cases)
- [ ] Path: _______

**Optional:**
- [ ] Strategic goals, specific concerns, known competitors, market segment

**This Workflow Will Produce:**
- [ ] File: `landscape-[product-name].md`
- [ ] Location: _______ [user specifies folder]
- [ ] Contains: Search map, scored competitor list with detailed fields, source citations

## Tools
**This workflow requires Perplexity MCP** for web research and real-time competitive intelligence gathering.

**Required MCP Function:** `perplexity_research` (not `perplexity_search`)
* Use `perplexity_research` for all competitive intelligence queries
* This provides comprehensive research with citations rather than simple search results

## Goal
Broad mapping of the competitive landscape to identify all relevant competitors across use case, alternative, and substitution categories.

## Competitor Definition

A competitor is any product or company that meets **one or more** of these criteria:

* **Use case competitor:** Solves the same use case or pain point
* **Alternative solution:** Provides an alternative way to achieve the same outcome
* **Substitution consideration:** Users actively consider it as a substitute for your product

## Workflow (gated — user approves at each step)

### Step 1: Context Intake
* User provides context document or product description
* You read and process the provided context
* Extract initial understanding of:
  * Core value proposition
  * Target audience
  * Primary use cases
  * Key pain points addressed

**Gate: User confirms context is captured**

### Step 2: Clarification and Search Map Creation

**Objective:** Build a comprehensive search map to guide competitive discovery.

You create a draft search map based on the context provided, filling in answers to the best of your understanding:
* What is the core value proposition?
* Who is the target audience (role, company size, industry)?
* What are the primary use cases?
* What job does the product do for users?
* What pain points does it solve?
* What are the key features or capabilities?
* What product category does this fall into?

**Deliverable: Search Map**
Present a structured map with your best understanding from the context:
* **Value propositions** (2–4 key value statements)
* **Use cases** (3–6 primary use cases)
* **Pain points** (3–5 core problems solved)
* **Product categories** (2–4 category labels or market segments)
* **Target personas** (2–3 user types or roles)
* **Search keywords** (10–15 terms and phrases to search against)

User confirms or corrects your understanding.

**Gate: User approves search map**

### Step 3: Broad Competitive Research

**Objective:** Use Perplexity MCP to cast a wide net and identify all potential competitors.

#### Research Approach
Using `perplexity_research` function, research:
* Products solving the same use cases
* Alternative solutions to the same problems
* Products mentioned as substitutes in reviews, forums, and comparisons
* Direct, indirect, and tangential competitors
* Products in the same categories or adjacent categories

#### Query Planning (before search execution)

**Objective:** Align on search focus before executing queries.

Based on the approved search map, identify which angle to prioritize if multiple value propositions, use cases, or audiences exist.

**Deliverable: Search Focus Options**
Present 3 search focus options ranked by priority:

**Format:**
1. **[High/Medium/Low Priority]** [Value prop/Use case] + [Target audience]
   * Query 1: "[specific search query]"
   * Query 2: "[specific search query]"

2. **[High/Medium/Low Priority]** [Alternative angle]
   * Query 1: "[specific search query]"
   * Query 2: "[specific search query]"

3. **[High/Medium/Low Priority]** [Alternative angle]
   * Query 1: "[specific search query]"
   * Query 2: "[specific search query]"

User selects which focus to pursue first (or specifies their own).

**Gate: User approves search query focus**

#### Search Strategy
Execute **two primary searches** based on the approved focus:

**Search 1: Use Case + Category Search**
* Query format: "[primary use case] + [product category] + software/tools"
* Example: "calendar scheduling automation for professionals"
* Focus: Direct competitors solving the same core problem

**Search 2: Alternatives Discovery**
* Query format: "alternatives to [top known competitor in space]" OR "[pain point] + solutions"
* Example: "alternatives to Calendly" or "meeting scheduling pain solutions"
* Focus: Products users actively consider as substitutes

**Conditional Search 3:**
If the first two searches yield fewer than 8–10 strong competitors (scores 3–5), run:
* Query format: "[adjacent category] + [target persona]"
* Example: "productivity tools for knowledge workers"
* Focus: Adjacent solutions that may compete for the same use case

#### Results Synthesis
After completing searches:
* Remove duplicates across search results
* Cross-reference findings to verify competitor relevance
* Identify patterns in how competitors position themselves
* Note any gaps or white space in the competitive landscape
* Consolidate into a single unified competitor list

#### Deliverable: Initial Competitor List

**Main Value Proposition — Definition**
The core promise or benefit the product delivers to users. Establish this by:
* Check their homepage headline or hero section
* Look for "what we do" or "how it works" statements
* Read their meta description or About page
* Synthesize into 1–2 sentences capturing the primary value

For each competitor found, provide:
* **Company name**
* **Website URL**
* **Tagline** (exact wording from their site)
* **Main value proposition** (1–2 sentences — the core promise/benefit they deliver)
* **What the product is** (1 sentence — what category/type of product)
* **ICP — Ideal Customer Profile** (B2C/B2B, market segment, company size, role)
* **Positioning** (how they describe/categorize themselves — exact wording when possible)
* **Why they're a competitor** (which definition they meet: use case, alternative, or substitution)
* **Competitive score** (1–5 scale)
  * 5 = Direct head-to-head competitor (same use case, same audience)
  * 4 = Strong overlap in value prop or audience
  * 3 = Moderate overlap, alternative approach
  * 2 = Tangential solution, different approach but same outcome
  * 1 = Edge case, rarely considered as substitute
* **Source** (where you found this competitor)

**Format:** Present as a structured list organized by competitive score (5s first, then 4s, etc.)

**Gate: User reviews competitor list**

## Output

**File Creation Instructions:**
Create a **dedicated new markdown file** in the research folder specified by the user.

**File Naming:** Use format `landscape-[product-name].md` (e.g., `landscape-motion.md`)

**If no folder specified:** Ask user where to save the file before creating it.

**File Contents:**
This workflow produces one markdown file containing:
* Search map (value props, use cases, categories, keywords)
* Complete competitor list with all required fields and scores
* Source citations for all competitors found
* Synthesis notes (patterns, gaps, white space observations)

## Output Specification (Handoff to Next Workflow)

The landscape file MUST contain these elements for the deepdive workflow:

**Search Map:**
* Value propositions (2–4 key statements)
* Use cases (3–6 primary use cases)
* Pain points (3–5 core problems)
* Target personas (2–3 user types)

**Competitor List:**
For each competitor, include all these fields:
* Company name and website URL
* Tagline (exact wording from site)
* What the product is (1 sentence - product category/type)
* Main value proposition (1–2 sentences - the core promise/benefit)
* Target customer (ICP: B2C/B2B, segment, company size, role)
* Positioning (how they describe themselves - exact wording when possible)
* Why they're a competitor (use case/alternative/substitution)
* Competitive score (1–5)
* Source

**Note:** The deepdive workflow will reference these findings and add depth with recent intelligence - not re-research the basics already captured here.

This file will be used as input for deepdive competitor selection.

## Next Steps

This file serves as input for the next two workflows:
1. **competitor-deepdive-workflow.md:** Deep analysis on selected competitors (creates individual deepdive files)
2. **competition-summary.md:** Strategic synthesis of all deepdives (creates unified summary document)

## Success Criteria

The broad competitive research succeeds when:

* **Comprehensive coverage:** All relevant competitors identified across the three definition types
* **Proper scoring:** Each competitor has a defensible competitive score
* **Source transparency:** Clear citations for where competitors were found
* **Search map clarity:** Well-defined parameters that guided the research
* **Ready for next phase:** User has enough information to select which competitors warrant deep analysis

## Research Quality Guidelines

### Using Perplexity MCP
* **Use `perplexity_research` function** for all competitive intelligence queries
* Run multiple research queries to ensure comprehensive coverage
* Use varied search terms from the search map
* Research across different angles (use case, pain point, category, alternatives)
* Include source links and citations from research results

### Evidence Standards
* Always cite sources with links
* Note when information is limited or unverified
* Distinguish between facts (from company sites) and inference (from reviews/articles)

### Breadth Over Depth
* This workflow prioritizes finding everyone — depth comes in the next workflow
* Include borderline cases — better to capture now and filter later
* Cast a wide net across direct, indirect, and tangential competitors

## Next Steps

After completing the landscape:

**Recommended:** Proceed to **2-market-viability-workflow.md**
* Analyze category viability before deep competitor research
* Determine if market is worth entering
* Get binary recommendation (Enter/Don't Enter)
* Identify top 3-5 competitors to deepdive if entering

**Alternative:** Skip directly to **3-competitor-deepdive-workflow.md** if:
* You're already committed to entering this market
* You need tactical intelligence on known competitors
* Strategic decision has been made elsewhere

**Strategic benefit of workflow 2:** Prevents wasted effort researching 20+ competitors in an unattractive market. Spend 2-3 hours on market analysis instead of 20+ hours on competitor deepdives that lead nowhere.

