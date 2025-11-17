# Market Viability Analysis Workflow

## Purpose
Analyze a market category and deliver a binary ENTER/DON'T ENTER recommendation. Prevents wasted effort on unattractive markets.

## Inputs
**Required:**
- [ ] Landscape file from **1-landscape-workflow.md**
- [ ] Target category: _______
- [ ] Output location: _______

**Produces:** `market-analysis-[category]-[date].md`

## AI Operating Instructions

**Stay within boundaries:** Analyze ONLY the specified category until Step 5. No pivoting to other markets.

**Honest over helpful:** If the market is closed, say so directly. Don't soften bad news or find silver linings.

**Ground in reality:** Assume current market patterns exist for good reasons. Explain WHY before claiming opportunity.

**Behavior change = red flag:** Any opportunity requiring significant change is suspect.

**Challenge yourself:** Before each gate, ask: "Am I being optimistic? What am I missing? Why doesn't this exist?"

## Workflow Steps

### Step 1: Load Category
* Read landscape file
* Extract all competitors in target category
* Present: # competitors, founding range, funding range, initial patterns
* **Gate:** User confirms correct category

### Step 2: Identify Patterns
**Analyze:**
* Maturity: Founding dates, funding patterns, feature convergence
* Differentiation: How do they differentiate? What's being copied? What's defensible?
* Pricing: Freemium prevalence, free giants, race-to-bottom dynamics
* Innovation: Incremental vs. paradigm shifts, AI features depth

**Critical addition - Explain WHY patterns exist:**
* Why project-based not continuous? → Budget cycles, decision gates
* Why paid participants not real users? → Consent, sampling, quality
* Why enterprise not SMB? → ACV, complexity, sales cost
* **Default: Patterns exist for good reasons. To claim white space, explain why reason no longer applies.**

**Present:** Maturity (Early/Growth/Mature), tier structure, what's commoditized vs. differentiated, 3-5 key patterns
* **Gate:** User confirms accuracy

### Step 3: Test White Space

**Five Critical Tests (ALL must pass):**

1. **Why doesn't this exist?** Valid: Enabling tech just emerged, market failure, poorly distributed. Invalid: "No one thought of it," "hard to build," nice-to-have.

2. **Can incumbents replicate in 6-12mo?** Yes via LLM APIs/simple features → Not defensible. No because proprietary data/business model shift/network effects → Potentially defensible.

3. **Feature or platform?** Feature = <$100M TAM. Platform = >$100M. Be explicit.

4. **Max ARR potential?** Calculate TAM at 10% share. If <$60M → Narrow.

5. **Behavior change required?** Low = works within existing workflows. Medium = some change, clear ROI. High = requires rethinking work → **Disqualifying.**

**Process:** 
1. Identify 5-10 potential gaps/opportunities
2. Run ALL 5 tests on EACH opportunity (do not eliminate early)
3. Present results grouped BY OPPORTUNITY (not by test)
4. Keep only opportunities passing ALL 5 tests

**Presentation Format - Test Matrix:**

Present a table showing all opportunities with all test results:

| Opportunity | Test 1: Why doesn't exist? | Test 2: Defensibility | Test 3: Feature/Platform | Test 4: TAM at 10% | Test 5: Behavior Change | Pass/Fail | Strategic Insight |
|:------------|:---------------------------|:---------------------|:------------------------|:------------------|:------------------------|:----------|:------------------|
| #1 Name | ✅ Valid reason | ⚠️ Moderate | ❌ Feature | ✅ $500M | ✅ Low | **FAIL (Test 3)** | Good market, wrong scope |
| #2 Name | ❌ Already exists | - | - | - | - | **FAIL (Test 1)** | Test remaining for learning |
| ... | | | | | | | |

**After table, provide detailed analysis for each opportunity:**

#### Opportunity #1: [Name]
- **What it is:** [1 sentence + ICP]
- **Test 1 - Why doesn't exist:** [Pass/Fail + reasoning]
- **Test 2 - Defensibility:** [Pass/Fail + 6-12mo replication assessment]
- **Test 3 - Feature/Platform:** [Pass/Fail + scope assessment]
- **Test 4 - TAM:** [Pass/Fail + calculation at 10% share]
- **Test 5 - Behavior change:** [Low/Med/High + assessment]
- **Verdict:** [Pass all 5 / Failed Test X]
- **Strategic insight:** [Why this matters even if failed - e.g., "Good market but incumbents own it"]

Repeat for all 5-10 opportunities.

**Summary:**
- **Opportunities passing ALL 5 tests:** [List, or "ZERO"]
- **Best failed opportunities:** [Top 2-3 that failed but revealed important market insights]

**If zero pass:** State clearly "No defensible white space identified in [category]."

**Why test everything, not just survivors?**
An opportunity failing Test 1 but passing Tests 2-5 reveals: "This is a GOOD market with strong characteristics, but incumbents own it." This informs strategy:
- Don't pursue this exact opportunity
- BUT consider vertical wedges, timing (wait for market shift), or partnerships
- Understand why winners win (moat types, distribution advantages)

* **Gate:** User confirms rigor and completeness

### Step 4: Score Competition

**Rate 1-10 (cite evidence):**
* **Competitive Intensity:** # players, well-funded (>$50M), tech giants, switching costs
* **Market Maturity:** Age, feature commoditization, innovation pace, growth rate
* **Barriers:** Favoring new entrants (low tech barriers, new tech) vs. incumbents (brand, networks, free alternatives, data, relationships)
* **Differentiation Difficulty:** Can you differentiate on features/UX/AI/vertical?
* **Overall Entry Difficulty:** Combined assessment + commoditization window

**Present:** 5 scores with justification, barriers assessment (High/Med/Low favoring who), top 3-5 threats, timeline window
* **Gate:** User confirms realistic (not optimistic)

### Step 5: Compare Alternative

**Required:** Compare to at least one alternative category (from landscape or user-specified)

**Table:** Target vs. Alternative on: # competitors, white space, AI defensibility, moat type, entry difficulty (X/10), likely outcome

**Present:** Side-by-side table + clear statement of which is superior + 3-5 reasons why
* **Gate:** User confirms fair comparison

### Step 6: Recommend

**ENTER or DON'T ENTER [Category]** + 3-5 reasons with evidence

**If DON'T ENTER:**
* Why unattractive (disqualifying factors)
* Alternative to pursue instead + why better
* Exception case (only if X extreme condition)

**If ENTER:**
* Which opportunities + positioning
* Top 3-5 competitors to deepdive (→ workflow 3)
* Timeline to build moat + top 3 risks

**Summary bullets:** Attractiveness (Unattractive/Questionable/Attractive), White Space (None/Narrow/Significant), Competition (X/10), Defensibility (None/Weak/Moderate/Strong), Venture-Scale (No/Questionable/Yes), Window (<6mo/6-12mo/12-24mo/>24mo)

**Honesty check before presenting:** 
* DON'T ENTER: Am I softening bad news? Hedging with "might work if"? → Be more direct.
* ENTER: Am I optimistic about defensibility? Underestimating incumbents? Overestimating behavior change willingness? → Revisit tests.

* **Gate:** User approves

## Output: `market-analysis-[category]-[date].md`

**Sections:**
1. Category Overview (# competitors, dates, funding, summary)
2. Pattern Analysis (maturity, tiers, convergence, differentiation, pricing, innovation + WHY patterns exist)
3. White Space Analysis
   - Test Matrix: All opportunities × all 5 tests (table format)
   - Detailed Analysis: Each opportunity with full test results and strategic insights
   - Summary: Opportunities passing all 5 tests (or "none identified")
   - Key Learnings: What failed opportunities reveal about market structure
4. Competition Scores (5 scores with evidence, barriers, top threats, timeline)
5. Alternative Comparison (table, which is superior, 3-5 reasons)
6. Binary Recommendation (ENTER/DON'T ENTER + rationale + summary bullets + next steps)

**Handoff:**
* ENTER → Top 3-5 competitors for workflow 3, questions to answer, threats to validate
* DON'T ENTER → Alternative to analyze next

## Quality Checks

**Critical Tests:** Run all 5 tests on EVERY opportunity (no early elimination). Group results by opportunity, not by test. Include strategic insights for high-potential failures (good market characteristics but taken by incumbents).

**Competition:** Use specific evidence, consider free giants, realistic AI commoditization (6-12mo not 18-24mo), acknowledge maturity

**Boundaries:** Stay in target category until Step 5, no premature pivoting, separate analysis from recommendation

**Behavior Change:** Explicitly assess, treat high change as disqualifying, explain why current patterns exist

**Honesty:** Binary calls not hedging, direct bad news, challenge your optimism, ground in observable reality

## Next Steps

**ENTER →** Proceed to workflow 3 with top 3-5 competitors
**DON'T ENTER →** Run this workflow on alternative category

